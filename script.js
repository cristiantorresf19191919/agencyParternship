// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.8)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.07)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // Scroll animations for elements
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 1s ${entry.target.dataset.delay || '0s'} forwards ease-out`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.pricing-card, .portfolio-item, .section-title, .section-subtitle, .pill, .contact-container > *').forEach((el) => {
        el.style.opacity = '0';
        scrollObserver.observe(el);
    });

    // Add fadeInUp keyframe animation to the stylesheet
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `, styleSheet.cssRules.length);


    // Contact form submission
    document.getElementById('contact-form').addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            company: formData.get('company'),
            projectType: formData.get('project-type'),
            budget: formData.get('budget'),
            timeline: formData.get('timeline'),
            message: formData.get('message'),
            timestamp: new Date()
        };

        console.log('Form Submitted:', contactData);
        
        // Asynchronously save data to Firebase
        saveContactDataToFirebase(contactData);

        alert('Gracias por tu mensaje. Te contactaremos pronto.');
        e.target.reset();
    });

});

// --- Firebase Integration Skeleton ---

// IMPORTANT: Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID", // IMPORTANT: Enter your Project ID here
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
let app;
let db;
// Basic check if config is placeholder
if (firebaseConfig.projectId !== "YOUR_PROJECT_ID") {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
} else {
    console.warn("Firebase config is not set. Form data will not be saved to Firestore.");
}

/**
 * Saves contact form data to Firebase Firestore.
 * This function will only work if you have configured your firebaseConfig object above.
 */
async function saveContactDataToFirebase(data) {
    if (!db) {
        console.log("Firebase is not initialized. Cannot save data.");
        // Log the data locally as a fallback
        console.log("Firebase skeleton: Data to be sent:", data);
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "contacts"), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document to Firestore: ", e);
        alert("Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.");
    }
}
