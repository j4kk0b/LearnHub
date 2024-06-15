import { NavLink } from "react-router-dom";
import styles from "./NotesTable.module.css";

function NotesTable({ notes }) {
  return (
    <div className={styles.container}>
      <ul className={styles.header}>
        <li>Temat</li>
        <li>Kategoria</li>
        <li>Opis</li>
        <li>Data utworzenia</li>
      </ul>

      <ul className={styles.notesList}>
        {notes.map((note) => {
          return (
            <NavLink key={note.id} to={`${note.id}`}>
              <li>
                <div>{note.title}</div>
                <div>{note.category}</div>
                <div>{note.description.slice(0, 20)}...</div>
                <div>{note.createdWhen}</div>
              </li>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
}

export default NotesTable;
