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

## Development

### Requirements

Install `netlify-cli`:

```text
npm install -g netlify-cli
```

Link local project to Netlify site:

```text
npx netlify link
```

### Run development server

From within `app/`, run:

```text
npx netlify dev
```

The dev server is available at `http://localhost:8888`.

### Create local build and serve built files

From the root of the project, run:

```text
npx netlify build
```

to create a local build, or run:

```text
npx netlify serve
```

to create a local build and serve these built files at `http://localhost:8888`.
