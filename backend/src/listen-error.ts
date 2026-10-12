export function describeListenError(error: unknown, port: number): string {
  const code = error instanceof Error && 'code' in error ? error.code : undefined;
  if (code === 'EADDRINUSE') {
    return `Port ${port} er opptatt. Stopp prosessen som bruker porten og prøv igjen.`;
  }

  const reason = error instanceof Error ? error.message : String(error);
  return `Serveren kunne ikke starte: ${reason}`;
}
