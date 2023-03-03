import { memo } from "react";
import "./Searchbar.css";

const Searchbar = ({ name, onChange }) => {
  console.log("search bar");
  return (
    <div className="searchbar">
      <input
        placeholder="Firstname Lastname"
        value={name}
        onChange={onChange}
      />
    </div>
  );
};

export default memo(Searchbar);
