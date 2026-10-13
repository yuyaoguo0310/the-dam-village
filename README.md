# The Dam Village

Made by Yuyao · UC Santa Barbara ENVS 156

Interactive classroom stakeholder discussion about water, hydropower and alternatives, inspired by Schmitt & Rosa (2024) and Gleick (2003).

## Open the app

- Students: https://yuyaoguo0310.github.io/the-dam-village/
- Host: https://yuyaoguo0310.github.io/the-dam-village/?view=host
- Group guides: https://yuyaoguo0310.github.io/the-dam-village/?view=guide

Host creates a classroom, saves their recovery key privately, and shares **Join QR** or the six-character room code. Four student stakeholder groups are balanced automatically. Guides join separately and do not vote. The host controls both votes, discussion, debate, anonymous change comparison and illustrative future animations.

This GitHub Pages frontend connects to a persistent HTTPS backend for multi-device synchronization. The public browser address uses github.io. The backend is still hosted at the existing chatgpt.site origin; this is not a provider-independent backend migration.

## Original complete source

Download and extract **The-Dam-Village-Source.zip** in this repository. It contains the original frontend, backend, local server, Cloudflare Worker, D1 migration, tests, QR generator, build scripts and deployment documentation. No classroom data, host recovery keys, guide keys, or publishing credentials are included.

With Node 18+ in the extracted project, `node server.mjs` runs a local backup. `node --test tests/*.test.mjs` verifies the classroom logic. `node build.mjs` builds the dependency-free Worker; `node build-pages.mjs` produces the GitHub Pages frontend. Read README.md and GITHUB-PAGES.md in the source archive for rejoin and hosting details.

The root **index.html** is the complete deployed GitHub Pages frontend and can be edited directly here. For a different backend, change the `dam-api-origin` meta value and configure its exact frontend-origin allowlist.

## Teaching context

All village roles and future impacts are illustrative, not site assessments, numerical forecasts or paper-specific predictions. Both dam benefits and costs are displayed, as are alternative opportunities and limitations. The original class-uploaded PDFs and screenshot were not available during creation; students should supply evidence from their assigned readings.

QR codes are generated locally using the MIT-licensed qrcode-generator by Kazuhiko Arase (the license notice is preserved in index.html and the source archive). UCSB navy and gold follow the public digital palette: https://brand.ucsb.edu/visual-identity/color. Original coast/tower artwork identifies a student project.
