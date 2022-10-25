import { FC, useEffect, useMemo, useState } from "react";

import { Loader, SenderMessages, SendersList } from "components";
import { usePosts } from "hooks";
import { groupBy } from "utils";

const Dashboard: FC = () => {
  const [page, setPage] = useState(1);
  const [senderName, setSenderName] = useState("");
  const { data, isLoading } = usePosts(page);
  const { posts } = data?.data?.data || [];

  const senders = useMemo(() => groupBy(posts, "from_name") || [], [posts]);
  const sortedSenders = Object.keys(senders).sort();

  const [senderMessages, setSenderMessages] = useState(
    senders[sortedSenders[0]],
  );

  const showMessages = (name: string) => setSenderName(name);

  useEffect(() => {
    setSenderMessages(senders[senderName]);
  }, [senderName, senders]);

  useEffect(() => {
    if (!senderName) {
      setSenderName(sortedSenders[0]);
      setSenderMessages(senders[sortedSenders[0]]);
    }
  }, [sortedSenders[0], senderName, setSenderName]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SendersList
            senders={senders}
            sortedSenders={sortedSenders}
            cb={showMessages}
          />
          {senderMessages && (
            <SenderMessages senderMessages={senderMessages} cb={setPage} />
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
