# Hello World-app (epic)

## Formål
Øve på en KI-assistert utviklingsprosess fra brukstilfeller til testet kode. Appen er bevisst liten.

## Beskrivelse
En webapp med én skjerm. Når brukeren åpner siden, henter frontend en hilsen fra backend og viser den. Hvis backend ikke svarer, vises en tydelig feilmelding.

## Ønsket funksjonalitet
- Backend med endepunktet `GET /api/hello` som svarer `{ "message": "Hello World" }`
- Frontend som viser hilsenen
- Lastetilstand mens frontend venter på svar
- Feilmelding når backend er utilgjengelig
- Automatiske tester på begge sider
- Lint på begge sider
- Tester kjøres automatisk på GitHub (CI) ved hver pull request

## Stack
Se `CLAUDE.md`.

## Utenfor scope
Database, innlogging, Docker, publisering til nett.