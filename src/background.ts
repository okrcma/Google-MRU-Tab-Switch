import { log, LogLevel } from "./logger";

log.level = LogLevel.DEBUG;

let lastTabIds: Record<number, number> = {};
let currentTabIds: Record<number, number> = {};

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.windows.getCurrent().then((window) => {
    log.debug(
      "Tab activated, currentWindowId: %s, tabId: %s",
      window.id,
      activeInfo.tabId,
    );

    if (window.id == null) return;

    lastTabIds[window.id] = currentTabIds[window.id];
    currentTabIds[window.id] = activeInfo.tabId;
  });
});

chrome.commands.onCommand.addListener((command) => {
  log.info("Command received:", command);

  if (command !== "switch-to-previous-tab") return;
  chrome.windows.getCurrent().then((window) => {
    if (window.id == null) return;

    const lastTabId = lastTabIds[window.id];
    const currentTabId = currentTabIds[window.id];

    log.info("Switching tabs...");
    log.info("Current window ID:", window.id);
    log.info("Current tab ID:", currentTabId);
    log.info("Last tab ID:", lastTabId);
    if (lastTabId != null) {
      chrome.tabs.update(currentTabId, { active: false });
      chrome.tabs.update(lastTabId, { active: true });
    }
  });
});
