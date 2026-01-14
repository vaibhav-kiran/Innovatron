/**
 * Firebase Cloud Function to handle contact form submissions
 * Replaces the Flask /contact route functionality
 * JavaScript/Node.js version - easier to deploy
 */

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

// Email configuration - Set these as Firebase environment variables
const SMTP_SERVER = functions.config().smtp?.server || 'smtp.gmail.com';
const SMTP_PORT = parseInt(functions.config().smtp?.port || '587');
const EMAIL_USER = functions.config().email?.user || 'your-email@gmail.com';
const EMAIL_PASSWORD = functions.config().email?.password || 'your-app-password';
const RECIPIENT_EMAILS = (functions.config().email?.recipients || 'nitinmaran@karunya.edu.in,alwinrithick@karunya.edu.in').split(',');

/**
 * Send email to recipients
 */
async function sendEmail(name, email, message) {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            host: SMTP_SERVER,
            port: SMTP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASSWORD,
            },
        });

        // Email content
        const mailOptions = {
            from: EMAIL_USER,
            to: RECIPIENT_EMAILS.join(', '),
            subject: `New Contact Form Message from ${name} - Innovatron 26`,
            text: `
You have received a new message from the Innovatron 26 contact form:

Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from the Innovatron 26 website contact form.
            `,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #6366f1;">New Contact Form Message - Innovatron 26</h2>
                    <p>You have received a new message from the Innovatron 26 contact form:</p>
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="color: #888; font-size: 12px;">This message was sent from the Innovatron 26 website contact form.</p>
                </div>
            `,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

/**
 * Contact form Cloud Function
 * Handles POST requests from the contact form
 */
exports.contactForm = functions.https.onRequest((req, res) => {
    // Enable CORS
    return cors(req, res, async () => {
        // Only allow POST requests
        if (req.method !== 'POST') {
            return res.status(405).json({
                error: 'Method not allowed',
                success: false
            });
        }

        try {
            // Get form data
            const { name, email, message } = req.body;

            // Validate required fields
            if (!name || !email || !message) {
                return res.status(400).json({
                    error: 'Please fill in all fields',
                    success: false
                });
            }

            // Trim whitespace
            const trimmedName = name.trim();
            const trimmedEmail = email.trim();
            const trimmedMessage = message.trim();

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(trimmedEmail)) {
                return res.status(400).json({
                    error: 'Please enter a valid email address',
                    success: false
                });
            }

            // Send email
            const emailSent = await sendEmail(trimmedName, trimmedEmail, trimmedMessage);

            if (emailSent) {
                return res.status(200).json({
                    message: 'Thank you for your message! We will get back to you soon.',
                    success: true
                });
            } else {
                return res.status(500).json({
                    error: 'There was an error sending your message. Please try again or contact us directly.',
                    success: false
                });
            }
        } catch (error) {
            console.error('Error processing contact form:', error);
            return res.status(500).json({
                error: 'An error occurred processing your request',
                success: false
            });
        }
    });
});
