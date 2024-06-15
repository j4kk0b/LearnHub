import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import styles from "./Rating.module.css";

function Rating({ likes, dislikes }) {
  return (
    <div className={styles.container}>
      <span className={styles.cell}>
        <FaThumbsUp /> <span>{likes}</span>
      </span>
      <span className={styles.cell}>
        <FaThumbsDown />
        <span> {dislikes}</span>
      </span>
    </div>
  );
}

export default Rating;
