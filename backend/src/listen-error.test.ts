import { describe, expect, it } from 'vitest';
import { describeListenError } from './listen-error.js';

describe('describeListenError', () => {
  it('forteller at porten er opptatt ved EADDRINUSE', () => {
    const error = Object.assign(new Error('listen EADDRINUSE'), { code: 'EADDRINUSE' });

    expect(describeListenError(error, 3000)).toBe(
      'Port 3000 er opptatt. Stopp prosessen som bruker porten og prøv igjen.',
    );
  });

  it('gir en generell melding med feilteksten ved andre feil', () => {
    const error = new Error('noe gikk galt');

    expect(describeListenError(error, 3000)).toBe('Serveren kunne ikke starte: noe gikk galt');
  });
});
