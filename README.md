# miniMerch Onboarding Hub

Welcome! This is the source code for [minimerch.info](https://minimerch.info).

## What is this?

miniMerch Onboarding is a comprehensive guide hub that helps users:

1. **Get started with Minima** - Step-by-step guides for Android, iOS, macOS, Windows, and Linux
2. **Setup miniMerch** - Install and configure the miniMerch CLI tool
3. **Learn about decentralized commerce** - FAQ and documentation

## Project Structure

```
onboarding/
├── index.html              # Landing page
├── install.html            # CLI installation page
├── faq.html                # FAQ page
├── css/
│   └── styles.css          # Design system
├── js/
│   ├── main.js             # Landing page logic
│   ├── node-detect.js      # Minima node detection
│   └── platform-detect.js  # OS detection
├── guides/
│   ├── index.html          # Guides hub
│   ├── android.html        # Android setup guide
│   ├── ios.html            # iOS setup guide
│   ├── macos.html          # macOS setup guide
│   ├── windows.html        # Windows setup guide
│   ├── linux.html          # Linux setup guide
│   └── mini-merch.html     # miniMerch setup guide
└── installer/
    ├── package.json        # CLI installer package
    ├── install.js          # Installation script
    └── wizard.js           # Setup wizard
```

## Deployment

This site is designed to be hosted on GitHub Pages with a custom domain.

### Quick Deploy to GitHub Pages

1. Fork or clone this repository
2. Go to repository Settings → Pages
3. Set Source to "Deploy from a branch" → Select `main` branch and `/ (root)` folder
4. Add your custom domain (e.g., `minimerch.info`)
5. Add a CNAME file with your domain

### Custom Domain Setup

1. Create a `CNAME` file in the root with your domain:
   ```
   minimerch.info
   ```

2. In your domain registrar, add these DNS records:
   - **CNAME**: `www` → `eurobuddha.github.io` (or your username)
   - **A record**: `@` → GitHub Pages IP (check current IPs)

   Or use Cloudflare for easier management:
   - Add site to Cloudflare
   - Create CNAME for `www` pointing to your GitHub Pages URL
   - Create CNAME for `@` (or ANAME/Apex) pointing to your GitHub Pages URL

### GitHub Pages IP Addresses

Current GitHub Pages IPs:
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

## Local Development

To preview locally:

```bash
# Using a simple HTTP server
npx serve .

# Or Python
python -m http.server 8000

# Then open http://localhost:8000
```

## Contributing

Found a typo? Want to improve a guide? Contributions welcome!

1. Fork the repo
2. Make your changes
3. Submit a pull request

## Resources

- [Minima Documentation](https://docs.minima.global)
- [Minima Discord](https://discord.gg/minima)
- [miniMerch GitHub](https://github.com/eurobuddha/miniMerch)

## License

MIT License - See LICENSE file for details.
