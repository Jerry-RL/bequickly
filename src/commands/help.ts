import chalk from 'chalk';
import { getCommandName } from '../utils/paths';

export function helpCommand() {
  const cmdName = getCommandName();
  console.log(chalk.bold(`\n${cmdName} - A CLI tool for quickly generating projects from templates\n`));
  console.log(chalk.bold('Commands:\n'));
  console.log(chalk.cyan('  init [template-name] [project-name]'));
  console.log(chalk.gray('    Initialize a new project from a template\n'));
  
  console.log(chalk.cyan('  add <template-name> <template-path>'));
  console.log(chalk.gray('    Add a new template from a directory\n'));
  
  console.log(chalk.cyan('  delete <template-name>'));
  console.log(chalk.gray('    Delete a template\n'));
  
  console.log(chalk.cyan('  gen [template-name] [project-name]'));
  console.log(chalk.gray('    Generate a project from a template (alias for init)\n'));
  
  console.log(chalk.cyan('  list'));
  console.log(chalk.gray('    List all available templates\n'));
  
  console.log(chalk.cyan('  help'));
  console.log(chalk.gray('    Show this help message\n'));
  
  console.log(chalk.bold('Examples:\n'));
  console.log(chalk.white(`  ${cmdName} init vibe-sandbox my-project`));
  console.log(chalk.white(`  ${cmdName} init`));
  console.log(chalk.white(`  ${cmdName} add my-template ./path/to/template`));
  console.log(chalk.white(`  ${cmdName} delete my-template`));
  console.log(chalk.white(`  ${cmdName} list\n`));
}

