import { join } from 'path';
import { isDocker } from '../../../utils/is.docker';

type Platform = 'win32' | 'linux' | 'darwin';

export const resolveFilePath = (filePath: string) => {
  const currentPath = process.cwd();
  let platform = process.platform as Platform;

  if (platform === 'win32') {
    return join(currentPath, '..', filePath); // Windows-specific path
  }

  if (isDocker) {
    return join(currentPath, filePath); // Docker-specific path
  }

  if (platform === 'linux' || platform === 'darwin') {
    return join(currentPath, '..', filePath); // POSIX-specific path for Linux and Mac
  }

  return join(currentPath, filePath);
};
