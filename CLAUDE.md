# hello-ki-prosess

Testprosjekt for å øve på en KI-assistert utviklingsprosess. Appen er én skjerm som henter en hilsen fra backend og viser den.

## Stack
- Node 24, TypeScript (strict) på begge sider
- Frontend: Vite + React, i `frontend/`
- Backend: Fastify, i `backend/`
- Tester: Vitest på begge sider
- Frontend og backend har hver sin `package.json`

## Kommandoer
(Kjøres fra `frontend/` eller `backend/`. Opprettes når skjelettet er på plass.)
- `npm install`: installer avhengigheter
- `npm run dev`: start utviklingsserver
- `npm run build`: bygg
- `npm test`: kjør tester
- `npm run lint`: kjør lint

## Mappestruktur
- `frontend/`: React-appen
- `backend/`: API
- `docs/krav/`: brukstilfeller (kopi av GitHub Issues ved behov)
- `docs/design/`: wireframes

## Kodestandard
- TypeScript strict, ingen `any` uten begrunnelse i kommentar
- Små funksjoner, tydelige navn
- Hver ny funksjon skal ha en test

## Arbeidsmåte
- Ett GitHub Issue = én branch = én PR
- Lag en plan og vent på godkjenning før du endrer kode
- Hold deg til det issuet beskriver. Ikke refaktorer eller endre andre filer uten å spørre
- Legg ikke til nye biblioteker og bytt ikke rammeverk uten å spørre
- Kjør tester før du sier deg ferdig
- Aldri push til `main`, og aldri merge egne PR-er

## Ikke rør
- `.env`-filer og alt som ligner secrets
- `.github/` og `.claude/` uten at jeg ber om det

## Forklaringer
Forklar *hvorfor* du velger en løsning, ikke bare hva du gjør.