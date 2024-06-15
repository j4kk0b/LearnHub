import { useEffect } from "react";
import { useParams } from "react-router";

function Note() {
  const params = useParams();

  useEffect(() => {}, []);

  return <div>Note</div>;
}

export default Note;
