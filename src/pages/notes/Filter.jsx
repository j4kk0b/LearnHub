import { useState } from "react";
import styles from "./Filter.module.css";

function Filter() {
  const [filterOption, setFilterOption] = useState("date_latest");

  return (
    <div>
      <button>Dodaj notatkę</button>

      <div>
        Sortowanie po:
        <select
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
