#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { deleteCommand } from './commands/delete';
import { genCommand } from './commands/gen';
import { helpCommand } from './commands/help';
import { listCommand } from './commands/list';
import * as fs from 'fs';
import * as path from 'path';

const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
);

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

program
  .command('add')
  .description('Add a new template')
  .argument('<template-name>', 'Name of the template')
  .argument('<template-path>', 'Path to the template directory')
  .action(async (templateName: string, templatePath: string) => {
    await addCommand(templateName, templatePath);
  });

program
  .command('delete')
  .alias('del')
  .description('Delete a template')
  .argument('<template-name>', 'Name of the template to delete')
  .action(async (templateName: string) => {
    await deleteCommand(templateName);
  });

program
  .command('gen')
  .alias('generate')
  .description('Generate a project from a template (alias for init)')
  .argument('[template-name]', 'Name of the template to use')
  .argument('[project-name]', 'Name of the project to create')
  .action(async (templateName?: string, projectName?: string) => {
    await genCommand(templateName, projectName);
  });

program
  .command('list')
  .alias('ls')
  .description('List all available templates')
  .action(async () => {
    await listCommand();
  });

program
  .command('help')
  .description('Show help information')
  .action(() => {
    helpCommand();
  });

program.parse();

