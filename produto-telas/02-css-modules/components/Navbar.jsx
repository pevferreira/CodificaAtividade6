import styles from './Navbar.module.css';

const Navbar = ({ theme, onThemeToggle }) => {
  return (
    <nav className={styles.navbar} aria-label="Navegação principal">
      <div className={styles.navContainer}>
        <div className={styles.logo}>🛒 Loja</div>
        
        <div className={styles.navControls}>
          <button
            className={styles.themeToggle}
            onClick={onThemeToggle}
            aria-label={theme === 'light' ? 'Alternar para modo escuro' : 'Alternar para modo claro'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          <div className={styles.cartBadge} aria-label="3 itens no carrinho">
            3
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;