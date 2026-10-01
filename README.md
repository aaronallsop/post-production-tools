# Post-production tools

Small, single-page tools for editors, assistant editors and anyone else in post-production who
keeps hitting the same fiddly job between two pieces of software. Each one does one thing, in your
browser, on your machine.

## How to open them

Download this repository (green **Code** button → **Download ZIP**), unzip it, and double-click
`index.html`. That opens the hub, which lists every tool; click one to open it. A bar along the top
of each tool takes you back to the list or straight to another tool.

There is nothing to install, no account, and no build step. Each tool is one HTML file.

## Nothing is uploaded

Everything you paste, drop or load into these tools stays in your browser. None of them send your
sequences, keyframes or measurements anywhere — which matters when the material belongs to a client.

One honest footnote: the AE Keyframe Extender fetches its styling from a public web address
(Tailwind's CDN) when it opens, so it looks plain without an internet connection. It still sends
nothing of yours.

## The tools

| Tool | What it does |
| --- | --- |
| [AE Keyframe Extender](ae-keyframe-extender.html) | Retimes a linear two-keyframe move in After Effects to new head and tail timecodes at the same constant speed. Paste the keyframes in, paste the new block back out. |
| [Archive Log Builder](archive-log-builder.html) | Turns a sequence exported from Premiere Pro as Final Cut Pro XML into an archive log: pick the columns you need, preview, then export a CSV or copy straight into a spreadsheet, sorted by record timecode. |
| [Print Bed Planner](print-bed-planner.html) | A bench tool rather than an edit-suite one: works out how many cards fit on a 3D printer's bed at a given size and gap, and draws the layout live as you change it. |

## How it is built

Plain HTML, CSS and JavaScript — no framework, no package manager, no server. Every tool works when
opened straight from disk. A short shared script adds the navigation bar to each page and reads the
tool list from one file, `assets/tools.js`, so the hub and the bar never disagree.

## Licence

MIT — see [LICENSE](LICENSE). Use them, change them, pass them on; keep the notice.

Made by Aaron Allsop.
