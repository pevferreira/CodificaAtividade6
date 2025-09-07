import styles from './Skeleton.module.css';

const Skeleton = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonText}></div>
      <div className={`${styles.skeletonText} ${styles.short}`}></div>
      <div className={styles.skeletonButton}></div>
    </div>
  );
};

export default Skeleton;