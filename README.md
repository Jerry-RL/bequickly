# bequickly

<div align="center">

**🚀 A powerful CLI tool for quickly generating projects from customizable templates**

[中文文档](./README.zh-CN.md) | [Learning Guide](./LEARNING.md) | [Contributing](./CONTRIBUTING.md)

</div>

---

## 📖 Introduction

**bequickly** is a command-line tool designed to accelerate project initialization by generating projects from pre-configured templates. It provides a simple yet powerful way to scaffold new projects, manage templates, and streamline your development workflow.

Whether you're starting a new Next.js project, React application, or any other type of project, bequickly helps you get started in seconds instead of minutes.

## ✨ Features

- 🎯 **Quick Project Generation** - Initialize projects from templates with a single command
- 📦 **Template Management** - Easily add, delete, and list available templates
- 🔄 **Interactive Mode** - User-friendly prompts for template and project name selection
- 🎨 **Customizable Templates** - Support for custom templates with variable substitution
- 🚀 **Zero Configuration** - Works out of the box with sensible defaults
- 📝 **Template Variables** - Automatic replacement of project names and other variables
- 🛠️ **Smart Filtering** - Automatically excludes `node_modules`, `.git`, and build artifacts when copying templates
- 📦 **Auto Install** - Automatically installs dependencies after project generation

## 🛠️ Tech Stack

- **Language**: TypeScript
- **CLI Framework**: Commander.js
- **Interactive Prompts**: Inquirer.js
- **File Operations**: fs-extra
- **Terminal Colors**: Chalk
- **Build Tool**: TypeScript Compiler

## 📦 Installation

### Global Installation

```bash
npm install -g bequickly
```

### Using with npx (No Installation Required)

```bash
npx bequickly@latest init template-name project-name
```

## 🚀 Quick Start

```bash
# Interactive mode - you'll be prompted to select template and enter project name
bequickly init

# Specify template name only
bequickly init vibe-sandbox

# Specify both template and project name
bequickly init vibe-sandbox my-awesome-project
```

## 📚 Usage

### Initialize a Project

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

### Add a Template

```bash
bequickly add <template-name> <template-path>
```

Adds a new template from a directory to your template collection.

**Example:**

```bash
bequickly add react-app ./templates/react-template
```

### Delete a Template

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

### Generate a Project (Alias)

```bash
bequickly gen [template-name] [project-name]
# or
bequickly generate [template-name] [project-name]
```

Same as `init` command - an alternative way to generate projects.

### List Available Templates

```bash
bequickly list
# or
bequickly ls
```

Shows all available templates in your collection.

### Show Help

```bash
bequickly help
```

Displays comprehensive help information and usage examples.

## 📋 Available Commands

| Command | Alias | Description |
|---------|-------|-------------|
| `init` | - | Initialize a new project from a template |
| `add` | - | Add a new template to the collection |
| `delete` | `del` | Delete a template from the collection |
| `gen` | `generate` | Generate a project (alias for init) |
| `list` | `ls` | List all available templates |
| `help` | - | Show help information |

## 🎨 Template System

### Template Locations

Templates are stored in two possible locations:

1. **Project Templates**: `bequickly/templates/` directory (included with the package)
2. **User Templates**: `~/.bequickly/templates/` directory (user-specific templates)

The tool automatically checks both locations and prioritizes project templates.

### Template Variables

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

### Creating Custom Templates

1. **Create a template directory** with your project files
2. **Add the template** using the `add` command:
   ```bash
   bequickly add my-template ./path/to/template
   ```
3. **Or manually copy** your template to `~/.bequickly/templates/my-template/`

### Default Template

The package includes `vibe-sandbox` as the default template - a Next.js project with TypeScript, Tailwind CSS, and modern tooling.

## 💻 Development

### Prerequisites

- Node.js >= 14.0.0
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd bequickly

# Install dependencies
npm install

# Build the project
npm run build
```

### Local Testing

**Method 1: Using npm link (Recommended)**

```bash
# Build and create global link
npm run link

# Now you can use bequickly command from anywhere
cd /path/to/anywhere
bequickly init vibe-sandbox test-project
bequickly list

# Unlink when done
npm run unlink
```

**Method 2: Development Mode**

```bash
# Run TypeScript source directly (no build required)
npm run dev init vibe-sandbox test-project
```

**Note:** After using `npm link`, you need to run `npm run build` again after code changes to see updates.

### Project Structure

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
│       ├── generator.ts    # Project generation logic
│       └── installer.ts    # Dependency installer
├── templates/              # Template directory
│   └── vibe-sandbox/       # Default template
├── dist/                   # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📚 Learning Resources

If you're new to CLI development or want to understand how bequickly works, check out our [Learning Guide](./LEARNING.md) for beginners.

## 📄 License

MIT License - see LICENSE file for details.

---

<div align="center">

Made with ❤️ by the bequickly team

</div>
