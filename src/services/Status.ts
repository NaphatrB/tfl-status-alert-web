import { Line, ALL_LINES } from "./Line";
import TFLService from "./TFLService";

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

const tflService = new TFLService();

export const updateStatus = async () => {
  try {
    const data = await tflService.getCurrentStatus(ALL_LINES);
    setLatestStatus(data);
  } catch (e) {
    console.error("Failed to update status:", e);
  }
};

export const getLineStatus = (urlKey: string) => {
  if (!currentStatus) {
    return null;
  }
  return currentStatus?.find((line) => line.urlKey === urlKey);
};
