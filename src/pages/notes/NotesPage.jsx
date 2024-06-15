import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import supabase from "../../services/supabase";
import Filter from "./Filter";
import NotesTable from "./NotesTable";

function NotesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    async function getNotes() {
      setIsLoading(true);
      const { data: notes, error } = await supabase.from("notes").select("");
      setNotes(
        notes.sort((a, b) => new Date(a.createdWhen) - new Date(b.createdWhen))
      );
      setFilteredNotes(notes);
      setIsLoading(false);
    }

    getNotes();
  }, []);

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  function onFilterBySearch(filteredValue) {
    if (filteredValue.length === 0) {
      setFilteredNotes(notes);
      return;
    }

    const filteredValues = notes.filter((note) =>
      note.title.toLowerCase().includes(filteredValue.toLowerCase())
    );

    setFilteredNotes(filteredValues);
  }

  function onFilterByOption(filteredOption) {
    let filteredValues = [...filteredNotes];

    if (filteredOption === "date_latest") {
      filteredValues.sort(
        (a, b) => new Date(a.createdWhen) - new Date(b.createdWhen)
      );
    } else if (filteredOption === "date_oldest") {
      filteredValues.sort(
        (a, b) => new Date(b.createdWhen) - new Date(a.createdWhen)
      );
    } else if (filteredOption === "alfa_az") {
      filteredValues.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filteredOption === "alfa_za") {
      filteredValues.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredNotes(filteredValues);
  }

  if (isLoading) return <Loader />;

  return (
    <main>
      <Filter
        onFilterBySearch={onFilterBySearch}
        onFilterByOption={onFilterByOption}
      />
      <NotesTable notes={filteredNotes} />
    </main>
  );
}

export default NotesPage;
