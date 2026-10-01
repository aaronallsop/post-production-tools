/* ============================================================
   tools.js — the single source of truth for this suite.

   Both the hub (index.html) and the in-app shell bar
   (assets/app-shell.js) read this list. Adding a tool here is
   the ONLY registration step: the hub tile, the "Switch tool"
   menu and the shell bar title all come from this file.

   Loaded as a plain <script>, so it works over file:// as well
   as over a local HTTP server. See docs/adding-a-tool.md.
   ============================================================ */
(function () {
  "use strict";

  /**
   * @typedef {Object} Tool
   * @property {string} id       Stable slug. Match the filename.
   * @property {string} name     Display name. Match the page <title>.
   * @property {string} file     Path to the tool, relative to the repo root.
   * @property {string} mark     1-2 characters shown in the tile badge.
   * @property {string} accent   Hex accent used by the tile and shell bar.
   * @property {string} tagline  One sentence. What it does, plainly.
   * @property {string[]} tags   Freeform keywords; also fed to the hub search.
   * @property {"stable"|"beta"|"wip"} status
   */

  /** @type {Tool[]} */
  window.EDITING_APPS = [
    {
      id: "ae-keyframe-extender",
      name: "AE Keyframe Extender",
      file: "ae-keyframe-extender.html",
      mark: "K",
      accent: "#2dd4bf",
      tagline:
        "Retime a linear two-keyframe move to new head and tail timecodes while holding the same constant speed.",
      tags: ["After Effects", "Keyframes", "Timecode", "Retime"],
      status: "stable"
    },
    {
      id: "archive-log-builder",
      name: "Archive Log Builder",
      file: "archive-log-builder.html",
      mark: "A",
      accent: "#5b8cff",
      tagline:
        "Turn a Premiere-exported Final Cut Pro XML into a column-picked archive log CSV sorted by record timecode.",
      tags: ["Premiere Pro", "FCP XML", "CSV", "Logging", "Archive"],
      status: "stable"
    },
    {
      id: "print-bed-planner",
      name: "Print Bed Planner",
      file: "print-bed-planner.html",
      mark: "P",
      accent: "#c084fc",
      tagline:
        "Work out how many cards fit on a 3D printer's bed at a given size, and watch the layout change as you adjust it.",
      tags: ["3D Printing", "Layout", "Nesting", "Cards", "Millimetres"],
      status: "beta"
    }
  ];
})();
