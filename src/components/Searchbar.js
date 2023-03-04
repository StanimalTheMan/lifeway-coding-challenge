import { memo } from "react";
import "./Searchbar.css";

const Searchbar = ({ name, onChange }) => {
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
