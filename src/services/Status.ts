import { Line } from "./Line";

export type Status = Line & {
  isDisrupted: boolean;
  updatedAt: string;
  statusSummary: string;
  latestStatus: {
    updatedAt: string;
    isDisrupted: boolean;
    title: string;
    shortTitle: string;
    descriptions: string[];
  };
};

// Global state that components will access via hooks
let currentStatus: Status[] | undefined = undefined;
let statusListeners: Array<(status: Status[] | undefined) => void> = [];

export const subscribeToStatus = (
  listener: (status: Status[] | undefined) => void,
) => {
  statusListeners.push(listener);
  return () => {
    statusListeners = statusListeners.filter((l) => l !== listener);
  };
};

export const getLatestStatus = () => currentStatus;

const notifyListeners = () => {
  statusListeners.forEach((listener) => listener(currentStatus));
};

export const setLatestStatus = (data: Status[]) => {
  currentStatus = data;
  notifyListeners();
};

export const updateStatus = () => {
  fetch("/api/status")
    .then((a) => a.json())
    .then((data: Status[]) => setLatestStatus(data));
};

export const getLineStatus = (urlKey: string) => {
  if (!currentStatus) {
    return null;
  }
  return currentStatus?.find((line) => line.urlKey === urlKey);
};
