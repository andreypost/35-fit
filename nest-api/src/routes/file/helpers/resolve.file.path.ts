import { join } from 'path';
import { isDocker } from '../../../utils/is.docker';

export const resolveFilePath = (filePath: string) => {
  const currentPath = process.cwd();

  if (process.platform === 'win32') {
    return join(currentPath, '..', filePath); // Windows-specific path
  }

  if (isDocker) {
    return join(currentPath, filePath); // Docker-specific path
  }

  if (process.platform === 'linux' || process.platform === 'darwin') {
    return join(currentPath, '..', filePath); // POSIX-specific path for Linux and Mac
  }

  return join(currentPath, filePath);
};
