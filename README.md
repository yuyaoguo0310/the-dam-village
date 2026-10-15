# The Dam Village

Made by Yuyao · UC Santa Barbara ENVS 156

Interactive classroom stakeholder discussion about water, hydropower and alternatives, inspired by Schmitt & Rosa (2024) and Gleick (2003).

## Open the app

- Students: https://yuyaoguo0310.github.io/the-dam-village/
- Host: https://yuyaoguo0310.github.io/the-dam-village/?view=host
- Group guides: https://yuyaoguo0310.github.io/the-dam-village/?view=guide

Host creates a classroom, saves their recovery key privately, and shares **Join QR** or the six-character room code. Four student stakeholder groups are balanced automatically. Guides join separately and do not vote. The host controls both votes, discussion, debate, anonymous change comparison and illustrative future animations.

This GitHub Pages frontend connects to a persistent HTTPS backend for multi-device synchronization. The public browser address uses github.io. The backend is deployed to Cloudflare Workers at https://the-dam-village.yuyaoguo.workers.dev and uses a D1 database in the project owner’s Cloudflare account. Existing rooms in the previous backend are not automatically copied to this database.

## Original complete source

Download and extract **The-Dam-Village-Source.zip** in this repository. It contains the original frontend, backend, local server, Cloudflare Worker, D1 migration, tests, QR generator, build scripts and deployment documentation. No classroom data, host recovery keys, guide keys, or publishing credentials are included.

With Node 18+ in the extracted project, `node server.mjs` runs a local backup. `node --test tests/*.test.mjs` verifies the classroom logic. `node build.mjs` builds the dependency-free Worker; `node build-pages.mjs` produces the GitHub Pages frontend. Read README.md and GITHUB-PAGES.md in the source archive for rejoin and hosting details.

The current folder contains the complete editable project. The frontend has been split without changing its styles or application logic:

- `index.html`: page structure and backend-origin setting.
- `styles.css`: all original styles and responsive/animation rules.
- `qrcode.js`: original MIT-licensed QR generator.
- `app.js`: all classroom screens, interaction, synchronization, voting and map stories.
- `engine.mjs`: classroom rules, roles, allocation and vote statistics.
- `api.mjs`: authenticated API and D1 storage.
- `server.mjs`: local server and persistent local storage.
- `build.mjs` / `build-pages.mjs`: Worker and GitHub Pages builds.
- `tests/`: original classroom, conditional-vote, role and story checks.
- `drizzle/`, `wrangler.toml`, `hosting-config/hosting.json`: original database and hosting configuration.

With Node 18+ installed, run these commands from this folder (no dependency installation required):

```sh
node server.mjs
node --test tests/*.test.mjs
node build.mjs
node build-pages.mjs
```

Local entry: `http://localhost:8787/`; host: `/admin`; guides: `/guide`. The local server uses its own API and saves rooms in `.local/rooms.json`. That directory is private and ignored by Git.

The root frontend connects to the Cloudflare Workers backend for GitHub Pages. Upload `index.html`, `styles.css`, `qrcode.js` and `app.js` together. Alternatively, `node build-pages.mjs` copies them into `docs/`; set `DAM_API_ORIGIN` to use a different HTTPS backend, and configure its exact frontend-origin allowlist. `node build.mjs` embeds the split frontend into the self-contained Worker in `worker/index.js` and `dist/server/index.js`. These build outputs are generated and ignored by Git.

Both voting rounds publicly show student choices and conditional reasons on the host map. The final comparison and CSV contain anonymous aggregate results. Students see possible role pros and cons during the first vote; guides retain their facilitation arguments. Phase changes remain host-controlled, including when a timer expires.

## Teaching context

All village roles and future impacts are illustrative, not site assessments, numerical forecasts or paper-specific predictions. Both dam benefits and costs are displayed, as are alternative opportunities and limitations. The original class-uploaded PDFs and screenshot were not available during creation; students should supply evidence from their assigned readings.

QR codes are generated locally using the MIT-licensed qrcode-generator by Kazuhiko Arase (the license notice is preserved in qrcode.js and the source archive). UCSB navy and gold follow the public digital palette: https://brand.ucsb.edu/visual-identity/color. Original coast/tower artwork identifies a student project.
