import { getLatestStatus, updateStatus } from "../services/Status";
import Refresh from "./Icons/Refresh";
import Settings from "./Icons/Settings";
import { Link } from "react-router-dom";

export const Header = () => {
  const doUpdate = () => {
    const latest = getLatestStatus();
    if (
      latest?.[0].updatedAt &&
      Date.parse(latest?.[0].updatedAt) < Date.now() - 120 * 1000
    ) {
      updateStatus();
    }
  };

  return (
    <div className="bg-stone-800 text-stone-50 flex gap-1 justify-between items-center text-xl font-thin px-0.5 relative">
      <button onClick={doUpdate} className="w-2 h-2">
        <Refresh />
      </button>
      <h1>
        <Link to="/">TubeAlert</Link>
      </h1>
      <Link to="/settings" className="w-2 h-2 inline-block">
        <Settings />
      </Link>
    </div>
  );
};
