import { useCallback, useState, useEffect } from "react";
import { usePrevious } from "./hooks/usePrevious";
import Searchbar from "./components/Searchbar";
import Profile from "./components/Profile";

import "./App.css";

const App = () => {
  const [characterName, setCharacterName] = useState("");
  /* as in React docs, a way to get previous value of a state
  by using a custom hook which makes use of useRef hook
  - I don't want to make an API request if I don't update search name
  */
  const prevCharacterName = usePrevious(characterName);
  const [characterProfileData, setCharacterProfileData] = useState({});

  useEffect(() => {
    if (characterName === "") return;
    if (prevCharacterName === characterName) return;
    // simulate debounce to avoid making api request upon every character input change
    // after an arbitrary 2 seconds (reasonable?) after user stops typing, an API req will be made
    const getCharacterData = setTimeout(() => {
      fetch(`https://swapi.dev/api/people/?search=${characterName}`)
        .then((res) => res.json())
        .then((data) => {
          setCharacterProfileData(data.results[0]);
        });
    }, 2000);

    // clean up after yourself to avoid bugs in next run of useEffect
    return () => clearTimeout(getCharacterData);
  }, [prevCharacterName, characterName, characterProfileData]);

  const onHandleChange = useCallback((e) => {
    setCharacterName(e.target.value);
  }, []);

  return (
    <>
      <h1 className="header">Search for your favorite Starwars Character</h1>
      <Searchbar name={characterName} onChange={onHandleChange} />
      <Profile data={characterProfileData} />
    </>
  );
};

export default App;
