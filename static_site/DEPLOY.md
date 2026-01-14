# Quick Deployment Guide

## Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

## Step 2: Login to Firebase
```bash
firebase login
```

## Step 3: Initialize Firebase (if not done already)
```bash
cd static_site
firebase init
```
- Select: **Hosting** and **Functions**
- Choose existing project or create new
- Public directory: **.** (current directory)
- Functions language: **Python**

## Step 4: Update Configuration Files

### 4a. Update `.firebaserc`
Replace `your-project-id` with your actual Firebase project ID.

### 4b. Update `static/js/config.js`
Replace `your-project-id` with your actual Firebase project ID.

### 4c. Set Environment Variables
```bash
firebase functions:config:set smtp.server="smtp.gmail.com"
firebase functions:config:set smtp.port="587"
firebase functions:config:set email.user="your-email@gmail.com"
firebase functions:config:set email.password="your-gmail-app-password"
firebase functions:config:set email.recipients="nitinmaran@karunya.edu.in,alwinrithick@karunya.edu.in"
```

**Note**: For Gmail, create an App Password:
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification → App Passwords
3. Generate password for "Mail"

## Step 5: Deploy
```bash
firebase deploy
```

## Step 6: Test
Visit your Firebase Hosting URL (shown after deployment) and test the contact form.

## Troubleshooting

**Function URL not working?**
- Check `static/js/config.js` has correct project ID
- Verify function deployed: `firebase functions:list`
- Check logs: `firebase functions:log`

**Email not sending?**
- Verify environment variables: `firebase functions:config:get`
- Check function logs for errors
- Ensure Gmail App Password is correct (not regular password)

**Need to redeploy?**
```bash
firebase deploy --only hosting    # Hosting only
firebase deploy --only functions  # Functions only
firebase deploy                    # Everything
```
