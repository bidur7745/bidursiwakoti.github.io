import { create } from "zustand";

const useWindowStore = create((set) => ({
  openedWindows: {},
  minimizedWindows: {},
  activeWindow: null,
  topZIndex: 10,

  openWindow: (appId) =>
    set((state) => {
      const nextZIndex = state.topZIndex + 1;

      return {
        openedWindows: {
          ...state.openedWindows,
          [appId]: {
            appId,
            isOpen: true,
            zIndex: nextZIndex,
          },
        },
        minimizedWindows: {
          ...state.minimizedWindows,
          [appId]: false,
        },
        activeWindow: appId,
        topZIndex: nextZIndex,
      };
    }),

  closeWindow: (appId) =>
    set((state) => {
      const openedWindows = { ...state.openedWindows };
      const minimizedWindows = { ...state.minimizedWindows };

      delete openedWindows[appId];
      delete minimizedWindows[appId];

      return {
        openedWindows,
        minimizedWindows,
        activeWindow: state.activeWindow === appId ? null : state.activeWindow,
      };
    }),

  minimizeWindow: (appId) =>
    set((state) => {
      if (!state.openedWindows[appId]) {
        return state;
      }

      return {
        minimizedWindows: {
          ...state.minimizedWindows,
          [appId]: true,
        },
        activeWindow: state.activeWindow === appId ? null : state.activeWindow,
      };
    }),

  focusWindow: (appId) =>
    set((state) => {
      if (!state.openedWindows[appId]) {
        return state;
      }

      const nextZIndex = state.topZIndex + 1;

      return {
        openedWindows: {
          ...state.openedWindows,
          [appId]: {
            ...state.openedWindows[appId],
            zIndex: nextZIndex,
          },
        },
        minimizedWindows: {
          ...state.minimizedWindows,
          [appId]: false,
        },
        activeWindow: appId,
        topZIndex: nextZIndex,
      };
    }),

  restoreWindow: (appId) =>
    set((state) => {
      if (!state.openedWindows[appId]) {
        return state;
      }

      const nextZIndex = state.topZIndex + 1;

      return {
        openedWindows: {
          ...state.openedWindows,
          [appId]: {
            ...state.openedWindows[appId],
            zIndex: nextZIndex,
          },
        },
        minimizedWindows: {
          ...state.minimizedWindows,
          [appId]: false,
        },
        activeWindow: appId,
        topZIndex: nextZIndex,
      };
    }),
}));

export default useWindowStore;
