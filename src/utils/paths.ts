import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs-extra';

/**
 * 获取当前使用的命令名称
 * 支持 bequickly/bq 和 bequicklyproject/bqp
 */
export function getCommandName(): string {
  const commandName = process.argv[1] 
    ? path.basename(process.argv[1], path.extname(process.argv[1])) 
    : 'bequickly';
  
  // 将 bq 映射为 bequickly，bqp 映射为 bequicklyproject
  if (commandName === 'bq' || commandName === 'bequickly') {
    return 'bequickly';
  } else if (commandName === 'bqp' || commandName === 'bequicklyproject') {
    return 'bequicklyproject';
  }
  
  return commandName;
}

export function getTemplatesDir(): string {
  // 优先使用项目内的 templates 目录
  const projectTemplatesDir = path.join(__dirname, '../../templates');
  if (fs.existsSync(projectTemplatesDir)) {
    return projectTemplatesDir;
  }
  
  // 否则使用用户目录下的 .bequickly/templates
  const homeDir = os.homedir();
  return path.join(homeDir, '.bequickly', 'templates');
}

