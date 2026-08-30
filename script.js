const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsList = document.getElementById("laps");
const lapCount = document.getElementById("lapCount");
const emptyMessage = document.getElementById("emptyMessage");

let elapsedMs = 0;
let startTimestamp = 0;
let timerId = null;
let laps = [];

/*
  The elapsed time is calculated from timestamps instead of adding a fixed
  amount on every interval. This avoids accumulating setInterval drift.
*/

function formatTime(ms) {
  const totalCentiseconds = Math.floor(ms / 10);
  const centiseconds = totalCentiseconds % 100;
  const totalSeconds = Math.floor(totalCentiseconds / 100);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0")
  ].join(":") + "." + String(centiseconds).padStart(2, "0");
}

function getCurrentElapsed() {
  if (timerId === null) return elapsedMs;
  return elapsedMs + (performance.now() - startTimestamp);
}

function render() {
  timeDisplay.textContent = formatTime(getCurrentElapsed());

  pauseBtn.disabled = timerId === null;
  lapBtn.disabled = timerId === null;
  startBtn.disabled = timerId !== null;
}

function tick() {
  render();
}

function start() {
  if (timerId !== null) return;

  startTimestamp = performance.now();
  timerId = setInterval(tick, 10);
  render();
}

function pause() {
  if (timerId === null) return;

  elapsedMs += performance.now() - startTimestamp;
  clearInterval(timerId);
  timerId = null;
  render();
}

function reset() {
  if (timerId !== null) {
    clearInterval(timerId);
  }

  timerId = null;
  elapsedMs = 0;
  startTimestamp = 0;
  laps = [];

  renderLaps();
  render();
}

function recordLap() {
  if (timerId === null) return;

  const currentTime = getCurrentElapsed();
  const previousTime = laps.length ? laps[laps.length - 1].totalMs : 0;

  laps.push({
    totalMs: currentTime,
    lapMs: currentTime - previousTime
  });

  renderLaps();
}

function renderLaps() {
  lapsList.innerHTML = "";
  lapCount.textContent = `${laps.length} ${laps.length === 1 ? "lap" : "laps"}`;
  emptyMessage.hidden = laps.length > 0;

  [...laps].reverse().forEach((lap, index) => {
    const li = document.createElement("li");

    const number = document.createElement("span");
    number.className = "lap-number";
    number.textContent = `Lap ${laps.length - index}`;

    const time = document.createElement("span");
    time.className = "lap-time";
    time.textContent = `+${formatTime(lap.lapMs)}  •  ${formatTime(lap.totalMs)}`;

    li.append(number, time);
    lapsList.appendChild(li);
  });
}

startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
lapBtn.addEventListener("click", recordLap);
resetBtn.addEventListener("click", reset);

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    timerId === null ? start() : pause();
  }

  if (event.key.toLowerCase() === "l") {
    recordLap();
  }

  if (event.key.toLowerCase() === "r") {
    reset();
  }
});

renderLaps();
render();