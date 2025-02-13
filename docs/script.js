document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky navigation with progress bar
const nav = document.querySelector('nav');
const progressBar = document.createElement('div');
progressBar.classList.add('progress-bar');
nav.appendChild(progressBar);

window.addEventListener('scroll', function() {
    // Sticky nav logic
    nav.classList.toggle('sticky', window.scrollY > 0);
    
    // Progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
});

// Project cards animation
const projectCards = document.querySelectorAll('.project-card');
const observerOptions = {
    threshold: 0.2
};

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            projectObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

projectCards.forEach(card => {
    projectObserver.observe(card);
});

const heroText = document.querySelector('.hero h2');
const text = heroText.textContent;
let isDeleting = false;
let i = 0;

function typeWriter() {
    // Si está escribiendo
    if (!isDeleting && i < text.length) {
        heroText.textContent = text.slice(0, i + 1);
        heroText.classList.add('typing');
        i++;
        setTimeout(typeWriter, 100);
    } 
    // Si terminó de escribir
    else if (!isDeleting && i >= text.length) {
        heroText.classList.remove('typing');
        heroText.classList.add('typing-done');
        // Esperar 20 segundos antes de comenzar a borrar
        setTimeout(() => {
            isDeleting = true;
            heroText.classList.add('typing');
            typeWriter();
        }, 20000);
    }
    // Si está borrando
    else if (isDeleting && i > 0) {
        heroText.textContent = text.slice(0, i - 1);
        i--;
        setTimeout(typeWriter, 50); // Borrar más rápido que escribir
    }
    // Si terminó de borrar
    else if (isDeleting && i === 0) {
        isDeleting = false;
        setTimeout(typeWriter, 500); // Pequeña pausa antes de volver a escribir
    }
}

// Iniciar la animación cuando carga la página
window.addEventListener('load', () => {
    heroText.textContent = '';
    heroText.classList.add('typing');
    typeWriter();
});
// Image modal for project cards
projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
        if (e.target.classList.contains('project-image')) {
            e.preventDefault();
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${e.target.src}" alt="${e.target.alt}">
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });
        }
    });
});
