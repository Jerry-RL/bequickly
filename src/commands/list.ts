import chalk from 'chalk';
import { getTemplatesWithVersions } from '../utils/template';
import { getCommandName } from '../utils/paths';

export async function listCommand() {
  try {
    const templates = await getTemplatesWithVersions();
    
    if (templates.length === 0) {
      const cmdName = getCommandName();
      console.log(chalk.yellow('No templates available.'));
      console.log(chalk.gray(`Use "${cmdName} add <template-name> <template-path>" to add a template.`));
      return;
    }

    console.log(chalk.bold('\n📦 Available templates:\n'));
    templates.forEach((template, index) => {
      const versionInfo = template.version ? chalk.gray(`@${template.version}`) : '';
      const descriptionInfo = template.description ? chalk.gray(` - ${template.description}`) : '';
      console.log(chalk.cyan(`  ${index + 1}. ${template.name}${versionInfo}${descriptionInfo}`));
    });
    console.log('');
  } catch (error: any) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}
