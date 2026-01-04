import { initCommand } from './init';

export async function genCommand(templateName?: string, projectName?: string) {
  // gen 命令是 init 的别名
  await initCommand(templateName, projectName);
}

