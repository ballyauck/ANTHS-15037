require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const antiSpam = require('./middleware/antiSpam');
const emailService = require('./services/emailService');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for API
  crossOriginEmbedderPolicy: false
}));

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'https://cyberelectrix.com'],
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Skip rate limiting for successful submissions to allow legitimate follow-ups
  skip: (req, res) => {
    return req.rateLimit?.remaining > 0;
  }
});

// Apply rate limiting to contact form only
app.use('/api/contact', limiter);

// Logging
app.use(morgan('combined'));

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Trust proxy for correct IP addresses
app.set('trust proxy', true);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'CyberElectrix Contact API'
  });
});

// Contact form endpoint with comprehensive protection
app.post('/api/contact', 
  // Anti-spam middleware chain
  antiSpam.honeypotCheck,
  antiSpam.timingCheck,
  antiSpam.validationRules,
  antiSpam.checkValidation,
  antiSpam.contentFilter,
  
  async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      // Collect metadata for logging
      const formData = {
        name,
        email,
        message,
        ip: req.ip,
        userAgent: req.get('User-Agent') || 'Unknown',
        timestamp: new Date().toISOString()
      };

      console.log(`Processing contact form submission from ${email} (IP: ${req.ip})`);

      // Send email
      const emailResult = await emailService.sendContactEmail(formData);
      
      if (emailResult.success) {
        // Send auto-reply to customer (non-blocking)
        emailService.sendAutoReply(email, name).catch(err => {
          console.error('Auto-reply failed:', err);
        });

        console.log(`Contact form processed successfully for ${email}`);
        
        res.json({
          success: true,
          message: 'Thank you for your message! We will get back to you soon.',
          messageId: emailResult.messageId
        });
      } else {
        throw new Error('Email sending failed');
      }

    } catch (error) {
      console.error('Contact form error:', error);
      
      res.status(500).json({
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again or contact us directly at 027 573 3478.'
      });
    }
  }
);

// Handle 404 for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`CyberElectrix Contact API server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Test email service on startup
  emailService.testConnection().then(isReady => {
    if (isReady) {
      console.log('✅ Email service is ready');
    } else {
      console.log('⚠️  Email service needs configuration');
    }
  });
});

module.exports = app;