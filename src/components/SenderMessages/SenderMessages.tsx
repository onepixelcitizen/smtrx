import { ChangeEvent, FC, useEffect, useState } from "react";
import Highlighter from "react-highlight-words";

import { IPost, useDebounce } from "utils";

import "./style.css";

interface ISenderMessages {
  senderMessages: IPost[];
  cb: (pageId: number) => void;
}

const SenderMessages: FC<ISenderMessages> = ({ senderMessages, cb }) => {
  const [isActive, setIsActive] = useState(1);
  const [userMessages, sortUserMessages] = useState(senderMessages);
  const [searchInput, setSearchInput] = useState("");
  const debouncedValue = useDebounce(searchInput, 1000);

  const sortDSC = [...userMessages].sort(
    (x, y) =>
      Number(new Date(y.created_time)) - Number(new Date(x.created_time)),
  );

  const sortASC = [...userMessages].sort(
    (x, y) =>
      Number(new Date(x.created_time)) - Number(new Date(y.created_time)),
  );

  useEffect(() => {
    const resultsContainingSearchTerm = [...senderMessages].filter(
      (o: { message: string }) => {
        return o.message.includes(debouncedValue.toLowerCase());
      },
    );

    sortUserMessages(resultsContainingSearchTerm);
  }, [debouncedValue]);

  useEffect(() => {
    setSearchInput("");
    sortUserMessages(senderMessages);
  }, [senderMessages]);

  return (
    <section id="sender-messages">
      <div className="messages-filters">
        <button onClick={() => sortUserMessages(sortASC)}>⬆️</button>
        <button onClick={() => sortUserMessages(sortDSC)}>⬇️</button>
        <input
          type="search"
          placeholder="Search messages..."
          value={searchInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
        />
      </div>

      {userMessages.length === 0 && (
        <div className="sender-message">
          🤔 Whoops looks like there is nothing &nbsp;
          <span className="highlighter">{searchInput}</span>
        </div>
      )}

      {userMessages.map(i => {
        return (
          <div className="sender-message" key={i.id}>
            <time>
              {new Date(i.created_time).toUTCString()}{" "}
              <span>{i.from_name}</span> <span>💬</span>
            </time>

            <Highlighter
              highlightClassName="highlighter"
              searchWords={[searchInput]}
              textToHighlight={i.message}
              autoEscape={true}
            />
          </div>
        );
      })}

      {userMessages.length !== 0 && (
        <div className="pagination">
          {Array.from({ length: 10 }, (_, k) => k + 1).map(i => {
            return (
              <span
                key={i}
                onClick={() => {
                  setIsActive(i);
                  cb(i);
                }}
                className={`${isActive === i ? "is-active" : ""}`}
              >
                {i}
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
};
export default SenderMessages;
