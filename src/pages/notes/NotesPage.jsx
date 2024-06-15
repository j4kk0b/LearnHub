import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import supabase from "../../services/supabase";
import Filter from "./Filter";
import NotesTable from "./NotesTable";

function NotesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function getNotes() {
      setIsLoading(true);
      const { data: notes, error } = await supabase.from("notes").select("");
      setNotes(notes);
      setIsLoading(false);
    }

    getNotes();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <main>
      <Filter />
      <NotesTable notes={notes} />
    </main>
  );
}

export default NotesPage;
