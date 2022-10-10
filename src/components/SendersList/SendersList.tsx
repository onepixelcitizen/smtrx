import { FC, useCallback, useState } from "react";

import "./style.css";

interface ISenders {
  senders: { [key: string]: [] };
  sortedSenders: string[];
  cb: (name: any) => void;
}
const SendersList: FC<ISenders> = ({ sortedSenders, senders, cb }) => {
  const [isActive, setIsActive] = useState<string>(sortedSenders[0]);
  const [filteredSenders, setFilteredSenders] = useState(sortedSenders);
  const [searchInput, setSearchInput] = useState("");

  const searchUsers = useCallback(
    (e: any) => {
      const search = [...sortedSenders].filter((u: any) => {
        return u.toLowerCase().includes(e.target?.value.toLowerCase());
      });
      setSearchInput(e.target?.value);
      setFilteredSenders(search);
    },
    [sortedSenders],
  );

  return (
    <nav id="sender-list">
      <input
        type="search"
        placeholder="Filter by name..."
        onChange={searchUsers}
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
