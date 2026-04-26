// Build a sharing URL for play.rust-lang.org with the given code preloaded.
// Documented sharing format — not the rate-limited execution API.
export function playgroundUrl(code: string): string {
  const params = new URLSearchParams({
    version: "stable",
    mode: "debug",
    edition: "2021",
    code,
  });
  return `https://play.rust-lang.org/?${params.toString()}`;
}
