import { FC, useEffect, useMemo, useState } from "react";

import { Loader, SenderMessages, SendersList } from "components";
import { usePosts } from "hooks";
import { groupBy } from "utils";

const Dashboard: FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePosts(page);
  const { posts } = data?.data?.data || [];

  const senders = useMemo(() => groupBy(posts, "from_name") || [], [posts]);
  const sortedSenders = Object.keys(senders).sort();

  const [senderMessages, setSenderMessages] = useState([
    ...(senders[sortedSenders[0]] || []),
  ]);

  const showMessages = (name: string) => {
    setSenderMessages(senders[name]);
  };

  useEffect(() => {
    if (!isLoading) {
      setSenderMessages(senders[Object.keys(senders).sort()[0]]);
    }
  }, [senders, isLoading]);

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
          <SenderMessages senderMessages={senderMessages} cb={setPage} />
        </>
      )}
    </>
  );
};

export default Dashboard;
