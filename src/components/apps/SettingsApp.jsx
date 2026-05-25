import {
  BadgeCheck,
  Bell,
  Check,
  ChevronRight,
  CircleCheck,
  Copy,
  ExternalLink,
  Eye,
  FileText,
  Folder,
  Globe,
  HardDrive,
  Image,
  Info,
  Laptop,
  Layers,
  Lock,
  Mail,
  Monitor,
  Palette,
  Search,
  Server,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wifi,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { desktopAssets } from "../../assets/appAssets.js";
import { links } from "../../data/links.js";
import { personalInfo } from "../../data/personalInfo.js";
import useWindowStore from "../../store/windowStore.js";

const WALLPAPER_STORAGE_KEY = "evileverest-os-wallpaper";

const settingsSections = [
  { id: "general", label: "General", subtitle: "System profile and portfolio identity", icon: Info },
  { id: "appearance", label: "Appearance", subtitle: "Theme, wallpaper, accent, and visual style", icon: Palette },
  { id: "desktop", label: "Desktop & Dock", subtitle: "Control dock behavior, desktop icons, and workspace style", icon: Laptop },
  { id: "network", label: "Network", subtitle: "Online identity and connection status", icon: Wifi },
  { id: "privacy", label: "Privacy & Security", subtitle: "Safe portfolio behavior and public information controls", icon: ShieldCheck },
  { id: "notifications", label: "Notifications", subtitle: "Portfolio alerts and interaction preferences", icon: Bell },
];

const accentOptions = [
  { label: "Purple", color: "#7c3aed" },
  { label: "Blue", color: "#0ea5e9" },
  { label: "Green", color: "#22c55e" },
  { label: "Orange", color: "#f97316" },
  { label: "Pink", color: "#ec4899" },
];

const generalRows = [
  { label: "Owner", value: personalInfo.fullName, icon: UserRound },
  { label: "Computer Name", value: "EvilEverest OS", icon: Monitor },
  { label: "Role", value: "Student / Developer / Builder", icon: Folder },
  { label: "Location", value: personalInfo.location, icon: Globe },
  { label: "Chip", value: "React + Vite interface engine", icon: Server },
  { label: "Memory", value: "Curiosity, projects, and practical ambition", icon: HardDrive },
  { label: "Serial Number", value: "EVIL-EVEREST-BIDUR-001", icon: BadgeCheck },
];

const visualEffects = [
  { key: "glassmorphism", label: "Glassmorphism", detail: "Glass-like surfaces throughout the system.", icon: Layers, initial: true },
  { key: "windowBlur", label: "Window Blur", detail: "Acrylic blur on windows and panels.", icon: Sparkles, initial: true },
  { key: "reduceMotion", label: "Reduce Motion", detail: "Minimize animations and motion effects.", icon: Zap, initial: false },
  { key: "highContrast", label: "High Contrast", detail: "Increase contrast for better readability.", icon: Eye, initial: false },
];

const dockSettings = [
  { key: "dockPosition", label: "Dock Position", value: "Bottom", icon: Laptop },
  { key: "dockSize", label: "Dock Size", value: "Medium", icon: Monitor },
  { key: "magnification", label: "Magnification", value: "Enabled", icon: Sparkles, toggle: true, initial: true },
  { key: "activeIndicators", label: "Show Active Indicators", value: "Enabled", icon: CircleCheck, toggle: true, initial: true },
  { key: "autoHideDock", label: "Auto Hide Dock", value: "Off", icon: Eye, toggle: true, initial: false },
];

const desktopSettings = [
  { key: "desktopIcons", label: "Show Desktop Icons", value: "Enabled", icon: Folder, toggle: true, initial: true },
  { key: "iconLabel", label: "Icon Label", value: "Enabled", icon: FileText, toggle: true, initial: true },
  { key: "iconGrid", label: "Icon Grid", value: "Comfortable", icon: Layers },
  { key: "welcomeCard", label: "Welcome Card", value: "Enabled", icon: Sparkles, toggle: true, initial: true },
  { key: "wallpaperMenu", label: "Wallpaper Menu", value: "Enabled", icon: Image, toggle: true, initial: true },
];

const privacyChecklist = [
  "No .env committed",
  "No private API keys in React",
  "No sensitive personal documents exposed",
  "Social links reviewed before deployment",
];

const notificationApps = [
  { label: "Finder", icon: desktopAssets.finderIcon, status: "Enabled" },
  { label: "Terminal", icon: desktopAssets.terminalIcon, status: "Important" },
  { label: "Safari", icon: desktopAssets.resumeIcon, status: "Quiet" },
  { label: "Mail", icon: desktopAssets.mailIcon, status: "Enabled" },
  { label: "Projects", icon: desktopAssets.projectsIcon, status: "Important" },
];

function getStoredWallpaperId() {
  if (typeof window === "undefined") {
    return desktopAssets.wallpapers[0]?.id ?? "default";
  }

  return window.localStorage.getItem(WALLPAPER_STORAGE_KEY) ?? desktopAssets.wallpapers[0]?.id ?? "default";
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      className={`settings-toggle ${checked ? "is-on" : ""}`}
      aria-label={label}
      aria-pressed={checked}
      onClick={(event) => {
        event.stopPropagation();
        onChange?.(!checked);
      }}
    >
      <span />
    </button>
  );
}

function Badge({ children, tone = "default" }) {
  return <span className={`settings-badge settings-badge-${tone}`}>{children}</span>;
}

function SettingsRow({ icon: Icon, label, value, detail, badge, href, onClick, children }) {
  const className = `settings-row ${onClick || href ? "is-clickable" : ""}`;
  const content = (
    <>
      <span className="settings-row-icon">{Icon ? <Icon size={17} strokeWidth={2} /> : null}</span>
      <span className="settings-row-copy">
        <span className="settings-row-label">{label}</span>
        {detail ? <span className="settings-row-detail">{detail}</span> : null}
      </span>
      <span className="settings-row-value">
        {children ?? value}
        {badge ? <Badge tone={badge.tone}>{badge.label}</Badge> : null}
      </span>
      {href || onClick ? <ChevronRight size={16} strokeWidth={2} className="settings-row-chevron" /> : null}
    </>
  );

  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}

function ActionCard({ icon: Icon, iconSrc, title, description, onClick, href }) {
  const content = (
    <>
      <span className="settings-action-icon">{iconSrc ? <img src={iconSrc} alt="" /> : Icon ? <Icon size={19} strokeWidth={2} /> : null}</span>
      <span className="settings-action-copy">
        <strong>{title}</strong>
        <span>{description}</span>
      </span>
      <ChevronRight size={17} strokeWidth={2} />
    </>
  );

  if (href) {
    return (
      <a className="settings-action-card" href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button type="button" className="settings-action-card" onClick={onClick}>
      {content}
    </button>
  );
}

function PlainAction({ icon: Icon, children, onClick, href, muted = false }) {
  const className = `settings-plain-action ${muted ? "is-muted" : ""}`;
  const content = (
    <>
      {Icon ? <Icon size={16} strokeWidth={2} /> : null}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  );
}

export default function SettingsApp() {
  const [activeSection, setActiveSection] = useState("general");
  const [query, setQuery] = useState("");
  const [accent, setAccent] = useState("Purple");
  const [activeWallpaperId, setActiveWallpaperId] = useState(getStoredWallpaperId);
  const [notice, setNotice] = useState("Dark Mode is active across EvilEverest OS.");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [toggles, setToggles] = useState(() => {
    const initial = {};
    [...visualEffects, ...dockSettings, ...desktopSettings].forEach((item) => {
      if (item.toggle || Object.prototype.hasOwnProperty.call(item, "initial")) {
        initial[item.key] = Boolean(item.initial);
      }
    });
    initial.welcomeToasts = true;
    initial.appOpenSounds = false;
    initial.contactAlerts = true;
    initial.projectAlerts = true;
    initial.resumeNotice = false;
    return initial;
  });

  const openedWindows = useWindowStore((state) => state.openedWindows);
  const minimizedWindows = useWindowStore((state) => state.minimizedWindows);
  const openWindow = useWindowStore((state) => state.openWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const restoreWindow = useWindowStore((state) => state.restoreWindow);

  const visibleSections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return settingsSections;
    }

    return settingsSections.filter((section) => section.label.toLowerCase().includes(normalizedQuery));
  }, [query]);

  const active = settingsSections.find((section) => section.id === activeSection) ?? settingsSections[0];
  const ActiveIcon = active.icon;
  const primaryEmail = links.email.personal.replace("mailto:", "");

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

  function updateToggle(key, nextValue) {
    setToggles((current) => ({ ...current, [key]: nextValue }));
  }

  function selectWallpaper(wallpaperId) {
    setActiveWallpaperId(wallpaperId);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(WALLPAPER_STORAGE_KEY, wallpaperId);
      window.dispatchEvent(new CustomEvent("evileverest-wallpaper-change", { detail: { wallpaperId } }));
    }

    const wallpaper = desktopAssets.wallpapers.find((item) => item.id === wallpaperId);
    setNotice(`${wallpaper?.label ?? "Wallpaper"} saved as the preferred wallpaper.`);
  }

  async function copyEmail() {
    try {
      if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(primaryEmail);
      setCopiedEmail(true);
      setNotice("Email copied to clipboard.");
    } catch {
      setCopiedEmail(false);
      setNotice("Email is ready to copy from the Network panel.");
    }
  }

  function placeholderAction(label) {
    setNotice(`${label} is ready as a safe Settings placeholder.`);
  }

  function renderGeneral() {
    return (
      <>
        <section className="settings-system-card">
          <img src={desktopAssets.settingsIcon} alt="" className="settings-system-icon" />
          <div>
            <h2>EvilEverest OS</h2>
            <p>macOS-inspired portfolio desktop</p>
            <div className="settings-system-badges">
              <Badge tone="blue">Version 1.0.0</Badge>
              <Badge tone="green">Owner: {personalInfo.fullName}</Badge>
            </div>
          </div>
        </section>

        <section className="settings-card settings-row-card" aria-label="System information">
          {generalRows.map((item) => (
            <SettingsRow key={item.label} icon={item.icon} label={item.label} value={item.value} />
          ))}
        </section>

        <section className="settings-action-grid" aria-label="Quick actions">
          <ActionCard iconSrc={desktopAssets.resumeIcon} title="Open Resume" description="View resume details and PDF actions" onClick={() => launchApp("resume")} />
          <ActionCard iconSrc={desktopAssets.projectsIcon} title="Open Projects" description="Explore selected work and builds" onClick={() => launchApp("projects")} />
          <ActionCard iconSrc={desktopAssets.terminalIcon} title="Open Terminal" description="Access the built-in developer terminal" onClick={() => launchApp("terminal")} />
          <ActionCard iconSrc={desktopAssets.mailIcon} title="Contact Me" description="Send a message or say hello" onClick={() => launchApp("mail")} />
        </section>
      </>
    );
  }

  function renderAppearance() {
    return (
      <>
        <section className="settings-card settings-section-card">
          <div className="settings-section-heading">
            <h2>Theme</h2>
            <Badge tone="blue">Dark Mode Current</Badge>
          </div>
          <div className="settings-theme-grid">
            <button type="button" className="settings-theme-card is-active" onClick={() => setNotice("Dark Mode is already active.")}>
              <span className="settings-theme-preview settings-theme-preview-dark">
                <span />
              </span>
              <strong>Dark Mode</strong>
              <Badge tone="blue">Current</Badge>
              <Check size={16} strokeWidth={2} className="settings-theme-check" />
            </button>
            <button type="button" className="settings-theme-card is-coming" onClick={() => setNotice("Light Mode is planned for a future EvilEverest OS update.")}>
              <span className="settings-theme-preview settings-theme-preview-light">
                <span />
              </span>
              <strong>Light Mode</strong>
              <Badge>Coming Soon</Badge>
            </button>
            <button type="button" className="settings-theme-card is-coming" onClick={() => setNotice("Auto theme switching is planned for a future update.")}>
              <span className="settings-theme-preview settings-theme-preview-auto">
                <span />
              </span>
              <strong>Auto</strong>
              <Badge>Coming Soon</Badge>
            </button>
          </div>
        </section>

        <section className="settings-card settings-section-card">
          <div className="settings-section-heading">
            <h2>Accent Color</h2>
            <Badge tone="purple">{accent}</Badge>
          </div>
          <div className="settings-accent-grid">
            {accentOptions.map((item) => {
              const isActive = accent === item.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  className={`settings-accent-button ${isActive ? "is-active" : ""}`}
                  onClick={() => {
                    setAccent(item.label);
                    setNotice(`${item.label} accent selected for Settings controls.`);
                  }}
                >
                  <span style={{ background: item.color }}>{isActive ? <Check size={18} strokeWidth={2.4} /> : null}</span>
                  <strong>{item.label}</strong>
                </button>
              );
            })}
          </div>
        </section>

        <section className="settings-card settings-section-card">
          <div className="settings-section-heading">
            <h2>Wallpaper</h2>
            <Badge tone="green">Saved Preference</Badge>
          </div>
          <div className="settings-wallpaper-grid">
            {desktopAssets.wallpapers.map((wallpaper) => {
              const isActive = activeWallpaperId === wallpaper.id;
              return (
                <button
                  key={wallpaper.id}
                  type="button"
                  className={`settings-wallpaper-button ${isActive ? "is-active" : ""}`}
                  onClick={() => selectWallpaper(wallpaper.id)}
                >
                  <img src={wallpaper.src} alt="" />
                  <span>{wallpaper.label}</span>
                  {isActive ? <Badge tone="purple">Current</Badge> : null}
                </button>
              );
            })}
          </div>
        </section>

        <section className="settings-card settings-row-card">
          {visualEffects.map((effect) => (
            <SettingsRow key={effect.key} icon={effect.icon} label={effect.label} detail={effect.detail}>
              <Toggle checked={toggles[effect.key]} label={effect.label} onChange={(value) => updateToggle(effect.key, value)} />
            </SettingsRow>
          ))}
        </section>
      </>
    );
  }

  function renderDesktopDock() {
    return (
      <>
        <section className="settings-card settings-dock-preview-card">
          <div>
            <h2>Dock Preview</h2>
            <p>Bottom dock with magnification, active dots, and app shortcuts.</p>
          </div>
          <div className="settings-mini-dock" aria-hidden="true">
            {[desktopAssets.finderIcon, desktopAssets.terminalIcon, desktopAssets.projectsIcon, desktopAssets.mailIcon, desktopAssets.settingsIcon].map((icon, index) => (
              <span key={icon} className={index === 4 ? "is-active" : ""}>
                <img src={icon} alt="" />
              </span>
            ))}
          </div>
        </section>

        <section className="settings-two-column">
          <div className="settings-card settings-row-card">
            <div className="settings-list-title">Dock Settings</div>
            {dockSettings.map((item) => (
              <SettingsRow key={item.key} icon={item.icon} label={item.label} value={item.value}>
                {item.toggle ? <Toggle checked={toggles[item.key]} label={item.label} onChange={(value) => updateToggle(item.key, value)} /> : item.value}
              </SettingsRow>
            ))}
          </div>

          <div className="settings-card settings-row-card">
            <div className="settings-list-title">Desktop Settings</div>
            {desktopSettings.map((item) => (
              <SettingsRow key={item.key} icon={item.icon} label={item.label} value={item.value}>
                {item.toggle ? <Toggle checked={toggles[item.key]} label={item.label} onChange={(value) => updateToggle(item.key, value)} /> : item.value}
              </SettingsRow>
            ))}
          </div>
        </section>

        <section className="settings-card settings-button-strip">
          <PlainAction icon={Settings} onClick={() => placeholderAction("Reset Desktop Layout")}>Reset Desktop Layout</PlainAction>
          <PlainAction icon={Folder} onClick={() => launchApp("finder")}>Open Finder</PlainAction>
          <PlainAction icon={Settings} onClick={() => launchApp("settings")}>Open Settings</PlainAction>
        </section>
      </>
    );
  }

  function renderNetwork() {
    return (
      <>
        <section className="settings-network-card">
          <div className="settings-network-orb">
            <Wifi size={30} strokeWidth={2.2} />
          </div>
          <div>
            <Badge tone="green">Connected</Badge>
            <h2>EvilEverest Network</h2>
            <p>Signal: Strong | Status: Online Portfolio</p>
          </div>
        </section>

        <section className="settings-card settings-row-card">
          <SettingsRow icon={Server} label="Host" value="localhost / deployed domain placeholder" />
          <SettingsRow icon={Globe} label="Portfolio URL" value={links.portfolio} href={links.portfolio} />
          <SettingsRow icon={ExternalLink} label="GitHub" value="bidur7745" href={links.github} />
          <SettingsRow icon={ExternalLink} label="LinkedIn" value="Profile link" href={links.linkedin} />
          <SettingsRow icon={Mail} label="Email" value={primaryEmail} href={links.email.personal} />
        </section>

        <section className="settings-connection-grid">
          {[
            [ExternalLink, "GitHub", "Connected"],
            [ExternalLink, "LinkedIn", "Connected"],
            [Mail, "Email", "Ready"],
            [FileText, "Resume Link", "Ready"],
          ].map(([Icon, label, status]) => (
            <div key={label} className="settings-connection-card">
              <Icon size={19} strokeWidth={2} />
              <strong>{label}</strong>
              <Badge tone="green">{status}</Badge>
            </div>
          ))}
        </section>

        <section className="settings-card settings-button-strip">
          <PlainAction icon={ExternalLink} href={links.github}>Open GitHub</PlainAction>
          <PlainAction icon={ExternalLink} href={links.linkedin}>Open LinkedIn</PlainAction>
          <PlainAction icon={Copy} onClick={copyEmail}>{copiedEmail ? "Email Copied" : "Copy Email"}</PlainAction>
        </section>
      </>
    );
  }

  function renderPrivacy() {
    return (
      <>
        <section className="settings-security-card">
          <div className="settings-security-lock">
            <Lock size={28} strokeWidth={2.2} />
          </div>
          <div>
            <Badge tone="green">Public Portfolio Mode</Badge>
            <h2>Privacy Review Passed</h2>
            <p>No secrets stored in frontend | API keys hidden | External links open in new tab</p>
          </div>
        </section>

        <section className="settings-card settings-row-card">
          <SettingsRow icon={UserRound} label="Public Profile" value="Enabled" badge={{ label: "Public", tone: "blue" }} />
          <SettingsRow icon={Mail} label="Contact Form" value="Frontend only / Safe mode" />
          <SettingsRow icon={FileText} label="Resume Visibility" value="Public placeholder" />
          <SettingsRow icon={ExternalLink} label="External Links" value="Open in new tab" />
          <SettingsRow icon={ShieldCheck} label="API Key Exposure" value="Protected" badge={{ label: "Safe", tone: "green" }} />
        </section>

        <section className="settings-card settings-checklist-card">
          <div className="settings-list-title">Developer Safety Checklist</div>
          {privacyChecklist.map((item) => (
            <div key={item} className="settings-check-row">
              <CircleCheck size={18} strokeWidth={2.2} />
              <span>{item}</span>
              <Badge tone="green">Checked</Badge>
            </div>
          ))}
        </section>

        <section className="settings-note-card">
          This portfolio is designed to share professional information only.
        </section>
      </>
    );
  }

  function renderNotifications() {
    const notificationRows = [
      { key: "welcomeToasts", label: "Welcome Toasts", value: "Enabled", icon: Bell },
      { key: "appOpenSounds", label: "App Open Sounds", value: "Off", icon: Zap },
      { key: "contactAlerts", label: "Contact Form Alerts", value: "Enabled", icon: Mail },
      { key: "projectAlerts", label: "Project Update Alerts", value: "Enabled", icon: Folder },
      { key: "resumeNotice", label: "Resume Download Notice", value: "Off", icon: FileText },
    ];

    return (
      <>
        <section className="settings-notification-preview">
          <div className="settings-notification-bell">
            <Bell size={22} strokeWidth={2.2} />
          </div>
          <div>
            <h2>Welcome to EvilEverest OS</h2>
            <p>New visitor opened your portfolio desktop</p>
          </div>
          <Badge tone="blue">Preview</Badge>
        </section>

        <section className="settings-card settings-row-card">
          {notificationRows.map((row) => (
            <SettingsRow key={row.key} icon={row.icon} label={row.label} value={row.value}>
              <Toggle checked={toggles[row.key]} label={row.label} onChange={(value) => updateToggle(row.key, value)} />
            </SettingsRow>
          ))}
        </section>

        <section className="settings-card settings-app-list-card">
          <div className="settings-list-title">App Notifications</div>
          {notificationApps.map((app) => (
            <div key={app.label} className="settings-app-notification-row">
              <img src={app.icon} alt="" />
              <strong>{app.label}</strong>
              <Badge tone={app.status === "Important" ? "purple" : app.status === "Quiet" ? "default" : "green"}>{app.status}</Badge>
            </div>
          ))}
        </section>

        <section className="settings-note-card">
          Real notifications can be connected later with backend or analytics.
        </section>
      </>
    );
  }

  function renderActivePane() {
    if (activeSection === "appearance") return renderAppearance();
    if (activeSection === "desktop") return renderDesktopDock();
    if (activeSection === "network") return renderNetwork();
    if (activeSection === "privacy") return renderPrivacy();
    if (activeSection === "notifications") return renderNotifications();
    return renderGeneral();
  }

  return (
    <div className="settings-app">
      <aside className="settings-sidebar">
        <div className="settings-search">
          <Search size={16} strokeWidth={2} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search settings" />
        </div>

        <button type="button" className="settings-account-card" onClick={() => setActiveSection("general")}>
          <span className="settings-avatar"><img src={desktopAssets.menuLogo} alt="" /></span>
          <span>
            <strong>{personalInfo.fullName}</strong>
            <small>EvilEverest Account</small>
          </span>
        </button>

        <nav className="settings-nav" aria-label="Settings sections">
          {visibleSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;

            return (
              <button key={section.id} type="button" className={`settings-nav-item ${isActive ? "is-active" : ""}`} onClick={() => setActiveSection(section.id)}>
                <Icon size={18} strokeWidth={2} />
                <span>{section.label}</span>
              </button>
            );
          })}
          {!visibleSections.length ? <span className="settings-empty-search">No settings found</span> : null}
        </nav>

        <div className="settings-sidebar-footer">
          <img src={desktopAssets.settingsIcon} alt="" />
          <span>
            <strong>EvilEverest OS</strong>
            <small>Version 1.0.0</small>
          </span>
        </div>
      </aside>

      <main className="settings-main">
        <header className="settings-main-header">
          <span className="settings-main-icon">
            <ActiveIcon size={22} strokeWidth={2.1} />
          </span>
          <span>
            <h1>{active.label}</h1>
            <p>{active.subtitle}</p>
          </span>
        </header>

        <AnimatePresence mode="wait">
          <motion.section
            key={active.id}
            className="settings-pane"
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {renderActivePane()}
          </motion.section>
        </AnimatePresence>

        <div className="settings-status-bar" role="status">
          <Sparkles size={14} strokeWidth={2} />
          <span>{notice}</span>
        </div>
      </main>
    </div>
  );
}
