import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App.tsx';

const fetchMock = vi.fn<typeof fetch>();

// Lar løftekjeden etter fetch gjøre seg ferdig, slik at testen ser sluttilstanden.
async function settle(): Promise<void> {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    fetchMock.mockReset();
  });

  it('sender ett kall til /api/hello når siden åpnes', async () => {
    fetchMock.mockResolvedValue(Response.json({ message: 'Hei fra testen' }));

    render(<App />);
    await screen.findByText('Hei fra testen');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('/api/hello');
  });

  it('viser message fra svaret', async () => {
    fetchMock.mockResolvedValue(Response.json({ message: 'Hei fra testen' }));

    render(<App />);

    expect(await screen.findByText('Hei fra testen')).toBeInTheDocument();
  });

  it('viser ingenting og krasjer ikke når kallet feiler', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));

    const { container } = render(<App />);
    await settle();

    expect(container).toBeEmptyDOMElement();
  });

  it('viser ikke svaret som hilsen når status er utenfor 2xx', async () => {
    fetchMock.mockResolvedValue(
      Response.json({ message: 'Route GET:/api/hello not found' }, { status: 404 }),
    );

    const { container } = render(<App />);
    await settle();

    expect(container).toBeEmptyDOMElement();
  });
});
