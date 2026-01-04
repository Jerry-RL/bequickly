# bequickly 学习指南

> 本文档面向前端初学者，旨在帮助理解 bequickly 的设计思路和实现原理。

## 📚 目录

- [项目概述](#项目概述)
- [设计思路](#设计思路)
- [技术架构](#技术架构)
- [核心功能实现](#核心功能实现)
- [代码解析](#代码解析)
- [扩展学习](#扩展学习)

## 项目概述

### 什么是 CLI 工具？

CLI（Command Line Interface，命令行界面）工具是一种通过命令行终端来使用的程序。常见的例子包括：
- `npm` - Node.js 包管理器
- `git` - 版本控制工具
- `create-react-app` - React 项目脚手架

### bequickly 的目标

bequickly 的目标是：**让开发者能够快速从模板生成项目，避免重复的初始化工作**。

例如，每次创建新的 Next.js 项目时，都需要：
1. 创建项目目录
2. 安装依赖
3. 配置 TypeScript、Tailwind CSS 等
4. 设置项目结构

使用 bequickly，只需要一个命令：`bequickly init vibe-sandbox my-project`

## 设计思路

### 1. 核心概念：模板系统

**问题：** 如何让用户能够快速创建项目？

**解决方案：** 模板系统
- 将常用的项目结构保存为模板
- 用户选择模板，工具自动复制并配置

```
模板目录结构：
templates/
  └── vibe-sandbox/          # 一个模板
      ├── package.json       # 项目配置
      ├── src/               # 源代码
      └── ...                # 其他文件
```

### 2. 用户交互设计

**问题：** 如何让工具易用？

**解决方案：** 多层次的交互方式
- **完全交互式**：`bequickly init` - 逐步引导用户
- **半交互式**：`bequickly init vibe-sandbox` - 指定模板，交互输入项目名
- **非交互式**：`bequickly init vibe-sandbox my-project` - 完全指定参数

### 3. 变量替换机制

**问题：** 模板中的项目名、作者等信息如何动态替换？

**解决方案：** 变量替换系统
- 模板中使用 `{{variableName}}` 占位符
- 生成项目时，自动替换为实际值

```json
// 模板中的 package.json
{
  "name": "{{projectName}}",
  "description": "Project from {{templateName}}"
}

// 生成后的 package.json
{
  "name": "my-project",
  "description": "Project from vibe-sandbox"
}
```

## 技术架构

### 整体架构图

```
┌─────────────────┐
│   User Input    │ 用户输入命令
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   CLI Parser    │ 解析命令和参数 (Commander.js)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Commands      │ 执行具体命令 (init, add, delete...)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Utils         │ 工具函数 (模板管理、文件操作...)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   File System   │ 文件系统操作
└─────────────────┘
```

### 技术选型

| 技术 | 作用 | 为什么选择它 |
|------|------|-------------|
| **TypeScript** | 编程语言 | 类型安全，更好的开发体验 |
| **Commander.js** | CLI 框架 | 简化命令行参数解析 |
| **Inquirer.js** | 交互式提示 | 提供友好的用户交互 |
| **fs-extra** | 文件操作 | 比原生 fs 更强大，支持 Promise |
| **Chalk** | 终端颜色 | 美化输出，提升用户体验 |

## 核心功能实现

### 1. 命令解析（CLI Entry）

**文件：** `src/cli.ts`

```typescript
import { Command } from 'commander';

const program = new Command();

program
  .name('bequickly')
  .description('A CLI tool for quickly generating projects from templates')
  .version(packageJson.version);

program
  .command('init')
  .description('Initialize a new project from a template')
  .argument('[template-name]', 'Name of the template to use')
  .argument('[project-name]', 'Name of the project to create')
  .action(async (templateName?: string, projectName?: string) => {
    await initCommand(templateName, projectName);
  });

program.parse();
```

**关键点：**
- `[template-name]` 中的 `[]` 表示可选参数
- `action` 是命令执行的回调函数
- 使用 `async/await` 处理异步操作

### 2. 模板复制

**文件：** `src/utils/generator.ts`

```typescript
export async function copyTemplate(sourcePath: string, targetPath: string): Promise<void> {
  await fs.ensureDir(targetPath);
  
  await fs.copy(sourcePath, targetPath, {
    filter: (src: string) => {
      // 排除不需要的文件
      const excludePatterns = [
        'node_modules',
        '.git',
        'dist',
        // ...
      ];
      
      return !excludePatterns.some(pattern => 
        relativePath.includes(pattern) || basename === pattern
      );
    },
  });
}
```

**关键点：**
- `fs.copy` 递归复制目录
- `filter` 函数决定哪些文件需要复制
- 排除 `node_modules`、`.git` 等不需要的文件

### 3. 变量替换

**文件：** `src/utils/generator.ts`

```typescript
export async function replaceTemplateVariables(
  projectPath: string,
  variables: Record<string, any>
): Promise<void> {
  const files = await getAllFiles(projectPath);
  
  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8');
    let newContent = content;
    
    // 替换 {{variableName}} 格式的变量
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      newContent = newContent.replace(regex, String(value));
    }
    
    if (newContent !== content) {
      await fs.writeFile(file, newContent, 'utf-8');
    }
  }
}
```

**关键点：**
- 遍历所有文件
- 使用正则表达式 `\{\{key\}\}` 匹配变量
- 替换为实际值

### 4. 交互式提示

**文件：** `src/commands/init.ts`

```typescript
import inquirer from 'inquirer';

const { selectedTemplate } = await inquirer.prompt([
  {
    type: 'list',
    name: 'selectedTemplate',
    message: 'Select a template:',
    choices: templates.map(t => ({
      name: t.name,
      value: t.name,
    })),
  },
]);
```

**关键点：**
- `inquirer.prompt` 显示交互式提示
- `type: 'list'` 创建下拉列表
- 返回用户选择的值

### 5. 依赖安装

**文件：** `src/utils/installer.ts`

```typescript
export async function installDependencies(projectPath: string): Promise<boolean> {
  // 1. 检测包管理器（npm/yarn/pnpm）
  const packageManager = await detectPackageManager(projectPath);
  
  // 2. 检查包管理器是否已安装
  if (!isPackageManagerInstalled(packageManager)) {
    return false;
  }
  
  // 3. 执行安装命令
  execSync(`${packageManager} install`, {
    cwd: projectPath,
    stdio: 'inherit',
  });
}
```

**关键点：**
- 自动检测包管理器（通过 lock 文件或 package.json）
- 使用 `execSync` 执行系统命令
- `stdio: 'inherit'` 让输出显示在终端

## 代码解析

### 完整的 init 命令流程

```typescript
export async function initCommand(templateName?: string, projectName?: string) {
  // 1. 解析模板名称和版本
  let parsedTemplateName = templateName;
  if (templateName && templateName.includes('@')) {
    const parts = templateName.split('@');
    parsedTemplateName = parts[0];
    parsedVersion = parts[1];
  }

  // 2. 如果没有提供模板名，让用户选择
  if (!parsedTemplateName) {
    const { selectedTemplate } = await inquirer.prompt([...]);
    parsedTemplateName = selectedTemplate;
  }

  // 3. 检查模板是否存在
  const templatePath = path.join(templatesDir, parsedTemplateName);
  if (!(await fs.pathExists(templatePath))) {
    throw new Error('Template not found');
  }

  // 4. 交互式收集项目信息
  const { projectDescription, author } = await inquirer.prompt([...]);

  // 5. 复制模板
  await copyTemplate(templatePath, projectPath);

  // 6. 替换变量
  await replaceTemplateVariables(projectPath, {
    projectName,
    projectDescription,
    author,
  });

  // 7. 安装依赖
  await installDependencies(projectPath);
}
```

### 关键设计模式

#### 1. 模块化设计

每个功能都拆分成独立的模块：
- `commands/` - 命令实现
- `utils/` - 工具函数
- 职责清晰，易于维护

#### 2. 错误处理

```typescript
try {
  await copyTemplate(templatePath, projectPath);
} catch (error: any) {
  console.error(chalk.red(`❌ Error: ${error.message}`));
  process.exit(1);
}
```

#### 3. 用户友好提示

```typescript
console.log(chalk.blue(`\n📦 Creating project "${projectName}"...`));
console.log(chalk.green(`✓ Project created successfully!`));
```

使用 `chalk` 添加颜色和 emoji，提升用户体验。

## 扩展学习

### 1. 如何添加新命令？

1. 在 `src/commands/` 创建新文件，例如 `update.ts`
2. 实现命令函数：
   ```typescript
   export async function updateCommand(templateName: string) {
     // 实现更新逻辑
   }
   ```
3. 在 `src/cli.ts` 注册命令：
   ```typescript
   program
     .command('update')
     .description('Update a template')
     .action(async (templateName: string) => {
       await updateCommand(templateName);
     });
   ```

### 2. 如何扩展变量替换？

在 `replaceTemplateVariables` 函数中添加新的变量：
```typescript
await replaceTemplateVariables(projectPath, {
  projectName,
  projectDescription,
  author,
  date: new Date().toISOString(), // 新增变量
});
```

### 3. 如何支持更多包管理器？

在 `detectPackageManager` 函数中添加检测逻辑：
```typescript
if (await fs.pathExists(path.join(projectPath, 'bun.lockb'))) {
  return 'bun';
}
```

### 4. 推荐学习资源

- **TypeScript 官方文档**：https://www.typescriptlang.org/docs/
- **Commander.js 文档**：https://github.com/tj/commander.js
- **Node.js 文件系统**：https://nodejs.org/api/fs.html
- **Inquirer.js 文档**：https://github.com/SBoudrias/Inquirer.js

### 5. 实践建议

1. **阅读代码**：从 `src/cli.ts` 开始，理解整体流程
2. **修改测试**：尝试修改代码，看看效果
3. **添加功能**：尝试添加一个小功能，如自定义变量
4. **阅读源码**：研究其他 CLI 工具的实现，如 `create-react-app`

## 总结

bequickly 的核心思想是：
1. **模板化**：将项目结构保存为模板
2. **自动化**：自动复制、替换、安装
3. **用户友好**：提供交互式界面和清晰的提示

通过这个项目，你可以学习到：
- CLI 工具的开发流程
- TypeScript 的实际应用
- Node.js 文件系统操作
- 用户交互设计
- 模块化编程思想

希望这个学习指南能帮助你理解 bequickly 的设计和实现！🚀

