import styles from "./Search.module.css";

function Search({ placeholder = "Wyszukaj...", callbackFn }) {
  return (
    <input
      className={styles.search}
      type="text"
      placeholder={placeholder}
      onChange={(e) => callbackFn(e.target.value)}
    />
  );
}

export default Search;
