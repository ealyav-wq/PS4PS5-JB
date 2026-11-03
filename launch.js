
/* The landing page: pick a payload, then start the run.
 *
 * Leaving this page has to be a real navigation from it -- the referrer guard
 * in jb.js arms the chain only when the run page was reached from here. */

var TARGET = {
  hen: "log=1&afterglow=run&payload=hen.bin",
  goldhen: "log=1&afterglow=run&mode=goldhen",
};

var AUTOSTART_SECONDS = 5;
var STORE_KEY = "afterglow.choice";

var form = document.getElementById("pick");
var autoBox = document.getElementById("auto");
var countEl = document.getElementById("count");
var ticker = null;

function remember() {
  try {
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({ payload: picked(), autostart: autoBox.checked }),
    );
  } catch (e) {}
}

function restore() {
  var saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
  } catch (e) {}
  if (!saved) return;

  if (saved.payload && TARGET[saved.payload]) {
    var radio = form.querySelector(
      'input[name="payload"][value="' + saved.payload + '"]',
    );
    if (radio) radio.checked = true;
  }
  if (typeof saved.autostart === "boolean") autoBox.checked = saved.autostart;
}

function picked() {
  var radio = form.querySelector('input[name="payload"]:checked');
  return radio ? radio.value : "goldhen";
}

function start() {
  stopClock();
  location.href = "jb.html?" + TARGET[picked()];
}

function stopClock() {
  if (ticker !== null) {
    clearInterval(ticker);
    ticker = null;
  }
  countEl.textContent = "";
}

function startClock() {
  start();
}

form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  start();
});

form.addEventListener("change", function (ev) {
  remember();
  if (ev.target === autoBox) {
    if (autoBox.checked) startClock();
    else stopClock();
    return;
  }
  if (ev.target.name === "payload" && autoBox.checked) {
    stopClock();
    startClock();
  }
});

restore();
if (autoBox.checked) startClock();
