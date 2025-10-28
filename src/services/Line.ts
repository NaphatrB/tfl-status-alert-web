export type Line = {
  name: string;
  shortName: string;
  urlKey: string;
  tflKey: string;
  displayOrder: number;
  modeName: string; // e.g., "tube", "dlr", "overground", etc.
};

export const ALL_LINES: Line[] = [
  {
    name: "Bakerloo Line",
    shortName: "Bakerloo",
    urlKey: "bakerloo-line",
    tflKey: "bakerloo",
    displayOrder: 1,
    modeName: "tube",
  },
  {
    name: "Central Line",
    shortName: "Central",
    urlKey: "central-line",
    tflKey: "central",
    displayOrder: 2,
    modeName: "tube",
  },
  {
    name: "Circle Line",
    shortName: "Circle",
    urlKey: "circle-line",
    tflKey: "circle",
    displayOrder: 3,
    modeName: "tube",
  },
  {
    name: "District Line",
    shortName: "District",
    urlKey: "district-line",
    tflKey: "district",
    displayOrder: 4,
    modeName: "tube",
  },
  {
    name: "Hammersmith \u0026 City Line",
    shortName: "Hammersmith \u0026 City",
    urlKey: "hammersmith-city-line",
    tflKey: "hammersmith-city",
    displayOrder: 5,
    modeName: "tube",
  },
  {
    name: "Jubilee Line",
    shortName: "Jubilee",
    urlKey: "jubilee-line",
    tflKey: "jubilee",
    displayOrder: 6,
    modeName: "tube",
  },
  {
    name: "Metropolitan Line",
    shortName: "Metropolitan",
    urlKey: "metropolitan-line",
    tflKey: "metropolitan",
    displayOrder: 7,
    modeName: "tube",
  },
  {
    name: "Northern Line",
    shortName: "Northern",
    urlKey: "northern-line",
    tflKey: "northern",
    displayOrder: 8,
    modeName: "tube",
  },
  {
    name: "Piccadilly Line",
    shortName: "Piccadilly",
    urlKey: "piccadilly-line",
    tflKey: "piccadilly",
    displayOrder: 9,
    modeName: "tube",
  },
  {
    name: "Victoria Line",
    shortName: "Victoria",
    urlKey: "victoria-line",
    tflKey: "victoria",
    displayOrder: 10,
    modeName: "tube",
  },
  {
    name: "Waterloo \u0026 City Line",
    shortName: "Waterloo \u0026 City",
    urlKey: "waterloo-city-line",
    tflKey: "waterloo-city",
    displayOrder: 11,
    modeName: "tube",
  },
  {
    name: "Elizabeth Line",
    shortName: "Elizabeth",
    urlKey: "elizabeth-line",
    tflKey: "elizabeth",
    displayOrder: 12,
    modeName: "elizabeth-line",
  },
  {
    name: "Liberty Line",
    shortName: "Liberty",
    urlKey: "liberty-line",
    tflKey: "liberty",
    displayOrder: 13,
    modeName: "overground",
  },
  {
    name: "Lioness Line",
    shortName: "Lioness",
    urlKey: "lioness-line",
    tflKey: "lioness",
    displayOrder: 14,
    modeName: "overground",
  },
  {
    name: "Mildmay Line",
    shortName: "Mildmay",
    urlKey: "mildmay-line",
    tflKey: "mildmay",
    displayOrder: 15,
    modeName: "overground",
  },
  {
    name: "Suffragette Line",
    shortName: "Suffragette",
    urlKey: "suffragette-line",
    tflKey: "suffragette",
    displayOrder: 16,
    modeName: "overground",
  },
  {
    name: "Weaver Line",
    shortName: "Weaver",
    urlKey: "weaver-line",
    tflKey: "weaver",
    displayOrder: 17,
    modeName: "overground",
  },
  {
    name: "Windrush Line",
    shortName: "Windrush",
    urlKey: "windrush-line",
    tflKey: "windrush",
    displayOrder: 18,
    modeName: "overground",
  },
  {
    name: "DLR",
    shortName: "DLR",
    urlKey: "dlr",
    tflKey: "dlr",
    displayOrder: 19,
    modeName: "dlr",
  },
  {
    name: "Tram",
    shortName: "Tram",
    urlKey: "tram",
    tflKey: "tram",
    displayOrder: 20,
    modeName: "tram",
  },
];

export const getLineByUrlKey = (urlKey: string | null) =>
  urlKey ? ALL_LINES.find((l) => l.urlKey === urlKey) : null;

export type Severity = {
  title: string;
  disrupted: boolean;
  displayOrder: number;
};

export const SEVERITIES: { [key: number]: Severity } = {
  1: {
    title: "Closed",
    disrupted: true,
    displayOrder: 1,
  },
  2: {
    title: "Suspended",
    disrupted: true,
    displayOrder: 1,
  },
  3: {
    title: "Part Suspended",
    disrupted: true,
    displayOrder: 1,
  },
  4: {
    title: "Planned Closure",
    disrupted: true,
    displayOrder: 1,
  },
  5: {
    title: "Part Closure",
    disrupted: true,
    displayOrder: 1,
  },
  6: {
    title: "Severe Delays",
    disrupted: true,
    displayOrder: 5,
  },
  7: {
    title: "Reduced Service",
    disrupted: true,
    displayOrder: 5,
  },
  8: {
    title: "Bus Service",
    disrupted: true,
    displayOrder: 5,
  },
  9: {
    title: "Minor Delays",
    disrupted: true,
    displayOrder: 10,
  },
  10: {
    title: "Good Service",
    disrupted: false,
    displayOrder: 100,
  },
  11: {
    title: "Part Closed",
    disrupted: true,
    displayOrder: 5,
  },
  12: {
    title: "Exist Only",
    disrupted: true,
    displayOrder: 20,
  },
  13: {
    title: "No Step Free Access",
    disrupted: true,
    displayOrder: 20,
  },
  14: {
    title: "Change of frequency",
    disrupted: true,
    displayOrder: 20,
  },
  15: {
    title: "Diverted",
    disrupted: true,
    displayOrder: 20,
  },
  16: {
    title: "Not Running",
    disrupted: true,
    displayOrder: 1,
  },
  17: {
    title: "Issues Reported",
    disrupted: true,
    displayOrder: 25,
  },
  18: {
    title: "No Issues",
    disrupted: false,
    displayOrder: 50,
  },
  19: {
    title: "Information",
    disrupted: false,
    displayOrder: 50,
  },
  20: {
    title: "Service Closed",
    disrupted: true,
    displayOrder: 1,
  },
} as const;

export const getLines = () => {
  // Lines found in local storage are pinned at the top.
  // Rest are inserted behind them, retaining the default order.

  const storedLineKeys = getStoredLineKeys();

  const findInStoredLines = (lineKey: string) => {
    const foundIndex = storedLineKeys.indexOf(lineKey);
    return (foundIndex === -1) ? Infinity : foundIndex;
  }

  ALL_LINES.sort((line, anotherLine) => findInStoredLines(line.urlKey) - findInStoredLines(anotherLine.urlKey));
  return ALL_LINES;
};

export const getStoredLineKeys = () => {
  const storedLineKeys: string[] = JSON.parse(localStorage.getItem("starredLines") || "[]");
  return storedLineKeys;
};

export const storeLineKeys = (lineKeys: string[]) => {
  localStorage.setItem("starredLines", JSON.stringify(lineKeys));
}

export function starLine(lineKey: string) {
  const storedLineKeys = getStoredLineKeys().filter(e => e !== lineKey);
  storedLineKeys.unshift(lineKey);

  storeLineKeys(storedLineKeys);
};

export function unstarLine(lineKey: string) {
  const storedLineKeys = getStoredLineKeys().filter(e => e !== lineKey);

  storeLineKeys(storedLineKeys);
};

export const getModes = () => {
  const modes = ALL_LINES.map((line) => line.modeName).filter(
    (value, index, self) => self.indexOf(value) === index,
  );
  return modes;
};

export const getLinesByMode = (mode: string) => {
  return getLines().filter((line) => line.modeName === mode);
};

export const getModeName = (mode: string): string => {
  const modeNames: { [key: string]: string } = {
    tube: "Tube",
    dlr: "DLR",
    "elizabeth-line": "Elizabeth Line",
    overground: "Overground",
    tram: "Tram",
  };
  return modeNames[mode] || mode;
};
