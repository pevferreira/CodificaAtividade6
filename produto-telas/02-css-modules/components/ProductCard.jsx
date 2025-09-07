import { useState } from 'react';
import Button from './Button.jsx';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const generateStars = (rating) => {
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
  };

  return (
    <article className={styles.productCard} aria-labelledby={`title-${product.id}`}>
      {product.tag && (
        <span className={`${styles.productTag} ${styles[product.tag.toLowerCase()]}`}>
          {product.tag}
        </span>
      )}
      
      <img 
        src={product.image} 
        alt={product.title}
        className={styles.productImage}
        loading="lazy"
      />
      
      <h3 id={`title-${product.id}`} className={styles.productTitle}>
        {product.title}
      </h3>
      
      <div className={styles.productPrice}>
        R$ {product.price.toFixed(2)}
      </div>
      
      <div className={styles.productRating} aria-label={`Avaliação: ${product.rating} estrelas`}>
        {generateStars(product.rating)}
        <span className="sr-only">{product.rating} estrelas</span>
      </div>
      
      <Button
        variant="solid"
        loading={isLoading}
        onClick={handleAddToCart}
        aria-label={`Adicionar ${product.title} ao carrinho`}
      >
        {isLoading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
      </Button>
    </article>
  );
};

export default ProductCard;