const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    // Configure nodemailer to use local postfix
    this.transporter = nodemailer.createTransporter({
      sendmail: true,
      newline: 'unix',
      path: '/usr/sbin/sendmail'
    });
  }

  // Alternative SMTP configuration for postfix
  createSMTPTransporter() {
    return nodemailer.createTransporter({
      host: 'localhost',
      port: 25,
      secure: false,
      auth: false,
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async sendContactEmail(formData) {
    const { name, email, message, ip, userAgent, timestamp } = formData;
    
    const emailSubject = `${process.env.EMAIL_SUBJECT_PREFIX || '[Contact Form]'} New message from ${name}`;
    
    // HTML email template
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background-color: #f4f4f4; padding: 20px; border-bottom: 3px solid #0066cc; }
            .content { padding: 20px; }
            .info-box { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0066cc; margin: 20px 0; }
            .meta { font-size: 12px; color: #666; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>New Contact Form Submission - CyberElectrix</h2>
          </div>
          
          <div class="content">
            <div class="info-box">
              <h3>Contact Information</h3>
              <p><strong>Name:</strong> ${this.escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${this.escapeHtml(email)}</p>
            </div>
            
            <div class="info-box">
              <h3>Message</h3>
              <p>${this.escapeHtml(message).replace(/\n/g, '<br>')}</p>
            </div>
            
            <div class="meta">
              <p><strong>Submission Details:</strong></p>
              <p>Time: ${new Date(timestamp).toLocaleString()}</p>
              <p>IP Address: ${ip}</p>
              <p>User Agent: ${this.escapeHtml(userAgent)}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text version
    const textContent = `
New Contact Form Submission - CyberElectrix

Contact Information:
Name: ${name}
Email: ${email}

Message:
${message}

Submission Details:
Time: ${new Date(timestamp).toLocaleString()}
IP Address: ${ip}
User Agent: ${userAgent}
    `;

    const mailOptions = {
      from: `"CyberElectrix Contact Form" <${process.env.FROM_EMAIL || 'noreply@cyberelectrix.com'}>`,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: emailSubject,
      text: textContent,
      html: htmlContent
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Email sending failed:', error);
      
      // Try SMTP as fallback
      try {
        const smtpTransporter = this.createSMTPTransporter();
        const fallbackResult = await smtpTransporter.sendMail(mailOptions);
        console.log('Email sent via SMTP fallback:', fallbackResult.messageId);
        return { success: true, messageId: fallbackResult.messageId };
      } catch (smtpError) {
        console.error('SMTP fallback also failed:', smtpError);
        throw new Error('Failed to send email via both sendmail and SMTP');
      }
    }
  }

  // Send auto-reply to customer
  async sendAutoReply(customerEmail, customerName) {
    const autoReplySubject = 'Thank you for contacting CyberElectrix';
    
    const autoReplyHTML = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>CyberElectrix - Message Received</h2>
          </div>
          
          <div class="content">
            <p>Dear ${this.escapeHtml(customerName)},</p>
            
            <p>Thank you for contacting CyberElectrix. We have received your message and will get back to you as soon as possible, typically within 24 hours.</p>
            
            <p>For urgent electrical emergencies, please call us directly at <strong>027 573 3478</strong>.</p>
            
            <p>Best regards,<br>
            The CyberElectrix Team</p>
          </div>
          
          <div class="footer">
            <p>CyberElectrix - Your One-Stop Modern Professional Electrical Service Provider</p>
            <p>51 Abbotts Way, Remuera, Auckland 1050</p>
          </div>
        </body>
      </html>
    `;

    const autoReplyText = `
Dear ${customerName},

Thank you for contacting CyberElectrix. We have received your message and will get back to you as soon as possible, typically within 24 hours.

For urgent electrical emergencies, please call us directly at 027 573 3478.

Best regards,
The CyberElectrix Team

---
CyberElectrix - Your One-Stop Modern Professional Electrical Service Provider
51 Abbotts Way, Remuera, Auckland 1050
    `;

    const autoReplyOptions = {
      from: `"CyberElectrix" <${process.env.FROM_EMAIL || 'noreply@cyberelectrix.com'}>`,
      to: customerEmail,
      subject: autoReplySubject,
      text: autoReplyText,
      html: autoReplyHTML
    };

    try {
      await this.transporter.sendMail(autoReplyOptions);
      console.log('Auto-reply sent to:', customerEmail);
    } catch (error) {
      console.error('Failed to send auto-reply:', error);
      // Don't throw error for auto-reply failure
    }
  }

  // Helper method to escape HTML
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  // Test email configuration
  async testConnection() {
    try {
      await this.transporter.verify();
      console.log('Email service is ready');
      return true;
    } catch (error) {
      console.error('Email service test failed:', error);
      return false;
    }
  }
}

module.exports = new EmailService();