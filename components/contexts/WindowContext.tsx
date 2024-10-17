"use client";

import _ from "lodash";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  RefObject,
  Dispatch,
  SetStateAction,
  useCallback,
  cloneElement,
} from "react";
import { useSettings } from "./SettingsContext";
import { useToast } from "./ToastContext";
import { windowEntryMap } from "../window/WindowPickerEntry";

interface Props {
  children?: ReactNode;
}

const WindowContext = createContext<
  | {
      windows: WindowData[];
      windowOrder: number[];
      windowRefs: RefObject<HTMLDivElement>[];
      appendWindow: (windowData: PartialBy<WindowData, "uniqueId">) => void;
      clearWindow: () => void;
      removeWindowByContextKey: (uniqueKey: string) => void;
      removeWindowByUniqueId: (uniqueId: string) => void;
      setActiveWindow: (uniqueId: string) => void;
      setActiveWindowByContextKey: (contextKey: string) => void;
      registerWindowRef: (
        index: number,
        ref: RefObject<HTMLDivElement>
      ) => void;
      isWindowMinimized: boolean;
      setIsWindowMinimized: Dispatch<SetStateAction<boolean>>;
      initiateWindowCleanup: () => void;
      windowCleanupData: ({ newX: number; newY: number } | null)[];
      windowSaveProps: WindowSaveData["initialProps"][];
      modifyWindowSaveProps: (
        index: number,
        newProps: Record<string, any>
      ) => void;
      restoreWindowFromSave: (
        save: WindowSaveData[],
        viewportDimension: { width: number; height: number }
      ) => void;
      saveWindows: () => void;
    }
  | undefined
>(undefined);

export function WindowProvider({ children }: Props) {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [windowOrder, setWindowOrder] = useState<number[]>([]);
  const [windowRefs, setWindowRefs] = useState<RefObject<HTMLDivElement>[]>([]);
  const [windowCleanupData, setWindowCleanupData] = useState<
    ({ newX: number; newY: number } | null)[]
  >([]);
  const [windowSaveProps, setWindowSaveProps] = useState<
    WindowSaveData["initialProps"][]
  >([]);
  const [isWindowMinimized, setIsWindowMinimized] = useState(false);
  const { settings, updateSettings } = useSettings();
  const { appendToast } = useToast();

  const appendWindow = (newWindowData: PartialBy<WindowData, "uniqueId">) => {
    let isWindowCapped = false;

    setWindows((prevWindows) => {
      const countLimitedWindows = prevWindows.filter(
        (window) => window.countsToLimit
      ).length;

      if (
        newWindowData.countsToLimit &&
        countLimitedWindows >= settings.windowLimit
      ) {
        isWindowCapped = true;
        return prevWindows;
      }

      const formattedData = {
        ...newWindowData,
        uniqueId: `window-${_.uniqueId()}`,
      };

      if (
        formattedData.contextKey &&
        prevWindows.some(
          (someWindow) => someWindow.contextKey === formattedData.contextKey
        )
      ) {
        return prevWindows;
      }

      const newWindows = [...prevWindows, formattedData as WindowData];

      if (newWindows.length > prevWindows.length) {
        setWindowOrder((prevOrder) => {
          if (!(prevOrder.length < newWindows.length)) {
            return prevOrder;
          }

          return [...prevOrder, prevOrder.length];
        });

        setWindowRefs((prevRefs) => {
          if (!(prevRefs.length < newWindows.length)) {
            return prevRefs;
          }

          return [...prevRefs, { current: null }];
        });

        setWindowCleanupData((prevData) => {
          if (!(prevData.length < newWindows.length)) {
            return prevData;
          }

          return [...prevData, null];
        });
      }

      return newWindows;
    });

    if (isWindowCapped) {
      appendToast({
        title: "Zimo Web",
        description: `No more than ${settings.windowLimit} window${
          settings.windowLimit === 1 ? "" : "s"
        } is allowed.`,
      });
    }
  };

  const clearWindow = () => {
    setWindows([]);
    setWindowOrder([]);
    setWindowRefs([]);
    setWindowCleanupData([]);
  };

  const removeWindow = <K extends keyof WindowData>(
    key: K,
    value: WindowData[K]
  ) => {
    setWindows((prevWindows) => {
      const indexToRemove = prevWindows.findIndex(
        (window) => window[key] === value
      );
      if (indexToRemove === -1) {
        return prevWindows;
      }

      setWindowOrder((prevOrder) => {
        const newOrder = prevOrder.filter(
          (_, index) => index !== indexToRemove
        );

        if (prevOrder.length < prevWindows.length) {
          return prevOrder;
        }

        return newOrder.map((order) =>
          order > prevOrder[indexToRemove] ? order - 1 : order
        );
      });

      setWindowRefs((prevRefs) => {
        const newRefs = prevRefs.filter((_, index) => index !== indexToRemove);

        if (prevRefs.length < prevWindows.length) {
          return prevRefs;
        }

        return newRefs;
      });

      setWindowCleanupData((prevData) => {
        const newData = prevData.filter((_, index) => index !== indexToRemove);

        if (prevData.length < prevWindows.length) {
          return prevData;
        }

        return newData;
      });

      return prevWindows.filter((window) => window[key] !== value);
    });
  };

  const removeWindowByContextKey = (contextKey: string) =>
    removeWindow("contextKey", contextKey);
  const removeWindowByUniqueId = (uniqueId: string) =>
    removeWindow("uniqueId", uniqueId);

  const setActiveWindowByKey = <K extends keyof WindowData>(
    key: K,
    value: WindowData[K]
  ) => {
    setWindowOrder((prevOrder) => {
      const windowIndex = windows.findIndex((window) => window[key] === value);
      if (windowIndex === -1) {
        return prevOrder;
      }

      const currentOrder = prevOrder[windowIndex];

      if (currentOrder === prevOrder.length - 1) {
        return prevOrder;
      }

      return prevOrder.map((order) => {
        if (order === currentOrder) {
          return prevOrder.length - 1;
        } else if (order > currentOrder) {
          return order - 1;
        }
        return order;
      });
    });
  };

  const setActiveWindow = (uniqueId: string) =>
    setActiveWindowByKey("uniqueId", uniqueId);
  const setActiveWindowByContextKey = (contextKey: string) =>
    setActiveWindowByKey("contextKey", contextKey);

  const registerWindowRef = (index: number, ref: RefObject<HTMLDivElement>) => {
    setWindowRefs((prevRefs) => {
      const newRefs = [...prevRefs];
      newRefs[index] = ref;
      return newRefs;
    });
  };

  const initiateWindowCleanup = useCallback(() => {
    const gap = 8;
    const rowHeight = 90;
    const windowMargin = 20;
    const availableWidth = window.innerWidth - windowMargin;
    const newCleanupData: { newX: number; newY: number }[] = [];
    const newOrder: number[] = [];

    const movableWindows = windows
      .map((data, idx) => ({ data, idx, order: windowOrder[idx] }))
      .filter((item) => !item.data.disableMove);

    const disableMoveWindows = windows
      .map((data, idx) => ({ data, idx, order: windowOrder[idx] }))
      .filter((item) => item.data.disableMove);

    disableMoveWindows.sort((a, b) => a.order - b.order);

    const sortedWindows = movableWindows
      .map(({ data, idx, order }) => {
        const ref = windowRefs[idx];
        const refWidth = data.disableWidthAdjustment
          ? ref?.current?.offsetWidth ?? 0
          : data.minWidth ?? ref?.current?.offsetWidth ?? 0;

        return { order, idx, refWidth };
      })
      .sort((a, b) => b.refWidth - a.refWidth);

    const rows: number[][] = [];

    for (const { idx, refWidth } of sortedWindows) {
      let placedInRow = false;

      for (let r = 0; r < rows.length; r++) {
        const rowWidth = rows[r].reduce((sum, windowIdx) => {
          const otherData = windows[windowIdx];
          const otherRef = windowRefs[windowIdx];
          const otherRefWidth = otherData.disableWidthAdjustment
            ? otherRef?.current?.offsetWidth ?? 0
            : otherData.minWidth ?? otherRef?.current?.offsetWidth ?? 0;
          return sum + otherRefWidth + gap;
        }, windowMargin);

        if (rowWidth + refWidth + gap <= availableWidth) {
          rows[r].push(idx);
          placedInRow = true;
          break;
        }
      }

      if (!placedInRow) {
        rows.push([idx]);
      }
    }

    const sortedRows = rows
      .map((row) => ({
        row,
        totalWidth: row.reduce((sum, windowIdx) => {
          const ref = windowRefs[windowIdx];
          const data = windows[windowIdx];
          const refWidth = data.disableWidthAdjustment
            ? ref?.current?.offsetWidth ?? 0
            : data.minWidth ?? ref?.current?.offsetWidth ?? 0;
          return sum + refWidth + gap;
        }, windowMargin),
      }))
      .sort((a, b) => b.totalWidth - a.totalWidth)
      .map(({ row }) => row.sort((a, b) => windowOrder[a] - windowOrder[b]));

    let orderCounter = 0; // middle school level coding
    sortedRows
      .flatMap((row, rowIndex) => {
        let currentRowWidth = windowMargin;

        return row.map((windowIdx) => {
          const ref = windowRefs[windowIdx];
          const data = windows[windowIdx];

          const refWidth = data.disableWidthAdjustment
            ? ref?.current?.offsetWidth ?? 0
            : data.minWidth ?? ref?.current?.offsetWidth ?? 0;

          newCleanupData[windowIdx] = {
            newX: currentRowWidth,
            newY: 60 + rowIndex * rowHeight,
          };

          currentRowWidth += refWidth + gap;

          return windowIdx;
        });
      })
      .forEach((windowIdx) => {
        newOrder[windowIdx] = orderCounter++;
      });

    disableMoveWindows.forEach(({ idx }) => {
      newOrder[idx] = orderCounter++;
      // They won't be using the cleanup data anyway so here's a filler
      newCleanupData[idx] = {
        newX: 0,
        newY: 0,
      };
    });

    setWindowCleanupData(newCleanupData);
    setWindowOrder(newOrder);
  }, [windowRefs, windows, windowOrder]);

  const modifyWindowSaveProps = (
    index: number,
    newProps: Record<string, any>
  ) => {
    setWindowSaveProps((prevProps) => {
      const newSaveProps = [...prevProps];
      newSaveProps[index] = { ...newSaveProps[index], ...newProps };
      return newSaveProps;
    });
  };

  const saveWindows = useCallback(() => {
    if (settings.disableWindowSaving) {
      return;
    }

    setWindows((currentWindows) => {
      setWindowOrder((currentWindowOrder) => {
        setWindowSaveProps((currentWindowSaveProps) => {
          setWindowRefs((currentWindowRefs) => {
            const savedWindows = currentWindows
              .map((window, index) => {
                if (!window.saveComponentKey) return null;

                const ref = currentWindowRefs[index].current;
                if (!ref) return null;

                const {
                  top: y,
                  left: x,
                  width,
                  height,
                } = ref.getBoundingClientRect();
                return {
                  order: currentWindowOrder[index],
                  centerX: x + width / 2,
                  centerY: y + height / 2,
                  width:
                    !window.disableWidthAdjustment &&
                    typeof window.defaultWidth === "number"
                      ? width
                      : window.defaultWidth,
                  height:
                    !window.disableHeightAdjustment &&
                    typeof window.defaultHeight === "number"
                      ? height
                      : window.defaultHeight,
                  data: _.omit(window, ["uniqueId", "content"]),
                  initialProps: currentWindowSaveProps[index],
                };
              })
              .filter(Boolean) as WindowSaveData[];

            updateSettings({
              windowSaveData: {
                windows: savedWindows,
                viewport: {
                  width: window.innerWidth,
                  height: window.innerHeight,
                },
              },
            });

            return currentWindowRefs;
          });
          return currentWindowSaveProps;
        });
        return currentWindowOrder;
      });
      return currentWindows;
    });
  }, [settings.disableWindowSaving, updateSettings]);

  const restoreWindowFromSave = (
    save: WindowSaveData[],
    viewportDimension: {
      width: number;
      height: number;
    }
  ) => {
    const filteredSave = save.filter(
      (saveData) =>
        saveData.data.saveComponentKey &&
        saveData.data.saveComponentKey in windowEntryMap
    );

    setWindows(
      filteredSave.map((saveData) => ({
        ...saveData.data,
        uniqueId: `window-${_.uniqueId()}`,
        content: cloneElement(
          (windowEntryMap?.[saveData.data.saveComponentKey as WindowPickerEntry]
            ?.window?.content ?? null) as any,
          saveData.initialProps
        ),
        defaultCenterX:
          (saveData.centerX / viewportDimension.width) * window.innerWidth,
        defaultCenterY:
          (saveData.centerY / viewportDimension.height) * window.innerHeight,
        defaultWidth: saveData.width,
        defaultHeight: saveData.height,
      }))
    );

    const originalOrder = filteredSave.map((data) => data.order);
    const condensedOrder = originalOrder
      .slice()
      .sort((a, b) => a - b)
      .reduce<Record<number, number>>((acc, value, index) => {
        acc[value] = index;
        return acc;
      }, {});

    setWindowOrder(originalOrder.map((order) => condensedOrder[order]));
    setWindowSaveProps(filteredSave.map((data) => data.initialProps));
    setWindowRefs(filteredSave.map(() => ({ current: null })));
    setWindowCleanupData(filteredSave.map(() => null));
  };

  return (
    <WindowContext.Provider
      value={{
        windows,
        windowOrder,
        appendWindow,
        clearWindow,
        removeWindowByContextKey,
        removeWindowByUniqueId,
        setActiveWindow,
        setActiveWindowByContextKey,
        windowRefs,
        registerWindowRef,
        isWindowMinimized,
        setIsWindowMinimized,
        initiateWindowCleanup,
        windowCleanupData,
        windowSaveProps,
        modifyWindowSaveProps,
        restoreWindowFromSave,
        saveWindows,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export const useWindow = () => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error("useWindow must be used within a WindowProvider");
  }
  return context;
};
