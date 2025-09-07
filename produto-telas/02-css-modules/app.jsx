import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { products } from '../shared/data.js';
import styles from './App.module.css';
import Navbar from './components/Navbar.jsx';
import ProductCard from './components/ProductCard.jsx';
import Skeleton from './components/Skeleton.jsx';

function App() {
  const [theme, setTheme] = useState(() => 
    localStorage.getItem('theme') || 'light'
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={styles.app}>
      <Navbar theme={theme} onThemeToggle={toggleTheme} />
      
      <main className={styles.mainContent}>
        <div className={styles.productsGrid}>
          {isLoading ? (
            Array(6).fill().map((_, index) => (
              <Skeleton key={index} />
            ))
          ) : (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);