import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App.tsx';

const LOADING_TEXT = 'Laster …';
const ERROR_TEXT = 'Kunne ikke hente hilsenen. Prøv igjen senere.';

const fetchMock = vi.fn<typeof fetch>();

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

  it('viser bare feilmeldingen ved nettverksfeil', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));

    const { container } = render(<App />);

    expect(await screen.findByText(ERROR_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(LOADING_TEXT)).not.toBeInTheDocument();
    expect(container.textContent).toBe(ERROR_TEXT);
  });

  it.each([404, 500])('viser bare feilmeldingen når status er %i', async (status) => {
    fetchMock.mockResolvedValue(Response.json({ message: 'Skal ikke vises' }, { status }));

    const { container } = render(<App />);

    expect(await screen.findByText(ERROR_TEXT)).toBeInTheDocument();
    expect(screen.queryByText('Skal ikke vises')).not.toBeInTheDocument();
    expect(screen.queryByText(LOADING_TEXT)).not.toBeInTheDocument();
    expect(container.textContent).toBe(ERROR_TEXT);
  });

  it('viser lasteteksten mens kallet er uavklart', () => {
    // Et løfte som aldri avklares holder komponenten i lastetilstanden.
    fetchMock.mockReturnValue(new Promise<Response>(() => {}));

    render(<App />);

    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();
  });

  it('bytter lasteteksten med hilsenen når svaret kommer', async () => {
    fetchMock.mockResolvedValue(Response.json({ message: 'Hei fra testen' }));

    render(<App />);
    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();

    expect(await screen.findByText('Hei fra testen')).toBeInTheDocument();
    expect(screen.queryByText(LOADING_TEXT)).not.toBeInTheDocument();
  });

  it('fjerner lasteteksten når kallet feiler', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));

    render(<App />);
    expect(screen.getByText(LOADING_TEXT)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(LOADING_TEXT)).not.toBeInTheDocument();
    });
  });
});
