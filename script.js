// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.section, .project-card, .module-card, .methodology-card, .team-card, .gamification-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add click effects to gamification cards
    const gamificationCards = document.querySelectorAll('.gamification-card');
    gamificationCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Adicionar evento de clique para as alternativas das questões
    const alternatives = document.querySelectorAll('.alternative');
    alternatives.forEach(alternative => {
        alternative.addEventListener('click', function() {
            // Remover seleção de todas as alternativas na mesma questão
            const parentCard = this.closest('.gamification-card');
            parentCard.querySelectorAll('.alternative').forEach(alt => {
                alt.classList.remove('selected');
            });
            
            // Adicionar seleção à alternativa clicada
            this.classList.add('selected');
        });
    });

    console.log('🚀 Design Instrucional de Finanças - FT UnB Carregado!');
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Reset any focused elements if needed
        document.activeElement.blur();
    }
});

// Função para copiar o prompt
function copyPrompt() {
    const promptText = `Create a vertical 9:16 video in a selfie video style, as if filmed by the main character for her Instagram Story. The main character is a 50-year-old Brazilian Black woman named Ana. She has medium-length natural afro hair (rounded shape) and always wears a fitted short-sleeve emerald Yellow blouse (with a distinct round neckline) (#FBD405) and classic blue jeans (#1F4E79). She wears medium gold hoop earrings (about 4 cm in diameter). Her nails are painted bright red (#C41E3A) and she wears dark red lipstick (#B22222). Her speaking style is very casual, charismatic, funny, and slightly clumsy but intelligent—as if she's talking directly to a friend on her phone. Facial expressions should be warm, charismatic, and break the fourth wall by looking directly into the camera. Gestures should be natural, spontaneous, and typical of a selfie video. Her posture is confident yet simple and welcoming. Setting: a recycling cooperative with activity in the background. Behind Ana, there are workers wearing reflective green vests, sorting tables, bags of recyclables, stacked boxes, and carts. The environment should look realistic and authentic—organized but with a constant sense of activity. Lighting should be natural daylight. Filming style: Vertical 9:16 format. Selfie video aesthetic. Use a smartphone camera look with a slightly wider lens (approx. 28mm). The camera movement should be natural and slightly unsteady, as if she is holding it herself. Keep the focus sharp on Ana, with the background slightly visible but not blurred. Realistic shadows and natural light. Dialogue (in Portuguese, in a very casual, charismatic, and funny tone, as if talking to a friend on social media.): "Você tem problemas na hora de fazer compras? Vem comigo que vou te ensinar o truque da lista de compras."`;
    
    navigator.clipboard.writeText(promptText).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        
        copyBtn.innerHTML = '<span>✅</span><span>Copiado!</span>';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar texto: ', err);
        alert('Erro ao copiar o texto. Tente novamente.');
    });
}

// Otimização de imagens - carregamento lazy
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        if (img.complete) {
            // Imagem já carregada
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});