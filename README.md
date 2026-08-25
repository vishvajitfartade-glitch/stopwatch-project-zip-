# stopwatch-project-zip-
stopwatch application 
Stopwatch
A responsive stopwatch built with HTML5, CSS3, and vanilla JavaScript.
Features
Start, pause, and reset controls
Elapsed time display with centisecond precision
Lap recording
Prevents multiple intervals from running simultaneously
Uses JavaScript state for elapsed time
Clears the timer during reset
Timestamp-based timing to reduce setInterval() drift
Keyboard shortcuts:
Space — start/pause
L — record lap
R — reset
Responsive design for mobile and desktop
Project structure
stopwatch-project/
├── index.html
├── style.css
├── script.js
├── README.md
└── deployment.md
Run locally
No build tools are required.
Download or clone the repository.
Open index.html in a browser.
For a local development server, VS Code Live Server can also be used.
GitHub Pages deployment
Create a public GitHub repository.
Upload index.html, style.css, script.js, README.md, and deployment.md.
Open Settings → Pages.
Select Deploy from a branch.
Select the main branch and / (root).
Save and wait for GitHub Pages to publish the site.
Interview questions
1. What is the difference between setTimeout() and setInterval()?
setTimeout() schedules a function to run once after a delay. setInterval() repeatedly schedules a function at approximately the specified interval until it is cancelled with clearInterval().
2. Why should multiple intervals be avoided?
Multiple active intervals can update the same UI at the same time, causing incorrect elapsed time, unnecessary CPU work, duplicated updates, and difficult-to-debug application state.
3. How can timer accuracy be improved?
Instead of assuming every interval fires exactly on time, calculate elapsed time from timestamps such as performance.now(). The interval is then used mainly to refresh the display, while the timestamp calculation determines the actual elapsed duration.
Credits
Built as a Level 2 Day 2 web-development stopwatch project.