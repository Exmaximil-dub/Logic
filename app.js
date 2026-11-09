console.log('[app.js] загружен — версия 3 (инлайн-детализация, без blur)');

// ===== Цвета кнопок =====
const THEME_COLORS = {
  'AAA-1':'#4a8bc4','EAE-1':'#d47a35','AII-1':'#8b6f47','EIO-1':'#3a8040',
  'EAE-2':'#a03030','AEE-2':'#6a40a0','EIO-2':'#1a5a8a','AOO-2':'#c49010',
  'AAI-3':'#00d0ff','IAI-3':'#d04080','AII-3':'#30a060','EAO-3':'#b06030',
  'OAO-3':'#5080b0','EIO-3':'#4090c0',
  'AAI-4':'#d48040','AEE-4':'#606060','IAI-4':'#8060b0','EAO-4':'#408040','EIO-4':'#c0a050',
};

// ===== Данные модусов =====
const MODUS_DATA = {
  'AAA-1': {
    name:'Barbara', scheme:'M—P, S—M ⇒ S—P',
    terms:{ S:'греки', P:'смертные', M:'люди' },
    premises:[
      { text:'Все люди смертны', type:'A', struct:'M—P' },
      { text:'Все греки — люди', type:'A', struct:'S—M' },
    ],
    conclusion:{ text:'Все греки смертны', type:'A', struct:'S—P' },
    explanation:'Все греки входят в класс людей, а все люди входят в класс смертных — значит, все греки входят в класс смертных. Классическая транзитивность: если S ⊆ M и M ⊆ P, то S ⊆ P.',
    distribution:'M распределён в большей посылке (субъект A-суждения). S распределён в заключении (субъект A). P не распределён нигде — правило о предикате A-суждения соблюдено.',
    note:'Barbara — базовый модус первой фигуры. Гласные A-A-A указывают на типы трёх суждений в средневековой мнемонике.'
  },
  'EAE-1': {
    name:'Celarent', scheme:'M—P, S—M ⇒ S—P',
    terms:{ S:'граниты', P:'живые', M:'камни' },
    premises:[
      { text:'Ни один камень не живой', type:'E', struct:'M—P' },
      { text:'Все граниты — камни', type:'A', struct:'S—M' },
    ],
    conclusion:{ text:'Ни один гранит не живой', type:'E', struct:'S—P' },
    explanation:'Класс гранитов полностью входит в класс камней, а камни полностью исключены из класса живых — значит, граниты тоже исключены из живых.',
    distribution:'M распределён в обеих посылках (субъект E и субъект A). S и P распределены в заключении как термины E-суждения.',
    note:'Celarent — «отрицательный» аналог Barbara. Гласные E-A-E.'
  },
  'AII-1': {
    name:'Darii', scheme:'M—P, S—M ⇒ S—P',
    terms:{ S:'студенты', P:'изучают политические процессы', M:'политологи' },
    premises:[
      { text:'Все политологи изучают политические процессы', type:'A', struct:'M—P' },
      { text:'Некоторые студенты являются политологами', type:'I', struct:'S—M' },
    ],
    conclusion:{ text:'Некоторые студенты изучают политические процессы', type:'I', struct:'S—P' },
    explanation:'Все политологи изучают политические процессы. Та часть студентов, которая является политологами, обязательно изучает политические процессы — значит, некоторые студенты изучают их.',
    distribution:'M распределён в большей посылке (субъект A). S и P не распределены в заключении (субъект и предикат I-суждения).',
    note:'Darii — типичный модус с частной посылкой: из общей и частной утвердительных посылок следует частное утвердительное заключение.'
  },
  'EIO-1': {
    name:'Ferio', scheme:'M—P, S—M ⇒ S—P',
    terms:{ S:'патогены', P:'живые организмы', M:'вирусы' },
    premises:[
      { text:'Ни один вирус не является живым организмом', type:'E', struct:'M—P' },
      { text:'Некоторые патогены — вирусы', type:'I', struct:'S—M' },
    ],
    conclusion:{ text:'Некоторые патогены не являются живыми организмами', type:'O', struct:'S—P' },
    explanation:'Все вирусы исключены из класса живых организмов. Та часть патогенов, что является вирусами, не может быть живой — значит, некоторые патогены не являются живыми организмами.',
    distribution:'M распределён в обеих посылках. S не распределён в посылке, но распределён в заключении как субъект O. P распределён как предикат E-посылки.',
    note:'Ferio — «отрицательный» аналог Darii. Объединяет отрицание общего и частное утверждение.'
  },

  'EAE-2': {
    name:'Cesare', scheme:'P—M, S—M ⇒ S—P',
    terms:{ S:'дельфины', P:'рыбы', M:'дышат лёгкими' },
    premises:[
      { text:'Ни одна рыба не дышит лёгкими', type:'E', struct:'P—M' },
      { text:'Все дельфины дышат лёгкими', type:'A', struct:'S—M' },
    ],
    conclusion:{ text:'Ни один дельфин не является рыбой', type:'E', struct:'S—P' },
    explanation:'Все дельфины входят в класс дышащих лёгкими, а рыбы полностью исключены из этого класса. Значит, дельфины не могут быть рыбами.',
    distribution:'M распределён как предикат E-посылки. S и P распределены в E-заключении.',
    note:'Cesare — классический модус второй фигуры, где средний термин стоит на месте предиката в обеих посылках.'
  },
  'AEE-2': {
    name:'Camestres', scheme:'P—M, S—M ⇒ S—P',
    terms:{ S:'рептилии', P:'кошки', M:'млекопитающие' },
    premises:[
      { text:'Все кошки — млекопитающие', type:'A', struct:'P—M' },
      { text:'Ни одна рептилия не является млекопитающим', type:'E', struct:'S—M' },
    ],
    conclusion:{ text:'Ни одна рептилия не является кошкой', type:'E', struct:'S—P' },
    explanation:'Все кошки входят в класс млекопитающих, а рептилии из него исключены. Значит, ни одна рептилия не может быть кошкой.',
    distribution:'M распределён в E-посылке (предикат E-суждения). S и P распределены в E-заключении.',
    note:'Camestres — «обратный» Cesare: большая посылка утвердительная, меньшая отрицательная.'
  },
  'EIO-2': {
    name:'Festino', scheme:'P—M, S—M ⇒ S—P',
    terms:{ S:'морские животные', P:'рыбы', M:'киты' },
    premises:[
      { text:'Ни одна рыба не является китом', type:'E', struct:'P—M' },
      { text:'Некоторые морские животные являются китами', type:'I', struct:'S—M' },
    ],
    conclusion:{ text:'Некоторые морские животные не являются рыбами', type:'O', struct:'S—P' },
    explanation:'Рыбы полностью исключены из класса китов. Та часть морских животных, что является китами, не может быть рыбами — значит, некоторые морские животные не являются рыбами.',
    distribution:'M распределён как предикат E-посылки. P распределён как предикат E-посылки. S не распределён в посылке, но распределён в заключении (субъект O).',
    note:'Festino — частноотрицательный модус второй фигуры. На этом примере показывается тема «голубая вода и кит»: киты — не рыбы, хотя живут в море.'
  },
  'AOO-2': {
    name:'Baroco', scheme:'P—M, S—M ⇒ S—P',
    terms:{ S:'материалы', P:'металлы', M:'проводящие ток' },
    premises:[
      { text:'Все металлы проводят ток', type:'A', struct:'P—M' },
      { text:'Некоторые материалы не проводят ток', type:'O', struct:'S—M' },
    ],
    conclusion:{ text:'Некоторые материалы не являются металлами', type:'O', struct:'S—P' },
    explanation:'Все металлы входят в класс проводящих ток. Та часть материалов, что не проводит ток, не может быть металлами — значит, некоторые материалы не являются металлами.',
    distribution:'M распределён как предикат A-посылки. P распределён в заключении (предикат O). S не распределён в посылке, но распределён в заключении.',
    note:'Baroco — единственный модус второй фигуры с общеутвердительной и частноотрицательной посылками.'
  },

  'AAI-3': {
    name:'Darapti', scheme:'M—P, M—S ⇒ S—P',
    terms:{ S:'создания, способные к межзвёздным путешествиям', P:'разумные существа', M:'роботы-исследователи с планеты Ксенон' },
    premises:[
      { text:'Все роботы-исследователи с планеты Ксенон — разумные существа', type:'A', struct:'M—P' },
      { text:'Все роботы-исследователи с планеты Ксенон — создания, способные к межзвёздным путешествиям', type:'A', struct:'M—S' },
    ],
    conclusion:{ text:'Некоторые создания, способные к межзвёздным путешествиям — разумные существа', type:'I', struct:'S—P' },
    explanation:'Класс роботов-исследователей целиком входит и в класс разумных существ, и в класс способных к межзвёздным путешествиям. Поскольку роботы существуют, есть по крайней мере один объект, который одновременно разумен и способен к путешествиям.',
    distribution:'M распределён в обеих посылках (субъект A-суждений). S и P не распределены в заключении (I).',
    note:'Darapti — исторически важный модус третьей фигуры: он требует неявного экзистенциального допущения о непустоте M. В современной логике без этого допущения AAI-3 не является общезначимым.'
  },
  'IAI-3': {
    name:'Disamis', scheme:'M—P, M—S ⇒ S—P',
    terms:{ S:'люди', P:'отличники', M:'студенты' },
    premises:[
      { text:'Некоторые студенты — отличники', type:'I', struct:'M—P' },
      { text:'Все студенты — люди', type:'A', struct:'M—S' },
    ],
    conclusion:{ text:'Некоторые люди — отличники', type:'I', struct:'S—P' },
    explanation:'Та часть студентов, что является отличниками, обязательно входит в класс людей (поскольку все студенты — люди). Значит, некоторые люди являются отличниками.',
    distribution:'M распределён в меньшей посылке (субъект A). S и P не распределены в заключении (I).',
    note:'Disamis — модус третьей фигуры с частной большей посылкой.'
  },
  'AII-3': {
    name:'Datisi', scheme:'M—P, M—S ⇒ S—P',
    terms:{ S:'работающие в поликлинике', P:'имеют диплом', M:'врачи' },
    premises:[
      { text:'Все врачи имеют диплом', type:'A', struct:'M—P' },
      { text:'Некоторые врачи работают в поликлинике', type:'I', struct:'M—S' },
    ],
    conclusion:{ text:'Некоторые работающие в поликлинике имеют диплом', type:'I', struct:'S—P' },
    explanation:'Все врачи имеют диплом, а некоторые врачи работают в поликлинике. Значит, те врачи, что работают в поликлинике, имеют диплом — то есть некоторые работающие в поликлинике имеют диплом.',
    distribution:'M распределён в большей посылке (субъект A). S и P не распределены в заключении (I).',
    note:'Datisi — лёгкий для запоминания модус третьей фигуры; по структуре напоминает Darii, но с иным расположением терминов.'
  },
  'EAO-3': {
    name:'Felapton', scheme:'M—P, M—S ⇒ S—P',
    terms:{ S:'морские животные', P:'рыбы', M:'киты' },
    premises:[
      { text:'Ни один кит не является рыбой', type:'E', struct:'M—P' },
      { text:'Все киты — морские животные', type:'A', struct:'M—S' },
    ],
    conclusion:{ text:'Некоторые морские животные не являются рыбами', type:'O', struct:'S—P' },
    explanation:'Киты полностью исключены из класса рыб, но целиком входят в класс морских животных. Поскольку киты существуют, есть морские животные (киты), которые не являются рыбами.',
    distribution:'M распределён в обеих посылках. S не распределён в посылке, но распределён в заключении (субъект O). P распределён в заключении.',
    note:'Felapton — «отрицательный» аналог Darapti; также требует непустоты M.'
  },
  'OAO-3': {
    name:'Bocardo', scheme:'M—P, M—S ⇒ S—P',
    terms:{ S:'животные', P:'летают', M:'птицы' },
    premises:[
      { text:'Некоторые птицы не летают', type:'O', struct:'M—P' },
      { text:'Все птицы — животные', type:'A', struct:'M—S' },
    ],
    conclusion:{ text:'Некоторые животные не летают', type:'O', struct:'S—P' },
    explanation:'Та часть птиц, что не летает, входит в класс животных (поскольку все птицы — животные). Значит, есть животные (нелетающие птицы), которые не летают.',
    distribution:'M распределён в меньшей посылке (субъект A). P распределён в большей посылке (предикат O). S не распределён в посылке, но распределён в заключении.',
    note:'Bocardo — модус третьей фигуры с частноотрицательной большей посылкой.'
  },
  'EIO-3': {
    name:'Ferison', scheme:'M—P, M—S ⇒ S—P',
    terms:{ S:'спортсмены', P:'живут в общежитии', M:'студенты-заочники' },
    premises:[
      { text:'Ни один студент-заочник не живёт в общежитии', type:'E', struct:'M—P' },
      { text:'Некоторые студенты-заочники — спортсмены', type:'I', struct:'M—S' },
    ],
    conclusion:{ text:'Некоторые спортсмены не живут в общежитии', type:'O', struct:'S—P' },
    explanation:'Все студенты-заочники исключены из класса живущих в общежитии. Та часть заочников, что является спортсменами, не живёт в общежитии — значит, некоторые спортсмены не живут в общежитии.',
    distribution:'M распределён в большей посылке (субъект E). P распределён в большей посылке и в заключении (предикат O). S не распределён в посылке, но распределён в заключении.',
    note:'Ferison — «отрицательный» аналог Datisi.'
  },

  'AAI-4': {
    name:'Bramantip', scheme:'P—M, M—S ⇒ S—P',
    terms:{ S:'животные', P:'коты', M:'хищники' },
    premises:[
      { text:'Все коты — хищники', type:'A', struct:'P—M' },
      { text:'Все хищники — животные', type:'A', struct:'M—S' },
    ],
    conclusion:{ text:'Некоторые животные — коты', type:'I', struct:'S—P' },
    explanation:'Коты входят в класс хищников, а хищники — в класс животных. Поскольку коты существуют, некоторые животные являются котами.',
    distribution:'M распределён в обеих посылках (предикат A, субъект A). S и P не распределены в заключении (I).',
    note:'Bramantip — исторически спорный модус четвёртой фигуры: вывод AAI следует только при допущении существования котов (непустоты P).'
  },
  'AEE-4': {
    name:'Camenes', scheme:'P—M, M—S ⇒ S—P',
    terms:{ S:'животные', P:'розы', M:'растения' },
    premises:[
      { text:'Все розы — растения', type:'A', struct:'P—M' },
      { text:'Ни одно растение не является животным', type:'E', struct:'M—S' },
    ],
    conclusion:{ text:'Ни одно животное не является розой', type:'E', struct:'S—P' },
    explanation:'Все розы — растения, а растения полностью исключены из класса животных. Значит, розы не могут быть животными — то есть ни одно животное не является розой.',
    distribution:'M распределён в обеих посылках. S и P распределены в заключении (E).',
    note:'Camenes — «обратный» Cesare (вторая фигура); исторически четвёртая фигура тесно связана с первой и второй через перестановку посылок.'
  },
  'IAI-4': {
    name:'Dimaris', scheme:'P—M, M—S ⇒ S—P',
    terms:{ S:'вечнозелёные', P:'деревья', M:'хвойные' },
    premises:[
      { text:'Некоторые деревья — хвойные', type:'I', struct:'P—M' },
      { text:'Все хвойные — вечнозелёные', type:'A', struct:'M—S' },
    ],
    conclusion:{ text:'Некоторые вечнозелёные — деревья', type:'I', struct:'S—P' },
    explanation:'Та часть деревьев, что является хвойными, обязательно является вечнозелёной (поскольку все хвойные вечнозелёны). Значит, некоторые вечнозелёные являются деревьями.',
    distribution:'M распределён в меньшей посылке (субъект A). S и P не распределены в заключении (I).',
    note:'Dimaris — модус четвёртой фигуры с частной большей посылкой.'
  },
  'EAO-4': {
    name:'Fesapo', scheme:'P—M, M—S ⇒ S—P',
    terms:{ S:'позвоночные', P:'киты', M:'рыбы' },
    premises:[
      { text:'Ни один кит не является рыбой', type:'E', struct:'P—M' },
      { text:'Все рыбы — позвоночные', type:'A', struct:'M—S' },
    ],
    conclusion:{ text:'Некоторые позвоночные не являются китами', type:'O', struct:'S—P' },
    explanation:'Рыбы полностью входят в класс позвоночных, а киты из рыб исключены. Поскольку рыбы существуют, есть позвоночные (рыбы), которые не являются китами.',
    distribution:'M распределён в обеих посылках. S не распределён в посылке, но распределён в заключении (субъект O). P распределён в заключении.',
    note:'Fesapo — «отрицательный» аналог Bramantip; также требует непустоты M.'
  },
  'EIO-4': {
    name:'Fresison', scheme:'P—M, M—S ⇒ S—P',
    terms:{ S:'хищники', P:'дельфины', M:'рыбы' },
    premises:[
      { text:'Ни один дельфин не является рыбой', type:'E', struct:'P—M' },
      { text:'Некоторые рыбы являются хищниками', type:'I', struct:'M—S' },
    ],
    conclusion:{ text:'Некоторые хищники не являются дельфинами', type:'O', struct:'S—P' },
    explanation:'Дельфины полностью исключены из класса рыб. Та часть рыб, что является хищниками, не может быть дельфинами — значит, некоторые хищники не являются дельфинами.',
    distribution:'M распределён в большей посылке (предикат E). P распределён в большей посылке и в заключении (предикат O). S не распределён в посылке, но распределён в заключении.',
    note:'Fresison — «отрицательный» аналог Dimaris.'
  },
};

const FIGURES = {
  1: { scheme:'M—P, S—M ⇒ S—P', moduses:['AAA','EAE','AII','EIO'] },
  2: { scheme:'P—M, S—M ⇒ S—P', moduses:['EAE','AEE','EIO','AOO'] },
  3: { scheme:'M—P, M—S ⇒ S—P', moduses:['AAI','IAI','AII','EAO','OAO','EIO'] },
  4: { scheme:'P—M, M—S ⇒ S—P', moduses:['AAI','AEE','IAI','EAO','EIO'] },
};

// ===== Парсинг для анализатора =====
function stem(word){
  word = word.toLowerCase().replace(/[^а-яёa-z]/g,'');
  const sfx=['ами','ями','ого','его','ому','ему','ыми','ими','ов','ев','ей','ой','ый','ий','ая','яя','ое','ее','ые','ие','ых','их','ым','им','ах','ях','ам','ям','ом','ем','а','я','о','е','ы','и','у','ю','ь'];
  let ch=true;
  while(ch){ ch=false; for(const s of sfx){ if(word.length>s.length+2 && word.endsWith(s)){ word=word.slice(0,-s.length); ch=true; break; } } }
  return word;
}
function termKey(t){ return stem(t.trim().split(/[\s,]+/)[0]); }
function termsMatch(a,b){ return termKey(a)===termKey(b); }

function parsePremise(text){
  text = text.trim().replace(/[.,;:]$/,'');
  let quant=null, working=text, forcedNeg=false;
  const rules=[
    {re:/^не все\s+/i,q:'O',neg:true},
    {re:/^ни один\s+/i,q:'E'},{re:/^ни одна\s+/i,q:'E'},{re:/^ни одно\s+/i,q:'E'},
    {re:/^все\s+/i,q:'A'},{re:/^всякий\s+/i,q:'A'},{re:/^всякая\s+/i,q:'A'},
    {re:/^каждый\s+/i,q:'A'},{re:/^каждая\s+/i,q:'A'},{re:/^каждое\s+/i,q:'A'},
    {re:/^некоторые\s+/i,q:'I'},{re:/^некоторый\s+/i,q:'I'},
    {re:/^некоторая\s+/i,q:'I'},{re:/^некоторое\s+/i,q:'I'},
  ];
  for(const r of rules){
    if(r.re.test(working)){ quant=r.q; if(r.neg) forcedNeg=true; working=working.replace(r.re,''); break; }
  }
  if(!quant) quant='A';
  let subject='', predicate='', negated=forcedNeg;
  const pats=[
    {re:/^(.+?)\s+не\s+являются\s+(.+)$/i,neg:true},
    {re:/^(.+?)\s+не\s+является\s+(.+)$/i,neg:true},
    {re:/^(.+?)\s+являются\s+(.+)$/i},
    {re:/^(.+?)\s+является\s+(.+)$/i},
    {re:/^(.+?)\s+суть\s+(.+)$/i},
    {re:/^(.+?)\s+есть\s+(.+)$/i},
    {re:/^(.+?)\s+—\s+(.+)$/},
    {re:/^(.+?)\s+-\s+(.+)$/},
    {re:/^(.+?)\s+не\s+(.+)$/i,neg:true},
  ];
  for(const p of pats){
    const m=working.match(p.re);
    if(m){ subject=m[1].trim(); predicate=m[2].trim(); if(p.neg) negated=true; break; }
  }
  if(!subject){
    const w=working.split(/\s+/);
    const vs=['ет','ют','ут','ит','ат','ят','ует','уют','яет','яют','ает','ают','еет','еют','ли','ла','ло','л'];
    let idx=-1;
    for(let i=1;i<w.length;i++){ if(w[i].length>3 && vs.some(s=>w[i].endsWith(s))){ idx=i; break; } }
    if(idx>0){ subject=w.slice(0,idx).join(' '); predicate=w.slice(idx).join(' '); }
    else{ subject=w[0]||''; predicate=w.slice(1).join(' '); }
  }
  if(negated && !forcedNeg){
    if(quant==='A') quant='E';
    else if(quant==='I') quant='O';
  }
  return { quant, subject, predicate };
}

function splitSentences(input){
  let t = input.trim().replace(/Следовательно,?\s*/gi,'|||');
  let parts;
  if(t.includes('|||')){
    const [b,a] = t.split('|||');
    const bp = b.split(/\.\s+|\.$/).map(s=>s.trim()).filter(Boolean);
    parts = [...bp, a.trim()];
  } else {
    parts = t.split(/\.\s+|\.$/).map(s=>s.trim()).filter(Boolean);
  }
  return parts;
}

function analyze(input){
  const parts = splitSentences(input);
  if(parts.length!==3) throw new Error('Нужно ровно три предложения.');
  const p1=parsePremise(parts[0]), p2=parsePremise(parts[1]), c=parsePremise(parts[2]);
  const S=c.subject, P=c.predicate;
  let M=null;
  const p1t=[p1.subject,p1.predicate], p2t=[p2.subject,p2.predicate];
  outer: for(const t1 of p1t){ for(const t2 of p2t){ if(termsMatch(t1,t2)){ M=t1; break outer; } } }
  if(!M) throw new Error('Не найден средний термин M.');
  const mP1 = termsMatch(p1.subject,M)?'s':'p';
  const mP2 = termsMatch(p2.subject,M)?'s':'p';
  let figure;
  if(mP1==='s'&&mP2==='p') figure=1;
  else if(mP1==='p'&&mP2==='p') figure=2;
  else if(mP1==='s'&&mP2==='s') figure=3;
  else figure=4;
  const modus = p1.quant+p2.quant+c.quant;
  return { S,P,M,figure,modus };
}

const EULER_LAYOUTS = {
  1:[{label:'P',x:270,y:150,r:90,fill:'rgba(127,184,224,.18)',stroke:'#4a90c8'},{label:'M',x:200,y:150,r:65,fill:'rgba(240,168,104,.18)',stroke:'#d48040'},{label:'S',x:120,y:150,r:50,fill:'rgba(143,196,143,.18)',stroke:'#5a9a5a'}],
  2:[{label:'P',x:120,y:150,r:85,fill:'rgba(127,184,224,.18)',stroke:'#4a90c8'},{label:'M',x:270,y:150,r:75,fill:'rgba(240,168,104,.18)',stroke:'#d48040'},{label:'S',x:200,y:225,r:55,fill:'rgba(143,196,143,.18)',stroke:'#5a9a5a'}],
  3:[{label:'M',x:200,y:110,r:85,fill:'rgba(240,168,104,.18)',stroke:'#d48040'},{label:'P',x:130,y:200,r:70,fill:'rgba(127,184,224,.18)',stroke:'#4a90c8'},{label:'S',x:270,y:200,r:70,fill:'rgba(143,196,143,.18)',stroke:'#5a9a5a'}],
  4:[{label:'P',x:120,y:140,r:80,fill:'rgba(127,184,224,.18)',stroke:'#4a90c8'},{label:'M',x:280,y:110,r:70,fill:'rgba(240,168,104,.18)',stroke:'#d48040'},{label:'S',x:220,y:220,r:60,fill:'rgba(143,196,143,.18)',stroke:'#5a9a5a'}],
};

function drawEuler(svg, figure){
  svg.innerHTML='';
  const layout = EULER_LAYOUTS[figure] || EULER_LAYOUTS[1];
  for(const c of layout){
    const el=document.createElementNS('http://www.w3.org/2000/svg','circle');
    el.setAttribute('cx',c.x); el.setAttribute('cy',c.y); el.setAttribute('r',c.r);
    el.setAttribute('fill',c.fill); el.setAttribute('stroke',c.stroke); el.setAttribute('stroke-width','2.5');
    svg.appendChild(el);
  }
  for(const c of layout){
    const t=document.createElementNS('http://www.w3.org/2000/svg','text');
    t.setAttribute('x',c.x); t.setAttribute('y',c.y);
    t.setAttribute('text-anchor','middle'); t.setAttribute('dominant-baseline','middle');
    t.setAttribute('font-weight','700'); t.setAttribute('font-size','20');
    t.setAttribute('fill',c.stroke); t.setAttribute('font-family','Inter, sans-serif');
    t.textContent=c.label;
    svg.appendChild(t);
  }
}

// ===== Примеры =====
const EXAMPLES = {
  barbara:'Все люди смертны. Все греки — люди. Следовательно, все греки смертны.',
  darii:'Все политологи изучают политические процессы. Некоторые студенты являются политологами. Следовательно, некоторые студенты изучают политические процессы.',
  festino:'Ни одна рыба не является китом. Некоторые морские животные являются китами. Следовательно, некоторые морские животные не являются рыбами.',
  darapti:'Все роботы-исследователи с планеты Ксенон — разумные существа. Все роботы-исследователи с планеты Ксенон — создания, способные к межзвёздным путешествиям. Следовательно, некоторые создания, способные к межзвёздным путешествиям — разумные существа.',
  ferio:'Ни один вирус не является живым организмом. Некоторые патогены — вирусы. Следовательно, некоторые патогены не являются живыми организмами.',
};

document.querySelectorAll('.example-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{ document.getElementById('input').value = EXAMPLES[btn.dataset.ex]||''; });
});

document.getElementById('analyze-btn').addEventListener('click',()=>{
  try{
    const res=analyze(document.getElementById('input').value);
    document.getElementById('term-s').textContent=res.S;
    document.getElementById('term-p').textContent=res.P;
    document.getElementById('term-m').textContent=res.M;
    document.getElementById('fig-info').textContent='Фигура '+res.figure;
    document.getElementById('modus-info').textContent=res.modus;
    document.getElementById('result').classList.remove('hidden');
    drawEuler(document.getElementById('euler'),res.figure);
  }catch(e){
    alert('Ошибка: '+e.message+'\n\nПопробуйте пример из кнопок выше.');
  }
});

// ===== Рендер сетки =====
function renderFigures(){
  const grid=document.getElementById('figures-grid');
  grid.innerHTML='';
  for(const [num,data] of Object.entries(FIGURES)){
    const block=document.createElement('div');
    block.className='figure-block';
    block.innerHTML=`
      <h2>Фигура ${num}</h2>
      <div class="figure-scheme">${data.scheme}</div>
      <div class="modus-list"></div>
    `;
    const list=block.querySelector('.modus-list');
    for(const m of data.moduses){
      const key=m+'-'+num;
      const btn=document.createElement('button');
      btn.className='modus-btn';
      btn.style.setProperty('--btn-color',THEME_COLORS[key]||'#888');
      btn.textContent=m;
      btn.addEventListener('click',()=>{
        try { openModusDetail(num, m); }
        catch(err) { console.error(err); alert('Ошибка открытия: '+err.message); }
      });
      list.appendChild(btn);
    }
    grid.appendChild(block);
  }
}

// ===== Тема =====
function clearTheme(){
  document.body.className = document.body.className
    .split(' ').filter(c=>c && !c.startsWith('theme-')).join(' ');
}
function applyTheme(key){
  clearTheme();
  document.body.classList.add('theme-'+key);
  console.log('[applyTheme] class =', 'theme-'+key, '| body.className =', document.body.className);
}

// ===== Детальный экран =====
function renderPremiseRow(p, isConclusion){
  const typeClass = (p.type||'a').toLowerCase();
  return `<div class="premise ${isConclusion?'conclusion':''}">
    <span class="struct-tag">${p.struct||''}</span>
    <span class="type-tag type-${typeClass}">${p.type||'A'}</span>
    <span>${p.text}</span>
  </div>`;
}

function openModusDetail(figure, modus){
  const key = modus+'-'+figure;
  console.log('[openModusDetail] figure='+figure+' modus='+modus+' key='+key);

  const data = MODUS_DATA[key];
  if(!data){
    alert('Нет данных для '+key);
    return;
  }

  const detail = document.getElementById('modus-detail');
  if(!detail){
    alert('Элемент #modus-detail не найден!');
    return;
  }

  detail.innerHTML = `
    <button class="back-btn" id="back-to-grid">← К фигурам</button>
    <div class="detail-content">
      <div class="detail-header">
        <span class="detail-badge">Фигура ${figure} · Модус ${modus}</span>
        <h2>${data.name}</h2>
        <p class="detail-scheme">${data.scheme}</p>
      </div>
      <div class="detail-terms">
        <div class="term-pill s"><span>S</span>${data.terms.S}</div>
        <div class="term-pill p"><span>P</span>${data.terms.P}</div>
        <div class="term-pill m"><span>M</span>${data.terms.M}</div>
      </div>
      <div class="syllogism-display">
        ${renderPremiseRow(data.premises[0], false)}
        ${renderPremiseRow(data.premises[1], false)}
        ${renderPremiseRow({ ...data.conclusion, text: 'Следовательно, ' + data.conclusion.text }, true)}
      </div>
      <div class="detail-block">
        <h3>Почему это верно</h3>
        <p>${data.explanation}</p>
      </div>
      <div class="detail-block">
        <h3>Распределённость терминов</h3>
        <p>${data.distribution}</p>
      </div>
      <div class="detail-block">
        <h3>Примечание</h3>
        <p>${data.note}</p>
      </div>
    </div>
  `;

  document.getElementById('figures-intro').classList.add('hidden');
  document.getElementById('figures-grid').classList.add('hidden');
  detail.classList.add('active');
  applyTheme(key);

  document.getElementById('back-to-grid').addEventListener('click', closeModusDetail);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeModusDetail(){
  const detail = document.getElementById('modus-detail');
  if(!detail) return;
  detail.classList.remove('active');
  detail.innerHTML = '';
  const intro = document.getElementById('figures-intro');
  const grid = document.getElementById('figures-grid');
  if(intro) intro.classList.remove('hidden');
  if(grid) grid.classList.remove('hidden');
  clearTheme();
}

// ===== Роутинг =====
function router(){
  const hash = location.hash.replace('#','')||'analyzer';
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  const view = document.getElementById(hash) || document.getElementById('analyzer');
  view.classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l=>{
    l.classList.toggle('active', l.dataset.view===hash);
  });
}

window.addEventListener('hashchange', router);

// Nav-клики: если переходим на "Фигуры и модусы" — сбрасываем деталь, даже если hash не менялся
document.querySelectorAll('.nav-link').forEach(link=>{
  link.addEventListener('click',()=>{
    closeModusDetail();
  });
});

window.addEventListener('DOMContentLoaded', ()=>{
  console.log('[app.js] DOMContentLoaded');
  renderFigures();
  router();
});