// Official TfL colour standard
// Source: https://content.tfl.gov.uk/tfl-colour-standard.pdf

export interface LineColor {
  background: string;
  foreground: string;
}

export const LINE_COLORS: { [key: string]: LineColor } = {
  // Tube Lines
  bakerloo: {
    background: "#B36305",
    foreground: "#ffffff",
  },
  central: {
    background: "#DC241F",
    foreground: "#ffffff",
  },
  circle: {
    background: "#FFD300",
    foreground: "#111111",
  },
  district: {
    background: "#007229",
    foreground: "#ffffff",
  },
  "hammersmith-city": {
    background: "#F3A9BB",
    foreground: "#111111",
  },
  jubilee: {
    background: "#A0A5A9",
    foreground: "#ffffff",
  },
  metropolitan: {
    background: "#9B0056",
    foreground: "#ffffff",
  },
  northern: {
    background: "#000000",
    foreground: "#ffffff",
  },
  piccadilly: {
    background: "#003688",
    foreground: "#ffffff",
  },
  victoria: {
    background: "#0098D4",
    foreground: "#ffffff",
  },
  "waterloo-city": {
    background: "#76D0BD",
    foreground: "#111111",
  },
  // Elizabeth Line
  elizabeth: {
    background: "#6950A1",
    foreground: "#ffffff",
  },
  // DLR
  dlr: {
    background: "#00AFAD",
    foreground: "#111111",
  },
  // London Overground lines
  liberty: {
    background: "#A0A5A9", // Cool Gray per TfL standard
    foreground: "#ffffff",
  },
  lioness: {
    background: "#F3A9BB", // Light Pink per TfL standard
    foreground: "#111111",
  },
  mildmay: {
    background: "#0098D4", // Sky Blue per TfL standard
    foreground: "#ffffff",
  },
  suffragette: {
    background: "#66CC00", // Bright Green per TfL standard
    foreground: "#111111",
  },
  weaver: {
    background: "#9B0056", // Maroon per TfL standard
    foreground: "#ffffff",
  },
  windrush: {
    background: "#DC241F", // Red per TfL standard
    foreground: "#ffffff",
  },
  // Tram
  tram: {
    background: "#66CC00",
    foreground: "#111111",
  },
};

export const getLineColor = (lineId: string): LineColor => {
  return (
    LINE_COLORS[lineId] || {
      background: "#1c1917",
      foreground: "#fafaf9",
    }
  );
};
