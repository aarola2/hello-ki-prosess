# Hilsen-siden

Design for den ene skjermen i appen. Siden henter en hilsen fra `GET /api/hello` og viser den.

Klikkbar prototype: [hilsen-side.html](hilsen-side.html). Åpne filen lokalt i en nettleser. Ved avvik mellom prototypen og denne filen gjelder denne filen.

## Tilstander

Siden har én tekstlinje øverst til venstre, og ingen andre elementer. Den er alltid i nøyaktig én av tre tilstander, og bare teksten for den tilstanden vises. Tekstene vises aldri sammen.

| Tilstand    | Når                                                 | Tekst brukeren ser                              |
| ----------- | --------------------------------------------------- | ----------------------------------------------- |
| laster      | Fra siden åpnes til kallet er avklart               | `Laster …`                                      |
| hilsen vist | Svaret har kommet med status 2xx                    | Verdien av `message` i svaret                   |
| feilmelding | Nettverksfeil, eller svar med status utenfor 2xx    | `Kunne ikke hente hilsenen. Prøv igjen senere.` |

`Laster …` skrives med ett mellomrom og ellipsetegnet `…`, ikke tre punktum.

### Laster

```
+--------------------------------------------------+
| Laster …                                         |
|                                                  |
|                                                  |
|                                                  |
+--------------------------------------------------+
```

### Hilsen vist

```
+--------------------------------------------------+
| Hello World                                      |
|                                                  |
|                                                  |
|                                                  |
+--------------------------------------------------+
```

Teksten er verdien av `message`, vist uendret. Backend svarer i dag med `Hello World`.

### Feilmelding

```
+--------------------------------------------------+
| Kunne ikke hente hilsenen. Prøv igjen senere.    |
|                                                  |
|                                                  |
|                                                  |
+--------------------------------------------------+
```
