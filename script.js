// script.js
// ——— Importar sólo desde la CDN de Firebase (v9 modular) ———
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// ——— Tu configuración de Firebase (cópiala de la consola, Apps web) ———
const firebaseConfig = {
  apiKey: "AIzaSyAY8bJ3fj_Z3XiFCYhB9-0Np6d6Hsihq88",
  authDomain: "agencyparnertdhip.firebaseapp.com",
  projectId: "agencyparnertdhip",
  storageBucket: "agencyparnertdhip.firebasestorage.app",
  messagingSenderId: "544806440830",
  appId: "1:544806440830:web:f5b2877ce2162dd3dfad2f"
};

// ——— Inicializa Firebase y Firestore ———
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ——— Helper para animaciones y scroll (tu código existente) ———
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href'))
        .scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Efecto en header
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 50
      ? '0 2px 10px rgba(0,0,0,0.07)'
      : 'none';
  });

  // Scroll animations
  const scrollObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    scrollObserver.observe(el);
  });

  // ——— Envío de formulario ———
  document.getElementById('contact-form').addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.timestamp = new Date();

    // Guarda en Firestore
    try {
      const docRef = await addDoc(collection(db, 'contacts'), data);
      console.log('Documento creado con ID:', docRef.id);
      alert('Gracias por tu mensaje. Te contactaremos pronto.');
      e.target.reset();
    } catch (err) {
      console.error('Error guardando en Firestore:', err);
      alert('Hubo un error al enviar tu mensaje. Intenta de nuevo.');
    }
  });
});
