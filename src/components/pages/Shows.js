import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { showsCollectionRef } from "../../firebase";
import "./Shows.css";

const Shows = () => {
  const [losShows, setLosShows] = useState([]);

  useEffect(() => {
    getShows();
  }, []);

  function getShows() {
    getDocs(showsCollectionRef)
      .then((res) => {
        const showsData = res.docs.map((show) => ({
          data: show.data(),
          id: show.id,
        }));
        setLosShows(showsData);
      })
      .catch((err) => console.log(err.message));
  }
  return (
    <>
      <h1>Shows</h1>
      <div className="shows-container">
        {losShows ? (
          losShows.map((show) => (
            <div className="show-container">
              <h2>{show.titulo}</h2>
              <h3>{show.subtitulo}</h3>
              <div className="descripcion-containers">{show.descripcion}</div>
              <p>{show.fecha}</p>
            </div>
          ))
        ) : (
          <h3>Sin Shows</h3>
        )}
      </div>
    </>
  );
};

export default Shows;
