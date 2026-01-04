# Contributing to bequickly

Thank you for your interest in contributing to bequickly! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and considerate in all interactions.

### Expected Behavior

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

### Prerequisites

- Node.js >= 14.0.0
- npm or yarn
- Git

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/bequickly.git
   cd bequickly
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/bequickly.git
   ```

## Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Project

```bash
npm run build
```

### 3. Link for Local Testing

```bash
npm run link
```

Now you can test your changes:

```bash
bequickly init vibe-sandbox test-project
```

### 4. Development Mode

For faster iteration, use development mode:

```bash
npm run dev init vibe-sandbox test-project
```

## Making Changes

### Workflow

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**:
   - Write clean, readable code
   - Follow the coding standards
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**:
   ```bash
   npm run build
   npm run link
   # Test manually
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

5. **Keep your branch updated**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

6. **Push your changes**:
   ```bash
   git push origin feature/your-feature-name
   ```

## Submitting Changes

### Pull Request Process

1. **Create a Pull Request** on GitHub
   - Use a clear, descriptive title
   - Describe what changes you made and why
   - Reference any related issues

2. **PR Template**:
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Refactoring

   ## Testing
   How to test your changes

   ## Checklist
   - [ ] Code follows the style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   - [ ] No new warnings
   ```

3. **Respond to feedback**:
   - Be open to suggestions
   - Make requested changes
   - Keep discussions constructive

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add type annotations where helpful

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings (unless escaping)
- Add semicolons at the end of statements
- Use `async/await` instead of promises where possible

### Example

```typescript
// Good
export async function processTemplate(templatePath: string): Promise<void> {
  const files = await getAllFiles(templatePath);
  for (const file of files) {
    await processFile(file);
  }
}

// Avoid
export function processTemplate(templatePath: string) {
  return getAllFiles(templatePath).then(files => {
    files.forEach(file => {
      processFile(file);
    });
  });
}
```

### File Organization

- Keep files focused on a single responsibility
- Group related functions together
- Export only what's needed
- Use descriptive file names

### Error Handling

- Always handle errors appropriately
- Provide meaningful error messages
- Use try-catch for async operations
- Log errors for debugging

```typescript
try {
  await copyTemplate(sourcePath, targetPath);
} catch (error: any) {
  console.error(chalk.red(`❌ Error: ${error.message}`));
  if (error.stack) {
    console.error(chalk.gray(error.stack));
  }
  process.exit(1);
}
```

## Testing

### Manual Testing

Before submitting a PR, please test:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Link and test commands**:
   ```bash
   npm run link
   bequickly init vibe-sandbox test-project
   bequickly list
   bequickly add test-template ./path/to/template
   bequickly delete test-template
   ```

3. **Test edge cases**:
   - Missing templates
   - Invalid project names
   - Existing directories
   - Missing dependencies

### Test Checklist

- [ ] All commands work as expected
- [ ] Error messages are clear
- [ ] Interactive prompts work correctly
- [ ] Template copying works
- [ ] Variable replacement works
- [ ] Dependency installation works

## Documentation

### Code Comments

- Add comments for complex logic
- Use JSDoc for exported functions
- Keep comments up-to-date with code

```typescript
/**
 * Detects the package manager used in a project
 * @param projectPath - Path to the project directory
 * @returns The detected package manager (npm, yarn, or pnpm)
 */
export async function detectPackageManager(
  projectPath: string
): Promise<PackageManager> {
  // Implementation
}
```

### Documentation Updates

When adding new features:

1. Update `README.md` or `README.zh-CN.md`
2. Update `USAGE.md` if needed
3. Update `LEARNING.md` if it's a significant feature
4. Add examples in documentation

## Areas for Contribution

We welcome contributions in these areas:

### Features

- [ ] Support for more template sources (GitHub, npm packages)
- [ ] Template versioning improvements
- [ ] More interactive prompts
- [ ] Template validation
- [ ] Better error recovery

### Improvements

- [ ] Performance optimizations
- [ ] Better error messages
- [ ] More comprehensive tests
- [ ] Documentation improvements
- [ ] Accessibility improvements

### Bug Fixes

- [ ] Report bugs via GitHub Issues
- [ ] Fix existing issues
- [ ] Improve error handling

## Questions?

If you have questions:

1. Check existing documentation
2. Search existing issues
3. Create a new issue with the `question` label
4. Ask in discussions

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to bequickly! 🎉

