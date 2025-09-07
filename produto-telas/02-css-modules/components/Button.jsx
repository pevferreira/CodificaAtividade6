import styles from './Button.module.css';

const Button = ({ 
  variant = 'solid', 
  loading = false, 
  children, 
  ...props 
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[variant]}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <span className={styles.loadingSpinner} aria-hidden="true"></span>
          <span className="sr-only">Carregando...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;