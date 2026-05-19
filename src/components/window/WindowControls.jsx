export default function WindowControls({
  isExpanded,
  onClose,
  onMinimize,
  onToggleExpand,
}) {
  const controls = [
    { key: "close", label: "Close window", tone: "red", onClick: onClose },
    { key: "minimize", label: "Minimize window", tone: "yellow", onClick: onMinimize },
    {
      key: "expand",
      label: isExpanded ? "Restore window size" : "Expand window",
      tone: "green",
      onClick: onToggleExpand,
    },
  ];

  return (
    <div className="window-controls" aria-label="Window controls">
      {controls.map((control) => (
        <button
          key={control.key}
          type="button"
          className={`window-control window-control-${control.tone}`}
          aria-label={control.label}
          onPointerDown={(event) => {
            event.stopPropagation();
          }}
          onClick={(event) => {
            event.stopPropagation();
            control.onClick?.();
          }}
        >
          <span className="window-control-dot" />
        </button>
      ))}
    </div>
  );
}
