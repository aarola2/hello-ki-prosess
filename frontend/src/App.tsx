import { useEffect, useState } from 'react';

type HelloResponse = { message: string };

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
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    fetchGreeting()
      .then(setGreeting)
      .catch(() => {
        // Feilmeldingen til brukeren kommer i #11. Her holder det at appen ikke krasjer.
      });
  }, []);

  if (greeting === null) {
    return null;
  }

  return <p>{greeting}</p>;
}

export default App;
