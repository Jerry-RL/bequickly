import * as fs from 'fs-extra';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';

export type PackageManager = 'npm' | 'yarn' | 'pnpm';

/**
 * 检测项目使用的包管理器
 */
export async function detectPackageManager(projectPath: string): Promise<PackageManager> {
  // 优先检查 package.json 中的 packageManager 字段（最明确的指示）
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (await fs.pathExists(packageJsonPath)) {
    try {
      const packageJson = await fs.readJson(packageJsonPath);
      if (packageJson.packageManager) {
        if (packageJson.packageManager.startsWith('pnpm@')) {
          return 'pnpm';
        }
        if (packageJson.packageManager.startsWith('yarn@')) {
          return 'yarn';
        }
        if (packageJson.packageManager.startsWith('npm@')) {
          return 'npm';
        }
      }
    } catch (e) {
      // 忽略解析错误
    }
  }

  // 检查 lock 文件（如果存在）
  if (await fs.pathExists(path.join(projectPath, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  if (await fs.pathExists(path.join(projectPath, 'yarn.lock'))) {
    return 'yarn';
  }
  if (await fs.pathExists(path.join(projectPath, 'package-lock.json'))) {
    return 'npm';
  }

  // 默认使用 npm
  return 'npm';
}

/**
 * 检查包管理器是否已安装
 */
export function isPackageManagerInstalled(packageManager: PackageManager): boolean {
  try {
    execSync(`${packageManager} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * 安装项目依赖
 */
export async function installDependencies(projectPath: string): Promise<boolean> {
  // 检查是否存在 package.json
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (!(await fs.pathExists(packageJsonPath))) {
    console.log(chalk.yellow('⚠ No package.json found, skipping dependency installation.'));
    return false;
  }

  // 检测包管理器
  const packageManager = await detectPackageManager(projectPath);

  // 检查包管理器是否已安装
  if (!isPackageManagerInstalled(packageManager)) {
    console.log(chalk.yellow(`⚠ ${packageManager} is not installed. Please install dependencies manually.`));
    return false;
  }

  console.log(chalk.blue(`\n📦 Installing dependencies with ${packageManager}...`));

  try {
    const installCommand = packageManager === 'yarn' ? 'yarn' : `${packageManager} install`;
    execSync(installCommand, {
      cwd: projectPath,
      stdio: 'inherit',
    });
    console.log(chalk.green(`✓ Dependencies installed successfully!`));
    return true;
  } catch (error: any) {
    console.error(chalk.red(`\n❌ Failed to install dependencies: ${error.message}`));
    console.log(chalk.yellow(`\nYou can install dependencies manually by running:`));
    console.log(chalk.white(`  cd ${path.basename(projectPath)}`));
    console.log(chalk.white(`  ${packageManager} install`));
    return false;
  }
}

