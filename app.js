// ============ ДАННЫЕ МОДУСОВ ============
const MODUS_DATA = {
  'AAA-1': { name:'Barbara', scheme:'M—P, S—M ⇒ S—P', premises:['Все люди смертны','Все греки — люди'], conclusion:'все греки смертны' },
  'EAE-1': { name:'Celarent', scheme:'M—P, S—M ⇒ S—P', premises:['Ни один камень не живой','Все граниты — камни'], conclusion:'ни один гранит не живой' },
  'AII-1': { name:'Darii', scheme:'M—P, S—M ⇒ S—P', premises:['Все политологи изучают политические процессы','Некоторые студенты являются политологами'], conclusion:'некоторые студенты изучают политические процессы' },
  'EIO-1': { name:'Ferio', scheme:'M—P, S—M ⇒ S—P', premises:['Ни один вирус не является живым организмом','Некоторые патогены — вирусы'], conclusion:'некоторые патогены не являются живыми организмами' },

  'EAE-2': { name:'Cesare', scheme:'P—M, S—M ⇒ S—P', premises:['Ни одна рыба не дышит лёгкими','Все дельфины дышат лёгкими'], conclusion:'ни один дельфин не является рыбой' },
  'AEE-2': { name:'Camestres', scheme:'P—M, S—M ⇒ S—P', premises:['Все кошки — млекопитающие','Ни одна рептилия не является млекопитающим'], conclusion:'ни одна рептилия не является кошкой' },
  'EIO-2': { name:'Festino', scheme:'P—M, S—M ⇒ S—P', premises:['Ни одна рыба не является китом','Некоторые морские животные являются китами'], conclusion:'некоторые морские животные не являются рыбами' },
  'AOO-2': { name:'Baroco', scheme:'P—M, S—M ⇒ S—P', premises:['Все металлы проводят ток','Некоторые материалы не проводят ток'], conclusion:'некоторые материалы не являются металлами' },

  'AAI-3': { name:'Darapti', scheme:'M—P, M—S ⇒ S—P', premises:['Все роботы-исследователи с планеты Ксенон — разумные существа','Все роботы-исследователи с планеты Ксенон — создания, способные к межзвёздным путешествиям'], conclusion:'некоторые создания, способные к межзвёздным путешествиям — разумные существа' },
  'IAI-3': { name:'Disamis', scheme:'M—P, M—S ⇒ S—P', premises:['Некоторые студенты — отличники','Все студенты — люди'], conclusion:'некоторые люди — отличники' },
  'AII-3': { name:'Datisi', scheme:'M—P, M—S ⇒ S—P', premises:['Все врачи имеют диплом','Некоторые врачи работают в поликлинике'], conclusion:'некоторые работающие в поликлинике имеют диплом' },
  'EAO-3': { name:'Felapton', scheme:'M—P, M—S ⇒ S—P', premises:['Ни один кит не является рыбой','Все киты — морские животные'], conclusion:'некоторые морские животные не являются рыбами' },
  'OAO-3': { name:'Bocardo', scheme:'M—P, M—S ⇒ S—P', premises:['Некоторые птицы не летают','Все птицы — животные'], conclusion:'некоторые животные не летают' },
  'EIO-3': { name:'Ferison', scheme:'M—P, M—S ⇒ S—P', premises:['Ни один студент-заочник не живёт в общежитии','Некоторые студенты-заочники — спортсмены'], conclusion:'некоторые спортсмены не живут в общежитии' },

  'AAI-4': { name:'Bramantip', scheme:'P—M, M—S ⇒ S—P', premises:['Все коты — хищники','Все хищники — животные'], conclusion:'некоторые животные — коты' },
  'AEE-4': { name:'Camenes', scheme:'P—M, M—S ⇒ S—P', premises:['Все розы — растения','Ни одно растение не является животным'], conclusion:'ни одно животное не является розой' },
  'IAI-4': { name:'Dimaris', scheme:'P—M, M—S ⇒ S—P', premises:['Некоторые деревья — хвойные','Все хвойные — вечнозелёные'], conclusion:'некоторые вечнозелёные — деревья' },
  'EAO-4': { name:'Fesapo', scheme:'P—M, M—S ⇒ S—P', premises:['Ни один кит не является рыбой','Все рыбы — позвоночные'], conclusion:'некоторые позвоночные не являются китами' },
  'EIO-4': { name:'Fresison', scheme:'P—M, M—S ⇒ S—P', premises:['Ни один дельфин не является рыбой','Некоторые рыбы являются хищниками'], conclusion:'некоторые хищники не являются дельфинами' },
};

const FIGURES = {
  1: { scheme:'M—P, S—M ⇒ S—P', moduses:['AAA','EAE','AII','EIO'] },
  2: { scheme:'P—M, S—M ⇒ S—P', moduses:['EAE','AEE','EIO','AOO'] },
  3: { scheme:'M—P, M—S ⇒ S—P', moduses:['AAI','IAI','AII','EAO','OAO','EIO'] },
  4: { scheme:'P—M, M—S ⇒ S—P', moduses:['AAI','AEE','IAI','EAO','EIO'] },
};

// ============ УТИЛИТЫ ДЛЯ ПАРСИНГА ============

function stem(word) {
  word = word.toLowerCase().replace(/[^а-яёa-z]/g, '');
  const suffixes = ['ами','ями','ого','его','ому','ему','ыми','ими','ов','ев','ей','ой','ый','ий','ая','яя','ое','ее','ые','ие','ых','их','ым','им','ах','ях','ам','ям','ом','ем','а','я','о','е','ы','и','у','ю','ь'];
  let changed = true;
  while (changed) {
    changed = false;
    for (const s of suffixes) {
      if (word.length > s.length + 2 && word.endsWith(s)) {
        word = word.slice(0, -s.length);
        changed = true;
        break;
      }
    }
  }
  return word;
}

function termKey(term) {
  const first = term.trim().split(/[\s,]+/)[0];
  return stem(first);
}

function termsMatch(a, b) {
  const ka = termKey(a), kb = termKey(b);
  return ka === kb;
}

function parsePremise(text) {
  text = text.trim().replace(/[.,;:]$/, '');
  let quant = null;
  let working = text;
  let forcedNeg = false;

  const rules = [
    { re:/^не все\s+/i, q:'O', neg:true },
    { re:/^ни один\s+/i, q:'E' },
    { re:/^ни одна\s+/i, q:'E' },
    { re:/^ни одно\s+/i, q:'E' },
    { re:/^все\s+/i, q:'A' },
    { re:/^всякий\s+/i, q:'A' },
    { re:/^всякая\s+/i, q:'A' },
    { re:/^каждый\s+/i, q:'A' },
    { re:/^каждая\s+/i, q:'A' },
    { re:/^каждое\s+/i, q:'A' },
    { re:/^некоторые\s+/i, q:'I' },
    { re:/^некоторый\s+/i, q:'I' },
    { re:/^некоторая\s+/i, q:'I' },
    { re:/^некоторое\s+/i, q:'I' },
  ];
  for (const r of rules) {
    if (r.re.test(working)) {
      quant = r.q;
      if (r.neg) forcedNeg = true;
      working = working.replace(r.re, '');
      break;
    }
  }
  if (!quant) quant = 'A';

  let subject = '', predicate = '', negated = forcedNeg;

  const patterns = [
    { re:/^(.+?)\s+не\s+являются\s+(.+)$/i, neg:true },
    { re:/^(.+?)\s+не\s+является\s+(.+)$/i, neg:true },
    { re:/^(.+?)\s+являются\s+(.+)$/i },
    { re:/^(.+?)\s+является\s+(.+)$/i },
    { re:/^(.+?)\s+суть\s+(.+)$/i },
    { re:/^(.+?)\s+есть\s+(.+)$/i },
    { re:/^(.+?)\s+—\s+(.+)$/ },
    { re:/^(.+?)\s+-\s+(.+)$/ },
    { re:/^(.+?)\s+не\s+(.+)$/i, neg:true },
  ];

  for (const p of patterns) {
    const m = working.match(p.re);
    if (m) {
      subject = m[1].trim();
      predicate = m[2].trim();
      if (p.neg) negated = true;
      break;
    }
  }

  if (!subject) {
    const words = working.split(/\s+/);
    const verbSuffixes = ['ет','ют','ут','ит','ат','ят','ует','уют','яет','яют','ает','ают','еет','еют','ли','ла','ло','л'];
    let idx = -1;
    for (let i = 1; i < words.length; i++) {
      if (words[i].length > 3 && verbSuffixes.some(s => words[i].endsWith(s))) { idx = i; break; }
    }
    if (idx > 0) {
      subject = words.slice(0, idx).join(' ');
      predicate = words.slice(idx).join(' ');
    } else {
      subject = words[0] || '';
      predicate = words.slice(1).join(' ');
    }
  }

  // Корректировка квантификатора с учётом отрицания
  if (negated && !forcedNeg) {
    if (quant === 'A') quant = 'E';
    else if (quant === 'I') quant = 'O';
  }

  return { quant, subject, predicate, negated };
}

function splitSentences(input) {
  let text = input.trim().replace(/Следовательно,?\s*/gi, '|||');
  let parts;
  if (text.includes('|||')) {
    const [before, after] = text.split('|||');
    const b = before.split(/\.\s+|\.$/).map(s => s.trim()).filter(Boolean);
    parts = [...b, after.trim()];
  } else {
    parts = text.split(/\.\s+|\.$/).map(s => s.trim()).filter(Boolean);
  }
  return parts;
}

function analyze(input) {
  const parts = splitSentences(input);
  if (parts.length !== 3) throw new Error('Нужно ровно три предложения: две посылки и заключение.');

  const p1 = parsePremise(parts[0]);
  const p2 = parsePremise(parts[1]);
  const c  = parsePremise(parts[2]);

  const S = c.subject;
  const P = c.predicate;

  // Ищем M — термин, общий для обеих посылок
  let M = null;
  const p1t = [p1.subject, p1.predicate];
  const p2t = [p2.subject, p2.predicate];
  outer: for (const t1 of p1t) {
    for (const t2 of p2t) {
      if (termsMatch(t1, t2)) { M = t1; break outer; }
    }
  }
  if (!M) throw new Error('Не удалось найти средний термин M (общий для посылок).');

  const mP1 = termsMatch(p1.subject, M) ? 's' : 'p';
  const mP2 = termsMatch(p2.subject, M) ? 's' : 'p';

  let figure;
  if (mP1 === 's' && mP2 === 'p') figure = 1;
  else if (mP1 === 'p' && mP2 === 'p') figure = 2;
  else if (mP1 === 's' && mP2 === 's') figure = 3;
  else figure = 4;

  const modus = p1.quant + p2.quant + c.quant;
  return { S, P, M, figure, modus };
}

// ============ КРУГИ ЭЙЛЕРА ============

const EULER_LAYOUTS = {
  1: [
    { label:'P', x:270, y:150, r:90, fill:'rgba(127,184,224,.18)', stroke:'#4a90c8' },
    { label:'M', x:200, y:150, r:65, fill:'rgba(240,168,104,.18)', stroke:'#d48040' },
    { label:'S', x:120, y:150, r:50, fill:'rgba(143,196,143,.18)', stroke:'#5a9a5a' },
  ],
  2: [
    { label:'P', x:120, y:150, r:85, fill:'rgba(127,184,224,.18)', stroke:'#4a90c8' },
    { label:'M', x:270, y:150, r:75, fill:'rgba(240,168,104,.18)', stroke:'#d48040' },
    { label:'S', x:200, y:225, r:55, fill:'rgba(143,196,143,.18)', stroke:'#5a9a5a' },
  ],
  3: [
    { label:'M', x:200, y:110, r:85, fill:'rgba(240,168,104,.18)', stroke:'#d48040' },
    { label:'P', x:130, y:200, r:70, fill:'rgba(127,184,224,.18)', stroke:'#4a90c8' },
    { label:'S', x:270, y:200, r:70, fill:'rgba(143,196,143,.18)', stroke:'#5a9a5a' },
  ],
  4: [
    { label:'P', x:120, y:140, r:80, fill:'rgba(127,184,224,.18)', stroke:'#4a90c8' },
    { label:'M', x:280, y:110, r:70, fill:'rgba(240,168,104,.18)', stroke:'#d48040' },
    { label:'S', x:220, y:220, r:60, fill:'rgba(143,196,143,.18)', stroke:'#5a9a5a' },
  ],
};

function drawEuler(svg, figure) {
  svg.innerHTML = '';
  const layout = EULER_LAYOUTS[figure] || EULER_LAYOUTS[1];
  for (const c of layout) {
    const el = document.createElementNS('http://www.w3.org/2000/svg','circle');
    el.setAttribute('cx', c.x); el.setAttribute('cy', c.y); el.setAttribute('r', c.r);
    el.setAttribute('fill', c.fill); el.setAttribute('stroke', c.stroke);
    el.setAttribute('stroke-width', '2.5');
    svg.appendChild(el);
  }
  for (const c of layout) {
    const t = document.createElementNS('http://www.w3.org/2000/svg','text');
    t.setAttribute('x', c.x); t.setAttribute('y', c.y);
    t.setAttribute('text-anchor', 'middle'); t.setAttribute('dominant-baseline', 'middle');
    t.setAttribute('font-weight', '700'); t.setAttribute('font-size', '20');
    t.setAttribute('fill', c.stroke); t.setAttribute('font-family', 'Inter, sans-serif');
    t.textContent = c.label;
    svg.appendChild(t);
  }
}

// ============ АНАЛИЗАТОР ============

const EXAMPLES = {
  barbara: 'Все люди смертны. Все греки — люди. Следовательно, все греки смертны.',
  darii: 'Все политологи изучают политические процессы. Некоторые студенты являются политологами. Следовательно, некоторые студенты изучают политические процессы.',
  festino: 'Ни одна рыба не является китом. Некоторые морские животные являются китами. Следовательно, некоторые морские животные не являются рыбами.',
  darapti: 'Все роботы-исследователи с планеты Ксенон — разумные существа. Все роботы-исследователи с планеты Ксенон — создания, способные к межзвёздным путешествиям. Следовательно, некоторые создания, способные к межзвёздным путешествиям — разумные существа.',
  ferio: 'Ни один вирус не является живым организмом. Некоторые патогены — вирусы. Следовательно, некоторые патогены не являются живыми организмами.',
};

document.querySelectorAll('.example-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('input').value = EXAMPLES[btn.dataset.ex] || '';
  });
});

document.getElementById('analyze-btn').addEventListener('click', () => {
  const input = document.getElementById('input').value;
  try {
    const res = analyze(input);
    document.getElementById('term-s').textContent = res.S;
    document.getElementById('term-p').textContent = res.P;
    document.getElementById('term-m').textContent = res.M;
    document.getElementById('fig-info').textContent = 'Фигура ' + res.figure;
    document.getElementById('modus-info').textContent = res.modus;
    document.getElementById('result').classList.remove('hidden');
    drawEuler(document.getElementById('euler'), res.figure);
  } catch (e) {
    alert('Ошибка разбора: ' + e.message + '\n\nПопробуйте пример из кнопок выше.');
  }
});

// ============ СТРАНИЦА ФИГУР ============

function renderFigures() {
  const grid = document.getElementById('figures-grid');
  grid.innerHTML = '';
  for (const [num, data] of Object.entries(FIGURES)) {
    const block = document.createElement('div');
    block.className = 'figure-block';
    block.innerHTML = `
      <h2>Фигура ${num}</h2>
      <div class="figure-scheme">${data.scheme}</div>
      <div class="modus-list"></div>
    `;
    const list = block.querySelector('.modus-list');
    for (const m of data.moduses) {
      const btn = document.createElement('button');
      btn.className = 'modus-btn';
      btn.textContent = m;
      btn.addEventListener('click', () => openModus(num, m));
      list.appendChild(btn);
    }
    grid.appendChild(block);
  }
}

// ============ ПАНЕЛЬ МОДУСА + СТИЛИ ============

let currentTheme = null;

function clearTheme() {
  if (currentTheme) {
    document.body.classList.remove(currentTheme);
    currentTheme = null;
  }
}

function openModus(figure, modus) {
  const key = `${modus}-${figure}`;
  const data = MODUS_DATA[key];
  if (!data) return;

  document.getElementById('panel-title').textContent = `Фигура ${figure} · Модус ${modus}`;
  document.getElementById('panel-subtitle').textContent = `${data.name} — ${data.scheme}`;
  document.getElementById('p-premise1').textContent = data.premises[0];
  document.getElementById('p-premise2').textContent = data.premises[1];
  document.getElementById('p-conclusion').textContent = 'Следовательно, ' + data.conclusion;

  clearTheme();
  currentTheme = 'theme-' + key;
  document.body.classList.add(currentTheme);

  const panel = document.getElementById('modus-panel');
  panel.classList.remove('hidden');
  requestAnimationFrame(() => panel.classList.add('visible'));
}

function closeModus() {
  const panel = document.getElementById('modus-panel');
  panel.classList.remove('visible');
  setTimeout(() => {
    panel.classList.add('hidden');
    clearTheme();
  }, 550);
}

document.querySelector('.close-panel').addEventListener('click', closeModus);
document.getElementById('modus-panel').addEventListener('click', (e) => {
  if (e.target.id === 'modus-panel') closeModus();
});

// ============ РОУТИНГ ============

function router() {
  const hash = location.hash.replace('#','') || 'analyzer';
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const view = document.getElementById(hash) || document.getElementById('analyzer');
  view.classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.view === hash);
  });
  if (hash === 'figures') {
    // сброс темы при переходе на страницу фигур
    if (!document.getElementById('modus-panel').classList.contains('visible')) {
      clearTheme();
    }
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
  renderFigures();
  router();
});