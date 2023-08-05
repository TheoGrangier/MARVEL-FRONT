const Search = ({ search, setSearch }) => {
  return (
    <input
      onChange={(event) => setSearch(event.target.value)}
      placeholder="Recherche "
    />
  );
};

export default Search;
