import { useState, useEffect } from "react";
import { subscribeToStatus, getLatestStatus, Status } from "../services/Status";

export const useStatus = () => {
  const [status, setStatus] = useState<Status[] | undefined>(
    getLatestStatus(),
  );

  useEffect(() => {
    const unsubscribe = subscribeToStatus(setStatus);
    return unsubscribe;
  }, []);

  return status;
};
