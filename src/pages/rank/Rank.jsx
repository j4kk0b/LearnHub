import styles from "./rank.module.css";
import { useEffect, useState } from "react";
import supabase from "../../services/supabase";
import Loader from "../../components/Loader";

const App = () => {
  const [userLikes, setUserLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserLikes = async () => {
      setIsLoading(true);

      const { data } = await supabase
        .from("notes")
        .select(
          "createdBy, numOfLikes, numOfDislikes, users(id, name, surname)"
        );

      setData(data);
      const likesByUser = data.reduce((acc, note) => {
        const userId = note.createdBy;
        if (!acc[userId]) {
          acc[userId] = {
            id: userId,
            name: note.users.name,
            surname: note.users.surname,
            likes: 0,
            dislikes: 0,
            satisfaction: 0,
          };
        }
        acc[userId].likes += note.numOfLikes;
        acc[userId].dislikes += note.numOfDislikes;
        acc[userId].satisfaction = (
          (acc[userId].likes / (acc[userId].likes + acc[userId].dislikes)) *
          100
        ).toFixed(2);
        return acc;
      }, {});

      const likesArray = Object.values(likesByUser).sort(
        (a, b) => b.satisfaction - a.satisfaction
      );

      setUserLikes(likesArray);

      setIsLoading(false);
    };

    fetchUserLikes();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className={styles.Title}>Ranking użytkowników</h1>
      <main className={styles.container}>
        <ul className={styles.header}>
          <li>Miejsce</li>
          <li>Użytkownik</li>
          <li>Stosunek ocen ( + / - )</li>
          <li>Procent zadowolenia</li>
        </ul>

        <ul className={styles.RankList}>
          {userLikes.map((userLike, i) => (
            <li key={i}>
              <div>{i + 1}</div>
              <div>
                {userLike.name} {userLike.surname}
              </div>
              <div>
                {userLike.likes} / {userLike.dislikes}
              </div>
              <div>{userLike.satisfaction}%</div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default App;
