# Landing Page with Resend Integration 🚀

A modern, responsive landing page with integrated email newsletter functionality powered by Resend. This project allows visitors to subscribe to your newsletter and automatically sends welcome emails using the Resend API.

## Features ✨

- **Modern Design**: Sleek, responsive landing page with smooth animations
- **Email Integration**: Powered by Resend for reliable email delivery
- **Newsletter Signup**: Functional email subscription form
- **Contact Form**: Professional contact form with Resend integration
- **Welcome Emails**: Automatic welcome emails for new subscribers
- **Contact Confirmation**: Automatic confirmation emails for contact form submissions
- **Notification System**: Admin notifications for new subscriptions and contact submissions
- **Error Handling**: Comprehensive error handling and user feedback
- **Mobile Responsive**: Optimized for all device sizes

## Tech Stack 🛠️

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Email Service**: Resend API
- **Styling**: Custom CSS with modern gradients and animations

## Getting Started 🏃‍♂️

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Resend API key

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd landing-page-resend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - The project includes a `.env` file with your Resend API key
   - Update the notification email in `.env` if needed:
   ```env
   RESEND_API_KEY=re_TUCBzWSh_AzWmDvCy4Ds2nz13iy1YMoEM
   PORT=3000
   FROM_EMAIL=onboarding@resend.dev
   NOTIFICATION_EMAIL=financial.pacholisuzuki@gmail.com
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## How It Works 🔄

1. **User visits the landing page** at `http://localhost:3000`
2. **User scrolls to the newsletter section** and enters their email
3. **Form submission** triggers the `/api/subscribe` endpoint
4. **Server validates** the email address
5. **Resend sends** a beautifully designed welcome email
6. **Admin notification** is sent to your email address
7. **User receives feedback** on the landing page

## API Endpoints 📡

### POST /api/subscribe
Subscribe a user to the newsletter.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully subscribed! Check your email for a welcome message."
}
```

**Response (Error):**
```json
{
  "error": "Please enter a valid email address"
}
```

### POST /api/contact
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry about Suzuki bikes",
  "message": "I'm interested in learning more about your services."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon."
}
```

**Response (Error):**
```json
{
  "error": "Name, email, and message are required"
}
```

### GET /api/health
Health check endpoint for the service.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "Landing Page with Resend Integration"
}
```

## Customization 🎨

### Styling
- Edit the CSS in `index.html` to match your brand colors and fonts
- Update the logo and brand name in the navigation
- Modify the hero section content and call-to-action

### Email Templates
- Customize the welcome email HTML in `server.js`
- Update the sender email address (requires domain verification with Resend)
- Modify the notification email content

### Content
- Update the landing page content in `index.html`
- Change feature descriptions and benefits
- Customize the newsletter subscription messaging

## Deployment 🚀

### Local Development
```bash
npm run dev
```

### Production
1. Set up environment variables on your hosting platform
2. Deploy the application files
3. Ensure your Resend API key is properly configured
4. Set up a custom domain for professional email sending

### Recommended Hosting Platforms
- **Vercel**: Excellent for Node.js applications
- **Netlify**: Great for static sites with serverless functions
- **Railway**: Simple deployment for full-stack apps
- **Heroku**: Traditional PaaS option

## Environment Variables 📝

| Variable | Description | Default |
|----------|-------------|---------|
| `RESEND_API_KEY` | Your Resend API key | Required |
| `PORT` | Server port | 3000 |
| `FROM_EMAIL` | Sender email address | onboarding@resend.dev |
| `NOTIFICATION_EMAIL` | Admin notification email | financial.pacholisuzuki@gmail.com|

## Troubleshooting 🔧

### Common Issues

**Email not sending:**
- Verify your Resend API key is correct
- Check that your sender domain is verified with Resend
- Review server logs for specific error messages

**Form submission fails:**
- Ensure the server is running on the correct port
- Check browser console for JavaScript errors
- Verify network connectivity

**Styling issues:**
- Clear browser cache
- Check for CSS syntax errors
- Verify Font Awesome is loading correctly

## Security Notes 🔐

- API keys are stored in environment variables
- Email validation prevents basic injection attempts  
- CORS is properly configured
- Error messages don't expose sensitive information

## License 📄

This project is licensed under the ISC License.

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support 💬

If you encounter any issues or have questions, please check the troubleshooting section or create an issue in the repository.

---

**Built with ❤️ using Resend API**
