import { Outlet } from "react-router";
import Nav from "./Nav";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.layout}>
      <Nav />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
