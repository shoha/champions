import styles from "./Table.module.css";

export const Table = ({ children, className, ...rest }) => {
  return (
    <table
      className={`${className} ${styles.alternate} ${styles.table}`}
      {...rest}
    >
      {children}
    </table>
  );
};
