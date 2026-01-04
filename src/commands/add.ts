import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { getTemplatesDir } from '../utils/paths';

export async function addCommand(templateName: string, templatePath: string) {
  try {
    const templatesDir = getTemplatesDir();
    const targetPath = path.join(templatesDir, templateName);

    // 检查源路径是否存在
    const sourcePath = path.resolve(templatePath);
    if (!(await fs.pathExists(sourcePath))) {
      console.error(chalk.red(`Template path "${templatePath}" does not exist.`));
      process.exit(1);
    }

    // 检查模板是否已存在
    if (await fs.pathExists(targetPath)) {
      console.error(chalk.red(`Template "${templateName}" already exists.`));
      console.log(chalk.yellow(`Use "bequickly delete ${templateName}" to remove it first.`));
      process.exit(1);
    }

    // 确保模板目录存在
    await fs.ensureDir(templatesDir);

    // 复制模板
    console.log(chalk.blue(`Adding template "${templateName}"...`));
    await fs.copy(sourcePath, targetPath, {
      filter: (src: string) => {
        // 排除 node_modules, .git, dist, build 等目录
        const relativePath = path.relative(sourcePath, src);
        return !relativePath.includes('node_modules') &&
               !relativePath.includes('.git') &&
               !relativePath.includes('dist') &&
               !relativePath.includes('build') &&
               !relativePath.includes('.next');
      },
    });

    console.log(chalk.green(`✓ Template "${templateName}" added successfully!`));
  } catch (error: any) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}

