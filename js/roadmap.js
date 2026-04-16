// === STATE WITH LOCALSTORAGE ===
const STORAGE_KEY = 'claude-roadmap-progress';
const state = loadState();

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) { /* ignore */ }
  return { p1: [0,0,0,0], p2: [0,0,0,0], p3: [0,0,0,0], p4: [0,0,0,0] };
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch (e) { /* ignore */ }
}

// === ACCORDION ===
function toggle(id) {
  const body = document.getElementById('body-' + id);
  const chev = document.getElementById('chev-' + id);
  body.classList.toggle('open');
  chev.classList.toggle('open');
}

// === MARK DONE ===
function markDone(btn, phase, idx) {
  const i = idx - 1;
  state[phase][i] = state[phase][i] ? 0 : 1;
  btn.classList.toggle('done', !!state[phase][i]);
  btn.textContent = state[phase][i] ? '\u2713 Xong' : 'Xong \u2713';
  updateProgress(phase);
  updateTotal();
  saveState();
}

// === PROGRESS ===
function updateProgress(phase) {
  const done = state[phase].filter(Boolean).length;
  const pct = (done / 4) * 100;
  document.getElementById('prog-' + phase).style.width = pct + '%';
}

function updateTotal() {
  const total = Object.values(state).flat().filter(Boolean).length;
  const el = document.getElementById('done-count');
  el.textContent = total;

  // Animate the number change
  el.style.transform = 'scale(1.2)';
  setTimeout(function() { el.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)'; el.style.transform = 'scale(1)'; }, 50);
}

// === RESTORE ON LOAD ===
function restoreState() {
  ['p1', 'p2', 'p3', 'p4'].forEach(function(phase) {
    const body = document.getElementById('body-' + phase);
    if (!body) return;
    const buttons = body.querySelectorAll('.btn-done');
    state[phase].forEach(function(val, i) {
      if (val && buttons[i]) {
        buttons[i].classList.add('done');
        buttons[i].textContent = '\u2713 Xong';
      }
    });
    updateProgress(phase);
  });
  updateTotal();
}

document.addEventListener('DOMContentLoaded', restoreState);
