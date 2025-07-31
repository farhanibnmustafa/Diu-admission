#!/bin/bash

# DIU Admission App - GitHub Deployment Script
# This script helps you deploy your application to GitHub

echo "🚀 DIU Admission App - GitHub Deployment"
echo "=========================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Please run 'git init' first."
    exit 1
fi

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username is required."
    exit 1
fi

echo ""
echo "📋 Repository Information:"
echo "Repository Name: diu-admission-app"
echo "GitHub Username: $GITHUB_USERNAME"
echo "Repository URL: https://github.com/$GITHUB_USERNAME/diu-admission-app"
echo ""

# Ask for confirmation
read -p "Do you want to proceed with GitHub deployment? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "❌ Deployment cancelled."
    exit 0
fi

echo ""
echo "🔧 Setting up GitHub repository..."

# Add remote origin
git remote add origin https://github.com/$GITHUB_USERNAME/diu-admission-app.git

# Push to GitHub
echo "📤 Pushing code to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully deployed to GitHub!"
    echo ""
    echo "🌐 Your repository is now available at:"
    echo "   https://github.com/$GITHUB_USERNAME/diu-admission-app"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Visit your repository on GitHub"
    echo "   2. Check that all files are uploaded"
    echo "   3. Share the repository URL with others"
    echo "   4. Consider enabling GitHub Pages for live demo"
    echo ""
    echo "📚 Documentation:"
    echo "   - README.md: Project overview"
    echo "   - DEPLOYMENT.md: Deployment instructions"
    echo "   - API_DOCUMENTATION.md: API reference"
    echo "   - USER_MANUAL.md: User guide"
    echo ""
else
    echo "❌ Failed to push to GitHub. Please check:"
    echo "   1. Repository exists on GitHub"
    echo "   2. You have proper permissions"
    echo "   3. GitHub credentials are configured"
fi

echo ""
echo "🎉 Deployment script completed!" 