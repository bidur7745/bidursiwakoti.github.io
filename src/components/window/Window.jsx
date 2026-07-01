import { cloneElement, isValidElement, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import WindowHeader from "./WindowHeader.jsx";

export default function Window({
  appId,
  title,
  subtitle,
  zIndex,
  isActive,
  isMinimized,
  position,
  children,
  chrome = "default",
  onClose,
  onMinimize,
  onFocus,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [customSize, setCustomSize] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [minimizeTarget, setMinimizeTarget] = useState({ x: 0, y: 260 });
  const windowRef = useRef(null);
  const dragControls = useDragControls();
  const isTerminalChrome = chrome === "terminal";
  const isCalculatorChrome = chrome === "calculator";
  const isCustomChrome = isTerminalChrome || isCalculatorChrome;

  useLayoutEffect(() => {
    if (!isMinimized || !windowRef.current) {
      return;
    }

    const dockIcon = document.querySelector(`[data-dock-app-id="${appId}"] .dock-icon-badge`);

    if (!dockIcon) {
      setMinimizeTarget({ x: 0, y: Math.max(220, window.innerHeight * 0.34) });
      return;
    }

    const windowRect = windowRef.current.getBoundingClientRect();
    const dockRect = dockIcon.getBoundingClientRect();
    const windowCenterX = windowRect.left + windowRect.width / 2;
    const windowBottomY = windowRect.top + windowRect.height;
    const dockCenterX = dockRect.left + dockRect.width / 2;
    const dockCenterY = dockRect.top + dockRect.height / 2;

    setMinimizeTarget({
      x: dockCenterX - windowCenterX,
      y: dockCenterY - windowBottomY,
    });
  }, [appId, isMinimized]);

  function toggleExpanded() {
    setIsExpanded((value) => {
      if (!value) {
        setCustomSize(null);
      }

      return !value;
    });
  }

  function handleResizeStart(event, direction) {
    event.preventDefault();
    event.stopPropagation();
    onFocus(appId);

    const rect = event.currentTarget.parentElement.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const minWidth = isTerminalChrome ? 420 : isCalculatorChrome ? 300 : 360;
    const minHeight = isTerminalChrome ? 280 : isCalculatorChrome ? 430 : 260;

    function handlePointerMove(moveEvent) {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      const growsLeft = direction.includes("w");
      const growsRight = direction.includes("e");
      const growsTop = direction.includes("n");
      const growsBottom = direction.includes("s");
      const maxWidth = growsLeft
        ? Math.max(minWidth, rect.right - 8)
        : Math.max(minWidth, window.innerWidth - rect.left - 10);
      const maxHeight = growsTop
        ? Math.max(minHeight, rect.bottom - 40)
        : Math.max(minHeight, window.innerHeight - rect.top - 18);
      const requestedWidth = rect.width + (growsRight ? deltaX : 0) - (growsLeft ? deltaX : 0);
      const requestedHeight = rect.height + (growsBottom ? deltaY : 0) - (growsTop ? deltaY : 0);
      const nextWidth = Math.min(Math.max(requestedWidth, minWidth), maxWidth);
      const nextHeight = Math.min(Math.max(requestedHeight, minHeight), maxHeight);
      const nextLeft = growsLeft ? rect.left + (rect.width - nextWidth) : rect.left;
      const nextTop = growsTop ? rect.top + (rect.height - nextHeight) : rect.top;

      setCustomSize({
        width: nextWidth,
        height: nextHeight,
        left: `${Math.max(8, nextLeft - dragOffset.x)}px`,
        top: `${Math.max(40, nextTop - dragOffset.y)}px`,
      });
    }

    function handlePointerUp() {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp, { once: true });
  }

  const windowStyle = useMemo(() => {
    if (isExpanded) {
      return {
        top: "72px",
        left: "max(12px, env(safe-area-inset-left))",
        width: "calc(100vw - 24px)",
        height: "calc(100vh - 184px)",
      };
    }

    return {
      top: position.top,
      left: position.left,
      width: position.width,
      height: position.height,
    };
  }, [isExpanded, position]);

  const windowContent =
    isCustomChrome && isValidElement(children)
      ? cloneElement(children, {
          isExpanded,
          onClose: () => onClose(appId),
          onMinimize: () => onMinimize(appId),
          onToggleExpand: toggleExpanded,
          onDragStart: (event) => {
            onFocus(appId);
            dragControls.start(event);
          },
        })
      : children;

  return (
    <motion.article
      ref={windowRef}
      layout
      className={`mac-window ${isTerminalChrome ? "mac-window-terminal" : ""} ${isCalculatorChrome ? "mac-window-chromeless" : ""} ${isActive ? "is-active" : ""} ${isExpanded ? "is-expanded" : ""} ${isMinimized ? "is-minimized" : ""}`}
      style={{
        ...windowStyle,
        ...(customSize ?? {}),
        zIndex,
        pointerEvents: isMinimized ? "none" : "auto",
        transformOrigin: "center bottom",
      }}
      initial={{
        opacity: 0,
        scaleX: 0.94,
        scaleY: 0.94,
        x: 0,
        y: 30,
        rotateX: 0,
        filter: "blur(6px)",
        clipPath: "inset(0% 0% 0% 0% round 28px)",
      }}
      animate={
        isMinimized
          ? {
              opacity: [1, 0.96, 0.62, 0],
              scaleX: [1, 0.82, 0.28, 0.08],
              scaleY: [1, 0.74, 0.2, 0.05],
              x: [
                dragOffset.x,
                dragOffset.x + minimizeTarget.x * 0.18,
                dragOffset.x + minimizeTarget.x * 0.72,
                dragOffset.x + minimizeTarget.x,
              ],
              y: [
                dragOffset.y,
                dragOffset.y + minimizeTarget.y * 0.18,
                dragOffset.y + minimizeTarget.y * 0.78,
                dragOffset.y + minimizeTarget.y,
              ],
              rotateX: [0, -4, -9, -12],
              filter: ["blur(0px)", "blur(0px)", "blur(2px)", "blur(8px)"],
              clipPath: [
                "inset(0% 0% 0% 0% round 28px)",
                "inset(8% 5% 0% 5% round 24px)",
                "inset(28% 33% 0% 33% round 18px)",
                "inset(48% 47% 0% 47% round 14px)",
              ],
            }
          : {
              opacity: 1,
              scaleX: 1,
              scaleY: 1,
              x: dragOffset.x,
              y: dragOffset.y,
              rotateX: 0,
              filter: "blur(0px)",
              clipPath: "inset(0% 0% 0% 0% round 28px)",
            }
      }
      exit={{
        opacity: 0,
        scaleX: 0.9,
        scaleY: 0.9,
        y: 72,
        filter: "blur(6px)",
        clipPath: "inset(0% 0% 0% 0% round 28px)",
      }}
      transition={{
        layout: { type: "spring", stiffness: 320, damping: 32, mass: 0.86 },
        opacity: isMinimized ? { duration: 0.58, times: [0, 0.38, 0.78, 1], ease: [0.24, 0.82, 0.32, 1] } : { duration: 0.18 },
        scaleX: isMinimized ? { duration: 0.58, times: [0, 0.36, 0.78, 1], ease: [0.24, 0.82, 0.32, 1] } : { type: "spring", stiffness: 360, damping: 28 },
        scaleY: isMinimized ? { duration: 0.58, times: [0, 0.34, 0.8, 1], ease: [0.24, 0.82, 0.32, 1] } : { type: "spring", stiffness: 360, damping: 28 },
        x: isMinimized ? { duration: 0.58, times: [0, 0.28, 0.78, 1], ease: [0.2, 0.84, 0.28, 1] } : { type: "spring", stiffness: 340, damping: 30 },
        y: isMinimized ? { duration: 0.58, times: [0, 0.28, 0.78, 1], ease: [0.2, 0.84, 0.28, 1] } : { type: "spring", stiffness: 340, damping: 30 },
        rotateX: { duration: isMinimized ? 0.58 : 0.2 },
        filter: { duration: isMinimized ? 0.58 : 0.18, ease: "easeOut" },
        clipPath: { duration: isMinimized ? 0.58 : 0.18, ease: [0.24, 0.82, 0.32, 1] },
      }}
      drag
      dragMomentum={false}
      dragElastic={0.04}
      dragControls={dragControls}
      dragListener={false}
      onDragEnd={(_event, info) => {
        setDragOffset((current) => ({
          x: current.x + info.offset.x,
          y: current.y + info.offset.y,
        }));
      }}
      onMouseDown={() => {
        if (!isMinimized) {
          onFocus(appId);
        }
      }}
      onClick={() => {
        if (!isMinimized) {
          onFocus(appId);
        }
      }}
      aria-hidden={isMinimized}
    >
      {!isCustomChrome ? (
        <WindowHeader
          title={title}
          subtitle={subtitle}
          isExpanded={isExpanded}
          onClose={() => onClose(appId)}
          onMinimize={() => onMinimize(appId)}
          onToggleExpand={toggleExpanded}
          onDragStart={(event) => {
            onFocus(appId);
            dragControls.start(event);
          }}
        />
      ) : null}

      <div className={`mac-window-body ${isCustomChrome ? "mac-window-body-terminal" : ""}`}>
        {windowContent}
      </div>

      {["n", "e", "s", "w", "ne", "se", "sw", "nw"].map((direction) => (
        <span
          key={direction}
          className={`mac-window-resize-zone resize-${direction}`}
          aria-hidden="true"
          onPointerDown={(event) => handleResizeStart(event, direction)}
        />
      ))}
    </motion.article>
  );
}
