import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import Highlighter from "react-highlight-words";

import { IPost } from "utils";

import "./style.css";

interface ISenderMessages {
  senderMessages: IPost[];
  cb: (pageId: number) => void;
}

const SenderMessages: FC<ISenderMessages> = ({ senderMessages, cb }) => {
  const [isActive, setIsActive] = useState(1);
  const [userMessages, sortUserMessages] = useState(senderMessages);
  const [searchInput, setSearchInput] = useState("");

  const sortDSC = [...userMessages].sort(
    (x, y) =>
      Number(new Date(y.created_time)) - Number(new Date(x.created_time)),
  );

  const sortASC = [...userMessages].sort(
    (x, y) =>
      Number(new Date(x.created_time)) - Number(new Date(y.created_time)),
  );

  const searchTerm = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const searchTerm = [...senderMessages].filter(
        (o: { message: string }) => {
          return o.message.includes(e.target?.value.toLowerCase());
        },
      );
      setSearchInput(e.target?.value);
      sortUserMessages(searchTerm);
    },
    [senderMessages],
  );

  useEffect(() => {
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
          onChange={searchTerm}
        />
      </div>

      {userMessages.length === 0 && (
        <div className="sender-message">
          🤔 Whoops looks like there is nothing matching{" "}
          <span className="highlighter">{searchInput}</span>
        </div>
      )}

      {userMessages.map(i => {
        return (
          <div className="sender-message" key={i.id}>
            <time>
              {new Date(i.created_time).toUTCString()} <span>💬</span>
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
