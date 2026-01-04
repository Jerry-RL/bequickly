import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { getTemplatesDir } from '../utils/paths';

export async function deleteCommand(templateName: string) {
  try {
    const templatesDir = getTemplatesDir();
    const templatePath = path.join(templatesDir, templateName);

    // 检查模板是否存在
    if (!(await fs.pathExists(templatePath))) {
      console.error(chalk.red(`Template "${templateName}" not found.`));
      process.exit(1);
    }

    // 确认删除
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Are you sure you want to delete template "${templateName}"?`,
        default: false,
      },
    ]);

    if (!confirm) {
      console.log(chalk.yellow('Operation cancelled.'));
      process.exit(0);
    }

    // 删除模板
    console.log(chalk.blue(`Deleting template "${templateName}"...`));
    await fs.remove(templatePath);

    console.log(chalk.green(`✓ Template "${templateName}" deleted successfully!`));
  } catch (error: any) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}

