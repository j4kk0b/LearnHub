import { useEffect, useState } from "react";
import { useParams } from "react-router";
import supabase from "../../services/supabase";
import Loader from "../../components/Loader";

function Note() {
  const { noteId } = useParams();
  const [note, setNote] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getNote() {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("notes")
        .select()
        .eq("id", Number(noteId))
        .single();

      setNote(data);

      setIsLoading(false);
    }

    if (noteId) {
      getNote();
    }
  }, [noteId]);

  if (isLoading || !note) return <Loader />;

  return <div>Note: {note.title}</div>;
}

export default Note;
