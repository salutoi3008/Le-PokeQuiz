/* ===== DONNÉES : [question, bonne réponse, mauvaises…] — pour Vrai/Faux : [question, true|false] ===== */
const E=[
{n:"Culture générale",e:"🌍",c:"#3d6fd0",p:6,t:"q",q:[["Combien de Pokémon compte la 1re génération ?","151","100","120","251"],["Quel Pokémon porte le numéro 25 au Pokédex ?","Pikachu","Raichu","Évoli","Mew"],["Quel starter de type Feu est proposé à Kanto ?","Salamèche","Héricendre","Ouisticram","Flambino"]]},
{n:"Jeux vidéo",e:"🎮",c:"#d04a4a",p:6,t:"q",q:[["Quels jeux ont lancé la licence en 1996 au Japon ?","Rouge et Vert","Or et Argent","Rubis et Saphir","Jaune"],["Dans quelle région se passent Épée et Bouclier ?","Galar","Paldea","Alola","Hisui"],["Sur quelle console sortent Écarlate et Violet ?","Switch","3DS","Wii U","DS"]]},
{n:"Cartes TCG",e:"🃏",c:"#c9892b",p:7,t:"q",q:[["Quel type d’énergie est représenté par une flamme ?","Feu","Dragon","Combat","Obscurité"],["Comment appelle-t-on les cartes à reflets brillants ?","Holo","Mates","Plates","Cristal"],["Combien de cartes contient un deck standard ?","60","40","52","100"]]},
{n:"Types",e:"🔥",c:"#d0662b",p:5,t:"q",q:[["Le type Eau est faible face à quel type ?","Plante","Feu","Sol","Vol"],["Quel type est immunisé aux attaques Normal ?","Spectre","Roche","Acier","Poison"],["Quel type a été ajouté en 6e génération ?","Fée","Acier","Ténèbres","Dragon"]]},
{n:"Vrai ou faux",e:"✅",c:"#7b4fd0",p:5,t:"vf",q:[["Pikachu évolue en Raichu avec une Pierre Foudre.",true],["Mew porte le numéro 150 du Pokédex.",false],["Les Pokémon de type Spectre sont immunisés aux attaques Normal.",true]]},
{n:"Évolutions",e:"🧬",c:"#2fa36b",p:6,t:"q",q:[["En quoi évolue Chenipan ?","Chrysacier","Aspicot","Papilusion","Mimigal"],["Combien d’évolutions Évoli a-t-il en 1re génération ?","3","2","5","8"],["Quel objet fait évoluer Rondoudou en Grodoudou ?","Pierre Lune","Pierre Feu","Pierre Eau","Pierre Aube"]]},
{n:"Anime",e:"📺",c:"#c04aa0",p:6,t:"q",q:[["Quel est le Pokémon vedette de Sacha ?","Pikachu","Évoli","Ronflex","Bulbizarre"],["Quelle équipe est dirigée par Giovanni ?","Team Rocket","Team Magma","Team Galaxie","Team Flare"],["Quel Pokémon de la Team Rocket parle comme un humain ?","Miaouss","Abo","Smogo","Soporifik"]]},
{n:"Régions",e:"🗺️",c:"#2a9bb0",p:6,t:"q",q:[["Quelle est la première région de la saga ?","Kanto","Johto","Hoenn","Sinnoh"],["Quelle région s’inspire d’Hawaï ?","Alola","Unys","Kalos","Galar"],["Quelle région s’inspire du Royaume-Uni ?","Galar","Paldea","Kalos","Hoenn"]]},
{n:"Légendaires",e:"⭐",c:"#d0a82b",p:7,t:"q",q:[["Quel trio d’oiseaux légendaires vit à Kanto ?","Artikodin, Électhor, Sulfura","Lugia, Ho-Oh, Celebi","Latias, Latios, Jirachi","Zapdos, Raikou, Entei"],["Quel Pokémon est sur la jaquette de Rouge ?","Dracaufeu","Tortank","Florizarre","Mewtwo"],["Quel légendaire est sur la jaquette de Cristal ?","Suicune","Raikou","Entei","Lugia"]]},
{n:"Produits dérivés",e:"🧸",c:"#4a6fd0",p:7,t:"q",q:[["Quel jeu mobile utilise la réalité augmentée ?","Pokémon GO","Pokémon Quest","Pokémon Café","Pokémon Rumble"],["Quel jeu de cartes numérique est sorti sur mobile en 2024 ?","Pokémon TCG Pocket","Pokémon Quest","Pokémon Masters","Pokémon Home"],["Quelle société édite le jeu de cartes Pokémon en France ?","The Pokémon Company","Nintendo France","Hasbro","Bandai"]]}
];
const MAXE=5,TIME=15;
const $=s=>document.querySelector(s),h=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const ls={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
/* Classement : stocké localement. Pour un vrai classement mondial, remplacer ces deux fonctions par des appels à un serveur (Supabase, Firebase…). */
const API={async save(n,s){const l=ls.get("pkq_lb",[]);l.push({n,s,d:Date.now()});l.sort((a,b)=>b.s-a.s);ls.set("pkq_lb",l.slice(0,50))},async top(){return ls.get("pkq_lb",[]).slice(0,10)}};
let S,tm;
const A=html=>{$("#app").innerHTML=html};

function modes(){clearInterval(tm);const b=ls.get(bestKey(),0);
A(`<div class="top"><div><small>QUIZ POKÉMON</small><h1>CHOISIS TON MODE</h1></div><div class="score" style="margin-left:auto"><small>RECORD</small><b>${b}</b></div></div>
<div class="modes" style="margin-top:14px">
<button class="mode" onclick="setup('libre')">🎯<h2>Libre</h2>Fais les épreuves que tu veux, autant que tu veux, et bats ton record personnel.</button>
<button class="mode" onclick="setup('versus')">⚔️<h2>Versus</h2>2 à 4 joueurs sur le même écran, mêmes épreuves, un seul vainqueur.</button>
<button class="mode" onclick="setup('compet')">🏆<h2>Compétition</h2>${MAXE} épreuves et ta place dans le classement. Compte requis.</button></div>
<div class="row"><button class="btn alt" onclick="home()">Accueil</button><button class="btn alt" onclick="board()">Voir le classement</button></div>`)}

async function board(){const l=await API.top();
A(`<div class="top"><div><small>COMPÉTITION</small><h1>CLASSEMENT</h1></div></div><div class="panel">${l.length?`<table><tr><th>#</th><th>Joueur</th><th>Points</th></tr>${l.map((r,i)=>`<tr><td>${i+1}</td><td>${h(r.n)}</td><td>${r.s}</td></tr>`).join("")}</table>`:`<p class="c mut">Aucun score pour l’instant. Lance une Compétition pour ouvrir le classement.</p>`}</div><div class="row"><button class="btn" onclick="modes()">Retour</button></div>`)}

function setup(mode){
if(mode==="libre")return begin(mode,["Moi"]);
if(mode==="compet")return U.cur()?begin("compet",[U.cur()]):auth("in","compet");
else A(`<div class="top"><div><small>VERSUS</small><h1>LES JOUEURS</h1></div></div><div class="panel">${[1,2,3,4].map(i=>`<input id="p${i-1}" maxlength="16" placeholder="Joueur ${i}${i>2?" (facultatif)":""}">`).join("")}<div class="row"><button class="btn alt" onclick="modes()">Retour</button><button class="btn" onclick="begin('versus',[0,1,2,3].map(i=>$('#p'+i).value.trim()).filter(Boolean).concat(['Joueur 1','Joueur 2']).slice(0,Math.max(2,[0,1,2,3].filter(i=>$('#p'+i).value.trim()).length)))">Lancer</button></div></div>`)}

function begin(mode,players){S={mode,players,sc:players.map(()=>0),b:players.map(()=>({g:1,m:1,d:1})),played:[],pi:0};hub()}

function topbar(title){const mx=S.mode==="libre"?"":`<div class="mid">ÉPREUVES JOUÉES<div class="dots">${Array.from({length:MAXE},(_,i)=>`<i class="${i<S.played.length?"on":""}"></i>`).join("")}</div></div>`;
const sc=S.players.length>1?S.players.map((p,i)=>`${h(p)} : ${S.sc[i]}`).join(" | "):"";
return `<div class="top"><div><small>QUIZ POKÉMON</small><h1>${title}</h1></div>${mx}<div class="score" style="${mx?"":"margin-left:auto"}"><small>SCORE${S.players.length>1?" — "+h(S.players[S.pi]):""}</small><b>${S.sc[S.pi]}</b></div></div>${sc?`<p class="c mut" style="margin-top:8px">${sc}</p>`:""}`}

function bonusBar(live){const b=S.b[S.pi];return `<div class="panel bonus">${[["g","💪","Gonflette","Points ×2"],["m","⏱️","Métronome","Stoppe le temps"],["d","🔍","Détection","Retire 2 réponses"]].map(([k,i,n,d])=>`<button class="bn" ${live&&b[k]?"":"disabled"} onclick="useB('${k}')" title="${d}"><span>${i}</span>${n}</button>`).join("")}</div>`}

function hub(){clearInterval(tm);
A(`${topbar("CHOIX DE L’ÉPREUVE")}<div class="panel"><div class="grid">${E.map((x,i)=>`<button class="tile" style="--c:${x.c}" ${S.played.includes(i)?"disabled":""} onclick="pick(${i})"><em>${x.p*3}</em><span>${x.e}</span>${x.n.toUpperCase()}</button>`).join("")}</div></div>${bonusBar(false)}${S.mode==="libre"?`<div class="row"><button class="btn" onclick="finish()">Terminer la partie</button></div>`:""}`)}

function pick(i){S.ei=i;S.qs=sh(E[i].q);S.qi=0;S.got=0;S.dbl=false;ask()}

function ask(){clearInterval(tm);const x=E[S.ei],q=S.qs[S.qi];S.t=TIME;S.frozen=false;S.done=false;
S.opts=x.t==="vf"?["Vrai","Faux"]:sh(q.slice(1));S.ans=x.t==="vf"?(q[1]?"Vrai":"Faux"):q[1];
A(`${topbar(x.n.toUpperCase())}<div class="panel"><div class="bar"><div id="bar" style="width:100%"></div></div><p class="mut c" style="margin-top:8px">Question ${S.qi+1}/${x.q.length} — ${x.p} pts${S.dbl?" ×2":""}</p><p class="q">${h(q[0])}</p><div class="opts">${S.opts.map((o,i)=>`<button class="opt" id="o${i}" onclick="resp(${i})">${h(o)}</button>`).join("")}</div></div>${bonusBar(true)}`);
tm=setInterval(()=>{if(S.frozen)return;S.t-=.25;$("#bar").style.width=S.t/TIME*100+"%";if(S.t<=0)resp(-1)},250)}

function useB(k){if(S.done||!S.b[S.pi][k])return;S.b[S.pi][k]=0;
if(k==="g")S.dbl=true;if(k==="m")S.frozen=true;
if(k==="d")sh(S.opts.map((o,i)=>i).filter(i=>S.opts[i]!==S.ans)).slice(0,S.opts.length>2?2:1).forEach(i=>{$("#o"+i).classList.add("off");$("#o"+i).disabled=true});
document.querySelectorAll(".bn").forEach(b=>b.disabled=!S.b[S.pi][b.getAttribute("onclick").match(/'(.)'/)[1]]);
if(k==="g")document.querySelector(".mut").textContent+=" ×2"}

function resp(i){if(S.done)return;S.done=true;clearInterval(tm);const x=E[S.ei],ok=i>=0&&S.opts[i]===S.ans;
S.opts.forEach((o,j)=>{const b=$("#o"+j);b.disabled=true;if(o===S.ans)b.classList.add("good");else if(j===i)b.classList.add("bad")});
if(ok){const g=x.p*(S.dbl?2:1);S.sc[S.pi]+=g;S.got++}
S.dbl=false;document.querySelectorAll(".bn").forEach(b=>b.disabled=true);
setTimeout(()=>{if(++S.qi<x.q.length)ask();else endEp()},1200)}

function endEp(){const multi=S.players.length>1;
if(multi&&S.pi<S.players.length-1){S.pi++;return turn()}
S.played.push(S.ei);S.pi=0;
if(S.mode!=="libre"&&S.played.length>=MAXE)return finish();
if(multi)return turn(true);hub()}

function turn(next){const first=next;A(`${topbar(first?"ÉPREUVE SUIVANTE":"AU TOUR DE "+h(S.players[S.pi]).toUpperCase())}<div class="panel c"><p class="q">${first?"Tout le monde a joué cette épreuve. Choisissez la suivante.":"Même épreuve : "+E[S.ei].n}</p><button class="btn" onclick="${first?"hub()":"pick("+S.ei+")"}">${first?"Choisir l’épreuve":"Je suis prêt"}</button></div>`)}

async function finish(){clearInterval(tm);let best=ls.get(bestKey(),0),extra="";
if(S.mode==="libre"){const s=S.sc[0],rec=s>best;if(rec)ls.set(bestKey(),s);extra=rec?`<p class="c" style="color:var(--gold)">Nouveau record personnel !</p>`:`<p class="c mut">Ton record : ${best} pts</p>`}
if(S.mode==="compet"){await API.save(S.players[0],S.sc[0]);extra=`<p class="c mut">Score enregistré dans le classement.</p>`}
const r=S.players.map((p,i)=>({p,s:S.sc[i]})).sort((a,b)=>b.s-a.s);
A(`<div class="top"><div><small>QUIZ POKÉMON</small><h1>RÉSULTATS</h1></div></div><div class="panel"><table><tr><th>#</th><th>Joueur</th><th>Points</th></tr>${r.map((x,i)=>`<tr><td>${i+1}</td><td>${h(x.p)}</td><td>${x.s}</td></tr>`).join("")}</table>${extra}</div><div class="row"><button class="btn" onclick="modes()">Menu</button>${S.mode==="compet"?`<button class="btn alt" onclick="board()">Classement</button>`:""}</div>`)}

/* ===== COMPTES : stockés dans ce navigateur. Pour de vrais comptes en ligne, remplacer l’objet AUTH par un service (Supabase, Firebase Auth…). ===== */
const U={cur:()=>ls.get("pkq_session",null)};
const bestKey=()=>"pkq_best"+(U.cur()?"_"+U.cur().toLowerCase():"");
async function hash(t){if(!(window.crypto&&crypto.subtle))return "p"+t;const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode("pkq:"+t));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}
const AUTH={
async signup(n,p){const l=ls.get("pkq_users",[]),id=n.toLowerCase();if(l.some(u=>u.id===id))throw"Ce pseudo est déjà pris.";l.push({id,name:n,h:await hash(id+p)});ls.set("pkq_users",l);ls.set("pkq_session",n)},
async login(n,p){const id=n.toLowerCase(),u=ls.get("pkq_users",[]).find(u=>u.id===id);if(!u||u.h!==await hash(id+p))throw"Pseudo ou mot de passe incorrect.";ls.set("pkq_session",u.name)}};
function logout(){ls.set("pkq_session",null);home()}
function navHtml(){const u=U.cur();return `<div class="nav">${u?`<span>👤 ${h(u)}</span><button class="btn alt" onclick="logout()">Déconnexion</button>`:`<button class="btn alt" onclick="auth('in')">Connexion</button><button class="btn" onclick="auth('up')">Créer un compte</button>`}</div>`}

function auth(tab,next){clearInterval(tm);const up=tab==="up";
A(`<div class="top"><div><small>QUIZ POKÉMON</small><h1>${up?"CRÉER UN COMPTE":"CONNEXION"}</h1></div></div>
<div class="panel" style="max-width:440px;margin:14px auto"><div class="tabs"><button class="btn ${up?"":"alt"}" onclick="auth('in',${next?`'${next}'`:"undefined"})">Connexion</button><button class="btn ${up?"alt":""}" onclick="auth('up',${next?`'${next}'`:"undefined"})">Inscription</button></div>
${next?`<p class="mut">La Compétition demande un compte pour t’inscrire au classement.</p>`:""}
<input id="au" maxlength="16" placeholder="Pseudo (3 à 16 caractères)" autocomplete="username"><input id="pw" type="password" placeholder="Mot de passe (6 caractères minimum)" autocomplete="${up?"new-password":"current-password"}">
<p class="err" id="err"></p><div class="row" style="margin-top:6px"><button class="btn alt" onclick="${next?"modes()":"home()"}">Retour</button><button class="btn" onclick="sub(${up},${next?`'${next}'`:"undefined"})">${up?"Créer mon compte":"Me connecter"}</button></div></div>`)}

async function sub(up,next){const n=$("#au").value.trim(),p=$("#pw").value;
if(up&&(n.length<3||!/^[\w\- ]+$/.test(n)))return $("#err").textContent="Le pseudo doit faire 3 à 16 caractères : lettres, chiffres, espace, - ou _.";
if(up&&p.length<6)return $("#err").textContent="Le mot de passe doit faire au moins 6 caractères.";
try{await(up?AUTH.signup(n,p):AUTH.login(n,p))}catch(e){return $("#err").textContent=String(e)}
next?setup(next):home()}

function home(){clearInterval(tm);const u=U.cur(),nq=E.reduce((a,x)=>a+x.q.length,0);
A(`<div class="top"><div><small>QUIZ POKÉMON</small><h1>ACCUEIL</h1></div>${navHtml()}</div>
<div class="hero"><h2>Es-tu un vrai maître Pokémon ?</h2><p>Jeux, anime, cartes, produits dérivés : relève des épreuves variées, gagne des points et grimpe au classement.</p>
<div class="row"><button class="btn" onclick="modes()">Jouer maintenant</button>${u?"":`<button class="btn alt" onclick="auth('up')">Créer un compte</button>`}</div>
<div class="stats"><div><b>${E.length}</b><small>épreuves</small></div><div><b>${nq}</b><small>questions</small></div><div><b>3</b><small>modes de jeu</small></div></div></div>
<h3 class="sec">Trois façons de jouer</h3><div class="modes">
<div class="mode">🎯<h2>Libre</h2>Choisis tes épreuves, joue sans limite et bats ton record personnel.</div>
<div class="mode">⚔️<h2>Versus</h2>Jusqu’à 4 joueurs sur le même écran, mêmes questions, un seul gagnant.</div>
<div class="mode">🏆<h2>Compétition</h2>${MAXE} épreuves, ton score entre dans le classement du site.</div></div>
<h3 class="sec">Des épreuves pour tous les goûts</h3><div class="panel"><div class="grid">${E.map(x=>`<div class="tile mini" style="--c:${x.c}"><span>${x.e}</span>${x.n.toUpperCase()}</div>`).join("")}</div></div>
<h3 class="sec">Des bonus pour te sortir d’affaire</h3><div class="panel bonus"><div class="bn"><span>💪</span>Gonflette<br>points ×2</div><div class="bn"><span>⏱️</span>Métronome<br>stoppe le temps</div><div class="bn"><span>🔍</span>Détection<br>retire 2 réponses</div></div>
<h3 class="sec">Pourquoi créer un compte ?</h3><div class="panel"><table><tr><td>🏆</td><td>Accéder à la Compétition et apparaître dans le classement</td></tr><tr><td>💾</td><td>Garder ton record personnel du mode Libre</td></tr><tr><td>👤</td><td>Jouer sous ton pseudo à chaque visite</td></tr></table>${u?"":`<div class="row"><button class="btn" onclick="auth('up')">Créer mon compte</button></div>`}</div>`)}

home();
