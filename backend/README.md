# CyberElectrix Contact Form Backend

A secure Node.js Express server with comprehensive anti-spam protection for handling contact form submissions via Debian 12 with postfix.

## Features

### Security & Anti-Spam
- ✅ Rate limiting (5 requests per 15 minutes per IP)
- ✅ Honeypot field detection
- ✅ Form timing validation (prevents bot auto-submission)
- ✅ Content filtering for spam keywords
- ✅ Input validation and sanitization
- ✅ CSRF protection via CORS
- ✅ Request size limits
- ✅ IP-based logging and monitoring

### Email Features
- ✅ HTML and plain text email templates
- ✅ Automatic customer reply emails
- ✅ Integration with postfix via sendmail and SMTP
- ✅ Fallback email delivery methods
- ✅ Email delivery confirmation

## Installation on Debian 12

### Prerequisites
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (v18+)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install postfix (if not already installed)
sudo apt install postfix mailutils -y

# Configure postfix as "Internet Site" when prompted
```

### Backend Setup
```bash
# Navigate to backend directory
cd /var/www/cyberelectrix/backend

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Edit configuration file
sudo nano .env
```

### Environment Configuration (.env)
```bash
# Server Configuration
PORT=3001
NODE_ENV=production

# Email Configuration
TO_EMAIL=your-email@cyberelectrix.com
FROM_EMAIL=noreply@cyberelectrix.com
EMAIL_SUBJECT_PREFIX=[CyberElectrix Contact]

# Security Configuration
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
CORS_ORIGIN=https://cyberelectrix.com

# Anti-Spam Configuration
SPAM_KEYWORDS=viagra,casino,lottery,winner,congratulations,free money
MIN_SUBMISSION_TIME_MS=3000
MAX_MESSAGE_LENGTH=2000
```

### Postfix Configuration
```bash
# Ensure postfix is running
sudo systemctl enable postfix
sudo systemctl start postfix
sudo systemctl status postfix

# Test email functionality
echo "Test email from postfix" | mail -s "Test Subject" your-email@cyberelectrix.com
```

### Systemd Service Setup
Create a systemd service for automatic startup:

```bash
sudo nano /etc/systemd/system/cyberelectrix-backend.service
```

Service file content:
```ini
[Unit]
Description=CyberElectrix Contact Form Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/cyberelectrix/backend
Environment=NODE_ENV=production
ExecStart=/usr/bin/node server.js
Restart=on-failure
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=cyberelectrix-backend

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable cyberelectrix-backend
sudo systemctl start cyberelectrix-backend
sudo systemctl status cyberelectrix-backend
```

### Nginx Configuration
Add this to your Nginx site configuration:

```nginx
# Proxy contact form API to backend
location /api/ {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    
    # Security headers
    proxy_set_header X-Frame-Options DENY;
    proxy_set_header X-Content-Type-Options nosniff;
}
```

## Testing

### Test Backend Health
```bash
curl http://localhost:3001/api/health
```

### Test Contact Form
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "message": "This is a test message from the API",
    "formStartTime": 1640995200000
  }'
```

### Test Email Service
```bash
# Check postfix logs
sudo tail -f /var/log/mail.log

# Check backend logs
sudo journalctl -u cyberelectrix-backend -f
```

## Monitoring & Logs

### View Application Logs
```bash
# Real-time logs
sudo journalctl -u cyberelectrix-backend -f

# Recent logs
sudo journalctl -u cyberelectrix-backend --since "1 hour ago"
```

### Email Logs
```bash
# Postfix logs
sudo tail -f /var/log/mail.log

# Check mail queue
mailq
```

### Performance Monitoring
```bash
# Check process status
sudo systemctl status cyberelectrix-backend

# Memory usage
ps aux | grep node

# Network connections
netstat -tlnp | grep :3001
```

## Security Considerations

1. **Firewall**: Ensure only port 80/443 are open externally
2. **Rate Limiting**: Configured for 5 requests per 15 minutes
3. **Input Validation**: All inputs are sanitized and validated
4. **Email Headers**: Prevents header injection attacks
5. **CORS**: Restricts API access to your domain only

## Troubleshooting

### Common Issues

**Backend won't start:**
```bash
# Check logs
sudo journalctl -u cyberelectrix-backend

# Check port availability
sudo netstat -tlnp | grep :3001

# Manual start for debugging
cd /var/www/cyberelectrix/backend
node server.js
```

**Emails not sending:**
```bash
# Test postfix
echo "test" | mail -s "test" your-email@cyberelectrix.com

# Check postfix status
sudo systemctl status postfix

# Check mail logs
sudo tail -20 /var/log/mail.log
```

**CORS errors:**
- Ensure CORS_ORIGIN in .env matches your domain
- Check Nginx proxy configuration

## File Structure
```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Environment configuration
├── .env.example          # Environment template
├── middleware/
│   └── antiSpam.js       # Anti-spam middleware
├── services/
│   └── emailService.js   # Email handling
└── README.md             # This file
```

## Support

For issues with the contact form backend:
1. Check application logs
2. Verify postfix configuration
3. Test API endpoints manually
4. Review Nginx proxy settings

Contact: Yuccan Technologies for technical support