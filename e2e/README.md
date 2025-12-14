Install and run Playwright tests (using bun)

1. From repo root or anywhere, run:

```bash
cd ui-winex/e2e
```

2. Install dependencies with Bun (reads package.json):

```bash
bun install
```

3. Install Playwright browsers (bunx runs the binary):

```bash
bunx playwright install
# or for dependencies required on some systems:
# bunx playwright install --with-deps
```

4. Run tests:

```bash
bunx playwright test
```
