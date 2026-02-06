# tobybrown.space

Professional website for Dr. Toby Brown, astronomer at the Herzberg Astronomy and Astrophysics Research Centre (HAA), National Research Council of Canada (NRC), and adjunct at the University of Victoria.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Publications (ADS)

To fetch publications from your ADS library at build time:

1. Get your API token from [ADS User Settings](https://ui.adsabs.harvard.edu/user/settings/token)
2. Run: `ADS_TOKEN=your_token npm run fetch-ads`
3. Or add `ADS_TOKEN` as a GitHub Actions secret for automatic fetch on deploy

## Deployment (GitHub Pages)

1. Create a repository named `tobybrown.space`
2. Push this code to the `main` branch
3. In repo Settings → Pages: set source to "GitHub Actions"
4. Add `ADS_TOKEN` secret (optional, for publications)
5. Configure custom domain `tobybrown.space` in Pages settings
6. In Hover DNS: A records for `@` → 192.30.252.153, 192.30.252.154; CNAME `www` → your Pages URL

The `CNAME` file is already in `public/` for the custom domain.
