// TfL API service - calls TfL API directly without caching
import { Line, SEVERITIES } from "./Line";
import { Status } from "./Status";

export default class TFLService {
  async getCurrentStatus(lines: Line[]): Promise<Status[]> {
    const data = await this.#fetchCurrentStatus();
    if (!data) {
      return [];
    }
    return this.#mutateData(data, lines);
  }

  async #fetchCurrentStatus() {
    // Fetch all modes that we support
    const modes = "tube,dlr,elizabeth-line,overground,tram";
    const url = `https://api.tfl.gov.uk/Line/Mode/${modes}/Status`;

    try {
      console.log("Fetching current status from TFL");
      const data = await fetch(url).then((d) => d.json());
      return data;
    } catch (e) {
      console.log("Error trying to fetch and parse status: " + e);
      return null;
    }
  }

  #mutateData(data: any, lines: Line[]) {
    return lines.map((lineData) => {
      const lineStatus = data.find((status) => status.id === lineData.tflKey);
      return this.#makeStatusItem(lineData, lineStatus);
    });
  }

  #makeStatusItem(originalLineData: Line, lineStatus): Status {
    const now = new Date();
    const lineData: Partial<Status> = Object.assign({}, originalLineData);

    // set some defaults
    lineData.isDisrupted = false;
    lineData.updatedAt = now.toISOString();
    lineData.statusSummary = "No Information";
    lineData.latestStatus = {
      updatedAt: now.toISOString(),
      isDisrupted: false,
      title: "No Information",
      shortTitle: "No Information",
      descriptions: [],
    };

    if (lineStatus) {
      const sortedStatuses = lineStatus.lineStatuses.sort((a, b) => {
        if (!SEVERITIES[a.statusSeverity] || !SEVERITIES[b.statusSeverity]) {
          return 0;
        }

        return (
          SEVERITIES[a.statusSeverity].displayOrder -
          SEVERITIES[b.statusSeverity].displayOrder
        );
      });

      // get sorted titles and reasons, ensuring unique values
      const titles = sortedStatuses
        .map((s) => s.statusSeverityDescription)
        .filter((value, index, self) => self.indexOf(value) === index);
      const reasons = sortedStatuses
        .map((s) => s.reason || null)
        .filter(
          (value, index, self) =>
            value !== null && self.indexOf(value) === index,
        );

      lineData.latestStatus.isDisrupted = sortedStatuses.reduce(
        (value, status) => {
          if (
            SEVERITIES[status.statusSeverity] &&
            SEVERITIES[status.statusSeverity].disrupted
          ) {
            return true;
          }
          return value;
        },
        false,
      );
      lineData.latestStatus.title = titles.join(", ");
      lineData.latestStatus.shortTitle = titles.slice(0, 2).join(", ");
      lineData.latestStatus.descriptions = reasons;

      lineData.isDisrupted = lineData.latestStatus.isDisrupted;
      lineData.statusSummary = lineData.latestStatus.shortTitle;
    }

    return lineData as Status;
  }

  async getModes(): Promise<any[]> {
    try {
      const data = await fetch("https://api.tfl.gov.uk/Line/Meta/Modes").then(
        (d) => d.json(),
      );
      return data;
    } catch (e) {
      console.log("Error fetching modes: " + e);
      return [];
    }
  }
}
