import { BatteryFull, Search, SlidersHorizontal, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { desktopAssets } from "../../assets/appAssets.js";

function formatCalendar(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
    .format(date)
    .replace(",", "");
}

function formatTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

const menuItems = [
  { label: "File" },
  { label: "Edit" },
  { label: "View" },
  { label: "Go", appId: "finder" },
  { label: "Projects", appId: "projects" },
  { label: "Contact", appId: "mail" },
];

export default function MenuBar({ onLaunch }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 30000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="menu-bar" aria-label="Top menu bar">
      <div className="menu-bar-left">
        <button type="button" className="menu-apple-button" aria-label="Apple menu">
          <img src={desktopAssets.menuLogo} alt="" className="brand-mark-image" />
        </button>
        <span className="menu-bar-brand">EvilEverest OS</span>
        <nav className="menu-bar-nav" aria-label="Primary navigation">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.appId ? () => onLaunch?.(item.appId) : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="menu-bar-status" aria-label="System status">
        <button type="button" className="menu-bar-icon-button" aria-label="Search">
          <Search size={15} strokeWidth={2.25} />
        </button>
        <Wifi className="menu-bar-system-icon" size={16} strokeWidth={2.25} aria-label="Wi-Fi connected" />
        <BatteryFull className="menu-bar-system-icon" size={18} strokeWidth={2.15} aria-label="Battery full" />
        <button type="button" className="menu-bar-icon-button" aria-label="Control center">
          <SlidersHorizontal size={16} strokeWidth={2.25} />
        </button>
        <time className="menu-bar-clock" dateTime={now.toISOString()}>
          {formatCalendar(now)} {formatTime(now)}
        </time>
      </div>
    </header>
  );
}
