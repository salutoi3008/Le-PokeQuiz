/* ===== ÉPREUVES (cahier des charges). ok:false = pas encore jouable. q: [question, bonne réponse, autres réponses acceptées…] ===== */
const E=[
{n:"Le cri du Pokémon",e:"🔊",c:"#3d6fd0",max:15,bn:["Clairvoyance","Affiche le type (manche 4)"],ok:false,q:[]},
{n:"La description Pokédex",e:"📖",c:"#2fa36b",max:9,bn:["Échange Psy","Change la description"],ok:false,q:[]},
{n:"Le lieu et son jeu",e:"📍",c:"#2a9bb0",max:6,bn:["Téléport","Change le lieu"],ok:false,q:[]},
{n:"L’anime Pokémon",e:"📺",c:"#c04aa0",max:10,pts:2,nq:5,bn:["Jackpot","Donne la réponse, sans point"],ok:true,q:[
["Quel est le Pokémon de départ de Sacha dans la série ?","Pikachu"],
["Comment s’appelle le village natal de Sacha ?","Bourg Palette","Bourg-Palette"],
["Comment s’appelle le professeur Pokémon de Bourg Palette ?","Chen","Professeur Chen"],
["Quel Pokémon de la Team Rocket parle comme un humain ?","Miaouss"],
["Quel champion d’arène d’Argenta voyage avec Sacha au début ?","Pierre"],
["Quel Pokémon créé génétiquement est l’adversaire du premier film ?","Mewtwo"],
["Quel starter accompagne Liko dans Pokémon Horizons ?","Poussacha"]]},
{n:"Les jeux et spin-off",e:"🎮",c:"#d04a4a",max:10,pts:2,nq:5,bn:["Jackpot","Donne la réponse, sans point"],ok:true,q:[
["Dans quelle région se passent Pokémon Rouge et Bleu ?","Kanto"],
["Quel jeu permet de capturer des Pokémon en réalité augmentée ?","Pokémon GO","GO"],
["Sur quelle console est sorti Pokémon Colosseum ?","GameCube","Game Cube"],
["Sur quelle console est sorti Pokémon Stadium en 1999 ?","Nintendo 64","N64"],
["Sur quelle console est sorti PokéPark ?","Wii"],
["Dans quelle région se passent Épée et Bouclier ?","Galar"],
["Dans quelle région se passent Écarlate et Violet ?","Paldea"]]},
{n:"Le thème du Légendaire",e:"🎵",c:"#d0a82b",max:15,bn:["Clairvoyance","Affiche le ou les types"],ok:false,q:[]},
{n:"Le type du Pokémon",e:"🔥",c:"#d0662b",max:20,bn:["Multi-Type","Change le double type"],ok:false,q:[]},
{n:"Les dresseurs importants",e:"🧢",c:"#7b4fd0",max:16,bn:["Détection","Donne un Pokémon, sans point"],ok:false,q:[]}
];
const MAXE=E.filter(x=>x.ok).length,TIME=30;
const norm=s=>String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]/g,"");
const $=s=>document.querySelector(s),h=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const ls={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
/* Serveur : comptes et classement. Remplacer l’adresse par celle du serveur une fois hébergé en ligne. */
const SERVEUR="http://localhost:3000";
async function srv(path,body){const k=ls.get("pkq_token",null);let r;try{r=await fetch(SERVEUR+path,{method:body?"POST":"GET",headers:{"Content-Type":"application/json",...(k?{Authorization:"Bearer "+k}:{})},body:body?JSON.stringify(body):undefined})}catch{throw"Serveur injoignable."}const d=await r.json().catch(()=>({}));if(!r.ok)throw d.erreur||"Erreur du serveur.";return d}
const API={async save(n,s){await srv("/scores",{mode:"Compétition",points:s})},async top(){return(await srv("/classement?mode="+encodeURIComponent("Compétition"))).map(r=>({n:r.pseudo,s:r.points}))}};
let S,tm;
const A=html=>{$("#app").innerHTML=html};

function modes(){clearInterval(tm);const b=ls.get(bestKey(),0);
A(`<div class="top"><div><small>QUIZ POKÉMON</small><h1>CHOISIS TON MODE</h1></div><div class="score" style="margin-left:auto"><small>RECORD</small><b>${b}</b></div></div>
<div class="modes" style="margin-top:14px">
<button class="mode" onclick="setup('libre')">🎯<h2>Libre</h2>Fais les épreuves que tu veux, autant que tu veux, et bats ton record personnel.</button>
<button class="mode" onclick="setup('versus')">⚔️<h2>Versus</h2>2 à 4 joueurs sur le même écran, mêmes épreuves, un seul vainqueur.</button>
<button class="mode" onclick="setup('compet')">🏆<h2>Compétition</h2>${MAXE} épreuves et ta place dans le classement. Compte requis.</button></div>
<div class="row"><button class="btn alt" onclick="home()">Accueil</button><button class="btn alt" onclick="board()">Voir le classement</button></div>`)}

async function board(){const l=await API.top().catch(()=>[]);
A(`<div class="top"><div><small>COMPÉTITION</small><h1>CLASSEMENT</h1></div></div><div class="panel">${l.length?`<table><tr><th>#</th><th>Joueur</th><th>Points</th></tr>${l.map((r,i)=>`<tr><td>${i+1}</td><td>${h(r.n)}</td><td>${r.s}</td></tr>`).join("")}</table>`:`<p class="c mut">Aucun score pour l’instant. Lance une Compétition pour ouvrir le classement.</p>`}</div><div class="row"><button class="btn" onclick="modes()">Retour</button></div>`)}

function setup(mode){
if(mode==="libre")return begin(mode,["Moi"]);
if(mode==="compet")return U.cur()?begin("compet",[U.cur()]):auth("in","compet");
else A(`<div class="top"><div><small>VERSUS</small><h1>LES JOUEURS</h1></div></div><div class="panel">${[1,2,3,4].map(i=>`<input id="p${i-1}" maxlength="16" placeholder="Joueur ${i}${i>2?" (facultatif)":""}">`).join("")}<div class="row"><button class="btn alt" onclick="modes()">Retour</button><button class="btn" onclick="begin('versus',[0,1,2,3].map(i=>$('#p'+i).value.trim()).filter(Boolean).concat(['Joueur 1','Joueur 2']).slice(0,Math.max(2,[0,1,2,3].filter(i=>$('#p'+i).value.trim()).length)))">Lancer</button></div></div>`)}

function begin(mode,players){S={mode,players,sc:players.map(()=>0),b:players.map(()=>({})),played:[],pi:0};hub()}

function topbar(title){const mx=S.mode==="libre"?"":`<div class="mid">ÉPREUVES JOUÉES<div class="dots">${Array.from({length:MAXE},(_,i)=>`<i class="${i<S.played.length?"on":""}"></i>`).join("")}</div></div>`;
const sc=S.players.length>1?S.players.map((p,i)=>`${h(p)} : ${S.sc[i]}`).join(" | "):"";
return `<div class="top"><div><small>QUIZ POKÉMON</small><h1>${title}</h1></div>${mx}<div class="score" style="${mx?"":"margin-left:auto"}"><small>SCORE${S.players.length>1?" — "+h(S.players[S.pi]):""}</small><b>${S.sc[S.pi]}</b></div></div>${sc?`<p class="c mut" style="margin-top:8px">${sc}</p>`:""}`}

function bonusBar(live){const x=E[S.ei],u=S.b[S.pi][S.ei];return `<div class="panel bonus"><button class="bn" ${live&&!u?"":"disabled"} onclick="useB()" title="${h(x.bn[1])}"><span>🎁</span>${h(x.bn[0])}<br>${h(x.bn[1])}</button></div>`}

function hub(){clearInterval(tm);
A(`${topbar("CHOIX DE L’ÉPREUVE")}<div class="panel"><div class="grid">${E.map((x,i)=>`<button class="tile" style="--c:${x.c}" ${S.played.includes(i)||!x.ok?"disabled":""} onclick="pick(${i})"><em>${x.max}</em><span>${x.e}</span>${h(x.n.toUpperCase())}${x.ok?"":"<small>BIENTÔT</small>"}</button>`).join("")}</div></div>${S.mode==="libre"?`<div class="row"><button class="btn" onclick="finish()">Terminer la partie</button></div>`:""}`)}

function pick(i){S.ei=i;S.qs=sh(E[i].q).slice(0,E[i].nq);S.qi=0;S.got=0;ask()}

function ask(){clearInterval(tm);const x=E[S.ei],q=S.qs[S.qi];S.t=TIME;S.done=false;S.zero=false;
A(`${topbar(h(x.n.toUpperCase()))}<div class="panel"><div class="bar"><div id="bar" style="width:100%"></div></div><p class="mut c" style="margin-top:8px">Question ${S.qi+1}/${S.qs.length} — ${x.pts} pts</p><p class="q">${h(q[0])}</p><input id="rep" autocomplete="off" placeholder="Ta réponse" onkeydown="if(event.key==='Enter')resp()"><p class="c" id="fb" style="min-height:22px"></p><div class="row"><button class="btn" onclick="resp()">Valider</button></div></div>${bonusBar(true)}`);
$("#rep").focus();
tm=setInterval(()=>{S.t-=.25;$("#bar").style.width=S.t/TIME*100+"%";if(S.t<=0)resp(true)},250)}

function useB(){if(S.done||S.b[S.pi][S.ei])return;S.b[S.pi][S.ei]=1;S.zero=true;
$("#fb").innerHTML=`Réponse : <b>${h(S.qs[S.qi][1])}</b> (cette question ne rapporte aucun point)`;
document.querySelectorAll(".bn").forEach(b=>b.disabled=true)}

function resp(to){if(S.done)return;S.done=true;clearInterval(tm);const x=E[S.ei],q=S.qs[S.qi],v=norm($("#rep").value),ok=!to&&v&&q.slice(1).some(a=>norm(a)===v);
$("#rep").disabled=true;document.querySelectorAll(".bn").forEach(b=>b.disabled=true);
if(ok&&!S.zero){S.sc[S.pi]+=x.pts;S.got++}
$("#fb").innerHTML=ok?`<span style="color:var(--ok)">Bonne réponse${S.zero?" (0 point, bonus utilisé)":" ! +"+x.pts}</span>`:`<span style="color:var(--ko)">${to?"Temps écoulé. ":"Raté. "}Réponse : ${h(q[1])}</span>`;
setTimeout(()=>{if(++S.qi<S.qs.length)ask();else endEp()},1600)}

function endEp(){const multi=S.players.length>1;
if(multi&&S.pi<S.players.length-1){S.pi++;return turn()}
S.played.push(S.ei);S.pi=0;
if(S.mode!=="libre"&&S.played.length>=MAXE)return finish();
if(multi)return turn(true);hub()}

function turn(next){const first=next;A(`${topbar(first?"ÉPREUVE SUIVANTE":"AU TOUR DE "+h(S.players[S.pi]).toUpperCase())}<div class="panel c"><p class="q">${first?"Tout le monde a joué cette épreuve. Choisissez la suivante.":"Même épreuve : "+E[S.ei].n}</p><button class="btn" onclick="${first?"hub()":"pick("+S.ei+")"}">${first?"Choisir l’épreuve":"Je suis prêt"}</button></div>`)}

async function finish(){clearInterval(tm);let best=ls.get(bestKey(),0),extra="";
if(S.mode==="libre"){const s=S.sc[0],rec=s>best;if(rec)ls.set(bestKey(),s);extra=rec?`<p class="c" style="color:var(--gold)">Nouveau record personnel !</p>`:`<p class="c mut">Ton record : ${best} pts</p>`}
if(S.mode==="compet"){const ok=await API.save(S.players[0],S.sc[0]).then(()=>1,()=>0);extra=`<p class="c mut">${ok?"Score enregistré dans le classement.":"Score non enregistré : serveur injoignable ou session expirée (reconnecte-toi)."}</p>`}
const r=S.players.map((p,i)=>({p,s:S.sc[i]})).sort((a,b)=>b.s-a.s);
A(`<div class="top"><div><small>QUIZ POKÉMON</small><h1>RÉSULTATS</h1></div></div><div class="panel"><table><tr><th>#</th><th>Joueur</th><th>Points</th></tr>${r.map((x,i)=>`<tr><td>${i+1}</td><td>${h(x.p)}</td><td>${x.s}</td></tr>`).join("")}</table>${extra}</div><div class="row"><button class="btn" onclick="modes()">Menu</button>${S.mode==="compet"?`<button class="btn alt" onclick="board()">Classement</button>`:""}</div>`)}

/* ===== COMPTES : gérés par le serveur (le pseudo et le jeton de connexion sont gardés dans le navigateur). ===== */
const U={cur:()=>ls.get("pkq_session",null)};
const bestKey=()=>"pkq_best"+(U.cur()?"_"+U.cur().toLowerCase():"");
const AUTH={
async signup(n,p){const r=await srv("/inscription",{pseudo:n,mdp:p});ls.set("pkq_session",r.pseudo);ls.set("pkq_token",r.token)},
async login(n,p){const r=await srv("/connexion",{pseudo:n,mdp:p});ls.set("pkq_session",r.pseudo);ls.set("pkq_token",r.token)}};
function logout(){ls.set("pkq_session",null);ls.set("pkq_token",null);home()}
function navHtml(){const u=U.cur();return `<div class="nav">${u?`<span>👤 ${h(u)}</span><button class="btn alt" onclick="logout()">Déconnexion</button>`:`<button class="btn alt" onclick="auth('in')">Connexion</button><button class="btn" onclick="auth('up')">Créer un compte</button>`}</div>`}

function auth(tab,next){clearInterval(tm);const up=tab==="up";
A(`<div class="top"><div><small>QUIZ POKÉMON</small><h1>${up?"CRÉER UN COMPTE":"CONNEXION"}</h1></div></div>
<div class="panel" style="max-width:440px;margin:14px auto"><div class="tabs"><button class="btn ${up?"":"alt"}" onclick="auth('in',${next?`'${next}'`:"undefined"})">Connexion</button><button class="btn ${up?"alt":""}" onclick="auth('up',${next?`'${next}'`:"undefined"})">Inscription</button></div>
${next?`<p class="mut">La Compétition demande un compte pour t’inscrire au classement.</p>`:""}
<input id="au" maxlength="16" placeholder="Pseudo (3 à 16 caractères)" autocomplete="username"><input id="pw" type="password" placeholder="Mot de passe (8 caractères minimum)" autocomplete="${up?"new-password":"current-password"}">
<p class="err" id="err"></p><div class="row" style="margin-top:6px"><button class="btn alt" onclick="${next?"modes()":"home()"}">Retour</button><button class="btn" onclick="sub(${up},${next?`'${next}'`:"undefined"})">${up?"Créer mon compte":"Me connecter"}</button></div></div>`)}

async function sub(up,next){const n=$("#au").value.trim(),p=$("#pw").value;
if(up&&(n.length<3||!/^[\w\- ]+$/.test(n)))return $("#err").textContent="Le pseudo doit faire 3 à 16 caractères : lettres, chiffres, espace, - ou _.";
if(up&&p.length<8)return $("#err").textContent="Le mot de passe doit faire au moins 8 caractères.";
try{await(up?AUTH.signup(n,p):AUTH.login(n,p))}catch(e){return $("#err").textContent=String(e)}
next?setup(next):home()}

function home(){clearInterval(tm);const u=U.cur(),nq=E.reduce((a,x)=>a+x.q.length,0);
A(`<div class="top"><div><small>QUIZ POKÉMON</small><h1>ACCUEIL</h1></div>${navHtml()}</div>
<div class="hero"><h2>Es-tu un vrai maître Pokémon ?</h2><p>Jeux, anime, cartes, produits dérivés : relève 8 épreuves variées, gagne des points et grimpe au classement.</p>
<div class="row"><button class="btn" onclick="modes()">Jouer maintenant</button>${u?"":`<button class="btn alt" onclick="auth('up')">Créer un compte</button>`}</div>
<div class="stats"><div><b>${E.length}</b><small>épreuves</small></div><div><b>${nq}</b><small>questions</small></div><div><b>3</b><small>modes de jeu</small></div></div></div>
<h3 class="sec">Trois façons de jouer</h3><div class="modes">
<div class="mode">🎯<h2>Libre</h2>Choisis tes épreuves, joue sans limite et bats ton record personnel.</div>
<div class="mode">⚔️<h2>Versus</h2>Jusqu’à 4 joueurs sur le même écran, mêmes questions, un seul gagnant.</div>
<div class="mode">🏆<h2>Compétition</h2>${MAXE} épreuves, ton score entre dans le classement du site.</div></div>
<h3 class="sec">Des épreuves pour tous les goûts</h3><div class="panel"><div class="grid">${E.map(x=>`<div class="tile mini" style="--c:${x.c}"><span>${x.e}</span>${x.n.toUpperCase()}</div>`).join("")}</div></div>
<h3 class="sec">Un bonus par épreuve</h3><div class="panel"><table>${E.map(x=>`<tr><td>${x.e}</td><td>${h(x.n)}</td><td>${h(x.bn[0])}</td><td>${h(x.bn[1])}</td></tr>`).join("")}</table></div>
<h3 class="sec">Pourquoi créer un compte ?</h3><div class="panel"><table><tr><td>🏆</td><td>Accéder à la Compétition et apparaître dans le classement</td></tr><tr><td>💾</td><td>Garder ton record personnel du mode Libre</td></tr><tr><td>👤</td><td>Jouer sous ton pseudo à chaque visite</td></tr></table>${u?"":`<div class="row"><button class="btn" onclick="auth('up')">Créer mon compte</button></div>`}</div>`)}

home();
