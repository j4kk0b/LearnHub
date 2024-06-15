import { useState } from "react";
import styles from "./ContactPage.module.css";
import supabase from "../../services/supabase";
import { useNavigate } from "react-router";
import { GoTrueAdminApi } from "@supabase/supabase-js";

function ContactPage() {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [wasSent, setWasSent] = useState(false);
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("messages")
      .insert({ email, title, message });

    setWasSent(true);

    setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
  }

  return (
    <div className={styles.container}>
      <h2>Kontakt</h2>
      {wasSent ? (
        <h2>Wiadomość została wysłana</h2>
      ) : (
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.mergedFormCell}>
            <div className={styles.formCell}>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="janusz@email.pl"
              />
            </div>
            <div className={styles.formCell}>
              <label htmlFor="title">Temat</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                type="text"
                placeholder="Super aplikacja..."
              />
            </div>
          </div>
          <div className={styles.formCell}>
            <label htmlFor="message">Wiadomość</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="message"
              type="text"
              rows={8}
            />
          </div>
          <button className={styles.btn}>Wyślij wiadomość</button>
        </form>
      )}
    </div>
  );
}

export default ContactPage;
