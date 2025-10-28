import { useEffect, useState } from "react";
import { Line, getLineByUrlKey } from "../services/Line";
import { ActivePagePanel } from "./ActivePage";
import { Subscription } from "./Subscription";
import { Status, getLineStatus } from "../services/Status";
import { useStatus } from "../hooks/useStatus";

export const ActiveLine = ({ lineKey }: { lineKey: string }) => {
  const [currentData, setCurrentData] = useState<Line | null | undefined>(null);
  const [currentStatus, setCurrentStatus] = useState<Status | null | undefined>(
    null,
  );
  const status = useStatus();

  useEffect(() => {
    if (lineKey) {
      setCurrentData(getLineByUrlKey(lineKey));
      setCurrentStatus(getLineStatus(lineKey));
    }
  }, [lineKey, status]);

  if (!currentData) {
    return <NotFound />;
  }

  return (
    <ActivePagePanel title={currentData.name} lineKey={currentData?.urlKey}>
      <div>
        <h2 className="text-xl mb-1">
          {currentStatus?.statusSummary || "Fetching…"}
        </h2>
        {currentStatus?.latestStatus.descriptions.map((description, index) => (
          <p key={index} className="mb-1">
            {description}
          </p>
        ))}
        {currentStatus?.updatedAt && (
          <p>
            Updated: {new Date(currentStatus.updatedAt).toLocaleDateString()}{" "}
            {new Date(currentStatus.updatedAt).toLocaleTimeString()}
          </p>
        )}
      </div>
      <Subscription line={currentData} />
    </ActivePagePanel>
  );
};

const NotFound = () => (
  <ActivePagePanel title="404">
    <p>That URL does not exist</p>
  </ActivePagePanel>
);
