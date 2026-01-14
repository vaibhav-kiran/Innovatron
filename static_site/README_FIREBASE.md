# Firebase Deployment Guide for Innovatron 26

This guide will help you deploy the static website to Firebase Hosting with Cloud Functions for the contact form.

## Prerequisites

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **Firebase CLI** - Install globally:
   ```bash
   npm install -g firebase-tools
   ```
3. **Python 3.11** - Required for Cloud Functions
4. **Firebase Account** - Sign up at [firebase.google.com](https://firebase.google.com)

## Setup Steps

### 1. Login to Firebase

```bash
firebase login
```

### 2. Initialize Firebase Project

```bash
cd static_site
firebase init
```

When prompted:
- **Select features**: Choose `Hosting` and `Functions`
- **Select existing project** or create a new one
- **Public directory**: `.` (current directory)
- **Single-page app**: `No`
- **Set up automatic builds**: `No`
- **Functions language**: `Python`
- **Python version**: `Python 3.11`

### 3. Update Project Configuration

Edit `.firebaserc` and replace `your-project-id` with your actual Firebase project ID:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

### 4. Configure Cloud Function Environment Variables

Set the email configuration as environment variables:

```bash
firebase functions:config:set smtp.server="smtp.gmail.com"
firebase functions:config:set smtp.port="587"
firebase functions:config:set email.user="your-email@gmail.com"
firebase functions:config:set email.password="your-app-password"
firebase functions:config:set email.recipients="nitinmaran@karunya.edu.in,alwinrithick@karunya.edu.in"
```

**Note**: For Gmail, you'll need to:
1. Enable 2-Factor Authentication
2. Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)

### 5. Update Contact Form Function URL

Edit `contact.html` and update the `FUNCTION_URL` variable around line 230:

**For Production:**
```javascript
const FUNCTION_URL = 'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/contact_form';
```

Replace `YOUR_PROJECT_ID` with your actual Firebase project ID.

**For Local Testing:**
The code already handles localhost automatically.

### 6. Deploy to Firebase

#### Deploy Everything (Hosting + Functions):
```bash
firebase deploy
```

#### Deploy Only Hosting:
```bash
firebase deploy --only hosting
```

#### Deploy Only Functions:
```bash
firebase deploy --only functions
```

### 7. Test Locally (Optional)

```bash
# Start Firebase emulators
firebase emulators:start

# Or start only hosting
firebase serve
```

Visit `http://localhost:5000` to test your site locally.

## Project Structure

```
static_site/
├── index.html
├── about.html
├── schedule.html
├── location.html
├── register.html
├── contact.html
├── firebase.json          # Firebase configuration
├── .firebaserc           # Firebase project settings
├── static/               # Static assets
│   ├── css/
│   ├── js/
│   └── images/
└── functions/           # Cloud Functions
    ├── main.py          # Contact form handler
    └── requirements.txt # Python dependencies
```

## Cloud Function Details

The contact form Cloud Function (`functions/main.py`) replaces the Flask `/contact` route:

- **Endpoint**: `https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/contact_form`
- **Method**: POST
- **Request Body**: `{ "name": "...", "email": "...", "message": "..." }`
- **Response**: `{ "success": true/false, "message": "..." }`

## Troubleshooting

### Contact Form Not Working

1. **Check Function URL**: Ensure the URL in `contact.html` matches your deployed function
2. **Check CORS**: The function includes CORS headers, but verify they're correct
3. **Check Environment Variables**: Verify email config is set correctly
4. **Check Function Logs**: 
   ```bash
   firebase functions:log
   ```

### Email Not Sending

1. **Verify SMTP credentials**: Check Gmail App Password is correct
2. **Check Function Logs** for error messages
3. **Test SMTP settings** independently

### Deployment Issues

1. **Clear Firebase cache**: `firebase deploy --force`
2. **Check Firebase CLI version**: `firebase --version` (should be latest)
3. **Verify project permissions**: Ensure you have deploy permissions

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_SERVER` | SMTP server address | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `EMAIL_USER` | Sender email address | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | App password (not regular password) | `xxxx xxxx xxxx xxxx` |
| `RECIPIENT_EMAILS` | Comma-separated recipient emails | `email1@example.com,email2@example.com` |

## Additional Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Firebase Cloud Functions Documentation](https://firebase.google.com/docs/functions)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

## Support

For issues or questions, contact:
- Nitin Maran M: nitinmaran@karunya.edu.in
- Alwin Rithick Raaj: alwinrithick@karunya.edu.in
