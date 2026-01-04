import * as fs from 'fs-extra';
import * as path from 'path';
import { getTemplatesDir } from './paths';

export interface TemplateInfo {
  name: string;
  version?: string;
  description?: string;
  path: string;
}

export async function getTemplatesList(): Promise<string[]> {
  const templatesDir = getTemplatesDir();
  
  if (!(await fs.pathExists(templatesDir))) {
    return [];
  }

  const entries = await fs.readdir(templatesDir);
  const templates: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(templatesDir, entry);
    const stat = await fs.stat(entryPath);
    if (stat.isDirectory()) {
      templates.push(entry);
    }
  }

  return templates.sort();
}

export async function getTemplateInfo(templateName: string): Promise<TemplateInfo | null> {
  const templatesDir = getTemplatesDir();
  const templatePath = path.join(templatesDir, templateName);
  
  if (!(await fs.pathExists(templatePath))) {
    return null;
  }

  const templateInfo: TemplateInfo = {
    name: templateName,
    path: templatePath,
  };

  // 尝试读取模板的 package.json 或 template.json 获取版本信息
  const packageJsonPath = path.join(templatePath, 'package.json');
  const templateJsonPath = path.join(templatePath, 'template.json');
  
  if (await fs.pathExists(packageJsonPath)) {
    try {
      const packageJson = await fs.readJson(packageJsonPath);
      templateInfo.version = packageJson.version || '1.0.0';
      templateInfo.description = packageJson.description;
    } catch (e) {
      // 忽略解析错误
    }
  } else if (await fs.pathExists(templateJsonPath)) {
    try {
      const templateJson = await fs.readJson(templateJsonPath);
      templateInfo.version = templateJson.version || '1.0.0';
      templateInfo.description = templateJson.description;
    } catch (e) {
      // 忽略解析错误
    }
  }

  return templateInfo;
}

export async function getTemplatesWithVersions(): Promise<TemplateInfo[]> {
  const templates = await getTemplatesList();
  const templatesWithInfo: TemplateInfo[] = [];

  for (const templateName of templates) {
    const info = await getTemplateInfo(templateName);
    if (info) {
      templatesWithInfo.push(info);
    }
  }

  return templatesWithInfo;
}
