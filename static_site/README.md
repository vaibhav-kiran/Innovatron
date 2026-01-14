# Innovatron 26 - Static Website

A fully static website ready to deploy to Firebase Hosting.

## 🚀 Quick Deploy (No CLI Required!)

**Easiest Method:** Upload files directly via Firebase Console!

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create/Select project → Hosting → Get Started
3. Upload all HTML files + `static` folder
4. Deploy!

See `DEPLOY_DIRECT.md` for detailed instructions.

## 📁 Project Structure

```
static_site/
├── index.html          # Home page
├── about.html          # About page
├── schedule.html       # Schedule page
├── location.html       # Location page
├── register.html       # Registration page
├── contact.html        # Contact page (with form)
├── static/             # Static assets
│   ├── css/
│   ├── js/
│   └── images/
└── functions/          # Cloud Functions (optional)
    ├── index.js        # Node.js function
    └── package.json    # Dependencies
```

## 🔧 Contact Form Setup

### Option 1: Formspree (Recommended - No Backend!)

1. Sign up at [Formspree.io](https://formspree.io)
2. Create form → Get form ID
3. Update `contact.html` line ~268 with your form ID
4. Done! Works immediately.

### Option 2: Firebase Cloud Functions

Requires Firebase CLI setup. See `DEPLOY.md` for instructions.

## 📝 Files Changed from Flask

- ✅ All Jinja2 templates → Static HTML
- ✅ Flask routes → Static HTML pages
- ✅ Flask contact form → JavaScript + Formspree/Cloud Function
- ✅ All `url_for()` → Relative paths
- ✅ All `{{ variables }}` → Static content

## 🌐 Deployment Options

1. **Firebase Console** (Easiest - No CLI)
   - Upload files directly
   - See `DEPLOY_DIRECT.md`

2. **Firebase CLI** (Advanced)
   - Requires Node.js
   - See `DEPLOY.md`

3. **GitHub + Firebase** (Automatic)
   - Connect GitHub repo
   - Auto-deploy on push

## ✅ Features

- ✅ Fully responsive design
- ✅ Countdown timer
- ✅ Animated stats
- ✅ Contact form
- ✅ Mobile navigation
- ✅ Smooth scrolling
- ✅ All original UI/UX preserved

## 📚 Documentation

- `DEPLOY_DIRECT.md` - Deploy without CLI
- `DEPLOY.md` - Deploy with Firebase CLI
- `README_FIREBASE.md` - Detailed Firebase guide
- `CONVERSION_SUMMARY.md` - Conversion details

## 🎯 Quick Start

1. **Upload files** to Firebase Hosting via console
2. **Set up contact form** using Formspree (5 minutes)
3. **Test** your site
4. **Done!** 🎉

No coding, no CLI, no terminal required!
