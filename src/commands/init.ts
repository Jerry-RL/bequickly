import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { getTemplatesDir, getCommandName } from '../utils/paths';
import { getTemplatesList, getTemplatesWithVersions, getTemplateInfo } from '../utils/template';
import { copyTemplate, replaceTemplateVariables } from '../utils/generator';
import { installDependencies } from '../utils/installer';

interface InitOptions {
  templateName?: string;
  templateVersion?: string;
  projectName?: string;
  projectDescription?: string;
  author?: string;
  [key: string]: any;
}

export async function initCommand(templateName?: string, projectName?: string) {
  try {
    const cmdName = getCommandName();
    console.log(chalk.blue.bold(`\n🚀 Welcome to ${cmdName}!\n`));

    // 解析模板名称和版本（支持 template@version 格式）
    let parsedTemplateName = templateName;
    let parsedVersion: string | undefined;
    
    if (templateName && templateName.includes('@')) {
      const parts = templateName.split('@');
      parsedTemplateName = parts[0];
      parsedVersion = parts[1];
    }

    // 获取模板列表
    const templates = await getTemplatesList();
    
    // 如果没有提供模板名，让用户选择
    if (!parsedTemplateName) {
      if (templates.length === 0) {
        const cmdName = getCommandName();
        console.error(chalk.red(`No templates available. Use "${cmdName} add" to add a template.`));
        process.exit(1);
      }
      
      const templatesWithInfo = await getTemplatesWithVersions();
      const choices = templatesWithInfo.map(t => {
        const displayName = t.version 
          ? `${t.name}${chalk.gray(`@${t.version}`)}${t.description ? chalk.gray(` - ${t.description}`) : ''}`
          : t.name;
        return {
          name: displayName,
          value: t.name,
        };
      });

      const { selectedTemplate } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedTemplate',
          message: 'Select a template:',
          choices,
        },
      ]);
      parsedTemplateName = selectedTemplate;
    }

    // 确保模板名称存在
    if (!parsedTemplateName) {
      console.error(chalk.red('Template name is required.'));
      process.exit(1);
    }

    // 检查模板是否存在
    const templatesDir = getTemplatesDir();
    const templatePath = path.join(templatesDir, parsedTemplateName);
    
    if (!(await fs.pathExists(templatePath))) {
      console.error(chalk.red(`Template "${parsedTemplateName}" not found.`));
      console.log(chalk.yellow(`Available templates: ${templates.join(', ')}`));
      process.exit(1);
    }

    // 获取模板信息
    const templateInfo = await getTemplateInfo(parsedTemplateName);
    if (templateInfo?.version) {
      console.log(chalk.gray(`Template version: ${templateInfo.version}`));
    }

    // 多轮交互式输入
    const options: InitOptions = {
      templateName: parsedTemplateName,
      templateVersion: parsedVersion || templateInfo?.version,
    };

    // 如果没有提供项目名，让用户输入
    if (!projectName) {
      const { inputProjectName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'inputProjectName',
          message: 'Enter project name:',
          default: 'my-project',
          validate: (input: string) => {
            if (!input.trim()) {
              return 'Project name cannot be empty';
            }
            if (!/^[a-zA-Z0-9-_]+$/.test(input.trim())) {
              return 'Project name can only contain letters, numbers, hyphens, and underscores';
            }
            return true;
          },
        },
      ]);
      projectName = inputProjectName.trim();
    }

    // 确保项目名称存在
    if (!projectName) {
      console.error(chalk.red('Project name is required.'));
      process.exit(1);
    }

    options.projectName = projectName;

    // 询问项目描述
    const { projectDescription } = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectDescription',
        message: 'Enter project description:',
        default: `A project generated from ${parsedTemplateName} template`,
      },
    ]);
    options.projectDescription = projectDescription;

    // 询问作者信息
    const { author } = await inquirer.prompt([
      {
        type: 'input',
        name: 'author',
        message: 'Enter author name:',
        default: '',
      },
    ]);
    options.author = author;

    // 询问是否使用 TypeScript（如果模板支持）
    const hasTypeScript = await fs.pathExists(path.join(templatePath, 'tsconfig.json'));
    if (hasTypeScript) {
      const { useTypeScript } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'useTypeScript',
          message: 'Use TypeScript?',
          default: true,
        },
      ]);
      options.useTypeScript = useTypeScript;
    }

    // 检查项目目录是否已存在
    const projectPath = path.resolve(process.cwd(), projectName);
    if (await fs.pathExists(projectPath)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Directory "${projectName}" already exists. Overwrite?`,
          default: false,
        },
      ]);
      
      if (!overwrite) {
        console.log(chalk.yellow('Operation cancelled.'));
        process.exit(0);
      }
      
      await fs.remove(projectPath);
    }

    console.log(chalk.blue(`\n📦 Creating project "${projectName}" from template "${parsedTemplateName}"...`));

    // 复制模板
    await copyTemplate(templatePath, projectPath);

    // 替换模板变量
    await replaceTemplateVariables(projectPath, {
      projectName: options.projectName!,
      templateName: options.templateName!,
      templateVersion: options.templateVersion || '1.0.0',
      projectDescription: options.projectDescription || '',
      author: options.author || '',
      ...options,
    });

    console.log(chalk.green(`\n✓ Project "${projectName}" created successfully!`));
    
    // 自动安装依赖
    const installSuccess = await installDependencies(projectPath);
    
    console.log(chalk.blue(`\n📋 Next steps:`));
    console.log(chalk.white(`  cd ${projectName}`));
    if (!installSuccess) {
      console.log(chalk.white(`  npm install  # or yarn/pnpm install`));
    }
    console.log(chalk.white(`  npm run dev`));
    console.log(chalk.gray(`\nHappy coding! 🎉\n`));
  } catch (error: any) {
    console.error(chalk.red(`\n❌ Error: ${error.message}`));
    if (error.stack) {
      console.error(chalk.gray(error.stack));
    }
    process.exit(1);
  }
}
