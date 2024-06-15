import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Nav.module.css";
import {
  FaFileContract,
  FaGraduationCap,
  FaLongArrowAltLeft,
  FaStickyNote,
  FaUser,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import supabase from "../services/supabase";
import { FaRankingStar } from "react-icons/fa6";

function Nav() {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  async function logoutHandler() {
    const { error } = await supabase.auth.signOut();
    localStorage.removeItem("auth");
    navigate("/", { replace: true });
  }

  return (
    <nav className={styles.nav}>
      <NavLink to={"/"} className={styles.logo}>
        <img src={"img/logo.png"} width="120rem" alt="Logo" />
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
            to={"ranking"}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
          >
            <FaRankingStar />
            Ranking
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
      <div className={styles.login}>
        {!isAuthenticated ? (
          <NavLink
            to={"login"}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
          >
            <FaUser />
            Logowanie
          </NavLink>
        ) : (
          <button className={styles.logout} onClick={logoutHandler}>
            <FaLongArrowAltLeft /> Wyloguj
          </button>
        )}
      </div>
    </nav>
  );
}

export default Nav;
