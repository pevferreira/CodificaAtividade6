import { products } from '../shared/data.js';

class ProductStore {
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
                        <span class="product-tag ${product.tag.toLowerCase()}">
                            ${product.tag}
                        </span>
                    ` : ''}
                    
                    <img 
                        src="${product.image}" 
                        alt="${product.title}" 
                        class="product-image"
                        loading="lazy"
                    >
                    
                    <h3 id="title-${product.id}" class="product-title">
                        ${product.title}
                    </h3>
                    
                    <div class="product-price">
                        R$ ${product.price.toFixed(2)}
                    </div>
                    
                    <div class="product-rating" aria-label="Avaliação: ${product.rating} estrelas">
                        ${this.generateStars(product.rating)}
                        <span class="sr-only">${product.rating} estrelas</span>
                    </div>
                    
                    <button class="btn btn-solid" onclick="this.classList.add('loading')">
                        <span class="btn-text">Adicionar ao Carrinho</span>
                        <span class="btn-loading" aria-hidden="true">Carregando...</span>
                    </button>
                </article>
            `).join('');
        }, 1500);
    }

    generateSkeletons() {
        return Array(6).fill().map(() => `
            <div class="product-card">
                <div class="skeleton skeleton-image"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text short"></div>
                <div class="skeleton skeleton-button"></div>
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

new ProductStore();

const style = document.createElement('style');
style.textContent = `
    .btn.loading .btn-text { display: none; }
    .btn.loading .btn-loading { display: block; }
    .btn-loading { display: none; }
    .sr-only { 
        position: absolute; 
        width: 1px; 
        height: 1px; 
        padding: 0; 
        margin: -1px; 
        overflow: hidden; 
        clip: rect(0, 0, 0, 0); 
        white-space: nowrap; 
        border: 0; 
    }
`;
document.head.appendChild(style);