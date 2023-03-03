import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import Profile from "./components/Profile";

import "./App.css";

const App = () => {
  const [characterName, setCharacterName] = useState("");
  const [characterProfileData, setCharacterProfileData] = useState({});

  useEffect(() => {
    // simulate debounce to avoid making api request upon every character input change
    const getCharacterData = setTimeout(() => {
      fetch(`https://swapi.dev/api/people/?search=${characterName}`)
        .then((res) => res.json())
        .then((data) => setCharacterProfileData(data.results[0]));
    }, 2000);

    // clean up after yourself to avoid bugs in next run of useEffect
    return () => clearTimeout(getCharacterData);
  }, [characterName, characterProfileData]);

  const onHandleChange = (e) => {
    setCharacterName(e.target.value);
  };

  return (
    <>
      <h1 className="header">Search for your favorite Starwars Character</h1>
      <Searchbar name={characterName} onChange={onHandleChange} />
      <Profile data={characterProfileData} />
    </>
  );
};

export default App;
