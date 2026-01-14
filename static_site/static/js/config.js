// Firebase Configuration
// Update these values after deploying to Firebase

const FIREBASE_CONFIG = {
    // Replace 'your-project-id' with your actual Firebase project ID
    projectId: 'innovatron-2503b',
    
    // Function region (usually 'us-central1')
    functionRegion: 'us-central1',
    
    // Function name (matches the function name in functions/index.js)
    functionName: 'contactForm'
};

// Auto-generate function URL
const FUNCTION_URL = (() => {
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';
    
    if (isLocalhost) {
        // Local emulator URL
        return `http://localhost:5001/${FIREBASE_CONFIG.projectId}/${FIREBASE_CONFIG.functionRegion}/${FIREBASE_CONFIG.functionName}`;
    } else {
        // Production URL
        return `https://${FIREBASE_CONFIG.functionRegion}-${FIREBASE_CONFIG.projectId}.cloudfunctions.net/${FIREBASE_CONFIG.functionName}`;
    }
})();
