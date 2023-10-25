# Next Holiday

## Project structure

```text
./
├── data/
├── frontend/
├── functions/
└── shared/
```

| Directory    | Description                                                                                                                                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data/`      | Generated holiday data (JSON) and the generators that build this data. Uses [Deno](https://deno.com).                                                                                                                |
| `frontend/`  | Website frontend. Uses TypeScript, [Lit](https://lit.dev), [Shoelace web components](https://shoelace.style), and [Vite](https://vitejs.dev). Hosted on [Cloudflare Pages](https://developers.cloudflare.com/pages). |
| `functions/` | Website backend. An API of [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions). Uses TypeScript.                                                                                |
| `shared/`    | Constants, utilities, and types used across the other directories. Uses TypeScript.                                                                                                                                  |

## Local development

### Install dependencies

In the root directory run:

```sh
npm install
```

### Run website (frontend and backend)

In the root directory run:

```sh
npx wrangler pages dev -- npm run dev
```

For more information about Cloudflare Pages local development see [the docs](https://developers.cloudflare.com/pages/platform/functions/local-development).
