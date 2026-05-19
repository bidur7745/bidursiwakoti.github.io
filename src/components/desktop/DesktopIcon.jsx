export default function DesktopIcon({ label, icon: Icon, iconSrc, accent, isSelected, onSelect, onActivate }) {
  return (
    <button
      type="button"
      className={`desktop-icon ${isSelected ? "is-selected" : ""}`}
      aria-label={label}
      aria-pressed={isSelected}
      onFocus={onSelect}
      onClick={() => {
        onSelect?.();
        onActivate?.();
      }}
    >
      <span className={`desktop-icon-visual accent-${accent}`}>
        {iconSrc ? <img src={iconSrc} alt="" className="desktop-icon-image" /> : <Icon size={28} strokeWidth={1.9} />}
      </span>
      <span className="desktop-icon-label">{label}</span>
    </button>
  );
}
