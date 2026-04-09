document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVEGAÇÃO ENTRE SEÇÕES =====
    const sections = document.querySelectorAll('.page-section');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    function showSection(targetId) {
        sections.forEach(section => section.classList.remove('active'));
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo(0, 0);
        }
        sidebarLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-target') === targetId);
        });
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(link.getAttribute('data-target'));
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                overlay?.classList.remove('visible');
            }
        });
    });

    // ===== MOBILE MENU ======
    const sidebar = document.getElementById('sidebar');
    let overlay = null;
    
    if (window.innerWidth <= 768) {
        const main = document.querySelector('.main-content');
        const header = document.createElement('div');
        header.className = 'mobile-header';
        header.innerHTML = `
            <button class="mobile-menu-btn" aria-label="Menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
            </button>
            <span class="mobile-title">Portal SETEG</span>
        `;
        main.prepend(header);

        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);

        const toggleMenu = () => { 
            sidebar.classList.toggle('open'); 
            overlay.classList.toggle('visible'); 
        };
        
        header.querySelector('.mobile-menu-btn').addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }

    // ===== FADE-UP ANIMATIONS =====
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

    // ===== MANUAL BUTTONS (DEMO) =====
   document.querySelectorAll('.manual-item-btn').forEach(btn => {
    // Se já for um link (<a>), não adiciona event listener
    if (btn.tagName === 'A') return;
    
    btn.addEventListener('click', function() {
        const title = this.closest('.manual-item')?.querySelector('.manual-item-title')?.textContent;
        alert(`Abrindo: ${title}\n\nEm produção, isso abrirá o PDF do manual.`);
    });
});

    console.log('✅ Portal SETEG v1.0.0 carregado com sucesso!');
});
