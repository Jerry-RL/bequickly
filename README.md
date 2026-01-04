# bequickly

<div align="center">

**🚀 A powerful CLI tool for quickly generating projects from customizable templates**

[English](#english) | [中文](#中文)

</div>

---

## English

### 📖 Introduction

**bequickly** is a command-line tool designed to accelerate project initialization by generating projects from pre-configured templates. It provides a simple yet powerful way to scaffold new projects, manage templates, and streamline your development workflow.

Whether you're starting a new Next.js project, React application, or any other type of project, bequickly helps you get started in seconds instead of minutes.

### ✨ Features

- 🎯 **Quick Project Generation** - Initialize projects from templates with a single command
- 📦 **Template Management** - Easily add, delete, and list available templates
- 🔄 **Interactive Mode** - User-friendly prompts for template and project name selection
- 🎨 **Customizable Templates** - Support for custom templates with variable substitution
- 🚀 **Zero Configuration** - Works out of the box with sensible defaults
- 📝 **Template Variables** - Automatic replacement of project names and other variables
- 🛠️ **Smart Filtering** - Automatically excludes `node_modules`, `.git`, and build artifacts when copying templates

### 🛠️ Tech Stack

- **Language**: TypeScript
- **CLI Framework**: Commander.js
- **Interactive Prompts**: Inquirer.js
- **File Operations**: fs-extra
- **Terminal Colors**: Chalk
- **Build Tool**: TypeScript Compiler

### 📦 Installation

#### Global Installation

```bash
npm install -g bequickly
```

#### Using with npx (No Installation Required)

```bash
npx bequickly@latest init template-name project-name
```

### 🚀 Quick Start

```bash
# Interactive mode - you'll be prompted to select template and enter project name
bequickly init

# Specify template name only
bequickly init vibe-sandbox

# Specify both template and project name
bequickly init vibe-sandbox my-awesome-project
```

### 📚 Usage

#### Initialize a Project

```bash
bequickly init [template-name] [project-name]
```

**Examples:**

```bash
# Fully interactive
bequickly init

# Select template interactively, specify project name
bequickly init my-project

# Specify both
bequickly init vibe-sandbox my-project
```

#### Add a Template

```bash
bequickly add <template-name> <template-path>
```

Adds a new template from a directory to your template collection.

**Example:**

```bash
bequickly add react-app ./templates/react-template
```

#### Delete a Template

```bash
bequickly delete <template-name>
# or
bequickly del <template-name>
```

Removes a template from your template collection.

**Example:**

```bash
bequickly delete old-template
```

#### Generate a Project (Alias)

```bash
bequickly gen [template-name] [project-name]
# or
bequickly generate [template-name] [project-name]
```

Same as `init` command - an alternative way to generate projects.

#### List Available Templates

```bash
bequickly list
# or
bequickly ls
```

Shows all available templates in your collection.

#### Show Help

```bash
bequickly help
```

Displays comprehensive help information and usage examples.

### 📋 Available Commands

| Command | Alias | Description |
|---------|-------|-------------|
| `init` | - | Initialize a new project from a template |
| `add` | - | Add a new template to the collection |
| `delete` | `del` | Delete a template from the collection |
| `gen` | `generate` | Generate a project (alias for init) |
| `list` | `ls` | List all available templates |
| `help` | - | Show help information |

### 🎨 Template System

#### Template Locations

Templates are stored in two possible locations:

1. **Project Templates**: `bequickly/templates/` directory (included with the package)
2. **User Templates**: `~/.bequickly/templates/` directory (user-specific templates)

The tool automatically checks both locations and prioritizes project templates.

#### Template Variables

Templates support variable substitution using `{{variableName}}` syntax:

- `{{projectName}}` - The name of the project being created
- `{{templateName}}` - The name of the template being used

**Example:**

In your template's `package.json`:
```json
{
  "name": "{{projectName}}",
  "description": "Project generated from {{templateName}} template"
}
```

These variables will be automatically replaced when generating a project.

#### Creating Custom Templates

1. **Create a template directory** with your project files
2. **Add the template** using the `add` command:
   ```bash
   bequickly add my-template ./path/to/template
   ```
3. **Or manually copy** your template to `~/.bequickly/templates/my-template/`

#### Default Template

The package includes `vibe-sandbox` as the default template - a Next.js project with TypeScript, Tailwind CSS, and modern tooling.

### 💻 Development

#### Prerequisites

- Node.js >= 14.0.0
- npm or yarn

#### Setup

```bash
# Clone the repository
git clone <repository-url>
cd bequickly

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev init vibe-sandbox test-project
```

#### Project Structure

```
bequickly/
├── src/
│   ├── cli.ts              # CLI entry point
│   ├── commands/           # Command implementations
│   │   ├── init.ts         # Initialize command
│   │   ├── add.ts          # Add template command
│   │   ├── delete.ts       # Delete template command
│   │   ├── gen.ts          # Generate command (alias)
│   │   ├── help.ts         # Help command
│   │   └── list.ts         # List templates command
│   └── utils/              # Utility functions
│       ├── template.ts     # Template utilities
│       ├── paths.ts        # Path utilities
│       └── generator.ts   # Project generation logic
├── templates/              # Template directory
│   └── vibe-sandbox/       # Default template
├── dist/                   # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### 📄 License

MIT License - see LICENSE file for details.

---

## 中文

### 📖 介绍

**bequickly** 是一个命令行工具，旨在通过从预配置的模板生成项目来加速项目初始化。它提供了一种简单而强大的方式来搭建新项目、管理模板并简化您的开发工作流程。

无论您是启动新的 Next.js 项目、React 应用程序还是任何其他类型的项目，bequickly 都能帮助您在几秒钟内开始，而不是几分钟。

### ✨ 功能特性

- 🎯 **快速项目生成** - 通过单个命令从模板初始化项目
- 📦 **模板管理** - 轻松添加、删除和列出可用模板
- 🔄 **交互式模式** - 用户友好的提示，用于选择模板和项目名称
- 🎨 **可自定义模板** - 支持带有变量替换的自定义模板
- 🚀 **零配置** - 开箱即用，具有合理的默认值
- 📝 **模板变量** - 自动替换项目名称和其他变量
- 🛠️ **智能过滤** - 复制模板时自动排除 `node_modules`、`.git` 和构建产物

### 🛠️ 技术栈

- **编程语言**: TypeScript
- **CLI 框架**: Commander.js
- **交互式提示**: Inquirer.js
- **文件操作**: fs-extra
- **终端颜色**: Chalk
- **构建工具**: TypeScript 编译器

### 📦 安装

#### 全局安装

```bash
npm install -g bequickly
```

#### 使用 npx（无需安装）

```bash
npx bequickly@latest init template-name project-name
```

### 🚀 快速开始

```bash
# 交互式模式 - 将提示您选择模板并输入项目名称
bequickly init

# 仅指定模板名称
bequickly init vibe-sandbox

# 指定模板和项目名称
bequickly init vibe-sandbox my-awesome-project
```

### 📚 使用方法

#### 初始化项目

```bash
bequickly init [template-name] [project-name]
```

**示例：**

```bash
# 完全交互式
bequickly init

# 交互式选择模板，指定项目名称
bequickly init my-project

# 指定两者
bequickly init vibe-sandbox my-project
```

#### 添加模板

```bash
bequickly add <template-name> <template-path>
```

将目录中的新模板添加到您的模板集合中。

**示例：**

```bash
bequickly add react-app ./templates/react-template
```

#### 删除模板

```bash
bequickly delete <template-name>
# 或
bequickly del <template-name>
```

从您的模板集合中删除模板。

**示例：**

```bash
bequickly delete old-template
```

#### 生成项目（别名）

```bash
bequickly gen [template-name] [project-name]
# 或
bequickly generate [template-name] [project-name]
```

与 `init` 命令相同 - 生成项目的另一种方式。

#### 列出可用模板

```bash
bequickly list
# 或
bequickly ls
```

显示您集合中的所有可用模板。

#### 显示帮助

```bash
bequickly help
```

显示全面的帮助信息和使用示例。

### 📋 可用命令

| 命令 | 别名 | 描述 |
|------|------|------|
| `init` | - | 从模板初始化新项目 |
| `add` | - | 向集合中添加新模板 |
| `delete` | `del` | 从集合中删除模板 |
| `gen` | `generate` | 生成项目（init 的别名） |
| `list` | `ls` | 列出所有可用模板 |
| `help` | - | 显示帮助信息 |

### 🎨 模板系统

#### 模板位置

模板存储在两个可能的位置：

1. **项目模板**: `bequickly/templates/` 目录（包含在包中）
2. **用户模板**: `~/.bequickly/templates/` 目录（用户特定模板）

工具会自动检查这两个位置，并优先使用项目模板。

#### 模板变量

模板支持使用 `{{variableName}}` 语法进行变量替换：

- `{{projectName}}` - 正在创建的项目名称
- `{{templateName}}` - 正在使用的模板名称

**示例：**

在模板的 `package.json` 中：
```json
{
  "name": "{{projectName}}",
  "description": "从 {{templateName}} 模板生成的项目"
}
```

生成项目时，这些变量将自动替换。

#### 创建自定义模板

1. **创建模板目录**，包含您的项目文件
2. **使用 `add` 命令添加模板**：
   ```bash
   bequickly add my-template ./path/to/template
   ```
3. **或手动复制**您的模板到 `~/.bequickly/templates/my-template/`

#### 默认模板

包中包含 `vibe-sandbox` 作为默认模板 - 一个带有 TypeScript、Tailwind CSS 和现代工具链的 Next.js 项目。

### 💻 开发

#### 前置要求

- Node.js >= 14.0.0
- npm 或 yarn

#### 设置

```bash
# 克隆仓库
git clone <repository-url>
cd bequickly

# 安装依赖
npm install

# 构建项目
npm run build

# 开发模式运行
npm run dev init vibe-sandbox test-project
```

#### 项目结构

```
bequickly/
├── src/
│   ├── cli.ts              # CLI 入口点
│   ├── commands/           # 命令实现
│   │   ├── init.ts         # 初始化命令
│   │   ├── add.ts          # 添加模板命令
│   │   ├── delete.ts       # 删除模板命令
│   │   ├── gen.ts          # 生成命令（别名）
│   │   ├── help.ts         # 帮助命令
│   │   └── list.ts         # 列出模板命令
│   └── utils/              # 工具函数
│       ├── template.ts     # 模板工具
│       ├── paths.ts        # 路径工具
│       └── generator.ts    # 项目生成逻辑
├── templates/              # 模板目录
│   └── vibe-sandbox/       # 默认模板
├── dist/                   # 编译输出
├── package.json
├── tsconfig.json
└── README.md
```

### 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

### 📄 许可证

MIT 许可证 - 有关详细信息，请参阅 LICENSE 文件。

---

<div align="center">

Made with ❤️ by the bequickly team

</div>
