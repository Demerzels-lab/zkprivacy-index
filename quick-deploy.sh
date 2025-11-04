#!/bin/bash

echo "🚀 Deploying ZKPrivacy Index to Vercel..."
echo "=========================================="

# Deploy Main Repository (Vanilla JS)
echo "1. Deploying main repository (Vanilla JS version)..."
echo "=========================================="
npx vercel --prod --yes --name="zkprivacy-vanilla" --confirm

echo
echo "2. React + TypeScript version deployment will be set up next..."
echo "=========================================="

# Deploy React Version
cd zkprivacy-react

echo "Building React version..."
npm install
npm run build

echo "Deploying React version..."
npx vercel --prod --yes --name="zkprivacy-react" --confirm

cd ..

echo
echo "🎉 Deployment completed!"
echo "Check your Vercel dashboard for live URLs."