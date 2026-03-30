# AiTi Guru Products — Local setup

## Local installation
1. Make sure you have `node` (LTS recommended) and `npm` installed.
2. Copy the environment file:
   ```bash
   cp .env.default .env
   ```
3. (Optional) Update `VITE_API_URL` in `.env`. This is the base URL used by requests in `src/api/*`. By default it is set to `https://dummyjson.com`.

## Running the app
```bash
npm install
npm run dev
```
Open `http://localhost:5173`.

## Useful scripts
- `npm run build` — build
- `npm run lint` — lint
- `npm run format` — format
