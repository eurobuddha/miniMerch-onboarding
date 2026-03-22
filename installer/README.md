# miniMerch Installer

Get started with miniMerch — the multi-product Minima blockchain shop builder.

## Option A: Desktop App (Recommended — no terminal needed)

Download miniMerch Studio and install it like any other app.

| Platform | Download |
|---|---|
| **macOS** | [miniMerch-Studio-0.2.0.dmg](https://github.com/eurobuddha/miniMerch/releases/download/v0.2.0/miniMerch-Studio-0.2.0.dmg) |
| **Windows** | [miniMerch-Studio-0.2.0-Setup.exe](https://github.com/eurobuddha/miniMerch/releases/download/v0.2.0/miniMerch-Studio-0.2.0-Setup.exe) |

**macOS:** Open the .dmg, drag to Applications, right-click → Open on first launch.

**Windows:** Run the Setup.exe, SmartScreen → More info → Run anyway.

Browser opens at `http://localhost:3456` — visual shop builder, no terminal needed.

See the full guide: [minimerch.info/guides/studio.html](https://minimerch.info/guides/studio.html)

---

## Option B: CLI Tool (Advanced)

Requires Node.js 18+.

```bash
npm install -g @eurobuddha/mini-merch
```

### Setup (one-time)
```bash
mini-merch setup <minima-address> <cmc-api-key> <mxpublickey>
```

### Generate a single-product shop
```bash
mini-merch generate -n "My Product" -m units -p 25 -u 50
```

### Generate a multi-product shop (up to 8 products)
```bash
mini-merch generate-multi
```

### Open Studio from the CLI
```bash
mini-merch studio
```

### View configuration
```bash
mini-merch config --show
```

## Requirements

- Minima node (for shop and inbox to work)
- Node.js 18+ (CLI only — not needed for Studio desktop app)

## Documentation

[minimerch.info](https://minimerch.info) — full guides, FAQ, and download links.

## Support

- [GitHub Issues](https://github.com/eurobuddha/miniMerch/issues)
- [Minima Discord](https://discord.gg/minima)
