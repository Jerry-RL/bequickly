# bequickly 使用指南

## 快速开始

### 1. 安装依赖

```bash
cd bequickly
npm install
```

### 2. 构建项目

```bash
npm run build
```

### 3. 本地测试

#### 方式一：使用 npm link（推荐）

这种方式可以在任何目录下使用 `bequickly` 命令，就像全局安装一样：

```bash
# 1. 确保项目已构建
npm run build

# 2. 在 bequickly 目录下创建全局链接
npm link

# 3. 现在可以在任何目录下使用 bequickly 命令（包括简短别名）
cd /path/to/anywhere
bequickly init vibe-sandbox my-test-project
bq list  # 使用简短别名
bequickly --version

# 4. 测试完成后，取消链接（可选）
npm unlink -g bequickly
```

**注意：**
- 每次修改代码后，需要重新运行 `npm run build` 才能看到更改
- 如果修改了代码但没有重新构建，链接的命令仍会使用旧的编译文件

#### 方式二：开发模式运行

```bash
# 直接运行 TypeScript 源码（无需构建）
npm run dev init vibe-sandbox my-test-project
```

#### 方式三：使用编译后的文件

```bash
# 先构建
npm run build

# 然后运行编译后的文件
node dist/cli.js init vibe-sandbox my-test-project
```

## 发布到 npm

### 1. 登录 npm

```bash
npm login
```

### 2. 发布

```bash
npm publish
```

发布后，用户可以通过以下方式使用：

```bash
# 使用完整命令名
npx bequickly@latest init vibe-sandbox my-project

# 或使用简短别名（安装后）
npm install -g bequickly
bq init vibe-sandbox my-project
bqp init vibe-sandbox my-project
```

## 命令说明

### 命令别名

为了更快的输入，您可以使用以下简短别名：

- `bq` - `bequickly` 的简短别名（完全等价）
- `bqp` - `bequicklyproject` 的简短别名（完全等价）

**示例：**
```bash
# 使用简短别名
bq init vibe-sandbox my-project
bq add my-template ./path/to/template
bq list

# 所有命令都是等价的
bequickly init    # 等同于: bq init
bequicklyproject init    # 等同于: bqp init
```

### init - 初始化项目

```bash
bequickly init [template-name] [project-name]
```

- `template-name`: 模板名称（可选，未提供时会交互式选择）
- `project-name`: 项目名称（可选，未提供时会交互式输入）

示例：
```bash
# 完全交互式
bequickly init
# 或使用简短别名
bq init

# 指定模板，交互式输入项目名
bequickly init vibe-sandbox
bq init vibe-sandbox

# 完全指定
bequickly init vibe-sandbox my-project
bq init vibe-sandbox my-project
```

### add - 添加模板

```bash
bequickly add <template-name> <template-path>
```

示例：
```bash
bequickly add my-template ./path/to/template
# 或使用简短别名
bq add my-template ./path/to/template
```

### delete - 删除模板

```bash
bequickly delete <template-name>
# 或
bq delete <template-name>
```

示例：
```bash
bequickly delete my-template
bq delete my-template
```

### gen - 生成项目（init的别名）

```bash
bequickly gen [template-name] [project-name]
# 或
bq gen [template-name] [project-name]
```

### list - 列出所有模板

```bash
bequickly list
# 或
bq list
```

### help - 显示帮助

```bash
bequickly help
# 或
bq help
```

## 模板系统

### 模板位置

1. **项目内模板**: `bequickly/templates/` 目录
2. **用户模板**: `~/.bequickly/templates/` 目录

### 模板变量

模板支持变量替换，使用 `{{variableName}}` 格式：

- `{{projectName}}`: 项目名称
- `{{templateName}}`: 模板名称

在模板文件中可以使用这些变量，生成项目时会自动替换。

### 创建自定义模板

1. 创建一个包含项目文件的目录
2. 使用 `bequickly add` 命令添加模板
3. 或直接将模板目录复制到 `templates` 目录

## 项目结构

```
bequickly/
├── src/
│   ├── cli.ts              # CLI入口文件
│   ├── commands/           # 命令实现
│   │   ├── init.ts
│   │   ├── add.ts
│   │   ├── delete.ts
│   │   ├── gen.ts
│   │   ├── help.ts
│   │   └── list.ts
│   └── utils/              # 工具函数
│       ├── template.ts
│       ├── paths.ts
│       └── generator.ts
├── templates/              # 模板目录
│   └── vibe-sandbox/       # 默认模板
├── dist/                   # 编译输出目录
├── package.json
├── tsconfig.json
└── README.md
```

