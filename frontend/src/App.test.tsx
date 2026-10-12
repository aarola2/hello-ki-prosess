import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App.tsx';

describe('App', () => {
  it('viser plassholder-overskriften', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'hello-ki-prosess' })).toBeInTheDocument();
  });
});
