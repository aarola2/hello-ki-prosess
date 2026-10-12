import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Uten Vitest-globaler rydder ikke Testing Library opp i DOM-en selv mellom testene.
afterEach(cleanup);
