import * as fs from 'fs-extra';
import * as path from 'path';

export async function copyTemplate(sourcePath: string, targetPath: string): Promise<void> {
  await fs.ensureDir(targetPath);
  
  // 复制文件，排除一些不需要的目录
  await fs.copy(sourcePath, targetPath, {
    filter: (src: string) => {
      const relativePath = path.relative(sourcePath, src);
      const basename = path.basename(src);
      
      // 排除的目录和文件
      const excludePatterns = [
        'node_modules',
        '.git',
        'dist',
        'build',
        '.next',
        '.cache',
        'coverage',
        '.DS_Store',
        'package-lock.json',
        'yarn.lock',
        'pnpm-lock.yaml',
      ];
      
      return !excludePatterns.some(pattern => 
        relativePath.includes(pattern) || basename === pattern
      );
    },
  });
}

export async function replaceTemplateVariables(
  projectPath: string,
  variables: Record<string, any>
): Promise<void> {
  const files = await getAllFiles(projectPath);
  
  for (const file of files) {
    try {
      const content = await fs.readFile(file, 'utf-8');
      let newContent = content;
      
      // 替换变量 {{variableName}}
      for (const [key, value] of Object.entries(variables)) {
        if (value !== undefined && value !== null) {
          const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
          newContent = newContent.replace(regex, String(value));
        }
      }
      
      // 替换 package.json 中的字段
      if (path.basename(file) === 'package.json') {
        try {
          const packageJson = JSON.parse(newContent);
          if (variables.projectName) {
            packageJson.name = variables.projectName.toLowerCase().replace(/\s+/g, '-');
          }
          if (variables.projectDescription) {
            packageJson.description = variables.projectDescription;
          }
          if (variables.author) {
            packageJson.author = variables.author;
          }
          if (variables.version) {
            packageJson.version = variables.version;
          }
          newContent = JSON.stringify(packageJson, null, 2);
        } catch (e) {
          // 如果解析失败，跳过
        }
      }
      
      if (newContent !== content) {
        await fs.writeFile(file, newContent, 'utf-8');
      }
      
      // 如果文件名包含变量，也需要重命名
      const fileName = path.basename(file);
      if (fileName.includes('{{')) {
        let newFileName = fileName;
        for (const [key, value] of Object.entries(variables)) {
          if (value !== undefined && value !== null) {
            const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
            newFileName = newFileName.replace(regex, String(value));
          }
        }
        if (newFileName !== fileName) {
          const newFilePath = path.join(path.dirname(file), newFileName);
          await fs.move(file, newFilePath);
        }
      }
    } catch (error) {
      // 跳过二进制文件或无法读取的文件
      continue;
    }
  }
}

async function getAllFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  
  try {
    const entries = await fs.readdir(dir);
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      try {
        const stat = await fs.stat(fullPath);
        
        if (stat.isDirectory()) {
          const subFiles = await getAllFiles(fullPath);
          files.push(...subFiles);
        } else {
          files.push(fullPath);
        }
      } catch (e) {
        // 跳过无法访问的文件
        continue;
      }
    }
  } catch (e) {
    // 跳过无法访问的目录
  }
  
  return files;
}
