import "./Searchbar.css";

const Searchbar = ({ name, onChange }) => {
  return (
    <div className="searchbar">
      <input placeholder="Search a name..." value={name} onChange={onChange} />
    </div>
  );
};

export default Searchbar;
