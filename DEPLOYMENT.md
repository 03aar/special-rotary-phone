# LOOP - Deployment Guide

## Overview

LOOP is a static web application built with React and Vite. The production build generates optimized static files that can be hosted on any static hosting service.

## Build Process

The application has been built for production using Vite. The optimized files are located in the `dist/` directory:

```
dist/
├── assets/
│   ├── index-[hash].css    (57.98 kB)
│   └── index-[hash].js     (215.46 kB)
├── index.html              (0.84 kB)
└── loop-icon.svg           (0.42 kB)
```

## Deployment Options

### Option 1: GitHub Pages (Recommended)

GitHub Pages is the simplest way to deploy LOOP, similar to the example provided.

#### Step 1: Build the Application

```bash
npm install
npm run build
```

#### Step 2: Deploy to GitHub Pages

**Method A: Using GitHub Actions (Automated)**

1. Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

2. Enable GitHub Pages:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "GitHub Actions"
   - Push to the main branch to trigger deployment

**Method B: Using gh-pages Branch (Manual)**

1. Install gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Add deployment script to `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

4. Configure GitHub Pages to use the `gh-pages` branch

#### Step 3: Configure Base Path (if needed)

If deploying to a subdirectory (e.g., `username.github.io/loop`), update `vite.config.js`:

```javascript
export default defineConfig({
  base: '/loop/',  // Replace with your repository name
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
})
```

Then rebuild and redeploy.

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

Or connect your GitHub repository to Netlify for automatic deployments:
- Build command: `npm run build`
- Publish directory: `dist`

### Option 3: Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
npm run build
vercel --prod
```

Or import your repository at vercel.com with these settings:
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

### Option 4: Custom Static Hosting

Upload the contents of the `dist/` directory to any static web hosting service:

- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Firebase Hosting
- Cloudflare Pages
- Surge.sh

## Local Preview

To preview the production build locally:

```bash
npm run build
npm run preview
```

The preview server will start at `http://localhost:4173`

## Environment Configuration

### Browser Compatibility

LOOP supports all modern browsers:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

### Client-Side Routing

The application uses React Router for client-side routing. For proper routing on static hosts, you need to configure redirects.

**For GitHub Pages:**

Create a `public/404.html` that redirects to `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>LOOP</title>
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
  </head>
  <body></body>
</html>
```

**For Netlify:**

Create a `public/_redirects` file:

```
/* /index.html 200
```

**For Vercel:**

Create a `vercel.json` file:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

## Data Persistence

LOOP uses browser LocalStorage for data persistence:
- User profile information
- Context IQ scores
- Mission progress
- Streak tracking
- Settings preferences

Data persists across sessions but is stored locally in the browser.

## Performance Optimizations

The production build includes:
- Code splitting and lazy loading
- CSS minification and bundling
- JavaScript minification
- Asset optimization
- Gzip compression
- Tree shaking

**Bundle Sizes:**
- Total JavaScript: 215 KB (65 KB gzipped)
- Total CSS: 58 KB (9 KB gzipped)
- Initial load: < 75 KB gzipped

## Monitoring and Analytics

To add analytics tracking:

1. Add your tracking ID to the HTML in `index.html`
2. Or use a package like `react-ga4` or `@vercel/analytics`

Example for Google Analytics:

```bash
npm install react-ga4
```

Then in `src/main.jsx`:

```javascript
import ReactGA from 'react-ga4'

ReactGA.initialize('G-XXXXXXXXXX')

// Track page views
ReactGA.send({ hitType: "pageview", page: window.location.pathname })
```

## Troubleshooting

### Blank Page After Deployment

- Check browser console for errors
- Verify the base path in `vite.config.js` matches your deployment path
- Ensure all assets are loading correctly

### Routing Issues

- Verify redirect rules are configured correctly
- Check that 404 fallback redirects to `index.html`
- Test direct navigation to sub-routes

### Assets Not Loading

- Check network tab in browser DevTools
- Verify asset paths in the built files
- Ensure CORS is configured if using CDN

## Production Checklist

Before deploying to production:

- [ ] Run `npm run build` successfully
- [ ] Test the preview locally with `npm run preview`
- [ ] Verify all routes work correctly
- [ ] Test on multiple browsers
- [ ] Check mobile responsiveness
- [ ] Verify LocalStorage functionality
- [ ] Test all interactive features
- [ ] Check console for errors
- [ ] Validate metadata and SEO tags
- [ ] Configure proper redirects for routing
- [ ] Set up analytics (optional)
- [ ] Configure custom domain (optional)

## Custom Domain Setup

### GitHub Pages

1. Add a `CNAME` file to the `public/` directory with your domain:
```
loop.yourdomain.com
```

2. Configure DNS records:
```
Type: CNAME
Name: loop
Value: yourusername.github.io
```

### Netlify/Vercel

Follow their respective documentation for custom domain setup through their dashboards.

## Continuous Deployment

For automatic deployments on every push:

1. Connect your repository to your hosting service
2. Configure build settings
3. Push to the main branch to trigger deployment

Example workflow:
```
Code Push → GitHub → CI/CD Pipeline → Build → Deploy → Live Site
```

## Support

For deployment issues:
- Check the hosting provider's documentation
- Review Vite deployment docs: https://vitejs.dev/guide/static-deploy.html
- Check React Router documentation for routing configuration

## Version History

- **v1.0.0** (Current) - Initial MVP release with all core features

## License

See LICENSE file for details.
