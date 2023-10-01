# Next Holiday

## Project structure

```text
./
├── app/
│   ├── backend/          # Netlify edge functions (Deno)
│   └── frontend/         # Netlify site (Node.js, Vite, Lit, TypeScript)
├── data/
│   ├── generated/        # Generated holiday JSON data
│   ├── generators/       # Holiday JSON data generators (Deno)
│   └── scripts/          # Scripts that run the data generators (Deno)
├── netlify.toml          # Netlify config file
└── README.md
```
