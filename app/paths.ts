const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function assetPath(path: string) {
  if (!path.startsWith('/')) return path;
  return `${publicBasePath}${path}`;
}

export const homePath = publicBasePath ? `${publicBasePath}/` : '/';
