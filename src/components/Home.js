import { useCallback, useState, useEffect } from "react";
import { usePrevious } from "../hooks/usePrevious";
import Searchbar from "./Searchbar";
import CharacterProfiles from "./CharacterProfiles";

import "./Home.css";

const Home = () => {
  const [characterName, setCharacterName] = useState("");
  /* as in React docs, a way to get previous value of a state
  by using a custom hook which makes use of useRef hook
  - I don't want to make an API request if I don't update search name
  */
  const prevCharacterName = usePrevious(characterName);
  const [characterProfiles, setCharacterProfiles] = useState([]);
  const [isNoDataFound, setIsNoDataFound] = useState(false);

  useEffect(() => {
    if (characterName === "") return;
    if (prevCharacterName === characterName) return;
    // simulate debounce to avoid making api request upon every character input change
    // after an arbitrary 2 seconds (reasonable?) after user stops typing, an API req will be made
    const getCharacterData = setTimeout(() => {
      fetch(`https://swapi.dev/api/people/?search=${characterName}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.results.length == 0) {
            // e.g. user types something like "Fff" which is not the name of a Star Wars character
            setIsNoDataFound(true);
          } else {
            setIsNoDataFound(false);
            setCharacterProfiles(data.results);
          }
        });
    }, 2000);

    // clean up after yourself to avoid bugs in next run of useEffect
    return () => clearTimeout(getCharacterData);
  }, [prevCharacterName, characterName, characterProfiles]);

  const onHandleChange = useCallback((e) => {
    setCharacterName(e.target.value);
  }, []);
  return (
    <>
      <h1 className="header">Search for your favorite Starwars Character</h1>
      <Searchbar name={characterName} onChange={onHandleChange} />
      {isNoDataFound && <h2>No character found...Search again...</h2>}
      {!isNoDataFound && characterProfiles.length > 0 && (
        <CharacterProfiles characterProfiles={characterProfiles} />
      )}
    </>
  );
};

export default Home;
