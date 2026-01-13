from flask import Flask, render_template, request, redirect, url_for, flash
from datetime import datetime
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
app.secret_key = 'innovatron26_secret_key_change_in_production'

# Hackathon details
HACKATHON_INFO = {
    'name': 'Innovatron 26',
    'tagline': 'Design. Deploy. Innovate.',
    'dates': 'January 28-30, 2026',
    'type': 'Design & Deploy Hackathon',
    'quote': 'Innovation distinguishes between a leader and a follower.',
    'quote_author': 'Steve Jobs',
    'location': 'Mechanical Engineering Division, Karunya Institute of Technology and Sciences',
    'address': 'Karunya Nagar, Coimbatore, Tamil Nadu 641114, India'
}

# Email configuration - Update these with your SMTP settings
SMTP_SERVER = 'smtp.gmail.com'  # For Gmail, change if using different provider
SMTP_PORT = 587
EMAIL_USER = 'your-email@gmail.com'  # Update with your email
EMAIL_PASSWORD = 'your-app-password'  # Update with your app password
RECIPIENT_EMAILS = ['nitinmaran@karunya.edu.in', 'alwinrithick@karunya.edu.in']

@app.route('/')
def home():
    return render_template('index.html', info=HACKATHON_INFO)

@app.route('/about')
def about():
    return render_template('about.html', info=HACKATHON_INFO)

@app.route('/schedule')
def schedule():
    return render_template('schedule.html', info=HACKATHON_INFO)

@app.route('/location')
def location():
    return render_template('location.html', info=HACKATHON_INFO)

@app.route('/register')
def register():
    return render_template('register.html', info=HACKATHON_INFO)

def send_email(name, email, message):
    """Send email to both recipients"""
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = ', '.join(RECIPIENT_EMAILS)
        msg['Subject'] = f'New Contact Form Message from {name} - Innovatron 26'
        
        body = f"""
        You have received a new message from the Innovatron 26 contact form:
        
        Name: {name}
        Email: {email}
        
        Message:
        {message}
        
        ---
        This message was sent from the Innovatron 26 website contact form.
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(EMAIL_USER, RECIPIENT_EMAILS, text)
        server.quit()
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        if not name or not email or not message:
            flash('Please fill in all fields', 'error')
            return redirect(url_for('contact'))
        
        # Send email to both recipients
        if send_email(name, email, message):
            flash('Thank you for your message! We will get back to you soon.', 'success')
        else:
            flash('There was an error sending your message. Please try again or contact us directly.', 'error')
        
        return redirect(url_for('contact'))
    
    return render_template('contact.html', info=HACKATHON_INFO)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

