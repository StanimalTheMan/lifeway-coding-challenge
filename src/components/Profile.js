import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  const { state: data } = useLocation();
  const [characterSpecies, setCharacterSpecies] = useState([]);
  const [characterFilms, setCharacterFilms] = useState([]);
  const [characterStarshipsFlown, setCharacterStarshipsFlown] = useState([]);

  useEffect(() => {
    const speciesPromises = data.species.map((speciesUrl) =>
      fetch(speciesUrl).then((res) => res.json())
    );
    const filmsPromises = data.films.map((filmUrl) =>
      fetch(filmUrl).then((res) => res.json())
    );
    const starshipsPromises = data.starships.map((starshipUrl) =>
      fetch(starshipUrl).then((res) => res.json())
    );

    Promise.all(speciesPromises).then((data) => {
      setCharacterSpecies(data);
    });
    Promise.all(filmsPromises).then((data) => {
      setCharacterFilms(data);
    });
    Promise.all(starshipsPromises).then((data) => {
      setCharacterStarshipsFlown(data);
    });
  }, [data.films, data.species, data.starships]);

  return (
    <>
      <Link to="/">Home</Link>
      <h2>
        <em>{data.name}</em>
      </h2>
      <section>
        <h2>About Me</h2>
        <h3>Height: {data.height}</h3>
        <h3>Weight: {data.mass}</h3>
        <h3>Hair Color: {data.hair_color}</h3>
        <h3>Date of Birth: {data.birth_year}</h3>
        <h3>Species:</h3>
        {characterSpecies.length == 0 ? (
          <p>N/A</p>
        ) : (
          <ul>
            {characterSpecies.map((species) => {
              return <li key={species.name}>{species.name}</li>;
            })}
          </ul>
        )}
      </section>
      <section>
        <h2>Films Appeared In</h2>
        {characterFilms.length == 0 ? (
          <p>N/A</p>
        ) : (
          <ul>
            {characterFilms.map((characterFilm) => {
              return <li key={characterFilm.title}>{characterFilm.title}</li>;
            })}
          </ul>
        )}
      </section>
      <section>
        <h2>Starships Flown</h2>
        {characterStarshipsFlown.length == 0 ? (
          <p>N/A</p>
        ) : (
          <ul>
            {characterStarshipsFlown.map((characterStarship) => {
              return (
                <li key={characterStarship.name}>{characterStarship.name}</li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
};

export default Profile;
