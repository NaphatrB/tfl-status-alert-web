import { ReactNode, TouchEvent, useState } from "react";
import Close from "./Icons/Close";
import Star from "./Icons/Star";
import Starred from "./Icons/Starred";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Settings } from "./Settings";
import { ActiveLine } from "./ActiveLine";
import { getStoredLineKeys, starLine, unstarLine } from "../services/Line";

const ACTIVE_PANEL_ID = "active-panel";

export const ActivePage = () => {
  const location = useLocation();
  const viewKey = location.pathname.replace("/", "");

  return (
    <>
      {viewKey && (
        <Link
          to="/"
          className="fixed top-0 left-0 right-0 bottom-0 bg-stone-950/25"
        />
      )}
      <div
        id={ACTIVE_PANEL_ID}
        className={`bg-stone-50/90 text-stone-950 dark:bg-stone-900/90 dark:text-stone-50 
      backdrop-blur-lg
      shadow-[0_0_16px_0_rgba(0,0,0,0.5)]
      fixed bottom-0 left-0 w-screen
      rounded-t-xl  lg:rounded-tr-none lg:rounded-l-xl
      lg:top-0 lg:left-auto lg:right-0
      lg:max-w-[560px]
      will-change-transform
      transition-transform
      duration-300
      ${
        viewKey
          ? "translate-y-0 translate-x-0"
          : "translate-y-full lg:translate-y-0 lg:translate-x-full"
      }`}
      >
        {viewKey === "settings" ? (
          <Settings />
        ) : (
          <ActiveLine lineKey={viewKey} />
        )}
      </div>
    </>
  );
};

let touchStartY: number | undefined;
let touchStartX: number | undefined;
let touchStartMs: number | undefined;
let activePanel: HTMLDivElement | undefined;
let isX = false;

const StarIcon = ({ lineKey }: { lineKey: string | undefined }) => {
  const [, setRefresh] = useState(0);

  if (!lineKey) return null;

  const handleStar = () => {
    starLine(lineKey);
    setRefresh(prev => prev + 1);
  };

  const handleUnstar = () => {
    unstarLine(lineKey);
    setRefresh(prev => prev + 1);
  };

  if (getStoredLineKeys().includes(lineKey)) {
    return (
      <button className="w-3 h-3 p-0.5" onClick={handleUnstar}>
        <Starred />
      </button>
    );
  } else {
    return (
      <button className="w-3 h-3 p-0.5" onClick={handleStar}>
        <Star />
      </button>
    );
  }
};

export const ActivePagePanel = (props: {
  title: string;
  lineKey?: string;
  children?: ReactNode;
}) => {
  const navigate = useNavigate();

  const onTouchStart = (e: TouchEvent) => {
    activePanel =
      (document.getElementById(ACTIVE_PANEL_ID) as HTMLDivElement) || undefined;
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    touchStartMs = Date.now();
    isX = window.innerWidth > activePanel.clientWidth;
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!touchStartY || !touchStartX || !activePanel) {
      return;
    }
    const newX = e.changedTouches[0].screenX;
    const newY = e.changedTouches[0].screenY;
    if (isX && newX > touchStartX) {
      activePanel.style.cssText = `transition: none; transform: translateX(${
        newX - touchStartX
      }px)`;
    } else if (!isX && newY > touchStartY) {
      activePanel.style.cssText = `transition: none; transform: translateY(${
        newY - touchStartY
      }px)`;
    } else {
      activePanel.style.cssText = ``;
    }
  };

  const onTouchEnd = (e: TouchEvent) => {
    const newX = e.changedTouches[0].screenX;
    const newY = e.changedTouches[0].screenY;
    if (!touchStartY || !touchStartX || !activePanel) {
      return;
    }
    if (
      isX &&
      (newX - touchStartX > 100 ||
        (touchStartMs &&
          newX - touchStartX > 5 &&
          Date.now() - touchStartMs < 300))
    ) {
      activePanel.style.cssText = `transition: .3s all; transform: translateX(100%)`;
      navigate("/");
      window.setTimeout(() => {
        if (activePanel) {
          activePanel.style.cssText = ``;
        }
      }, 400);
    } else if (
      !isX &&
      (newY - touchStartY > 100 ||
        (touchStartMs &&
          newY - touchStartY > 5 &&
          Date.now() - touchStartMs < 300))
    ) {
      activePanel.style.cssText = `transition: .3s all; transform: translateY(100%)`;
      navigate("/");
      window.setTimeout(() => {
        if (activePanel) {
          activePanel.style.cssText = ``;
        }
      }, 400);
    } else {
      activePanel.style.cssText = ``;
    }
    touchStartY = undefined;
    touchStartMs = undefined;
  };

  return (
    <div className="flex flex-col max-h-full" data-line={props.lineKey}>
      <div
        className="bg-line-background text-line-foreground
    rounded-t-xl  lg:rounded-tr-none lg:rounded-tl-xl
    flex justify-between gap-1 items-center
    py-0.5 pl-1 pr-0.5"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <StarIcon lineKey={props.lineKey} />
        <h1 className="text-2xl font-thin">{props.title}</h1>
        <Link className="w-3 h-3 p-0.5 inline-block" to="/" title="Close">
          <Close />
        </Link>
      </div>
      <div className="flex-1 p-1 space-y-1 max-h-[70vh] lg:max-h-none overflow-y-auto">
        {props.children}
      </div>
    </div>
  );
};
