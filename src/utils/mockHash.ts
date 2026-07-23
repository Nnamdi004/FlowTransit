/**
 * Deliberately NOT cryptographically secure — this project has no real
 * backend, so this just keeps plaintext passwords out of the mock "database"
 * blob. Never use this pattern outside of a demo/mock context.
 */
export function mockHash(raw: string): string {
  return btoa(unescape(encodeURIComponent(raw)))
    .split('')
    .reverse()
    .join('');
}
