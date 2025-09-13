const express = require('express');
const cors = require('cors');
const path = require('path');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY || 're_TUCBzWSh_AzWmDvCy4Ds2nz13iy1YMoEM');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Email subscription endpoint
app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Please enter a valid email address' });
        }

        // Send welcome email using Resend
        const emailResponse = await resend.emails.send({
            from: 'onboarding@resend.dev', // You can change this to your verified domain
            to: email,
            subject: 'Welcome to YourBrand Newsletter! 🚀',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome to YourBrand</title>
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            margin: 0;
                            padding: 0;
                            background-color: #f8f9fa;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        .header {
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            padding: 30px;
                            text-align: center;
                            border-radius: 10px 10px 0 0;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 2rem;
                        }
                        .content {
                            background: white;
                            padding: 30px;
                            border-radius: 0 0 10px 10px;
                            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                        }
                        .highlight {
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            background-clip: text;
                            font-weight: bold;
                        }
                        .cta-button {
                            display: inline-block;
                            background: #ff6b6b;
                            color: white !important;
                            padding: 15px 30px;
                            text-decoration: none;
                            border-radius: 25px;
                            font-weight: bold;
                            margin: 20px 0;
                            transition: all 0.3s;
                        }
                        .footer {
                            text-align: center;
                            padding: 20px;
                            color: #666;
                            font-size: 0.9rem;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🚀 Welcome to YourBrand!</h1>
                        </div>
                        <div class="content">
                            <h2>Thanks for subscribing!</h2>
                            <p>Hello there! 👋</p>
                            <p>We're thrilled to have you join our community of forward-thinking professionals who are <span class="highlight">transforming their businesses</span> with our cutting-edge platform.</p>
                            
                            <h3>What's next?</h3>
                            <ul>
                                <li>📧 You'll receive exclusive updates about new features</li>
                                <li>🎯 Early access to premium content and resources</li>
                                <li>💡 Tips and strategies from industry experts</li>
                                <li>🎁 Special offers and discounts</li>
                            </ul>
                            
                            <p>Ready to get started?</p>
                            <div style="text-align: center;">
                                <a href="#" class="cta-button">Explore Our Platform</a>
                            </div>
                            
                            <p>If you have any questions, don't hesitate to reach out. We're here to help you succeed!</p>
                            
                            <p>Best regards,<br>
                            <strong>The YourBrand Team</strong></p>
                        </div>
                        <div class="footer">
                            <p>© 2024 YourBrand. All rights reserved.</p>
                            <p>You're receiving this email because you subscribed to our newsletter.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        });

        console.log('Email sent successfully:', emailResponse);

        // Also send a notification email to yourself (optional)
        try {
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: 'ysyashmks@gmail.com', // Your email to get notifications
                subject: '🎉 New Newsletter Subscription!',
                html: `
                    <h2>New Subscription Alert!</h2>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
                    <p>A new user has subscribed to your newsletter!</p>
                `
            });
        } catch (notificationError) {
            console.warn('Failed to send notification email:', notificationError);
            // Don't fail the main request if notification fails
        }

        res.status(200).json({
            success: true,
            message: 'Successfully subscribed! Check your email for a welcome message.'
        });

    } catch (error) {
        console.error('Subscription error:', error);
        
        // Handle specific Resend errors
        if (error.message && error.message.includes('API key')) {
            return res.status(500).json({
                error: 'Email service configuration error. Please try again later.'
            });
        }
        
        res.status(500).json({
            error: 'Failed to process subscription. Please try again.'
        });
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Please enter a valid email address' });
        }

        // Send email to admin using Resend
        const adminEmailResponse = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'ysyashmks@gmail.com', // Admin email
            subject: `🔔 Contact Form: ${subject || 'New Contact Form Submission'}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Contact Form Submission</title>
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            margin: 0;
                            padding: 0;
                            background-color: #f8f9fa;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            background: white;
                            border-radius: 8px;
                            overflow: hidden;
                            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                        }
                        .header {
                            background: #070f79;
                            color: white;
                            padding: 20px;
                            text-align: center;
                        }
                        .content {
                            padding: 30px;
                        }
                        .field {
                            margin-bottom: 20px;
                            padding: 15px;
                            background: #f8f9fa;
                            border-radius: 4px;
                            border-left: 4px solid #070f79;
                        }
                        .field label {
                            font-weight: bold;
                            color: #070f79;
                            display: block;
                            margin-bottom: 5px;
                        }
                        .field-value {
                            color: #333;
                            word-break: break-word;
                        }
                        .footer {
                            background: #f8f9fa;
                            padding: 15px;
                            text-align: center;
                            color: #666;
                            font-size: 0.9rem;
                            border-top: 1px solid #e1e5e9;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>📧 New Contact Form Submission</h1>
                        </div>
                        <div class="content">
                            <div class="field">
                                <label>Name:</label>
                                <div class="field-value">${name}</div>
                            </div>
                            <div class="field">
                                <label>Email:</label>
                                <div class="field-value">${email}</div>
                            </div>
                            <div class="field">
                                <label>Subject:</label>
                                <div class="field-value">${subject || 'No subject provided'}</div>
                            </div>
                            <div class="field">
                                <label>Message:</label>
                                <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
                            </div>
                        </div>
                        <div class="footer">
                            <p>Submitted on: ${new Date().toLocaleString()}</p>
                            <p>This email was sent from your Pacholi Suzuki contact form.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        });

        // Send confirmation email to user
        try {
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject: 'Thank you for contacting Pacholi Suzuki! 🏍️',
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Thank You - Pacholi Suzuki</title>
                        <style>
                            body {
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                line-height: 1.6;
                                color: #333;
                                margin: 0;
                                padding: 0;
                                background-color: #f8f9fa;
                            }
                            .container {
                                max-width: 600px;
                                margin: 20px auto;
                                background: white;
                                border-radius: 8px;
                                overflow: hidden;
                                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                            }
                            .header {
                                background: linear-gradient(135deg, #070f79 0%, #0b0449 100%);
                                color: white;
                                padding: 30px 20px;
                                text-align: center;
                            }
                            .logo {
                                width: 50px;
                                height: 50px;
                                background: #d32f2f;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: white;
                                font-weight: bold;
                                font-size: 1.5rem;
                                margin: 0 auto 15px;
                            }
                            .content {
                                padding: 30px;
                            }
                            .highlight {
                                color: #070f79;
                                font-weight: bold;
                            }
                            .cta-section {
                                background: #f8f9fa;
                                padding: 20px;
                                border-radius: 4px;
                                margin: 20px 0;
                                text-align: center;
                            }
                            .contact-info {
                                background: #f8f9fa;
                                padding: 20px;
                                border-radius: 4px;
                                margin: 20px 0;
                            }
                            .contact-info h3 {
                                color: #070f79;
                                margin-bottom: 10px;
                            }
                            .footer {
                                background: #070f79;
                                color: white;
                                padding: 20px;
                                text-align: center;
                                font-size: 0.9rem;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <div class="logo">PS</div>
                                <h1>Thank You for Contacting Us!</h1>
                                <p>Pacholi Suzuki (Two Wheelers) in Gurgaon</p>
                            </div>
                            <div class="content">
                                <h2>Hello ${name}! 👋</h2>
                                <p>Thank you for reaching out to us. We have received your message and appreciate your interest in <span class="highlight">Pacholi Suzuki</span>.</p>
                                
                                <p><strong>Your message details:</strong></p>
                                <ul>
                                    <li><strong>Subject:</strong> ${subject || 'General Inquiry'}</li>
                                    <li><strong>Submitted on:</strong> ${new Date().toLocaleString()}</li>
                                </ul>
                                
                                <div class="cta-section">
                                    <h3>🚀 What's Next?</h3>
                                    <p>Our team will review your message and get back to you within 24-48 hours. We're committed to providing you with the best service and support for all your two-wheeler needs.</p>
                                </div>
                                
                                <div class="contact-info">
                                    <h3>📞 Need Immediate Assistance?</h3>
                                    <p>If your inquiry is urgent, feel free to contact us directly:</p>
                                    <p>📧 Email: info@pacholisuzukigurgaon.co.in<br>
                                    📱 Phone: [Your Phone Number]<br>
                                    📍 Address: [Your Address]</p>
                                </div>
                                
                                <p>We look forward to serving you and helping you find the perfect Suzuki bike!</p>
                                
                                <p>Best regards,<br>
                                <strong>The Pacholi Suzuki Team</strong></p>
                            </div>
                            <div class="footer">
                                <p>© 2024 Pacholi Suzuki (Two Wheelers) in Gurgaon. All rights reserved.</p>
                                <p>Leading Dealer for Suzuki Bikes</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `
            });
        } catch (confirmationError) {
            console.warn('Failed to send confirmation email to user:', confirmationError);
            // Don't fail the main request if confirmation email fails
        }

        console.log('Contact form email sent successfully:', adminEmailResponse);

        res.status(200).json({
            success: true,
            message: 'Thank you for your message! We will get back to you soon.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        
        // Handle specific Resend errors
        if (error.message && error.message.includes('API key')) {
            return res.status(500).json({
                error: 'Email service configuration error. Please try again later.'
            });
        }
        
        res.status(500).json({
            error: 'Failed to send your message. Please try again.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Landing Page with Resend Integration'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📧 Resend integration is ${process.env.RESEND_API_KEY ? 'configured' : 'using default key'}`);
    console.log(`📱 Open your browser and navigate to http://localhost:${PORT}`);
});

module.exports = app;
