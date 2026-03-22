# miniMerch Onboarding Hub

Source code for [minimerch.info](https://minimerch.info).

## What is this?

The miniMerch onboarding site helps vendors and buyers get started with miniMerch — the multi-product blockchain shop builder for Minima.

It covers:

1. **Minima node setup** — guides for Android, macOS, Windows, and Linux
2. **miniMerch Studio** — download and install the desktop app (macOS + Windows)
3. **miniMerch CLI** — install and use the command-line tool
4. **FAQ** — common questions about miniMerch and Minima

## Project Structure

```
onboarding/
├── index.html              # Landing page — Studio download + feature overview
├── install.html            # Install page — Studio (Option A) + CLI (Option B)
├── faq.html                # FAQ
├── css/
│   └── styles.css          # Design system
├── js/
│   ├── main.js             # Landing page logic
│   ├── node-detect.js      # Minima node detection
│   └── platform-detect.js  # OS detection
├── guides/
│   ├── index.html          # Guides hub
│   ├── studio.html         # miniMerch Studio install guide (macOS + Windows)
│   ├── mini-merch.html     # miniMerch CLI setup guide
│   ├── android.html        # Android Minima node guide
│   ├── macos.html          # macOS Minima node guide
│   ├── windows.html        # Windows Minima node guide
│   └── linux.html          # Linux Minima node guide
└── installer/
    ├── package.json
    ├── install.js
    └── wizard.js
```

## Deployment

Hosted on GitHub Pages with custom domain `minimerch.info`.

### Deploy to GitHub Pages

1. Fork or clone this repository
2. Go to Settings → Pages
3. Source: Deploy from branch → `main` → `/ (root)`
4. Add custom domain and CNAME file

### Local Development

```bash
npx serve .
# open http://localhost:3000
```

## Resources

- [miniMerch GitHub](https://github.com/eurobuddha/miniMerch)
- [miniMerch Releases](https://github.com/eurobuddha/miniMerch/releases)
- [Minima Documentation](https://docs.minima.global)
- [Minima Discord](https://discord.gg/minima)

## License

MIT
