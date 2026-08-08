// ABTalks — shared utilities across all three routes.
// Data source: mocked JSON (see /assets/data.json). No backend, no auth.

async function loadData() {
  const res = await fetch(resolveAssetPath('data.json'));
  return res.json();
}

// Works whether the page lives at /, /dashboard/, or /day/12/
function resolveAssetPath(file) {
  const depth = location.pathname.split('/').filter(Boolean).length;
  const prefix = depth === 0 ? 'assets/' : '../'.repeat(depth) + 'assets/';
  return prefix + file;
}
function resolveRoute(path) {
  // path like "dashboard" or "" (root) or "day/12"
  const depth = location.pathname.split('/').filter(Boolean).length;
  if (depth === 0) return path ? path + '/' : './';
  const up = '../'.repeat(depth);
  return path ? up + path + '/' : up;
}

function cellClass(status) {
  return { done: 'done', 'missed-saved': 'missed-saved', missed: 'missed', pending: 'pending' }[status] || 'future';
}

// Renders the 60-day commit strip. `days` = array of {day,status} for days
// that have happened; everything after currentDay renders as "future".
function renderStrip(container, days, currentDay, totalDays = 60) {
  container.innerHTML = '';
  const byDay = Object.fromEntries(days.map(d => [d.day, d]));
  for (let i = 1; i <= totalDays; i++) {
    const cell = document.createElement('div');
    const entry = byDay[i];
    const status = entry ? entry.status : (i <= currentDay ? 'missed' : 'future');
    cell.className = 'cell ' + cellClass(status);
    cell.title = entry?.note ? `Day ${i}: ${entry.note}` : `Day ${i}: ${status}`;
    container.appendChild(cell);
  }
}

function showToast(msg, opts = {}) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.innerHTML = (opts.icon || '✓') + ' <span>' + msg + '</span>';
  requestAnimationFrame(() => el.classList.add('show'));
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3200);
}

function timeGreeting() {
  const h = new Date().getHours();
  if (h >= 0 && h < 5) return "Still up? Respect the grind.";
  if (h < 12) return "Morning. Get today's proof in early.";
  if (h < 17) return "Afternoon check-in.";
  if (h < 22) return "Evening. Prime commit hours.";
  return "Past 10pm — classic ABTalks hours.";
}
