#!/bin/bash

echo "🚀 ZKPrivacy Index - Deploy Script"
echo "=================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Deploying both versions to Vercel...${NC}"
echo

# Deploy Vanilla JS version (Main Repository)
echo -e "${YELLOW}1. Deploying Vanilla JS version...${NC}"
echo -e "${GREEN}Running: npx vercel --prod --yes${NC}"
echo "This will deploy the main repository (Vanilla JS version)"
echo

# Auto-answer yes to all prompts
echo "yes" | npx vercel --prod

echo
echo -e "${BLUE}==================================${NC}"
echo -e "${GREEN}✅ Main repository deployment started!${NC}"
echo

# Deploy React + TypeScript version
echo -e "${YELLOW}2. Deploying React + TypeScript version...${NC}"
cd zkprivacy-react

echo -e "${GREEN}Installing dependencies and building...${NC}"
npm install --silent
npm run build

echo -e "${GREEN}Running: npx vercel --prod --yes${NC}"
echo "This will deploy the React version from zkprivacy-react/"
echo

echo "yes" | npx vercel --prod

cd ..

echo
echo -e "${BLUE}==================================${NC}"
echo -e "${GREEN}🎉 Both deployments started!${NC}"
echo -e "${BLUE}Check your Vercel dashboard for deployment status.${NC}"
echo
echo -e "${YELLOW}Deployment URLs will be provided by Vercel CLI${NC}"
echo -e "${BLUE}==================================${NC}"