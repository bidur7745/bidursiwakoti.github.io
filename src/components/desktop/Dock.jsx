export default function Dock({ items }) {
  return (
    <nav className="dock-shell" aria-label="Application dock">
      <div className="dock glass-panel">
        {items.map(({ id, label, icon: Icon, iconSrc, href, accent, onActivate, isOpen, isMinimized }) => {
          const content = (
            <>
              <span className={`dock-icon-badge accent-${accent} ${isMinimized ? "is-minimized" : ""}`}>
                {iconSrc ? <img src={iconSrc} alt="" className="dock-icon-image" /> : <Icon size={22} strokeWidth={1.8} />}
              </span>
              {isOpen ? <span className={`dock-running-indicator ${isMinimized ? "is-minimized" : ""}`} aria-hidden="true" /> : null}
              <span className="dock-tooltip">{label}</span>
            </>
          );

          if (href) {
            return (
              <a
                key={id}
                className={`dock-item ${isOpen ? "is-open" : ""}`}
                data-dock-app-id={id}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
              >
                {content}
              </a>
            );
          }

          return (
            <button
              key={id}
              type="button"
              className={`dock-item ${isOpen ? "is-open" : ""}`}
              data-dock-app-id={id}
              aria-label={label}
              onClick={onActivate}
            >
              {content}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
