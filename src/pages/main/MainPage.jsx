import styles from "./MainPage.module.css";
import supabase from "../../services/supabase";
import { useState, useEffect,
 } from "react";
import Loader from "../../components/Loader";
import { NavLink } from "react-router-dom";
function MainPage() {

    const [isLoading, setIsLoading] = useState(false);
    const [notes, setNotes] = useState([]);
  
    useEffect(() => {
      async function getNotes() {
        setIsLoading(true);
        const { data: notes, error } = await supabase.from("notes").select("").limit(3);
        setNotes(notes);
        setIsLoading(false);
      }
  
      getNotes();
    }, []);
  
    if (isLoading) return <Loader />;
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>LearnHub</h1>
      <div className={styles.mainContent}>
        <article className={styles.box}>
        <p className={styles.desc}>
        LearnHub to Twoje ostateczne miejsce dla bezproblemowej i efektywnej nauki.
        Niezależnie od tego, czy jesteś uczniem dążącym do osiągnięcia doskonałości akademickiej,
          czy nauczycielem pragnącym poprawić swoje metody nauczania, LearnHub dostarcza wszystkie narzędzia,
          których potrzebujesz w jednym miejscu. Nasza platforma łączy nauczycieli i uczniów, tworząc środowisko, 
          w którym wiedza płynie swobodnie i efektywnie.
        </p>
        </article>
        <article className={styles.notesBox}>
           <h1 className={styles.titletext}>
               Najnowsze Notatki
            </h1>
            <ul className={styles.Notes}>
            {notes.map((note) => {
              return (
                <NavLink key={note.id} to={`${note.id}`}>
                  <li>
                    <div>{note.title} {note.createdWhen}</div>
                    <div>{note.category}</div>
                    <div>{note.description.slice(0, 100)}...</div>
                  </li>
                </NavLink>
              );
            })}
          </ul>
        </article>
      </div>
    </main>
  );
}

export default MainPage;
