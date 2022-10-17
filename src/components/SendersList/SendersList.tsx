import { ChangeEvent, FC, useCallback, useState } from "react";

import { IPost } from "utils";

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

  const searchUsers = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const search = [...sortedSenders].filter((u: string) => {
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
