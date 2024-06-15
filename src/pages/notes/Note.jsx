import { useEffect, useState } from "react";
import { useParams } from "react-router";
import supabase from "../../services/supabase";
import Loader from "../../components/Loader";
import styles from "./Note.module.css";
import Rating from "../../components/Rating";

function Note() {
  const { noteId } = useParams();
  const [note, setNote] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getNote() {
      const { data, error } = await supabase
        .from("notes")
        .select("*, users(id, name, surname)")
        .eq("id", noteId)
        .single();

      setNote(data);

      const { data: comments, error: commentsError } = await supabase
        .from("comments")
        .select("*, users(id, name,surname)")
        .eq("noteId", noteId);

      setComments(comments);
    }

    if (noteId) {
      setIsLoading(true);
      getNote();
      setIsLoading(false);
    }
  }, [noteId]);

  if (isLoading || !note.title) return <Loader />;

  return (
    <main className={styles.container}>
      <div>
        <div className={styles.header}>
          <h2>{note.title}</h2>
          <div className={styles.rating}>
            <Rating likes={note.numOfLikes} dislikes={note.numOfDislikes} />
          </div>
          <h4>Kategoria: {note.category}</h4>
          <h4>
            Autor: {note.users.name} {note.users.surname}
          </h4>
          <p>{note.description}</p>
        </div>
      </div>
      <div className={styles.files}>
        {!note.files
          ? "Brak plików do przejrzenia :("
          : note.files.files.map((file, i) => (
              <a key={i} target="_blank" href={file.url}>
                {file.nameOfFile}
              </a>
            ))}
      </div>

      {comments.length > 0 && (
        <div>
          <h2 className={styles.commentsTitle}>Sekcja komentarzy</h2>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.comments}>
              <div key={comment.id}>
                <p>
                  {comment.users.name} {comment.users.surname}
                </p>
                <h3>{comment.comment}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Note;
