const { body, validationResult } = require('express-validator');

// Store submission times per IP (in production, use Redis)
const submissionTimes = new Map();

// Anti-spam middleware
const antiSpamMiddleware = {
  // Honeypot field validator
  honeypotCheck: (req, res, next) => {
    // Check for hidden honeypot field
    if (req.body.website || req.body.url || req.body.link) {
      console.log(`Bot detected from IP: ${req.ip} - Honeypot triggered`);
      return res.status(400).json({ 
        success: false, 
        message: 'Submission rejected' 
      });
    }
    next();
  },

  // Time-based validation
  timingCheck: (req, res, next) => {
    const minTime = parseInt(process.env.MIN_SUBMISSION_TIME_MS) || 3000;
    const submissionTime = Date.now();
    const lastSubmission = submissionTimes.get(req.ip);
    
    // Record submission time for this IP
    submissionTimes.set(req.ip, submissionTime);
    
    // Check if form was submitted too quickly (likely bot)
    if (req.body.formStartTime) {
      const formDuration = submissionTime - parseInt(req.body.formStartTime);
      if (formDuration < minTime) {
        console.log(`Bot detected from IP: ${req.ip} - Form submitted too quickly (${formDuration}ms)`);
        return res.status(400).json({ 
          success: false, 
          message: 'Please take your time filling out the form' 
        });
      }
    }
    
    next();
  },

  // Content filtering for spam keywords
  contentFilter: (req, res, next) => {
    const spamKeywords = process.env.SPAM_KEYWORDS ? 
      process.env.SPAM_KEYWORDS.toLowerCase().split(',') : [];
    
    const { name, email, message } = req.body;
    const content = `${name} ${email} ${message}`.toLowerCase();
    
    const foundSpamWords = spamKeywords.filter(keyword => 
      content.includes(keyword.trim())
    );
    
    if (foundSpamWords.length > 0) {
      console.log(`Spam detected from IP: ${req.ip} - Keywords: ${foundSpamWords.join(', ')}`);
      return res.status(400).json({ 
        success: false, 
        message: 'Message content not allowed' 
      });
    }
    
    next();
  },

  // Input validation rules
  validationRules: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters')
      .matches(/^[a-zA-Z\s'-]+$/)
      .withMessage('Name contains invalid characters'),
    
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    
    body('message')
      .trim()
      .isLength({ min: 10, max: parseInt(process.env.MAX_MESSAGE_LENGTH) || 2000 })
      .withMessage(`Message must be between 10 and ${process.env.MAX_MESSAGE_LENGTH || 2000} characters`)
  ],

  // Check validation results
  checkValidation: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`Validation failed from IP: ${req.ip} - Errors:`, errors.array());
      return res.status(400).json({
        success: false,
        message: 'Please check your input',
        errors: errors.array()
      });
    }
    next();
  },

  // Clean up old submission times (run periodically)
  cleanup: () => {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    for (const [ip, time] of submissionTimes.entries()) {
      if (now - time > maxAge) {
        submissionTimes.delete(ip);
      }
    }
  }
};

// Clean up every hour
setInterval(antiSpamMiddleware.cleanup, 60 * 60 * 1000);

module.exports = antiSpamMiddleware;