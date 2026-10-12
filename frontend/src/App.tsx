import { useEffect, useState } from 'react';

type HelloResponse = { message: string };

type GreetingState =
  | { status: 'loading' }
  | { status: 'loaded'; greeting: string }
  | { status: 'failed' };

async function fetchGreeting(): Promise<string> {
  const response = await fetch('/api/hello');
  if (!response.ok) {
    throw new Error('Svaret fra /api/hello hadde ikke status 2xx');
  }
  // Innholdet i svaret valideres ikke, så formen er en antakelse.
  const body = (await response.json()) as HelloResponse;
  return body.message;
}

function App() {
  const [state, setState] = useState<GreetingState>({ status: 'loading' });

  useEffect(() => {
    fetchGreeting()
      .then((greeting) => setState({ status: 'loaded', greeting }))
      .catch(() => setState({ status: 'failed' }));
  }, []);

  if (state.status === 'loading') {
    return <p>Laster …</p>;
  }

  if (state.status === 'failed') {
    // Feilmeldingen til brukeren kommer i #11. Inntil da vises ingenting.
    return null;
  }

  return <p>{state.greeting}</p>;
}

export default App;
