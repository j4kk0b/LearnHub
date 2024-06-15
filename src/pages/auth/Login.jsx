import styles from "./Login.module.css";
import { useState } from "react";
import supabase from "../../services/supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  async function submitHandler(e) {
    setError("");
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!data.session) {
      setPassword("");
      setError("Błędne dane logowania");
      return;
    }

    const sessionInfo = {
      token: data.session.access_token,
      email: data.user.email,
      expires: data.session.expires_at,
    };

    localStorage.setItem("auth", JSON.stringify(sessionInfo));
    setIsLogged(true);
  }

  return (
    <div className={styles.container}>
      <h2>Login</h2>

      {isLogged ? (
        "Użytkownik zalogowany"
      ) : (
        <form onSubmit={submitHandler} className={styles.form}>
          <div className={styles.formCell}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              placeholder="email@em.pl"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>
          <div className={styles.formCell}>
            <label htmlFor="password">Hasło</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>
          <button className={styles.btn}>Zaloguj</button>
          {error ? <p className={styles.error}>{error}</p> : null}
        </form>
      )}
    </div>
  );
}

export default Login;
