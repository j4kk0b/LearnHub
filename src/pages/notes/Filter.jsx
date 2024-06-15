import { useState, useEffect } from "react";
import styles from "./Filter.module.css";
import { NavLink } from "react-router-dom";
import Search from "../../components/Search";
import useAuth from "../../hooks/useAuth";

function Filter({ onFilterBySearch, onFilterByOption }) {
  const [filterOption, setFilterOption] = useState("date_latest");
  const isAuthenticated = useAuth();

  useEffect(() => {
    onFilterByOption(filterOption);
  }, [filterOption]);

  return (
    <div className={styles.container}>
      {isAuthenticated && (
        <NavLink className={styles.btn} to={"dodaj"}>
          Dodaj notatkę
        </NavLink>
      )}

      <Search callbackFn={onFilterBySearch} />

      <div className={styles.selectContainer}>
        <span>Sortowanie po:</span>
        <select
          className={styles.select}
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="date_latet">data (od najnowszych)</option>
          <option value="date_oldest">data (od najstarszych)</option>
          <option value="alfa_az">alfabetycznie (A-Z)</option>
          <option value="alfa_za">alfabetycznie (Z-A)</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
