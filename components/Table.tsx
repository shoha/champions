import styles from "./Table.module.css";

export const Table = ({ children, className, ...rest }) => {
  return (
    <table className={`${className} ${styles.alternate}`} {...rest}>
      {children}
    </table>
  );
};
