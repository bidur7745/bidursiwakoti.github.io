import WindowControls from "./WindowControls.jsx";

export default function WindowHeader({
  title,
  subtitle,
  isExpanded,
  onClose,
  onMinimize,
  onToggleExpand,
  onDragStart,
}) {
  return (
    <header
      className="mac-window-header"
      onPointerDown={(event) => {
        if (event.target.closest(".window-controls")) {
          return;
        }

        onDragStart?.(event);
      }}
    >
      <WindowControls
        isExpanded={isExpanded}
        onClose={onClose}
        onMinimize={onMinimize}
        onToggleExpand={onToggleExpand}
      />

      <div className="mac-window-heading">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>

      <div className="mac-window-header-spacer" aria-hidden="true" />
    </header>
  );
}
