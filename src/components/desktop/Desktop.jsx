import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import {
  BriefcaseBusiness,
  Calculator,
  FileText,
  FolderOpen,
  Mail,
  Settings,
  Sparkles,
  SquareTerminal,
} from "lucide-react";
import { desktopAssets } from "../../assets/appAssets.js";
import { links } from "../../data/links.js";
import useWindowStore from "../../store/windowStore.js";
import AboutApp from "../apps/AboutApp.jsx";
import FinderApp from "../apps/FinderApp.jsx";
import MailApp from "../apps/MailApp.jsx";
import PdfPreviewApp from "../apps/PdfPreviewApp.jsx";
import ResumeApp from "../apps/ResumeApp.jsx";
import SettingsApp from "../apps/SettingsApp.jsx";
import CalculatorApp from "../apps/CalculatorApp.jsx";
import TerminalApp from "../apps/TerminalApp.jsx";
import Window from "../window/Window.jsx";
import DesktopIcon from "./DesktopIcon.jsx";
import Dock from "./Dock.jsx";
import MenuBar from "./MenuBar.jsx";

const appRegistry = {
  about: {
    id: "about",
    label: "About Me",
    title: "About Bidur",
    subtitle: "Profile overview",
    accent: "violet",
    icon: Sparkles,
    iconSrc: desktopAssets.aboutIcon,
    component: AboutApp,
  },
  finder: {
    id: "finder",
    label: "Finder",
    title: "Finder",
    subtitle: "Portfolio explorer",
    accent: "blue",
    icon: FolderOpen,
    iconSrc: desktopAssets.finderIcon,
    component: FinderApp,
  },
  terminal: {
    id: "terminal",
    label: "Terminal",
    title: "Terminal",
    subtitle: "Interactive introduction",
    accent: "terminal",
    icon: SquareTerminal,
    iconSrc: desktopAssets.terminalIcon,
    component: TerminalApp,
  },
  projects: {
    id: "projects",
    label: "Projects",
    title: "Projects",
    subtitle: "All projects folder",
    accent: "blue",
    icon: BriefcaseBusiness,
    iconSrc: desktopAssets.projectsIcon,
    component: FinderApp,
  },
  calculator: {
    id: "calculator",
    label: "Calculator",
    title: "Calculator",
    subtitle: "Quick calculations",
    accent: "amber",
    icon: Calculator,
    iconSrc: desktopAssets.skillsIcon,
    component: CalculatorApp,
  },
  resume: {
    id: "resume",
    label: "Resume",
    title: "Resume",
    subtitle: "Education and experience",
    accent: "amber",
    icon: FileText,
    iconSrc: desktopAssets.resumeIcon,
    component: ResumeApp,
  },
  mail: {
    id: "mail",
    label: "Mail",
    title: "Mail",
    subtitle: "Contact workspace",
    accent: "rose",
    icon: Mail,
    iconSrc: desktopAssets.mailIcon,
    component: MailApp,
  },
  settings: {
    id: "settings",
    label: "Settings",
    title: "Settings",
    subtitle: "Theme and desktop controls",
    accent: "slate",
    icon: Settings,
    iconSrc: desktopAssets.settingsIcon,
    component: SettingsApp,
  },
  resumePdf: {
    id: "resumePdf",
    label: "Resume PDF",
    title: "Bidur Siwakoti Resume.pdf",
    subtitle: "Preview",
    accent: "blue",
    icon: FileText,
    iconSrc: desktopAssets.previewIcon,
    component: PdfPreviewApp,
  },
};

const desktopIcons = [
  appRegistry.about,
  appRegistry.finder,
  appRegistry.projects,
  appRegistry.calculator,
  appRegistry.resume,
  appRegistry.mail,
  appRegistry.terminal,
  appRegistry.settings,
];

const windowPositions = [
  { top: "88px", left: "20%", width: "min(720px, 72vw)", height: "min(520px, 64vh)" },
  { top: "118px", left: "26%", width: "min(700px, 70vw)", height: "min(500px, 62vh)" },
  { top: "100px", left: "14%", width: "min(680px, 68vw)", height: "min(520px, 63vh)" },
  { top: "140px", left: "30%", width: "min(660px, 66vw)", height: "min(480px, 60vh)" },
];

function getWindowPosition(index) {
  return windowPositions[index % windowPositions.length];
}

const WALLPAPER_STORAGE_KEY = "evileverest-os-wallpaper";

export default function Desktop() {
  const openedWindows = useWindowStore((state) => state.openedWindows);
  const minimizedWindows = useWindowStore((state) => state.minimizedWindows);
  const activeWindow = useWindowStore((state) => state.activeWindow);
  const openWindow = useWindowStore((state) => state.openWindow);
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const restoreWindow = useWindowStore((state) => state.restoreWindow);
  const [activeWallpaperId, setActiveWallpaperId] = useState(() => {
    if (typeof window === "undefined") {
      return desktopAssets.wallpapers[0].id;
    }

    return window.localStorage.getItem(WALLPAPER_STORAGE_KEY) ?? desktopAssets.wallpapers[0].id;
  });
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedDesktopItem, setSelectedDesktopItem] = useState(null);

  const activeWallpaper =
    desktopAssets.wallpapers.find((item) => item.id === activeWallpaperId) ?? desktopAssets.wallpapers[0];

  useEffect(() => {
    function handleWallpaperPreference(event) {
      const wallpaperId = event.detail?.wallpaperId;
      const wallpaperExists = desktopAssets.wallpapers.some((item) => item.id === wallpaperId);

      if (wallpaperExists) {
        setActiveWallpaperId(wallpaperId);
      }
    }

    window.addEventListener("evileverest-wallpaper-change", handleWallpaperPreference);

    return () => {
      window.removeEventListener("evileverest-wallpaper-change", handleWallpaperPreference);
    };
  }, []);

  useEffect(() => {
    function handleCloseMenu() {
      setContextMenu(null);
    }

    window.addEventListener("click", handleCloseMenu);
    window.addEventListener("resize", handleCloseMenu);
    window.addEventListener("scroll", handleCloseMenu);

    return () => {
      window.removeEventListener("click", handleCloseMenu);
      window.removeEventListener("resize", handleCloseMenu);
      window.removeEventListener("scroll", handleCloseMenu);
    };
  }, []);

  function launchApp(appId) {
    if (!openedWindows[appId]) {
      openWindow(appId);
      return;
    }

    if (minimizedWindows[appId]) {
      restoreWindow(appId);
      return;
    }

    focusWindow(appId);
  }

  function handleDesktopContextMenu(event) {
    if (!event.target.closest(".desktop-workspace") || event.target.closest(".mac-window")) {
      return;
    }

    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  }

  function selectDesktopItem(itemId) {
    setSelectedDesktopItem(itemId);
  }

  function changeWallpaper(wallpaperId) {
    setActiveWallpaperId(wallpaperId);
    window.localStorage.setItem(WALLPAPER_STORAGE_KEY, wallpaperId);
    setContextMenu(null);
  }

  const dockItems = [
    {
      id: "finder",
      label: "Finder",
      icon: FolderOpen,
      iconSrc: desktopAssets.finderIcon,
      accent: "blue",
      onActivate: () => launchApp("finder"),
    },
    {
      id: "terminal",
      label: "Terminal",
      icon: SquareTerminal,
      iconSrc: desktopAssets.terminalIcon,
      accent: "terminal",
      onActivate: () => launchApp("terminal"),
    },
    {
      id: "projects",
      label: "Projects",
      icon: BriefcaseBusiness,
      iconSrc: desktopAssets.projectsIcon,
      accent: "blue",
      onActivate: () => launchApp("projects"),
    },
    {
      id: "calculator",
      label: "Calculator",
      icon: Calculator,
      iconSrc: desktopAssets.skillsIcon,
      accent: "amber",
      onActivate: () => launchApp("calculator"),
    },
    {
      id: "resume",
      label: "Resume",
      icon: FileText,
      iconSrc: desktopAssets.resumeIcon,
      accent: "amber",
      onActivate: () => launchApp("resume"),
    },
    {
      id: "mail",
      label: "Mail",
      icon: Mail,
      iconSrc: desktopAssets.mailIcon,
      accent: "rose",
      onActivate: () => launchApp("mail"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      iconSrc: desktopAssets.settingsIcon,
      accent: "slate",
      onActivate: () => launchApp("settings"),
    },
    {
      id: "github",
      label: "GitHub",
      icon: FaGithub,
      accent: "slate",
      href: links.github,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: FaLinkedinIn,
      accent: "sky",
      href: links.linkedin,
    },
  ].map((item) => ({
    ...item,
    isOpen: Boolean(openedWindows[item.id]),
    isMinimized: Boolean(minimizedWindows[item.id]),
  }));

  const visibleWindows = Object.values(openedWindows).sort((left, right) => left.zIndex - right.zIndex);

  return (
    <main className="app-shell desktop-screen" onContextMenu={handleDesktopContextMenu}>
      <style>{`
        .window-stage {
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
          overflow: hidden;
          transform-style: preserve-3d;
          will-change: transform, opacity, filter, clip-path;
        }

        .window-stage > * {
          pointer-events: auto;
        }

        .mac-window {
          position: absolute;
          display: flex;
          flex-direction: column;
          min-width: 360px;
          min-height: 260px;
          max-width: calc(100vw - 20px);
          max-height: calc(100vh - 72px);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 28px;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.7));
          box-shadow: 0 22px 70px rgba(2, 6, 23, 0.42);
          backdrop-filter: blur(24px) saturate(140%);
          -webkit-backdrop-filter: blur(24px) saturate(140%);
          overflow: hidden;
          transform-style: preserve-3d;
          will-change: transform, opacity, filter, clip-path;
        }

        .mac-window.is-active {
          border-color: rgba(191, 219, 254, 0.28);
          box-shadow: 0 28px 90px rgba(2, 6, 23, 0.54);
        }

        .mac-window-terminal {
          border: 0;
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          overflow: hidden;
        }

        .mac-window-terminal.is-active {
          border-color: transparent;
          box-shadow: none;
        }

        .mac-window.is-minimized {
          pointer-events: none;
        }

        .mac-window-header {
          display: grid;
          grid-template-columns: 132px 1fr 132px;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
          cursor: grab;
          user-select: none;
          touch-action: none;
        }

        .mac-window-header:active {
          cursor: grabbing;
        }

        .mac-window-heading {
          min-width: 0;
          text-align: center;
        }

        .mac-window-heading h2 {
          margin: 0;
          font-size: 0.96rem;
          font-weight: 600;
          color: #f8fafc;
        }

        .mac-window-heading p {
          margin: 4px 0 0;
          font-size: 0.78rem;
          color: rgba(191, 219, 254, 0.76);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .window-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .window-control {
          display: inline-grid;
          place-items: center;
          width: 13px;
          height: 13px;
          border-radius: 999px;
          padding: 0;
          border: 0;
          cursor: pointer;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }

        .window-control-red {
          background: #ff5f57;
        }

        .window-control-yellow {
          background: #febc2e;
        }

        .window-control-green {
          background: #28c840;
        }

        .window-control-dot {
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.34);
          opacity: 0;
          transition: opacity 160ms ease;
        }

        .window-controls:hover .window-control-dot,
        .window-control:focus-visible .window-control-dot {
          opacity: 1;
        }

        .window-control:focus-visible {
          outline: 2px solid rgba(191, 219, 254, 0.6);
          outline-offset: 2px;
        }

        .mac-window-resize-zone {
          position: absolute;
          z-index: 5;
          touch-action: none;
        }

        .resize-n,
        .resize-s {
          left: 18px;
          right: 18px;
          height: 10px;
          cursor: ns-resize;
        }

        .resize-n {
          top: -3px;
        }

        .resize-s {
          bottom: -3px;
        }

        .resize-e,
        .resize-w {
          top: 18px;
          bottom: 18px;
          width: 10px;
          cursor: ew-resize;
        }

        .resize-e {
          right: -3px;
        }

        .resize-w {
          left: -3px;
        }

        .resize-ne,
        .resize-se,
        .resize-sw,
        .resize-nw {
          width: 18px;
          height: 18px;
        }

        .resize-ne {
          top: -3px;
          right: -3px;
          cursor: nesw-resize;
        }

        .resize-se {
          right: 4px;
          bottom: 4px;
          cursor: nwse-resize;
        }

        .resize-sw {
          left: -3px;
          bottom: -3px;
          cursor: nesw-resize;
        }

        .resize-nw {
          top: -3px;
          left: -3px;
          cursor: nwse-resize;
        }

        .resize-se::before,
        .resize-se::after {
          content: "";
          position: absolute;
          right: 3px;
          bottom: 3px;
          width: 10px;
          height: 1px;
          border-radius: 999px;
          background: rgba(226, 232, 240, 0.38);
          transform: rotate(-45deg);
          transform-origin: right center;
        }

        .resize-se::after {
          right: 3px;
          bottom: 8px;
          width: 6px;
          background: rgba(226, 232, 240, 0.26);
        }

        .mac-window-header-spacer {
          min-height: 1px;
        }

        .mac-window-body {
          flex: 1;
          padding: 24px;
          overflow: auto;
          min-width: 0;
        }

        .mac-window-body-terminal {
          height: 100%;
          padding: 0;
          overflow: hidden;
        }

        @media (max-width: 980px) {
          .window-stage {
            overflow: visible;
          }
        }

        @media (max-width: 768px) {
          .mac-window,
          .mac-window.is-expanded {
            top: 70px !important;
            left: 10px !important;
            right: 10px !important;
            bottom: 94px !important;
            width: auto !important;
            height: auto !important;
            border-radius: 24px;
          }

          .mac-window-header {
            grid-template-columns: 112px 1fr 24px;
            padding: 12px 14px;
          }

          .mac-window-body {
            padding: 18px;
          }

          .mac-window-body {
            padding: 16px;
          }
        }

        @media (max-width: 480px) {
          .mac-window,
          .mac-window.is-expanded {
            top: 62px !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 86px !important;
            border-radius: 18px 18px 0 0;
          }

          .mac-window-header {
            grid-template-columns: 104px 1fr 18px;
          }

          .mac-window-heading h2 {
            font-size: 0.9rem;
          }

          .mac-window-body {
            padding: 14px;
          }
        }
      `}</style>

      <div
        className="wallpaper-overlay"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.18), rgba(15, 23, 42, 0.42)), url(${activeWallpaper.src})`,
        }}
      />
      <MenuBar onLaunch={launchApp} />

      <div className="desktop-file-shortcuts" aria-label="Desktop files">
        <button
          type="button"
          className="desktop-file-icon"
          aria-label="Open Bidur Siwakoti Resume PDF"
          aria-pressed={selectedDesktopItem === "resumePdf"}
          data-selected={selectedDesktopItem === "resumePdf" ? "true" : "false"}
          onFocus={() => selectDesktopItem("resumePdf")}
          onClick={() => {
            selectDesktopItem("resumePdf");
            launchApp("resumePdf");
          }}
        >
          <img src={desktopAssets.previewIcon} alt="" className="desktop-file-image" />
          <span className="desktop-file-label">Bidur Siwakoti Resume.pdf</span>
        </button>
      </div>

      <section className="desktop-workspace">
        <div className="desktop-icons-grid" aria-label="Desktop apps">
          {desktopIcons.map((item) => (
            <DesktopIcon
              key={item.id}
              label={item.label}
              icon={item.icon}
              iconSrc={item.iconSrc}
              accent={item.accent}
              isSelected={selectedDesktopItem === item.id}
              onSelect={() => selectDesktopItem(item.id)}
              onActivate={() => launchApp(item.id)}
            />
          ))}
        </div>

        <div className="desktop-hero glass-panel">
          <p className="desktop-kicker">EvilEverest OS</p>
          <h1>Bidur Siwakoti</h1>
          <p>
            A macOS-inspired portfolio desktop for projects, skills, resume, and
            contact, built around the EvilEverest identity.
          </p>
        </div>
      </section>

      <div className="window-stage" aria-live="polite">
        <AnimatePresence>
          {visibleWindows.map((windowState, index) => {
            const app = appRegistry[windowState.appId];

            if (!app) {
              return null;
            }

            const AppComponent = app.component;

            return (
              <Window
                key={windowState.appId}
                appId={windowState.appId}
                title={app.title}
                subtitle={app.subtitle}
                zIndex={windowState.zIndex}
                isActive={activeWindow === windowState.appId}
                isMinimized={Boolean(minimizedWindows[windowState.appId])}
                position={getWindowPosition(index)}
                chrome={windowState.appId === "terminal" ? "terminal" : "default"}
                onClose={closeWindow}
                onMinimize={minimizeWindow}
                onFocus={focusWindow}
              >
                <AppComponent />
              </Window>
            );
          })}
        </AnimatePresence>
      </div>

      {contextMenu ? (
        <div
          className="desktop-context-menu glass-panel"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(event) => event.stopPropagation()}
        >
          <p className="desktop-context-title">Change Wallpaper</p>
          <div className="desktop-context-list">
            {desktopAssets.wallpapers.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`desktop-context-item ${item.id === activeWallpaper.id ? "is-active" : ""}`}
                onClick={() => changeWallpaper(item.id)}
              >
                <span>{item.label}</span>
                {item.id === activeWallpaper.id ? <span>Current</span> : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <Dock items={dockItems} />
    </main>
  );
}
