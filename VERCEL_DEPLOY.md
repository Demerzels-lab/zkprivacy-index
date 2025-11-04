# Vercel Deployment Guide - ZKPrivacy Index

## Quick Deploy to Vercel

### Option 1: One-Click Deploy (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub: Select your `zkprivacy-index` repository
4. Vercel will automatically detect the project configuration
5. Click "Deploy" - that's it!

### Option 2: Manual Upload
1. Download all files from the GitHub repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Choose "Deploy from Local Directory"
5. Upload the project files
6. Click "Deploy"

## Configuration Details

### Files Created for Vercel:
- `vercel.json` - Vercel configuration with routing and headers
- `_redirects` - SPA routing support
- `package.json` - Project metadata and dependencies
- `.vercelignore` - Files to exclude from deployment

### Features Configured:
- ✅ Static file serving
- ✅ SPA routing (all routes → index.html)
- ✅ Security headers (XSS protection, frame options, etc.)
- ✅ Cache optimization for assets
- ✅ Clean URLs support
- ✅ CORS headers for API calls

## Build Settings (Auto-detected)
- **Framework Preset**: None (Static HTML/JS/CSS)
- **Build Command**: No build required (static site)
- **Output Directory**: ./
- **Install Command**: None

## Environment Variables (If needed)
If you need to add environment variables for API keys or other settings:
1. Go to your project settings in Vercel dashboard
2. Navigate to "Environment Variables"
3. Add your variables with appropriate environment (Production/Preview/Development)

## Post-Deployment
After successful deployment:
1. Your site will be available at `https://your-project-name.vercel.app`
2. Custom domain can be configured in project settings
3. All features will work identically to GitHub Pages:
   - Privacy Assets Ranking Modal
   - Real-time cryptocurrency prices
   - Launch notifications
   - Documentation modal
   - Demo functionality

## Troubleshooting
- **Build fails**: Check that all required files are in the repository
- **Routing issues**: Verify _redirects file is present
- **Missing assets**: Ensure all CSS, JS, and image files are included
- **API calls fail**: Check CORS settings and API endpoints

## Live Demo
Once deployed, your ZKPrivacy Index will include:
- Real-time crypto price tracking
- Privacy coin rankings with live data
- Interactive modals and notifications
- Mobile-responsive design
- Fast global CDN delivery via Vercel