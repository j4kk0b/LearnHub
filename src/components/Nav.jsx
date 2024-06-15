import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import { FaFileContract, FaGraduationCap, FaStickyNote } from "react-icons/fa";

function Nav() {
  return (
    <nav className={styles.nav}>
      <NavLink to={"/"} className={styles.logo}>
        <img src={"./img/logo.png"} width="120rem" alt="Logo" />
      </NavLink>
      <ul>
        <li>
          <NavLink
            to={"notatki"}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
          >
            <FaStickyNote />
            Notatki
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"testy"}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
          >
            <FaGraduationCap />
            Testy
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"kontakt"}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
          >
            <FaFileContract />
            Kontakt
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
