import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs-extra';

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

