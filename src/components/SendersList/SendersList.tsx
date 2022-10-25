import { FC, useEffect, useState } from "react";

import { IPost, useDebounce } from "utils";

import "./style.css";

interface ISenders {
  senders: { [key: string]: IPost[] };
  sortedSenders: string[];
  cb: (name: string) => void;
}
const SendersList: FC<ISenders> = ({ sortedSenders, senders, cb }) => {
  const [isActive, setIsActive] = useState<string>(sortedSenders[0]);
  const [filteredSenders, setFilteredSenders] = useState(sortedSenders);
  const [searchInput, setSearchInput] = useState("");
  const debouncedValue = useDebounce(searchInput, 500);

  useEffect(() => {
    const search = [...sortedSenders].filter((u: string) => {
      return u.toLowerCase().includes(debouncedValue.toLowerCase());
    });
    setSearchInput(debouncedValue);
    setFilteredSenders(search);
  }, [debouncedValue]);

  return (
    <nav id="sender-list">
      <input
        type="search"
        placeholder="Filter by name..."
        onChange={e => setSearchInput(e.target.value)}
      />
      {filteredSenders.length === 0 && (
        <div>
          No name matching <span className="highlighter">{searchInput}</span>
        </div>
      )}
      <ul>
        {filteredSenders.map(name => (
          <li
            key={name}
            className={`${isActive === name ? "is-active" : ""}`}
            onClick={() => {
              setIsActive(name);
              cb(name);
            }}
          >
            {name} <span>{senders[name]?.length}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SendersList;
