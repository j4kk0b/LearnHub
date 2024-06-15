import { useState } from "react";
import styles from "./NewNote.module.css";
import supabase from "../../services/supabase";

function NewNote() {
  const { email } = JSON.parse(localStorage.getItem("auth"));
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState("");

  async function submitHandler(e) {
    e.preventDefault();

    if (!title || !category || !desc || !files) return;

    const filesList = [];

    for (let i = 0; i < files.length; i++) {
      const { data, error } = await supabase.storage
        .from("files")
        .upload(`public/${files[i].name}`, files[i], {
          cacheControl: "3600",
          upsert: false,
        });

      filesList.push({
        url: `https://ttknlranfprmimeixisy.supabase.co/storage/v1/object/public/files/public/${files[i].name}`,
        nameOfFile: files[i].name,
      });
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (userError) {
      console.error("Error fetching user:", userError);
      return;
    }

    const newNoteRecord = {
      createdBy: user.id,
      title: title,
      category: category,
      description: desc,
      files: { files: filesList }, // Use the correct format here
      numOfLikes: 0,
      numOfDislikes: 0,
      createdWhen: new Date(),
    };

    const { data: insertion, error: errorInsertion } = await supabase
      .from("notes")
      .insert(newNoteRecord)
      .select();

    if (errorInsertion) {
      console.error("Error inserting note:", errorInsertion);
      return;
    }

    console.log(insertion);
  }

  return (
    <main className={styles.container}>
      <h2>Dodaj swoją własną notatkę</h2>

      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.formCell}>
          <label htmlFor="noteTitle">Tytuł notatki</label>
          <input
            id="noteTitle"
            type="text"
            placeholder="Notatka z..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formCell}>
          <label htmlFor="noteCategory">Kategoria</label>
          <input
            id="noteCategory"
            type="text"
            placeholder="Analiza matem..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className={styles.formCell}>
          <label htmlFor="noteDesc">Opis</label>
          <textarea
            id="noteDesc"
            type="text"
            placeholder="Notatki zawierają..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.formCell}>
          <label htmlFor="noteFiles">Pliki</label>
          <input
            id="noteFiles"
            type="file"
            multiple="multiple"
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>

        <button className={styles.btn}>Dodaj notatkę</button>
      </form>
    </main>
  );
}

export default NewNote;
