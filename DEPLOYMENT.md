# DIU Admission Application - Deployment Guide

## 🚀 **Deployment Overview**

This guide provides step-by-step instructions for deploying the DIU Admission application to various environments including local development, staging, and production.

## 📋 **Prerequisites**

### **System Requirements**
- **Node.js**: Version 14.0.0 or higher
- **npm**: Version 6.0.0 or higher
- **Git**: For version control
- **Web Server**: Nginx or Apache (for production)
- **Database**: MongoDB or PostgreSQL (optional for production)

### **Recommended Specifications**
- **RAM**: 2GB minimum, 4GB recommended
- **Storage**: 10GB available space
- **CPU**: 2 cores minimum
- **OS**: Linux (Ubuntu 20.04+), macOS, or Windows 10+

## 🛠️ **Local Development Deployment**

### **Step 1: Clone Repository**
```bash
git clone https://github.com/diu/diu-admission-app.git
cd diu-admission-app
```

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Start Development Server**
```bash
npm run dev
```

### **Step 4: Access Application**
- **Home Page**: http://localhost:3000
- **Registration**: http://localhost:3000/registration
- **Admin Dashboard**: http://localhost:3000/admin

## 🌐 **Production Deployment**

### **Option 1: Traditional Server Deployment**

#### **Step 1: Server Setup**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

#### **Step 2: Application Deployment**
```bash
# Clone application
git clone https://github.com/diu/diu-admission-app.git
cd diu-admission-app

# Install dependencies
npm install --production

# Create environment file
cp .env.example .env
nano .env
```

#### **Step 3: Environment Configuration**
Create `.env` file:
```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=2097152
```

#### **Step 4: Start Application with PM2**
```bash
# Start application
pm2 start server.js --name "diu-admission"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

#### **Step 5: Configure Nginx**
Create Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/diu-admission
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # File upload size limit
    client_max_body_size 10M;
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/diu-admission /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### **Option 2: Docker Deployment**

#### **Step 1: Create Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

#### **Step 2: Create Docker Compose**
```yaml
version: '3.8'
services:
  diu-admission:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    volumes:
      - ./uploads:/app/uploads
      - ./applications.json:/app/applications.json
    restart: unless-stopped
```

#### **Step 3: Deploy with Docker**
```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f
```

### **Option 3: Cloud Platform Deployment**

#### **Heroku Deployment**
```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login to Heroku
heroku login

# Create Heroku app
heroku create diu-admission-app

# Deploy
git push heroku main

# Open app
heroku open
```

#### **Vercel Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

#### **Railway Deployment**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

## 🔧 **Environment Configuration**

### **Development Environment**
```env
NODE_ENV=development
PORT=3000
HOST=localhost
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=2097152
CORS_ORIGIN=http://localhost:3000
```

### **Production Environment**
```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
UPLOAD_PATH=/var/www/uploads
MAX_FILE_SIZE=2097152
CORS_ORIGIN=https://your-domain.com
```

## 📊 **Monitoring and Logging**

### **PM2 Monitoring**
```bash
# View application status
pm2 status

# View logs
pm2 logs diu-admission

# Monitor resources
pm2 monit
```

### **Nginx Logs**
```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

## 🔒 **Security Configuration**

### **SSL/HTTPS Setup**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### **Firewall Configuration**
```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## 📈 **Performance Optimization**

### **Nginx Optimization**
```nginx
# Add to nginx.conf
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### **Node.js Optimization**
```bash
# Set Node.js options
export NODE_OPTIONS="--max-old-space-size=2048"
```

## 🔄 **Update and Maintenance**

### **Application Updates**
```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Restart application
pm2 restart diu-admission
```

### **Database Backup (if using database)**
```bash
# Backup applications
cp applications.json applications.json.backup

# Restore if needed
cp applications.json.backup applications.json
```

## 🚨 **Troubleshooting**

### **Common Issues**

#### **Port Already in Use**
```bash
# Find process using port 3000
lsof -ti:3000

# Kill process
kill -9 [PID]
```

#### **Permission Issues**
```bash
# Fix upload directory permissions
sudo chown -R www-data:www-data uploads/
sudo chmod -R 755 uploads/
```

#### **Nginx Configuration Issues**
```bash
# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### **Log Analysis**
```bash
# Application logs
pm2 logs diu-admission --lines 100

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# System logs
sudo journalctl -u nginx -f
```

## 📞 **Support and Maintenance**

### **Contact Information**
- **Email**: support@daffodilvarsity.edu.bd
- **Phone**: +880 1819-105105
- **Website**: https://daffodilvarsity.edu.bd

### **Maintenance Schedule**
- **Daily**: Log rotation and monitoring
- **Weekly**: Security updates and backups
- **Monthly**: Performance optimization and updates

## 📋 **Deployment Checklist**

### **Pre-Deployment**
- [ ] Code review completed
- [ ] Tests passed
- [ ] Environment variables configured
- [ ] SSL certificates obtained
- [ ] Database backup created

### **Deployment**
- [ ] Application deployed
- [ ] Nginx configured
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Monitoring setup

### **Post-Deployment**
- [ ] Application accessible
- [ ] All features working
- [ ] Performance monitoring active
- [ ] Backup system configured
- [ ] Documentation updated

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Maintainer**: DIU Development Team 