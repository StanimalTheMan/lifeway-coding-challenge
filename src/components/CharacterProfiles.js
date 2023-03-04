import { memo } from "react";
import { Link } from "react-router-dom";

const CharacterProfiles = ({ characterProfiles }) => {
  return (
    <>
      <h1>Matching Characters</h1>
      <ul>
        {characterProfiles.map((characterProfile) => {
          return (
            <li key={characterProfile.name}>
              <Link
                to={`/search/${characterProfile.name}`}
                state={characterProfile}
              >
                {characterProfile.name}
              </Link>
              <br />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default memo(CharacterProfiles);
