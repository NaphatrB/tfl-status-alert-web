import { Line } from "../services/Line";
import { getLines } from "../services/Line";
import Alert from "./Icons/Alert";
import ChevronRight from "./Icons/ChevronRight";
import { Link } from "react-router-dom";
import { getLineStatus } from "../services/Status";
import { useStatus } from "../hooks/useStatus";

export const Lines = () => {
  const status = useStatus();

  return (
    <menu className="overflow-y-auto lg:columns-2 gap-0 pb-[100px] lg:pb-0">
      {getLines().map((line: Line) => (
        <li key={line.urlKey} data-line={line.urlKey}>
          <Link
            to={`/${line.urlKey}`}
            className="bg-line-background text-line-foreground p-1 flex justify-between gap-1 items-center hover:opacity-80"
          >
            <div className="flex-1">
              <h2>{line.name}</h2>
              <p>{getLineStatus(line.urlKey)?.statusSummary || "Fetching…"}</p>
            </div>
            {getLineStatus(line.urlKey)?.isDisrupted && (
              <div className="w-[42px] h-[42px]">
                <Alert />
              </div>
            )}
            <div className="w-[12px] h-[12px] opacity-50">
              <ChevronRight />
            </div>
          </Link>
        </li>
      ))}
    </menu>
  );
};
