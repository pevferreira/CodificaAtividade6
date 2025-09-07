import { products } from '../shared/data.js';

class TailwindStore {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.cartCount = 3;
        this.init();
    }

    init() {
        this.applyTheme();
        this.renderProducts();
        this.setupEventListeners();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        document.documentElement.classList.toggle('dark', this.theme === 'dark');
        this.updateThemeButton();
    }

    updateThemeButton() {
        const button = document.getElementById('themeToggle');
        button.textContent = this.theme === 'light' ? '🌙' : '☀️';
        button.setAttribute('aria-label',
            this.theme === 'light' ? 'Alternar para modo escuro' : 'Alternar para modo claro'
        );
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    renderProducts() {
        const grid = document.getElementById('productsGrid');

        // Mostrar skeleton loading
        grid.innerHTML = this.generateSkeletons();

        // Simular delay de carregamento
        setTimeout(() => {
            grid.innerHTML = products.map(product => `
                <article class="product-card" aria-labelledby="title-${product.id}">
                    ${product.tag ? `
                        <span class="product-tag absolute top-4 right-4 ${product.tag === 'Promo'
                        ? 'bg-amber-500'
                        : 'bg-blue-500'
                    } text-white px-2 py-1 rounded text-xs font-bold uppercase z-10">
                            ${product.tag}
                        </span>
                    ` : ''}
                    
                    <img 
                        src="${product.image}" 
                        alt="${product.title}"
                        class="product-image w-full aspect-square object-cover rounded mb-4 bg-gray-200 dark:bg-gray-600"
                        loading="lazy"
                    >
                    
                    <h3 id="title-${product.id}" class="product-title text-base font-semibold mb-2 line-clamp-2 min-h-[2.8rem] leading-tight">
                        ${product.title}
                    </h3>
                    
                    <div class="product-price text-xl font-bold text-blue-500 dark:text-blue-400 mb-2">
                        R$ ${product.price.toFixed(2)}
                    </div>
                    
                    <div class="product-rating flex items-center gap-1 mb-4 text-amber-500" aria-label="Avaliação: ${product.rating} estrelas">
                        ${this.generateStars(product.rating)}
                        <span class="sr-only">${product.rating} estrelas</span>
                    </div>
                    
                    <button class="btn btn-solid" onclick="this.classList.add('loading')">
                        <span class="btn-text">Adicionar ao Carrinho</span>
                        <span class="btn-loading hidden">Carregando...</span>
                    </button>
                </article>
            `).join('');

            // Adicionar classes responsivas via JavaScript
            this.applyResponsiveClasses();

        }, 1500);
    }

    applyResponsiveClasses() {
        const grid = document.getElementById('productsGrid');
        grid.classList.add(
            'sm:grid-cols-2',
            'md:grid-cols-3',
            'lg:grid-cols-4'
        );
    }

    generateSkeletons() {
        return Array(6).fill().map(() => `
            <div class="product-card">
                <div class="skeleton w-full aspect-square mb-4 rounded"></div>
                <div class="skeleton h-4 mb-2 rounded"></div>
                <div class="skeleton h-4 w-3/5 mb-4 rounded"></div>
                <div class="skeleton h-10 rounded"></div>
            </div>
        `).join('');
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars += '★';
            } else if (i === fullStars && hasHalfStar) {
                stars += '⭐';
            } else {
                stars += '☆';
            }
        }

        return stars;
    }

    setupEventListeners() {
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        document.getElementById('themeToggle').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                this.toggleTheme();
                e.preventDefault();
            }
        });
    }
}

// Inicializar a loja
new TailwindStore();

// CSS adicional para estados de loading
const style = document.createElement('style');
style.textContent = `
    .btn.loading .btn-text { display: none; }
    .btn.loading .btn-loading { display: block; }
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    
    @media (max-width: 480px) {
        .products-grid {
            grid-template-columns: repeat(1, 1fr) !important;
        }
    }
    
    @media (min-width: 481px) and (max-width: 768px) {
        .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
        }
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
        .products-grid {
            grid-template-columns: repeat(3, 1fr) !important;
        }
    }
    
    @media (min-width: 1025px) {
        .products-grid {
            grid-template-columns: repeat(4, 1fr) !important;
        }
    }
`;
document.head.appendChild(style);