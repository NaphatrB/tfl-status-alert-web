import { useState } from "react";
import { Line, getModes, getLinesByMode, getModeName } from "../services/Line";
import Alert from "./Icons/Alert";
import ChevronRight from "./Icons/ChevronRight";
import { Link } from "react-router-dom";
import { getLineStatus } from "../services/Status";
import { useStatus } from "../hooks/useStatus";
import { getLineColor } from "../services/Colors";

export const Lines = () => {
  const status = useStatus();
  const modes = getModes();
  const [activeMode, setActiveMode] = useState(modes[0] || "tube");

  const lines = getLinesByMode(activeMode);

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 dark:border-gray-700 overflow-x-auto">
        {modes.map((mode) => (
          <button
            key={mode}
            onClick={() => setActiveMode(mode)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeMode === mode
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            {getModeName(mode)}
          </button>
        ))}
      </div>

      {/* Lines List */}
      <menu className="overflow-y-auto lg:columns-2 gap-0 pb-[100px] lg:pb-0 flex-1">
        {lines.map((line: Line) => {
          const colors = getLineColor(line.tflKey);
          return (
            <li key={line.urlKey} data-line={line.urlKey}>
              <Link
                to={`/${line.urlKey}`}
                className="p-1 flex justify-between gap-1 items-center hover:opacity-80"
                style={{
                  backgroundColor: colors.background,
                  color: colors.foreground,
                }}
              >
                <div className="flex-1">
                  <h2>{line.name}</h2>
                  <p>
                    {getLineStatus(line.urlKey)?.statusSummary || "Fetching…"}
                  </p>
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
          );
        })}
      </menu>
    </div>
  );
};
