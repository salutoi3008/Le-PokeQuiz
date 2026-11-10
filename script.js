// ==========================================================================
// QUIZ POKÉMON — script.js : TOUT LE FONCTIONNEMENT DU JEU
// ==========================================================================
// Organisation du fichier (de haut en bas) :
//  1. E      : la liste des 8 épreuves (nom, points, bonus, questions).
//  2. Outils : petites fonctions utiles (norm, h, sh, ls, srv…).
//  3. Données du Duel de Types : quel Pokémon possède quel type.
//  4. Écrans : accueil, modes, choix des épreuves, questions, résultats.
//  5. Comptes : inscription / connexion (gérées par le serveur).
//  6. Dernière ligne : home() affiche la page d’accueil au chargement.
//
// Fonctionnement : il n’y a qu’UNE seule div (#app) dans index.html. Chaque
// écran est une fonction qui REMPLACE tout son contenu avec A(`<html>`).
// L’état de la partie est gardé dans la variable S (voir « let S,tm » plus bas).
//
// Pour AJOUTER UNE QUESTION à Anime Attitude ou Game Master : ajoute une ligne
// ["Question ?","Bonne réponse","Variante acceptée"] dans le tableau q: de l’épreuve.
// Pour CRÉER UNE NOUVELLE ÉPREUVE : ajoute un objet dans E (voir ci-dessous),
// puis, si elle n’est pas un simple « question → réponse tapée », écris ses
// fonctions ask…/resp… (voir askD/respD pour l’exemple du Duel de Types) et
// ajoute un « if » dans pick() et useB().
// Les fichiers donnees/pokedex.js (ARCH), donnees/echo.js (ECHO) donnees/dresseurs.js (DRESSEURS) donnees/champions.js (CHAMPIONS) et donnees/lignees.js (LIGNEES) sont chargés avant celui-ci.
// ==========================================================================
/* ===== ÉPREUVES (cahier des charges). ok:false = pas encore jouable. q: [question, bonne réponse, autres réponses acceptées…] ===== */
// Chaque épreuve est un objet avec ces champs :
//   n   : nom affiché            d : phrase d’explication      e : emoji      c : couleur de la tuile
//   max : points maximum (badge de la tuile)   pts : points par bonne réponse
//   nq  : nombre de questions posées à chaque partie
//   bn  : [nom du bonus, description]  (le bonus de CETTE épreuve, 1 fois par épreuve)
//   ok  : true = jouable, false = tuile grisée « BIENTÔT »
//   q   : liste des questions [question, bonne réponse, variantes acceptées…]
// Champs spéciaux : duel:1 (+ mal = points perdus, man = nombre de manches) pour le
// Duel de Types ; arch:1 pour les Archives du Pokédex (questions chargées depuis ARCH).
const E=[
// Épreuve 1 : echo:1 = règles spéciales (askE/respE). man = 4 manches ; pm = points de chaque manche ;
// nc = nombre de propositions par manche (0 = le joueur tape le nom) ; pc = points de la manche 4 avec Clairvoyance.
{n:"Écho Sauvage",d:"Retrouve le Pokémon grâce à son cri",e:"🔊",c:"#3d6fd0",max:15,bn:["Clairvoyance","Affiche le type (manche 4)"],ok:false,echo:1,man:4,pm:[2,3,4,6],nc:[3,4,4,0],pc:3,q:[]},
// Épreuve 2 : q reste vide ici, il est rempli plus bas à partir de donnees/pokedex.js (ARCH).
{n:"Les Archives du Pokédex",d:"Retrouve le Pokémon grâce à sa description",e:"📖",c:"#2fa36b",max:9,pts:3,nq:3,arch:1,bn:["Échange Psy","Change la description"],ok:false,q:[]},
{n:"Carte au Trésor",d:"Retrouve le jeu d’où provient le lieu",e:"📍",c:"#2a9bb0",max:6,bn:["Téléport","Change le lieu"],ok:false,q:[]},
// Épreuve 4 : 5 questions tirées au hasard dans cette liste. Format : [question, bonne réponse, variantes…]. Les accents/majuscules sont ignorés.
{n:"Anime Attitude",d:"Questions sur l’anime Pokémon",e:"📺",c:"#c04aa0",max:10,pts:2,nq:5,bn:["Jackpot","Donne la réponse, sans point"],ok:true,q:[
["Quel est le Pokémon de départ de Sacha dans la série ?", "Pikachu"],
["Comment s’appelle le village natal de Sacha ?", "Bourg Palette", "Bourg-Palette"],
["Comment s’appelle le professeur Pokémon de Bourg Palette ?", "Chen", "Professeur Chen"],
["Quel Pokémon de la Team Rocket parle comme un humain ?", "Miaouss"],
["Quel champion d’arène d’Argenta voyage avec Sacha au début ?", "Pierre"],
["Quel Pokémon créé génétiquement est l’adversaire du premier film ?", "Mewtwo"],
["Quel starter accompagne Liko dans Pokémon Horizons ?", "Poussacha"],
["Quel est le premier Pokémon capturé par Sacha dans la série ?", "Chenipan"],
["Comment s’appelle le rival de Sacha, petit-fils du professeur Chen ?", "Régis", "Regis"],
["Quelle championne de l’arène d’Azuria voyage avec Sacha au début ?", "Ondine"],
["Qui est le chef de la Team Rocket ?", "Giovanni"],
["Quel est le Pokémon serpent de Jessie ?", "Abo"],
["Quel Pokémon de James évolue en Smogogo ?", "Smogo"],
["Dans quelle région se déroule la saison Noir et Blanc de l’anime ?", "Unys"],
["Comment s’appelle la compagne de voyage de Sacha dans la saison Pokémon XY qui rêve de devenir Reine ?", "Serena"],
["Comment s’appelle le compagnon de voyage de Sacha dans la série Les Voyages ?", "Goh"],
["Quel Pokémon légendaire est au cœur du deuxième film Pokémon, Le Pouvoir est en toi ?", "Lugia"],
["Quel acteur prête sa voix à Pikachu dans le film Détective Pikachu (version originale) ?", "Ryan Reynolds", "Reynolds"],
["Quel champion de Galar Sacha affronte-t-il en finale pour devenir champion du monde ?", "Tarak", "Léon", "Leon"]]},
// Épreuve 5 : même fonctionnement qu’Anime Attitude (autre liste de questions).
{n:"Game Master",d:"Questions sur les jeux et les spin-off",e:"🎮",c:"#d04a4a",max:10,pts:2,nq:5,bn:["Jackpot","Donne la réponse, sans point"],ok:true,q:[
["Dans quelle région se passent Pokémon Rouge et Bleu ?", "Kanto"],
["Quel jeu permet de capturer des Pokémon en réalité augmentée ?", "Pokémon GO", "GO"],
["Sur quelle console est sorti Pokémon Colosseum ?", "GameCube", "Game Cube"],
["Sur quelle console est sorti Pokémon Stadium en 1999 ?", "Nintendo 64", "N64"],
["Sur quelle console est sorti PokéPark ?", "Wii"],
["Dans quelle région se passent Épée et Bouclier ?", "Galar"],
["Dans quelle région se passent Écarlate et Violet ?", "Paldea"],
["Dans quelle région se passent Or et Argent ?", "Johto"],
["Dans quelle région se passent Rubis et Saphir ?", "Hoenn"],
["Dans quelle région se passent Diamant et Perle ?", "Sinnoh"],
["Dans quelle région se passent Noir et Blanc ?", "Unys"],
["Dans quelle région se passent X et Y ?", "Kalos"],
["Dans quelle région se passent Soleil et Lune ?", "Alola"],
["Dans quelle région ancienne se passe Légendes Pokémon : Arceus ?", "Hisui"],
["Quel studio développe les jeux principaux Pokémon ?", "Game Freak", "GameFreak"],
["Quel Pokémon légendaire figure sur la jaquette de Pokémon Argent ?", "Lugia"],
["Quel Pokémon légendaire figure sur la jaquette de Pokémon Rubis ?", "Groudon"],
["Quel Pokémon légendaire figure sur la jaquette de Pokémon Épée ?", "Zacian"],
["Quel Pokémon légendaire figure sur la jaquette de Pokémon Écarlate ?", "Koraidon"],
["Sur quelle console sont sortis Pokémon Rubis et Saphir ?", "Game Boy Advance", "GBA"],
["Sur quelle console sont sortis Pokémon Diamant et Perle ?", "Nintendo DS", "DS"],
["Dans quel jeu Nintendo 64 photographie-t-on des Pokémon ?", "Pokémon Snap", "Snap"],
["Quel Pokémon suit le joueur en permanence dans Pokémon Jaune ?", "Pikachu"],
["Quels jeux Switch, avec Pikachu ou Évoli, reprennent Pokémon Rouge et Bleu ?", "Let’s Go", "Lets Go", "Pokémon Let’s Go"],
["Comment s’appelle l’application mobile de cartes à collectionner lancée fin 2024 ?", "Pokémon TCG Pocket", "TCG Pocket", "Pocket", "JCC Pocket"]]},
{n:"Légendes Sonores",d:"Retrouve le Légendaire grâce à son thème musical",e:"🎵",c:"#d0a82b",max:15,bn:["Clairvoyance","Affiche le ou les types"],ok:false,q:[]},
// Épreuve 7 : duel:1 = règles spéciales (askD/respD). 4 manches, +5 si juste (pts), −3 si faux (mal).
{n:"Duel de Types",d:"Donne un Pokémon qui a le type affiché",e:"🔥",c:"#d0662b",max:20,bn:["Multi-Type","Change le double type"],ok:true,duel:1,pts:5,mal:3,man:4,q:[]},
// Épreuve 8 : trainer:1 = règles spéciales (askT/respT). nb = Pokémon obligatoires (pm pts chacun) ; nbo = Pokémon bonus (pb pt chacun) ;
// tt = temps total en secondes pour toute l’épreuve ; nbmin = nombre minimum de lignées d’évolution qu’un dresseur doit avoir pour pouvoir être tiré. Le dresseur et ses équipes viennent de donnees/dresseurs.js (variable DRESSEURS).
{n:"Défis du Dresseur",d:"Donne 3 Pokémon de lignées différentes du dresseur affiché",e:"🧢",c:"#7b4fd0",max:16,bn:["Détection","Donne un Pokémon, sans point"],ok:false,trainer:1,nb:3,nbo:10,pm:2,pb:1,tt:120,nbmin:3,q:[]}
];
/* Archives du Pokédex : les descriptions viennent du fichier donnees/pokedex.js (l’épreuve reste « bientôt » si ce fichier est absent). */
// Archives du Pokédex : on remplit l’épreuve avec les descriptions de ARCH.
// ARCH = [[nom, génération, [description1, description2]], …]
//   - GEN[nom]  : sert au badge « Génération ? » (nom → numéro de génération)
//   - x.q       : liste de questions [description, nom] (même format que les autres épreuves)
// Si donnees/pokedex.js est absent, ARCH n’existe pas : l’épreuve reste grisée.
const GEN={};
// Écho Sauvage : jouable seulement si donnees/echo.js est chargé (il crée la variable ECHO).
if(typeof ECHO!=="undefined")E.find(e=>e.echo).ok=true;
// Défis du Dresseur : jouable seulement si donnees/dresseurs.js est chargé (il crée la variable DRESSEURS).
// Les Champions d’arène (donnees/champions.js, variable CHAMPIONS) sont ajoutés à la liste des dresseurs.
if(typeof DRESSEURS!=="undefined"){if(typeof CHAMPIONS!=="undefined")DRESSEURS.push(...CHAMPIONS);E.find(e=>e.trainer).ok=true}
if(typeof ARCH!=="undefined"){const x=E.find(e=>e.arch);x.q=ARCH.flatMap(([n,g,ds])=>{GEN[n]=g;return ds.map(d=>[d,n])});x.ok=true}
// BI : emoji de chaque bonus d’épreuve (affiché dans le bouton de bonus).
const BI={"Clairvoyance":"🔮","Échange Psy":"🔄","Téléport":"🌀","Jackpot":"🎰","Multi-Type":"🌈","Détection":"🔍"};
// SB : les 2 bonus communs choisis avant une épreuve : [clé, emoji, nom, description]. g = Gonflette (×2), m = Métronome (épreuve au hasard).
const SB=[["g","💪","Gonflette","Double les points de la prochaine épreuve que tu choisis"],["m","⏱️","Métronome","Choisit une épreuve au hasard à ta place"]];
// RESTE() : numéros des épreuves jouables et pas encore jouées (sert au Métronome).
const RESTE=()=>E.map((x,i)=>i).filter(i=>E[i].ok&&!S.played.includes(i));
// MAXE : nombre d’épreuves jouables (fin de partie en Compétition). TIME : secondes par question.
const MAXE=E.filter(x=>x.ok).length,TIME=30;
// norm(texte) : met en minuscules, enlève accents et signes. Sert à comparer une réponse tapée (« Régis » = « regis »).
const norm=s=>String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]/g,"");
// $(sélecteur) : raccourci pour document.querySelector.  h(texte) : neutralise < > & " pour qu’un texte ne casse pas la page (sécurité).
const $=s=>document.querySelector(s),h=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
// sh(tableau) : renvoie une copie MÉLANGÉE du tableau (algorithme de Fisher-Yates).
const sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
/* ===== DUEL DE TYPES : base (type ou double type → Pokémon, formes comprises, noms français). Source : PokéAPI. ===== */
/*DUEL-START*/
// Base du Duel de Types. Clé = type ou double type (« Feu/Dragon »), valeur = noms de
// Pokémon séparés par « | ». Un nom apparaît dans TOUTES les combinaisons où il existe une
// forme du Pokémon (formes Méga, d’Alola, de Galar… comprises).
// Origine : fichiers CSV du dépôt GitHub PokeAPI/pokeapi (data/v2/csv : pokemon, pokemon_types,
// pokemon_species_names en français), regroupés par combinaison de types par un petit script.
// Arceus et Silvallié sont ajoutés à chaque type simple (ils changent de type).
const TYPES_D={"Poison/Plante":"Boustiflor|Bulbizarre|Chétiflor|Empiflor|Florizarre|Gaulet|Herbizarre|Mystherbe|Méga-Empiflor|Méga-Florizarre|Ortide|Rafflesia|Roserade|Rosélia|Rozbouton|Trompignon",
"Feu":"Aflamanoir|Arcanin|Arceus|Caninos|Charbambin|Chartor|Chochodile|Crocogril|Darumacho|Darumarond|Entei|Feunard|Feunnec|Feurisson|Flamajou|Flambino|Flamiaou|Flamoutan|Galopa|Goupix|Gruikui|Héricendre|Lapyro|Limagma|Maganon|Magby|Magmar|Matoufeu|Morphéo|Ouisticram|Ponyta|Poussifeu|Pyrobut|Pyroli|Reptincel|Roussil|Salamèche|Silvallié|Typhlosion",
"Vol/Feu":"Braisillon|Dracaufeu|Flambusard|Ho-Oh|Méga-Dracaufeu Y|Plumeline|Sulfura",
"Eau":"Akwakwak|Aligatueur|Aquali|Arceus|Arrozard|Bargantua|Barpau|Canarbello|Carabaffe|Carapuce|Clamiral|Coiffeton|Concombaffe|Coquiperl|Crocrodil|Croâporal|Dofin|Embrochet|Flingouste|Flotajou|Flotoutan|Froussardine|Gamblast|Gobou|Grenousse|Hastacuda|Hypocéan|Hypotrempe|Kaiminus|Khélocrok|Kokiyas|Krabboss|Krabby|Kyogre|Larméléon|Lovdisc|Luminéon|Lézargus|Magicarpe|Mamanbo|Manaphy|Mateloutre|Milobellus|Morphéo|Moustillon|Mustébouée|Mustéflott|Méga-Tortank|Octillery|Otaquin|Otaria|Otarlette|Oyacata|Phione|Poissirène|Poissoroy|Primo-Kyogre|Prinplouf|Psykokwak|Ptitard|Rosabyss|Rémoraid|Sancoki|Serpang|Silvallié|Stari|Suicune|Superdofin|Tarpaud|Taupikeau|Tiplouf|Tortank|Triopikeau|Tritonde|Têtarte|Wailmer|Wailord|Écayon|Écrapince",
"Insecte":"Arceus|Armulys|Blindalys|Carabing|Chenipan|Chenipotte|Cheniti|Chrysacier|Crikzik|Escargaume|Filentrappe|Larvadar|Larvibule|Lilliterelle|Limaspeed|Lumivole|Léboulérou|Lépidonille|Muciole|Mélokrik|Pomdepik|Pérégrain|Scarabrute|Silvallié|Tissenboule",
"Vol/Insecte":"Apireine|Apitrini|Charmillon|Coxy|Coxyclaque|Insécateur|Maskadra|Méga-Scarabrute|Ninjask|Papilord|Papilusion|Prismillon|Scarabrute|Yanma|Yanmega",
"Poison/Insecte":"Aspicot|Aéromite|Brutapode|Coconfort|Dardargnan|Migalos|Mimigal|Mimitoss|Méga-Brutapode|Méga-Dardargnan|Papinox|Rapion|Scobolide|Venipatte",
"Normal/Vol":"Bazoucan|Canarticho|Colombeau|Dodrio|Doduo|Déflaisan|Furaiglon|Gueriaigle|Hoothoot|Hélédelle|Méga-Roucarnage|Nirondelle|Noarfang|Passerouge|Piafabec|Picassaut|Piclairon|Pijako|Poichigeon|Rapasdepic|Roucarnage|Roucool|Roucoups|Tapatoès|Tylton|Étouraptor|Étourmi|Étourvol",
"Normal":"Arceus|Argouste|Brouhabam|Capidextre|Capumain|Cerfrousse|Chaffreux|Chaglam|Chinchidou|Chuchmur|Compagnol|Couafarel|Coudlangue|Delcatty|Deusolourdo|Dodoala|Excelangue|Famignol|Fouinar|Fouinette|Fragroin|Frison|Goinfrex|Gourmelet|Insolourdo|Kangourex|Kecleon|Keunotor|Laporeille|Leuphorie|Leveinard|Linéon|Lockpin|Manglouton|Mangriff|Mastouffe|Miaouss|Miradar|Monaflèmit|Morphéo|Moumouflon|Moumouton|Méga-Kangourex|Métamorph|Nanméouïe|Parecool|Pashmilla|Persian|Ponchien|Ponchiot|Porygon|Porygon-Z|Porygon2|Ptiravi|Queulorior|Ramboum|Ratentif|Rattata|Rattatac|Regigigas|Ronflex|Rongourmand|Rongrigou|Sapereau|Silvallié|Skitty|Spinda|Tauros|Teddiursa|Terapagos|Type:0|Ursaring|Vigoroth|Zigzaton|Écrémeuh|Évoli",
"Poison":"Abo|Arbok|Arceus|Avaltout|Gloupti|Grotadmorv|Miamiasme|Miasmax|Nidoran♀|Nidoran♂|Nidorina|Nidorino|Silvallié|Smogo|Smogogo|Séviper|Tadmorv|Vémini",
"Électrik":"Ampibidou|Anchwatt|Arceus|Câblifère|Dynavolt|Fulgudog|Lainergie|Lampéroie|Lixy|Luxio|Luxray|Méga-Ohmassacre|Méga-Raichu X|Méga-Raichu Y|Méga-Zeraora|Méga-Élecsprint|Négapi|Ohmassacre|Pachirisu|Pharamp|Pichu|Pikachu|Pohm|Posipi|Raichu|Raikou|Regieleki|Silvallié|Têtampoule|Voltali|Voltorbe|Voltoutou|Wattapik|Wattouat|Zeraora|Zébibron|Zéblitz|Élecsprint|Électrode|Élekable|Élekid|Élektek",
"Sol":"Arceus|Bourrinos|Donphan|Dunaconda|Dunaja|Groudon|Hippodocus|Hippopotas|Kraknoix|Ossatueur|Osselait|Phanpy|Rototaupe|Sabelette|Sablaireau|Silvallié|Taupiqueur|Tiboudet|Triopikeur",
"Poison/Sol":"Axoloto|Axoloto de Paldea|Nidoking|Nidoqueen|Terraiste",
"Fée":"Arceus|Briochien|Charmilly|Cocotine|Crèmy|Cupcanaille|Flabébé|Floette|Florges|Fluvetin|Granbull|Guérilande|Méga-Floette|Mélo|Mélodelfe|Mélofée|Nymphali|Pâtachiot|Silvallié|Snubbull|Sucroquin|Togepi|Xerneas|Zacian",
"Normal/Fée":"Azurill|Grodoudou|Méga-Nanméouïe|Nanméouïe|Rondoudou|Toudoudou",
"Vol/Poison":"Nosferalto|Nosferapti|Nostenfer",
"Insecte/Plante":"Cheniselle|Couverdure|Larveyette|Manternel|Paras|Parasect",
"Combat":"Arceus|Bétochef|Canarticho|Canarticho de Galar|Charpenti|Colossinge|Crabagarre|Debugant|Férosinge|Hariyama|Hexadron|Judokrak|Kapoera|Karaclée|Kicklee|Krakos|Kungfouine|Machoc|Machopeur|Mackogneur|Makuhita|Méga-Hexadron|Ouvrifier|Palarticho|Pandespiègle|Poulpaf|Quartermac|Riolu|Shaofouine|Silvallié|Tauros|Tauros de Paldea|Tygnon|Wushours|Zamazenta",
"Combat/Eau":"Keldeo|Palmaval|Shifours|Tartard|Tauros|Tauros de Paldea",
"Psy":"Abra|Alakazam|Arceus|Bibichut|Chapotus|Cléopsytra|Cosmog|Cosmovum|Cresselia|Créfadet|Créfollet|Créhelf|Deoxys|Flotillon|Groret|Hypnomade|Kadabra|Korillon|Lewsor|Mentali|Mesmérella|Mew|Mewtwo|Mistigrix|Munna|Mushana|Méga-Alakazam|Méga-Mewtwo Y|Méga-Mistigrix|Méios|Necrozma|Neitram|Nucléos|Okéoké|Ponyta|Ponyta de Galar|Psystigri|Qulbutoké|Ramoloss|Ramoloss de Galar|Scrutella|Sidérella|Silvallié|Soporifik|Spoink|Symbios|Zarbi|Éoko",
"Poison/Eau":"Prédastérie|Qwilfish|Tentacool|Tentacruel|Venalgue|Vorastérie",
"Sol/Roche":"Embrylex|Gravalanch|Grolem|Onix|Racaillou|Rhinastoc|Rhinocorne|Rhinoféros|Ymphect",
"Eau/Psy":"Denticrisse|Délestin|Flagadoss|Méga-Flagadoss|Méga-Staross|Ramoloss|Roigada|Staross",
"Acier/Électrik":"Magnéti|Magnéton|Magnézone|Togedemaru",
"Eau/Glace":"Crustabri|Hotte-de-Fer|Hydragla|Kaimorse|Lamantine|Lokhlass|Obalie|Phogleur",
"Poison/Spectre":"Ectoplasma|Fantominus|Méga-Ectoplasma|Pêchaminus|Spectrum",
"Plante/Psy":"Celebi|Noadkoko|Noeunoeuf|Sylveroy|Vert-de-Fer",
"Plante":"Arceus|Arcko|Badabouin|Balignon|Blancoton|Boguérisse|Boskara|Bouldeneu|Cabriolaine|Cacnea|Candine|Ceribou|Ceriflor|Chevroum|Chlorobule|Croquine|Feuillajou|Feuiloutan|Floramantis|Fragilady|Germignon|Gorythmic|Grainipiot|Héliatronc|Joliflor|Jungko|Lianaja|Macronium|Majaspic|Maracachi|Marisson|Massko|Matourgeon|Mimantis|Méganium|Ogerpon|Ouistempo|Phyllali|Pimito|Poussacha|Saquedeneu|Shaymin|Silvallié|Sucreine|Tortipouss|Tournegrin|Tournicoton|Vipélierre|Vortente",
"Psy/Fée":"Galopa|Galopa de Galar|Gardevoir|Hurle-Queue|Kirlia|M. Mime|Mime Jr.|Méga-Gardevoir|Sorcilence|Tarsal|Tokopiyon",
"Psy/Glace":"Lippouti|Lippoutou|M. Glaquette|M. Mime|M. Mime de Galar|Sylveroy",
"Vol/Eau":"Babimanta|Bekipan|Couaneton|Démanta|Goélise|Lakmécygne|Léviator|Nigosier",
"Roche/Eau":"Amonistar|Amonita|Carapagos|Corayon|Golgopathe|Kabuto|Kabutops|Mégapagos|Opermine|Relicanth|Torgamord",
"Vol/Roche":"Arkéapti|Aéroptéryx|Méga-Ptéra|Météno|Ptéra",
"Vol/Glace":"Artikodin|Cadoizo",
"Vol/Électrik":"Emolga|Fulgulairo|Fulguris|Motisma|Plumeline|Zapétrel|Électhor",
"Dragon":"Arceus|Bébécaille|Carchacrok|Colimucus|Coupenotte|Draby|Drackhaus|Draco|Drakkarmin|Incisache|Minidraco|Mucuscule|Muplodocus|Méga-Carchacrok Z|Regidrago|Silvallié|Tranchodon",
"Vol/Dragon":"Altaria|Bruyverne|Dracolosse|Drattak|Méga-Dracolosse|Méga-Drattak|Méga-Rayquaza|Rayquaza|Sonistrelle",
"Eau/Électrik":"Lanturn|Loupio|Motisma",
"Vol/Fée":"Amovénus|Méga-Mélodelfe|Mélodelfe|Togekiss|Togetic",
"Vol/Psy":"Artikodin|Artikodin de Galar|Chovsourir|Cryptéro|Gueriaigle|Gueriaigle de Hisui|Lugia|Natu|Plumeline|Rhinolove|Xatu",
"Eau/Fée":"Azumarill|Marill|Oratoria|Tokopisco",
"Roche":"Amassel|Arceus|Charbi|Charkos|Craparoi|Dolman|Gigalithe|Gigansel|Géolithe|Kranidos|Lougaroc|Manzaï|Nodulithe|Regirock|Rocabot|Selutin|Silvallié|Simularbre|Tarinor",
"Vol/Plante":"Brindibou|Cotovol|Efflèche|Floravol|Granivol|Shaymin|Tropius",
"Sol/Eau":"Axoloto|Barbicha|Barloche|Batracné|Crapustule|Flobio|Laggron|Maraiste|Méga-Laggron|Tritosor",
"Ténèbres":"Absol|Arceus|Chacripan|Darkrai|Dogrino|Goupilou|Grahyèna|Grondogue|Léopardus|Medhyèna|Miaouss|Miaouss d'Alola|Méga-Absol|Méga-Darkrai|Noctali|Persian|Persian d'Alola|Roublenard|Silvallié|Zoroark|Zorua",
"Vol/Ténèbres":"Corboss|Cornèbre|Lestombaile|Sulfura|Sulfura de Galar|Têtes-de-Fer|Vaututrice|Vostourno|Yveltal",
"Spectre":"Arceus|Branette|Corayon|Corayon de Galar|Corayôme|Feuforêve|Magirêve|Mordudor|Méga-Branette|Noctunoir|Polichombr|Polthégeist|Silvallié|Skelénox|Spectreval|Théffroi|Tomberro|Toutombe|Tutafeh|Tutankafer|Téraclope",
"Normal/Psy":"Cerbyllin|Farigiraf|Girafarig|Gouroutan|Meloetta|Wimessir",
"Insecte/Acier":"Cheniselle|Cizayox|Fermite|Foretress|Genesect|Lançargot|Méga-Cizayox|Méga-Sarmuraï|Sarmuraï",
"Vol/Sol":"Démétéros|Scorplane|Scorvol",
"Sol/Acier":"Limonde|Limonde de Galar|Minotaupe|Méga-Minotaupe|Méga-Steelix|Roue-de-Fer|Steelix|Taupiqueur|Taupiqueur d'Alola|Triopikeur|Triopikeur d'Alola",
"Roche/Insecte":"Anorith|Armaldo|Caratroc|Crabaraque|Crabicoque|Hachécateur",
"Combat/Insecte":"Cancrelove|Mouscoto|Méga-Scarhino|Rampe-Ailes|Scarhino",
"Glace/Ténèbres":"Baojian|Dimoret|Farfuret",
"Roche/Feu":"Arcanin|Arcanin de Hisui|Caninos|Caninos de Hisui|Monthracite|Volcaropod|Wagomine",
"Sol/Glace":"Cochignon|Mammochon|Marcacrin",
"Vol/Acier":"Airmure|Bamboiselle|Corvaillus|Méga-Airmure",
"Feu/Ténèbres":"Démolosse|Félinferno|Malosse|Méga-Démolosse|Yuyu",
"Eau/Dragon":"Aligatueur|Hydragon|Hyporoi|Méga-Aligatueur|Nigirigon|Palkia|Serpente-Eau",
"Roche/Ténèbres":"Méga-Tyranocif|Tyranocif",
"Combat/Feu":"Braségali|Chimpenfeu|Galifeu|Grotichon|Méga-Braségali|Méga-Roitiflam|Roitiflam|Simiabraz|Tauros|Tauros de Paldea",
"Eau/Plante":"Lombre|Ludicolo|Nénupiot|Ogerpon",
"Plante/Ténèbres":"Cacturne|Chongjian|Fongus-Furie|Miascarade|Pifeuil|Tengalice|Zarude",
"Insecte/Eau":"Arakdo|Araqua|Sarmuraï|Sovkipou|Tarenbulle",
"Combat/Plante":"Archéduc|Archéduc de Hisui|Blindépique|Chapignon|Fragilady|Fragilady de Hisui|Méga-Blindépique|Viridium",
"Sol/Insecte":"Cheniselle|Ningale",
"Insecte/Spectre":"Munja",
"Spectre/Ténèbres":"Absol|Méga-Absol Z|Méga-Ténéfix|Spiritomb|Ténéfix",
"Acier/Fée":"Forgelina|Forgella|Forgerette|Magearna|Mysdibule|Méga-Magearna|Méga-Mysdibule|Trousselin|Zacian",
"Roche/Acier":"Ama-Ama|Bastiodon|Dinoclier|Galegon|Galekid|Galeking|Tarinorme",
"Combat/Psy":"Charmina|Gallame|Mewtwo|Méditikka|Méga-Charmina|Méga-Gallame|Méga-Mewtwo X",
"Eau/Ténèbres":"Amphinobi|Carvanha|Clamiral|Clamiral de Hisui|Colhomard|Léviator|Méga-Amphinobi|Méga-Léviator|Méga-Sharpedo|Sharpedo",
"Sol/Feu":"Camérupt|Chamallot|Groudon|Méga-Camérupt|Primo-Groudon",
"Sol/Dragon":"Carchacrok|Carmache|Griknot|Libégon|Méga-Carchacrok|Méga-Zygarde|Vibraninf|Zygarde",
"Roche/Psy":"Roc-de-Fer|Solaroc|Séléroc",
"Sol/Psy":"Balbuto|Kaorine",
"Roche/Plante":"Lilia|Ogerpon|Vacilys",
"Glace":"Arceus|Balbalèze|Bekaglaçon|Blizzeval|Darumacho|Darumacho de Galar|Darumarond|Darumarond de Galar|Givrali|Goupix|Goupix d'Alola|Grelaçon|Hexagel|Morphéo|Méga-Oniglali|Oniglali|Piétacé|Polagriffe|Polarhume|Regice|Silvallié|Sorbouboul|Sorboul|Sorbébé|Stalgamin|Séracrawl",
"Acier/Psy":"Archéodong|Archéomire|Chef-de-Fer|Jirachi|Méga-Métalosse|Méga-Éoko|Métalosse|Métang|Necrozma|Solgaleo|Terhal|Éoko",
"Acier":"Arceus|Berserkatt|Charibari|Clic|Cliticlic|Ferdeter|Galeking|Melmetal|Meltan|Miaouss|Miaouss de Galar|Méga-Galeking|Pachyradjah|Registeel|Silvallié|Tic",
"Psy/Dragon":"Latias|Latios|Méga-Latias|Méga-Latios|Necrozma",
"Sol/Plante":"Terracool|Terracruel|Torterra",
"Acier/Eau":"Pingoléon",
"Normal/Eau":"Castorno",
"Vol/Spectre":"Baudrive|Grodrive|Plumeline",
"Poison/Ténèbres":"Drascore|Grotadmorv|Grotadmorv d'Alola|Moufflair|Moufouette|Qwilfish|Qwilfish de Hisui|Qwilpik|Tadmorv|Tadmorv d'Alola",
"Combat/Acier":"Cobaltium|Lucario|Méga-Lucario|Méga-Lucario Z|Zamazenta",
"Combat/Poison":"Coatox|Cradopaud|Farfuret|Farfuret de Hisui|Farfurex|Félicanis",
"Plante/Glace":"Blizzaroi|Blizzi|Méga-Blizzaroi",
"Spectre/Glace":"Momartik|Méga-Momartik",
"Spectre/Électrik":"Motisma",
"Acier/Dragon":"Colimucus|Colimucus de Hisui|Dialga|Duralugon|Muplodocus|Muplodocus de Hisui|Pondralugon",
"Acier/Feu":"Heatran|Méga-Heatran",
"Spectre/Dragon":"Dispareptil|Fantyrm|Giratina|Lanssorien",
"Feu/Psy":"Carmadura|Darumacho|Goupelin|Méga-Goupelin|Victini",
"Plante/Fée":"Doudouvet|Farfaduvet|Lampignon|Méga-Méganium|Méganium|Spododo|Tokotoro",
"Sol/Ténèbres":"Crocorible|Dinglu|Escroco|Mascaïman",
"Combat/Ténèbres":"Baggaïd|Baggiguane|Méga-Baggaïd|Pandarbare|Shifours",
"Normal/Plante":"Arboliva|Haydaim|Olivado|Olivini|Vivaldaim",
"Spectre/Eau":"Moyade|Paragruel|Viskuse",
"Insecte/Électrik":"Chrysapile|Lucanon|Mygavolt|Statitik",
"Acier/Plante":"Grindur|Katagami|Noacier",
"Spectre/Feu":"Flâmigator|Funécire|Lugulabre|Malvalame|Méga-Lugulabre|Mélancolux|Ossatueur|Ossatueur d'Alola|Pierroteknik|Typhlosion|Typhlosion de Hisui",
"Sol/Électrik":"Limonde|Pelage-Sablé",
"Sol/Spectre":"Bacabouh|Golemastoc|Gringolem|Méga-Golemastoc|Trépassable|Tutafeh|Tutafeh de Galar|Tutétékri",
"Acier/Ténèbres":"Scalpereur|Scalpion|Scalproie",
"Dragon/Ténèbres":"Diamat|Engloutyran|Rugit-Lune|Solochi|Trioxhydre",
"Insecte/Feu":"Grillepattes|Pyrax|Pyronille|Scolocendre",
"Combat/Roche":"Golgopathe|Méga-Golgopathe|Terrakium",
"Vol":"Arceus|Bleuseille|Boréas|Minisange|Silvallié",
"Feu/Dragon":"Boumata|Dracaufeu|Feu-Perçant|Méga-Dracaufeu X|Reshiram",
"Électrik/Dragon":"Galvagon|Ire-Foudre|Miraidon|Méga-Pharamp|Pharamp|Zekrom",
"Glace/Dragon":"Cryodo|Frigodo|Glaivodo|Kyurem|Méga-Glaivodo",
"Normal/Sol":"Excavarenne|Ursaking",
"Normal/Feu":"Hélionceau|Méga-Némélios|Némélios",
"Spectre/Acier":"Dimoclès|Exagide|Gromago|Monorpale",
"Psy/Ténèbres":"Hoopa|Méga-Sepiatroce|Sepiatop|Sepiatroce",
"Poison/Dragon":"Kravarech|Mandrillon|Méga-Kravarech|Éthernatos",
"Normal/Électrik":"Galvaran|Iguolta",
"Roche/Dragon":"Ptyranidur|Rexillius",
"Roche/Glace":"Amagara|Dragmara|Séracrawl|Séracrawl de Hisui",
"Combat/Vol":"Brutalibré|Flamenroule|Méga-Brutalibré|Méga-Étouraptor|Électhor|Électhor de Galar|Étouraptor",
"Électrik/Fée":"Dedenne|Tokorico",
"Roche/Fée":"Diancie|Méga-Diancie|Strassie",
"Spectre/Plante":"Archéduc|Banshitrouye|Brocélôme|Desséliande|Pitrouille|Poltchageist|Sinistrail|Théffroyable|Virevorreur|Virovent",
"Spectre/Psy":"Hoopa|Lunala|Necrozma|Sylveroy",
"Feu/Eau":"Volcanion",
"Combat/Glace":"Crabominable|Méga-Crabominable",
"Insecte/Fée":"Bombydou|Rubombelle",
"Poison/Feu":"Malamandre|Mite-de-Fer|Tritox",
"Normal/Combat":"Chelours|Lockpin|Meloetta|Méga-Lockpin|Nounourson",
"Spectre/Fée":"Flotte-Mèche|Mimiqui",
"Normal/Dragon":"Draïeul|Motorizard|Méga-Draïeul",
"Combat/Dragon":"Koraidon|Écaïd|Ékaïser",
"Poison/Roche":"Floréclat|Germéclat|Méga-Floréclat|Zéroïd",
"Combat/Spectre":"Courrousinge|Marshadow",
"Insecte/Psy":"Astronelle|Bérasca|Coléodôme",
"Plante/Dragon":"Dratatin|Jungko|Méga-Jungko|Noadkoko|Noadkoko d'Alola|Pomdorochi|Pomdramour|Pomdrapi|Verpom",
"Poison/Électrik":"Salarsen|Toxizap",
"Ténèbres/Fée":"Angoliath|Fourbelin|Grimalin",
"Normal/Ténèbres":"Ixon|Linéon|Linéon de Galar|Rattata|Rattata d'Alola|Rattatac|Rattatac d'Alola|Zigzaton|Zigzaton de Galar",
"Insecte/Glace":"Beldeneige|Frissonille",
"Électrik/Ténèbres":"Morpeko",
"Électrik/Glace":"Galvagla|Motisma",
"Insecte/Ténèbres":"Gambex",
"Combat/Électrik":"Paume-de-Fer|Pohmarmotte|Pohmotte",
"Normal/Poison":"Gribouraigne|Tag-Tag",
"Feu/Plante":"Méga-Scovilain|Ogerpon|Scovilain",
"Poison/Acier":"Vrombi|Vrombotor",
"Combat/Sol":"Fort-Ivoire",
"Roche/Électrik":"Gravalanch|Gravalanch d'Alola|Grolem|Grolem d'Alola|Racaillou|Racaillou d'Alola|Épine-de-Fer",
"Combat/Fée":"Garde-de-Fer",
"Poison/Psy":"Flagadoss|Flagadoss de Galar|Fortusimia|Roigada|Roigada de Galar",
"Poison/Fée":"Favianos|Smogogo|Smogogo de Galar",
"Feu/Électrik":"Motisma",
"Plante/Électrik":"Motisma|Voltorbe|Voltorbe de Hisui|Électrode|Électrode de Hisui",
"Dragon/Fée":"Altaria|Méga-Altaria",
"Électrik/Psy":"Raichu|Raichu d'Alola",
"Acier/Glace":"Sabelette|Sabelette d'Alola|Sablaireau|Sablaireau d'Alola",
"Glace/Fée":"Feunard|Feunard d'Alola",
"Feu/Glace":"Darumacho|Darumacho de Galar",
"Normal/Spectre":"Zoroark|Zoroark de Hisui|Zorua|Zorua de Hisui"};
// TY : couleur de chaque type (pastille du Duel de Types).  TYL : liste des 18 noms de types.
const TY={"Normal":"#a8a878","Combat":"#c03028","Vol":"#a890f0","Poison":"#a040a0","Sol":"#c9a84a","Roche":"#b8a038","Insecte":"#a8b820","Spectre":"#705898","Acier":"#9a9ab8","Feu":"#f08030","Eau":"#6890f0","Plante":"#78c850","Électrik":"#e0b800","Psy":"#f85888","Glace":"#7cc8c8","Dragon":"#7038f8","Ténèbres":"#705848","Fée":"#e0829a"};
const TYL=Object.keys(TY);
// TIDX : index construit UNE fois au premier besoin (tidx()) :
//   noms : nom normalisé → liste des combinaisons de types possibles
//   dbl  : toutes les combinaisons à DEUX types qui existent (pour tirer un double type)
let TIDX=null;
function tidx(){if(TIDX)return TIDX;TIDX={noms:new Map(),dbl:[]};
for(const k in TYPES_D){const ts=k.split("/");if(ts.length===2)TIDX.dbl.push(ts);
for(const n of TYPES_D[k].split("|")){const z=norm(n);if(!TIDX.noms.has(z))TIDX.noms.set(z,[]);TIDX.noms.get(z).push(ts)}}
return TIDX}
/* cible = [type] (le Pokémon doit avoir ce type) ou [type1,type2] (il doit avoir exactement ces deux types, dans n’importe quel ordre) */
// duelMatch(types du Pokémon, cible) : vrai si le Pokémon correspond à la cible (voir le commentaire ci-dessus).
const duelMatch=(ts,c)=>c.length===1?ts.includes(c[0]):ts.length===2&&c.every(t=>ts.includes(t));
// duelOk(réponse, cible) : la réponse tapée est-elle un Pokémon qui a le type (ou double type) demandé ?
function duelOk(rep,c){const l=tidx().noms.get(norm(rep));return !!l&&l.some(ts=>duelMatch(ts,c))}
// exemple(cible) : un Pokémon valide au hasard, affiché quand le joueur se trompe.
function exemple(c){const l=[];for(const k in TYPES_D)if(duelMatch(k.split("/"),c))l.push(...TYPES_D[k].split("|").filter(n=>n!=="Arceus"&&n!=="Silvallié"));return l[Math.random()*l.length|0]}
// duelType() : tire une cible au hasard : 1 chance sur 2 un double type existant, sinon un type simple.
function duelType(){if(Math.random()<.5){const d=tidx().dbl;return [...d[Math.random()*d.length|0]]}return [TYL[Math.random()*TYL.length|0]]}
// multiType(cible) : bonus Multi-Type. Renvoie un AUTRE double type qui garde au moins un des types actuels.
function multiType(c){const d=tidx().dbl.filter(ts=>ts.some(t=>c.includes(t))&&!(c.length===2&&c.every(t=>ts.includes(t))));return d.length?[...d[Math.random()*d.length|0]]:c}
/*DUEL-END*/
// ls : lecture/écriture dans le localStorage du navigateur (record, pseudo…) sans jamais planter.
const ls={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
/* Serveur : comptes et classement. Remplacer l’adresse par celle du serveur une fois hébergé en ligne. */
const SERVEUR="https://pokequiz-serveur.onrender.com";
// srv(chemin, données) : appelle le serveur (GET, ou POST si on envoie des données) avec le jeton de connexion. Renvoie la réponse ou lève une erreur lisible.
async function srv(path,body){const k=ls.get("pkq_token",null);let r;try{r=await fetch(SERVEUR+path,{method:body?"POST":"GET",headers:{"Content-Type":"application/json",...(k?{Authorization:"Bearer "+k}:{})},body:body?JSON.stringify(body):undefined})}catch{throw"Serveur injoignable."}const d=await r.json().catch(()=>({}));if(!r.ok)throw d.erreur||"Erreur du serveur.";return d}
// API : envoyer un score (save) et lire le classement (top) du mode Compétition.
const API={async save(n,s){await srv("/scores",{mode:"Compétition",points:s})},async top(){return(await srv("/classement?mode="+encodeURIComponent("Compétition"))).map(r=>({n:r.pseudo,s:r.points}))}};
// S  = l’ÉTAT de la partie en cours. Champs principaux :
//   mode (libre/versus/compet), players (pseudos), sc (scores), pi (joueur actuel),
//   b (bonus restants de chaque joueur), played (épreuves terminées),
//   ei (épreuve en cours), qs (questions de l’épreuve), qi (numéro de question),
//   dbl (Gonflette active), cur (cible du Duel), done / zero / t (état de la question),
//   aud (cri en cours de lecture), half (Clairvoyance utilisée),
//   tr (dresseur affiché), trAll (tous ses Pokémon), found (Pokémon déjà trouvés : {n nom, p points, d donné par Détection, l lignée d’évolution}).
// tm = le minuteur (setInterval) de la question en cours.
let S,tm;
// A(html) : affiche un écran = remplace tout le contenu de #app.
const A=html=>{$("#app").innerHTML=html};

// ÉCRAN « Choisis ton mode » : Libre / Versus / Compétition.
function modes(){clearInterval(tm);const b=ls.get(bestKey(),0);
A(`<div class="top"><div><small>QUIZ POKÉMON</small><h1>CHOISIS TON MODE</h1></div><div class="score" style="margin-left:auto"><small>RECORD</small><b>${b}</b></div></div>
<div class="modes" style="margin-top:14px">
<button class="mode" onclick="setup('libre')">🎯<h2>Libre</h2>Fais les épreuves que tu veux, autant que tu veux, et bats ton record personnel.</button>
<button class="mode" onclick="setup('versus')">⚔️<h2>Versus</h2>2 à 4 joueurs sur le même écran, mêmes épreuves, un seul vainqueur.</button>
<button class="mode" onclick="setup('compet')">🏆<h2>Compétition</h2>${MAXE} épreuves et ta place dans le classement. Compte requis.</button></div>
<div class="row"><button class="btn alt" onclick="home()">Accueil</button><button class="btn alt" onclick="board()">Voir le classement</button></div>`)}

// ÉCRAN du classement général (mode Compétition), lu depuis le serveur.
async function board(){const l=await API.top().catch(()=>[]);
A(`<div class="top"><div><small>COMPÉTITION</small><h1>CLASSEMENT</h1></div></div><div class="panel">${l.length?`<table><tr><th>#</th><th>Joueur</th><th>Points</th></tr>${l.map((r,i)=>`<tr><td>${i+1}</td><td>${h(r.n)}</td><td>${r.s}</td></tr>`).join("")}</table>`:`<p class="c mut">Aucun score pour l’instant. Lance une Compétition pour ouvrir le classement.</p>`}</div><div class="row"><button class="btn" onclick="modes()">Retour</button></div>`)}

// Prépare un mode : Libre et Compétition démarrent tout de suite (Compétition demande d’être connecté) ; Versus affiche la saisie des 2 à 4 pseudos.
function setup(mode){
if(mode==="libre")return begin(mode,["Moi"]);
if(mode==="compet")return U.cur()?begin("compet",[U.cur()]):auth("in","compet");
else A(`<div class="top"><div><small>VERSUS</small><h1>LES JOUEURS</h1></div></div><div class="panel">${[1,2,3,4].map(i=>`<input id="p${i-1}" maxlength="16" placeholder="Joueur ${i}${i>2?" (facultatif)":""}">`).join("")}<div class="row"><button class="btn alt" onclick="modes()">Retour</button><button class="btn" onclick="begin('versus',[0,1,2,3].map(i=>$('#p'+i).value.trim()).filter(Boolean).concat(['Joueur 1','Joueur 2']).slice(0,Math.max(2,[0,1,2,3].filter(i=>$('#p'+i).value.trim()).length)))">Lancer</button></div></div>`)}

// begin(mode, joueurs) : crée l’état S d’une nouvelle partie et affiche le choix des épreuves. b = bonus de chaque joueur (g, m = 1 utilisation).
function begin(mode,players){S={mode,players,sc:players.map(()=>0),b:players.map(()=>({g:1,m:1,e:{}})),played:[],pi:0};hub()}

// topbar(titre) : bandeau du haut (titre, épreuves jouées, score du joueur actuel).
function topbar(title){const mx=S.mode==="libre"?"":`<div class="mid">ÉPREUVES JOUÉES<div class="dots">${Array.from({length:MAXE},(_,i)=>`<i class="${i<S.played.length?"on":""}"></i>`).join("")}</div></div>`;
const sc=S.players.length>1?S.players.map((p,i)=>`${h(p)} : ${S.sc[i]}`).join(" | "):"";
return `<div class="top"><div><small>QUIZ POKÉMON</small><h1>${title}</h1></div>${mx}<div class="score" style="${mx?"":"margin-left:auto"}"><small>SCORE${S.players.length>1?" — "+h(S.players[S.pi]):""}</small><b>${S.sc[S.pi]}</b></div></div>${sc?`<p class="c mut" style="margin-top:8px">${sc}</p>`:""}`}

// bonusBar(actif) : bouton du bonus propre à l’épreuve en cours (grisé s’il est déjà utilisé).
function bonusBar(live){const x=E[S.ei],u=S.b[S.pi].e[S.ei];return `<div class="panel bonus"><button class="bn" ${live&&!u?"":"disabled"} onclick="useB()" title="${h(x.bn[1])}"><span>${BI[x.bn[0]]}</span>${h(x.bn[0])}<br>${h(x.bn[1])}</button></div>`}

// ÉCRAN « Choix de l’épreuve » : grille des épreuves + les 2 bonus communs. Une épreuve jouée ou « bientôt » est grisée.
function hub(){clearInterval(tm);
A(`${topbar("CHOIX DE L’ÉPREUVE")}<div class="panel"><div class="grid">${E.map((x,i)=>`<button class="tile" title="${h(x.d)}" style="--c:${x.c}" ${S.played.includes(i)||!x.ok?"disabled":""} onclick="pick(${i})"><em>${x.max}</em><span>${x.e}</span>${h(x.n.toUpperCase())}${x.ok?"":"<small>BIENTÔT</small>"}</button>`).join("")}</div></div><h3 class="sec">Tes bonus</h3><p class="mut">Chaque bonus s’utilise une fois par partie.</p><div class="panel bonus">${SB.map(([k,i,n,d])=>{const b=S.b[S.pi],on=k==="g"?b.g:b.m&&RESTE().length,st=k==="g"&&b.arm?"activé : prochaine épreuve ×2":b[k]?"disponible":"utilisé";return `<button class="bn info${b[k]?"":" used"}" ${on?"":"disabled"} onclick="${k==="g"?"useGonf()":"useMetro()"}" title="${h(d)}"><span>${i}</span>${n}<br>${h(d)}<br><b>${st}</b></button>`}).join("")}</div>${S.mode==="libre"?`<div class="row"><button class="btn" onclick="finish()">Terminer la partie</button></div>`:""}`)}

// Bonus Gonflette : arme le ×2 pour la PROCHAINE épreuve choisie (b.arm = 1).
function useGonf(){const b=S.b[S.pi];if(!b.g)return;b.g=0;b.arm=1;hub()}

// Bonus Métronome : tire une épreuve au hasard parmi RESTE() et la lance après 1,6 s.
function useMetro(){const b=S.b[S.pi],l=RESTE();if(!b.m||!l.length)return;b.m=0;const i=l[Math.floor(Math.random()*l.length)];
A(`${topbar("MÉTRONOME")}<div class="panel c"><p class="q">⏱️ Métronome choisit une épreuve…</p><p class="q">${E[i].e} ${h(E[i].n)}</p></div>`);setTimeout(()=>pick(i),1600)}

// pick(i) : DÉMARRE l’épreuve numéro i. Prépare les questions (S.qs) puis lance ask() (questions
// classiques) ou askD() (Duel de Types). En Versus, les joueurs suivants reçoivent les mêmes questions.
function pick(i){S.ei=i;S.qi=0;S.got=0;S.dbl=!!S.b[S.pi].arm;S.b[S.pi].arm=0;
/* en Versus, tous les joueurs reçoivent les mêmes questions / les mêmes types */
if(!(S.players.length>1&&S.pi>0&&S.qsEi===i)){S.qs0=E[i].duel?Array.from({length:E[i].man},duelType):E[i].echo?echoManches():E[i].trainer?[tireDresseur(E[i])]:sh(E[i].q).slice(0,E[i].nq);S.qsEi=i}
S.qs=S.qs0;E[i].duel?askD():E[i].echo?askE():E[i].trainer?askT():ask()}

// ask() : affiche UNE question classique (texte, champ de réponse, barre de temps, bonus) et lance le chrono.
function ask(){clearInterval(tm);const x=E[S.ei],q=S.qs[S.qi];S.t=TIME;S.frozen=false;S.done=false;S.zero=false;
A(`${topbar(h(x.n.toUpperCase()))}<div class="panel"><div class="bar"><div id="bar" style="width:100%"></div></div><p class="mut c">${h(x.d)}</p><p class="mut c" id="qn" style="margin-top:8px">Question ${S.qi+1}/${S.qs.length} — ${x.pts} pts${S.dbl?" ×2":""}</p><p class="q" id="qt"${x.arch?' style="font-size:19px"':""}>${h(q[0])}</p>${x.arch?'<div class="c"><button class="btn alt" id="gen" onclick="showGen()">🎓 Génération ?</button></div>':""}<input id="rep" autocomplete="off" placeholder="Ta réponse" onkeydown="if(event.key==='Enter')resp()"><p class="c" id="fb" style="min-height:22px"></p><div class="row"><button class="btn" onclick="resp()">Valider</button></div></div>${bonusBar(true)}`);
$("#rep").focus();
tm=setInterval(()=>{if(S.frozen)return;S.t-=.25;$("#bar").style.width=S.t/TIME*100+"%";if(S.t<=0)resp(true)},250)}

// useB() : le joueur clique sur le bonus de l’épreuve. Chaque épreuve a son effet :
// Duel → multiT() ; Archives → swapQ() ; sinon (Jackpot) : montre la réponse, la question vaut 0 point.
function useB(){if(S.done||S.b[S.pi].e[S.ei])return;S.b[S.pi].e[S.ei]=1;if(E[S.ei].duel)return multiT();if(E[S.ei].arch)return swapQ();if(E[S.ei].echo)return clair();if(E[S.ei].trainer)return detec();S.zero=true;
$("#fb").innerHTML=`Réponse : <b>${h(S.qs[S.qi][1])}</b> (cette question ne rapporte aucun point)`;
document.querySelectorAll(".bn").forEach(b=>b.disabled=true)}

// resp(to) : valide la réponse (to = true si le temps est écoulé). Compare avec norm(), ajoute les points, puis passe à la question suivante ou à endEp().
function resp(to){if(S.done)return;S.done=true;clearInterval(tm);const x=E[S.ei],q=S.qs[S.qi],v=norm($("#rep").value),ok=!to&&v&&q.slice(1).some(a=>norm(a)===v);
$("#rep").disabled=true;document.querySelectorAll(".bn").forEach(b=>b.disabled=true);
const pp=x.pts*(S.dbl?2:1);if(ok&&!S.zero){S.sc[S.pi]+=pp;S.got++}
$("#fb").innerHTML=ok?`<span style="color:var(--ok)">Bonne réponse${S.zero?" (0 point, bonus utilisé)":" ! +"+pp}</span>`:`<span style="color:var(--ko)">${to?"Temps écoulé. ":"Raté. "}Réponse : ${h(q[1])}</span>`;
setTimeout(()=>{if(++S.qi<S.qs.length)ask();else endEp()},1600)}

/* ----- Épreuve Archives du Pokédex : badge génération et bonus Échange Psy ----- */
// showGen() : clic sur le badge : affiche la génération du Pokémon cherché (gratuit).
function showGen(){const b=$("#gen");b.textContent="Génération "+GEN[S.qs[S.qi][1]];b.disabled=true}
// swapQ() : bonus Échange Psy. Remplace la description par une autre (tirée dans toutes les descriptions) et relance le chrono.
function swapQ(){const used=S.qs.map(q=>q[0]),pool=E[S.ei].q.filter(q=>!used.includes(q[0])),n=pool[Math.random()*pool.length|0];
S.qs=[...S.qs];S.qs[S.qi]=n;S.t=TIME;$("#qt").textContent=n[0];const g=$("#gen");g.textContent="🎓 Génération ?";g.disabled=false;$("#fb").innerHTML="";
document.querySelectorAll(".bn").forEach(b=>b.disabled=true)}

// ===================== Épreuve 1 : ÉCHO SAUVAGE =====================
// Déroulement : 4 manches. On écoute le cri d’un Pokémon (réécoute illimitée) :
//   manches 1 à 3 : on choisit parmi 3 puis 4 puis 4 propositions (sprite + nom) ;
//   manche 4      : on tape le nom. Points : 2 / 3 / 4 / 6.
// Bonus Clairvoyance (manche 4 seulement) : affiche le ou les types, mais la manche ne rapporte plus que 3 points.
// Données : ECHO (donnees/echo.js) = [[numéro Pokédex, nom, types], …].

// Adresses du cri audio et du sprite d’un Pokémon, d’après son numéro de Pokédex.
// Pour héberger les fichiers toi-même, change seulement ces deux lignes.
const CRI=id=>`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
const SPR=id=>`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

// echoManches() : prépare les 4 manches de l’épreuve (appelée une seule fois par pick(),
// donc tous les joueurs du Versus entendent les mêmes cris).
// Une manche = { p : le Pokémon à trouver [numéro, nom, types], ch : les propositions mélangées }.
function echoManches(){
  const x=E.find(e=>e.echo),cibles=sh(ECHO).slice(0,x.man);   // 4 Pokémon différents tirés au hasard
  return cibles.map((p,m)=>{
    const n=x.nc[m];                                           // nombre de propositions de cette manche
    if(!n)return {p,ch:[]};                                    // manche 4 : aucune proposition (saisie)
    const autres=sh(ECHO.filter(o=>o[0]!==p[0])).slice(0,n-1); // les mauvaises réponses
    return {p,ch:sh([p,...autres])}                            // bonne réponse + mauvaises, dans le désordre
  })
}

// cri() : joue (ou rejoue) le cri de la manche en cours. Le catch évite une erreur si le navigateur bloque le son.
function cri(){if(S.aud)S.aud.pause();S.aud=new Audio(CRI(S.qs[S.qi].p[0]));S.aud.play().catch(()=>{})}

// askE() : affiche UNE manche (cri, propositions ou champ de saisie, bonus) et lance le chrono.
function askE(){
  clearInterval(tm);if(S.aud)S.aud.pause();
  const x=E[S.ei],m=S.qs[S.qi],last=!m.ch.length;              // last = manche 4 (pas de propositions)
  S.t=TIME;S.frozen=false;S.done=false;S.half=false;           // half = Clairvoyance utilisée
  // zone de réponse : champ de saisie (manche 4) ou boutons avec le sprite de chaque proposition
  const zone=last
    ?`<input id="rep" autocomplete="off" placeholder="Nom du Pokémon" onkeydown="if(event.key==='Enter')respE()"><div class="row"><button class="btn" onclick="respE()">Valider</button></div>`
    :`<div class="opts">${m.ch.map((o,i)=>`<button class="opt" onclick="respE(${i})"><img src="${SPR(o[0])}" alt="" width="72" height="72" style="display:block;margin:0 auto 6px;image-rendering:pixelated">${h(o[1])}</button>`).join("")}</div>`;
  A(`${topbar(h(x.n.toUpperCase()))}<div class="panel"><div class="bar"><div id="bar" style="width:100%"></div></div><p class="mut c">${h(x.d)}</p><p class="mut c" style="margin-top:8px">Manche ${S.qi+1}/${S.qs.length} — <span id="pts">${x.pm[S.qi]*(S.dbl?2:1)}</span> pts${S.dbl?" (×2)":""}</p><div class="c" style="margin:16px 0"><button class="btn" onclick="cri()">🔊 Écouter le cri</button></div><div class="c" id="tp"></div>${zone}<p class="c" id="fb" style="min-height:22px;margin-top:10px"></p></div>${bonusBar(last)}`);
  if(last)$("#rep").focus();
  cri();                                                       // le cri démarre tout seul
  tm=setInterval(()=>{if(S.frozen)return;S.t-=.25;$("#bar").style.width=S.t/TIME*100+"%";if(S.t<=0)respE(undefined,true)},250)
}

// clair() : bonus Clairvoyance (manche 4) → affiche les types du Pokémon et fait passer la manche à pc points.
function clair(){
  S.half=true;
  $("#tp").innerHTML=tpHtml(S.qs[S.qi].p[2].split("/"));
  $("#pts").textContent=E[S.ei].pc*(S.dbl?2:1);
  document.querySelectorAll(".bn").forEach(b=>b.disabled=true)
}

// respE(i, to) : valide la réponse. i = numéro de la proposition cliquée (manches 1 à 3) ;
// sans i = réponse tapée (manche 4) ; to = true si le temps est écoulé.
function respE(i,to){
  if(S.done)return;
  const x=E[S.ei],m=S.qs[S.qi],last=!m.ch.length;
  let ok;
  if(last){const v=$("#rep").value.trim();if(!to&&!v)return;ok=!to&&norm(v)===norm(m.p[1])}   // saisie : on compare sans accents
  else ok=!to&&i!==undefined&&m.ch[i][0]===m.p[0];                                           // proposition : on compare les numéros
  S.done=true;clearInterval(tm);
  const pp=(S.half?x.pc:x.pm[S.qi])*(S.dbl?2:1);                // points de la manche (Clairvoyance et Gonflette comprises)
  if(ok){S.sc[S.pi]+=pp;S.got++}
  // on verrouille l’écran et on colore les propositions (vert = bonne réponse, rouge = mauvais choix)
  document.querySelectorAll(".bn").forEach(b=>b.disabled=true);
  if(last)$("#rep").disabled=true;
  document.querySelectorAll(".opt").forEach((b,k)=>{b.disabled=true;if(m.ch[k][0]===m.p[0])b.classList.add("good");else if(k===i)b.classList.add("bad")});
  // message + sprite du Pokémon : on le montre toujours pour que le joueur apprenne le cri
  $("#fb").innerHTML=(ok?`<span style="color:var(--ok)">Bonne réponse ! +${pp}</span>`:`<span style="color:var(--ko)">${to?"Temps écoulé. ":"Raté. "}Réponse : ${h(m.p[1])}</span>`)+`<br><img src="${SPR(m.p[0])}" alt="" width="96" height="96" style="image-rendering:pixelated">`;
  setTimeout(()=>{if(++S.qi<S.qs.length)askE();else endEp()},2000)
}

// ===================== Épreuve 8 : DÉFIS DU DRESSEUR =====================
// Déroulement : un dresseur est tiré au hasard (le même pour tous les joueurs en Versus).
// Le joueur tape des Pokémon de ce dresseur, dans n’importe laquelle de ses équipes :
//   les 3 premiers (obligatoires) valent 2 pts chacun ; les 10 suivants (bonus) valent 1 pt chacun ; maximum 16 pts.
// Un seul chrono pour toute l’épreuve (E.tt secondes). Les bonnes réponses s’affichent au fur et à mesure.
// Pas de pénalité en cas d’erreur. Le bouton « Terminer » apparaît quand les 3 obligatoires sont trouvés.
// RÈGLE DES LIGNÉES : dès qu’un Pokémon est trouvé, toute sa lignée d’évolution compte comme UNE seule réponse
// (ex. : Nidoking donné → Nidoran♂ et Nidorino sont refusés). Les lignées viennent de donnees/lignees.js (variable LIGNEES).
// Ainsi on ne peut pas réussir l’épreuve avec une seule famille d’évolution.
// Bonus Détection : le jeu donne un Pokémon au joueur, mais il ne rapporte aucun point (il remplit quand même une case).
// Données : DRESSEURS (donnees/dresseurs.js) = [{id, sprite, nom, role, note, equipes:{ jeu:[Pokémon…] }, a_verifier:[…]}, …].
// Les Pokémon de « a_verifier » sont acceptés comme ceux des équipes.

// TSPR(nom du sprite) : liste des adresses essayées dans l’ordre pour afficher le sprite d’un dresseur :
//   1) TON dossier sprites/dresseurs/ (ex. sprites/dresseurs/pryce.png) : le nom du fichier = le champ « sprite » du dresseur ;
//   2) Pokémon Showdown ;
//   3) si aucune image ne charge : un 🧢 (voir sprT).
const TSPR=n=>[`sprites/dresseurs/${n}.png`,`https://play.pokemonshowdown.com/sprites/trainers/${n}.png`];

// sprT(img) : appelée par le navigateur quand une image de dresseur ne charge pas (attribut onerror).
// data-s contient les adresses qu’il reste à essayer, séparées par « | ». Quand il n’y en a plus, l’image est remplacée par un 🧢.
function sprT(img){
  const l=(img.dataset.s||"").split("|").filter(Boolean);
  if(l.length){img.dataset.s=l.slice(1).join("|");img.src=l[0];return}   // source suivante
  const e=document.createElement("div");e.textContent="🧢";e.style.fontSize="72px";img.replaceWith(e)   // plus aucune source
}

// tireDresseur(x) : tire un dresseur au hasard parmi ceux qui ont au moins x.nbmin lignées d’évolution différentes
// (sinon l’épreuve serait impossible : il faut pouvoir trouver nb Pokémon de lignées différentes).
function tireDresseur(x){
  const ok=DRESSEURS.filter(t=>new Set(equipeDe(t).map(ligne)).size>=x.nbmin);
  return ok[Math.random()*ok.length|0]
}

// equipeDe(dresseur) : tous les Pokémon DIFFÉRENTS du dresseur, jeux confondus (union des équipes
// + la liste facultative « a_verifier », qui est acceptée comme le reste).
const equipeDe=t=>[...new Set([...Object.values(t.equipes).flat(),...(t.a_verifier||[])])];

// ligne(nom) : renvoie l’identifiant de la lignée d’évolution du Pokémon (le numéro de son groupe dans LIGNEES).
// LGIDX est construit une seule fois : nom normalisé → numéro de groupe.
// Si le nom est inconnu (ou si donnees/lignees.js est absent), il forme sa propre lignée.
let LGIDX=null;
function ligne(nom){
  if(!LGIDX){LGIDX=new Map();if(typeof LIGNEES!=="undefined")LIGNEES.forEach((g,i)=>g.forEach(n=>LGIDX.set(norm(n),i)))}
  const k=norm(nom);
  return LGIDX.has(k)?LGIDX.get(k):"seul:"+k
}

// resteT() : un Pokémon (le premier de la liste) pour CHAQUE lignée du dresseur qui n’a pas encore été trouvée.
function resteT(){
  const vus=new Set(S.found.map(f=>f.l)),r=[];
  for(const p of S.trAll){const l=ligne(p);if(!vus.has(l)){vus.add(l);r.push(p)}}
  return r
}

// askT() : affiche l’épreuve (sprite, nom, liste des Pokémon trouvés, champ de saisie) et lance le chrono global.
function askT(){
  clearInterval(tm);
  const x=E[S.ei],t=S.qs[0];                                   // S.qs[0] = le dresseur tiré par pick()
  S.tr=t;S.trAll=equipeDe(t);S.found=[];S.t=x.tt;S.done=false;S.frozen=false;
  A(`${topbar(h(x.n.toUpperCase()))}<div class="panel"><div class="bar"><div id="bar" style="width:100%"></div></div><div class="c" style="margin:14px 0"><img src="${TSPR(t.sprite)[0]}" data-s="${TSPR(t.sprite).slice(1).join("|")}" onerror="sprT(this)" alt="" height="110" style="image-rendering:pixelated"><h2 style="font:900 26px Impact,sans-serif;margin-top:6px">${h(t.nom.toUpperCase())}${t.alias?` <small style="font-size:14px;opacity:.7">(${h(t.alias)})</small>`:""}</h2><p class="mut">${h(t.note.startsWith(t.role)?t.note:t.role+" — "+t.note)}</p></div><p class="c mut" id="tinfo"></p><div class="c" id="tlist" style="min-height:44px;margin:10px 0"></div><input id="rep" autocomplete="off" placeholder="Nom d’un Pokémon de ce dresseur" onkeydown="if(event.key==='Enter')respT()"><p class="c" id="fb" style="min-height:22px"></p><div class="row"><button class="btn" onclick="respT()">Valider</button><button class="btn alt" id="fin" onclick="finT()" style="display:none">Terminer</button></div></div>${bonusBar(true)}`);
  majT();$("#rep").focus();
  tm=setInterval(()=>{if(S.frozen)return;S.t-=.25;$("#bar").style.width=S.t/x.tt*100+"%";if(S.t<=0)finT(true)},250)
}

// majT() : met à jour le texte d’avancement, la liste des Pokémon trouvés et le bouton « Terminer ».
function majT(){
  const x=E[S.ei],n=S.found.length;
  $("#tinfo").textContent=n<x.nb?`Trouve ${x.nb} Pokémon de ce dresseur : ${n}/${x.nb} (une lignée d’évolution = une seule réponse)`:`Bonus : ${n-x.nb}/${x.nbo} Pokémon en plus (1 pt chacun, une lignée = une réponse)`;
  // les 3 premiers sont violets (obligatoires), les suivants gris (bonus) ; 🔎 = donné par Détection
  $("#tlist").innerHTML=S.found.map((f,i)=>`<span style="display:inline-block;margin:3px;padding:6px 12px;border-radius:999px;background:${i<x.nb?"var(--vio)":"#2a2640"}">${h(f.n)}${f.d?" 🔎":""} <b>${f.p?"+"+f.p:"0"}</b></span>`).join("");
  $("#fin").style.display=n>=x.nb?"":"none"
}

// respT() : valide le Pokémon tapé. Refuse s’il n’est pas dans les équipes du dresseur ou si sa lignée a déjà été donnée.
function respT(){
  if(S.done)return;
  const v=$("#rep").value.trim();if(!v)return;
  $("#rep").value="";$("#rep").focus();
  const nom=S.trAll.find(p=>norm(p)===norm(v));                // norm() : on ignore accents et majuscules
  if(!nom)return void($("#fb").innerHTML=`<span style="color:var(--ko)">${h(v)} ne fait pas partie des équipes de ${h(S.tr.nom)}.</span>`);
  // même lignée déjà trouvée (le Pokémon lui-même ou un autre de sa famille d’évolution) : refusé, aucun point
  const deja=S.found.find(f=>f.l===ligne(nom));
  if(deja)return void($("#fb").innerHTML=`<span class="mut">${h(nom)} fait partie de la lignée de ${h(deja.n)}, déjà donnée.</span>`);
  addT(nom,false)
}

// addT(nom, détection) : enregistre un Pokémon trouvé. Les nb premiers valent pm points, les suivants pb ;
// un Pokémon donné par Détection vaut 0. Gonflette (S.dbl) double les points. Quand tout est trouvé, l’épreuve se termine.
function addT(nom,detect){
  const x=E[S.ei],pts=detect?0:(S.found.length<x.nb?x.pm:x.pb)*(S.dbl?2:1);
  // l = lignée d’évolution du Pokémon (sert à refuser les autres membres de la même famille)
  S.found.push({n:nom,p:pts,d:detect,l:ligne(nom)});S.sc[S.pi]+=pts;if(!detect)S.got++;
  $("#fb").innerHTML=`<span style="color:var(--ok)">${h(nom)} ✔${pts?" +"+pts:""}</span>`;
  majT();
  // fin automatique : toutes les cases sont remplies OU il n’y a plus aucune lignée à trouver chez ce dresseur
  if(S.found.length>=x.nb+x.nbo||!resteT().length)finT()
}

// detec() : bonus Détection → donne un Pokémon d’une lignée pas encore trouvée, pour 0 point.
function detec(){
  const restants=resteT();
  document.querySelectorAll(".bn").forEach(b=>b.disabled=true);
  if(restants.length)addT(restants[Math.random()*restants.length|0],true)
}

// finT(to) : fin de l’épreuve (bouton Terminer, tout trouvé, ou temps écoulé si to = true).
// Affiche un récapitulatif avec quelques Pokémon manqués, puis passe à la suite avec endEp().
function finT(to){
  if(S.done)return;
  S.done=true;clearInterval(tm);
  document.querySelectorAll(".bn").forEach(b=>b.disabled=true);
  $("#rep").disabled=true;$("#fin").style.display="none";
  const rate=resteT();                                          // une réponse possible par lignée manquée
  $("#fb").innerHTML=`${to?"Temps écoulé. ":""}${S.found.length} Pokémon trouvés.${rate.length?`<br><span class="mut">Il y avait aussi (une réponse par lignée) : ${rate.slice(0,10).map(h).join(", ")}${rate.length>10?"…":""}</span>`:""}`;
  setTimeout(endEp,3000)
}

/* ----- Épreuve Duel de Types : +5 si bonne réponse, −3 sinon (le score peut descendre sous zéro) ----- */
// tpHtml(cible) : fabrique les pastilles colorées des types affichés.
const tpHtml=c=>c.map(t=>`<span style="display:inline-block;margin:4px 6px;padding:10px 22px;border-radius:999px;background:${TY[t]};color:#fff;text-shadow:0 1px 3px #000a;font:900 24px Impact,sans-serif">${h(t.toUpperCase())}</span>`).join("");

// askD() : affiche UNE manche du Duel de Types (pastilles de type + champ de réponse + chrono). S.cur = cible actuelle.
function askD(){clearInterval(tm);const x=E[S.ei];S.cur=[...S.qs[S.qi]];S.t=TIME;S.frozen=false;S.done=false;
A(`${topbar(h(x.n.toUpperCase()))}<div class="panel"><div class="bar"><div id="bar" style="width:100%"></div></div><p class="mut c">${h(x.d)}</p><p class="mut c" style="margin-top:8px">Manche ${S.qi+1}/${S.qs.length} — +${x.pts} si juste, −${x.mal} si faux${S.dbl?" (×2)":""}</p><div class="c" id="tp" style="margin:18px 0">${tpHtml(S.cur)}</div><input id="rep" autocomplete="off" placeholder="Nom d’un Pokémon" onkeydown="if(event.key==='Enter')respD()"><p class="c" id="fb" style="min-height:22px"></p><div class="row"><button class="btn" onclick="respD()">Valider</button></div></div>${bonusBar(true)}`);
$("#rep").focus();
tm=setInterval(()=>{if(S.frozen)return;S.t-=.25;$("#bar").style.width=S.t/TIME*100+"%";if(S.t<=0)respD(true)},250)}

// multiT() : bonus Multi-Type. Change la cible (multiType) et met l’affichage à jour.
function multiT(){S.cur=multiType(S.cur);$("#tp").innerHTML=tpHtml(S.cur);document.querySelectorAll(".bn").forEach(b=>b.disabled=true)}

// respD(to) : valide une manche du Duel. +5 si le Pokémon convient, −3 sinon (temps écoulé compris). Le ×2 de Gonflette double gains ET pertes.
function respD(to){const v=$("#rep").value.trim();if(S.done||(!to&&!v))return;S.done=true;clearInterval(tm);const x=E[S.ei],m=S.dbl?2:1,ok=!to&&duelOk(v,S.cur),pp=ok?x.pts*m:-x.mal*m;
$("#rep").disabled=true;document.querySelectorAll(".bn").forEach(b=>b.disabled=true);
S.sc[S.pi]+=pp;if(ok)S.got++;
$("#fb").innerHTML=ok?`<span style="color:var(--ok)">Bonne réponse ! +${pp}</span>`:`<span style="color:var(--ko)">${to?"Temps écoulé. ":"Raté. "}${pp} pts. Exemple : ${h(exemple(S.cur))}</span>`;
setTimeout(()=>{if(++S.qi<S.qs.length)askD();else endEp()},1600)}

// endEp() : fin d’une épreuve. En Versus, passe au joueur suivant ; sinon ajoute l’épreuve aux jouées et revient au choix (ou termine la partie).
function endEp(){const multi=S.players.length>1;
if(multi&&S.pi<S.players.length-1){S.pi++;return turn()}
S.played.push(S.ei);S.pi=0;
if(S.mode!=="libre"&&S.played.length>=MAXE)return finish();
if(multi)return turn(true);hub()}

// ÉCRAN de transition Versus : « Au tour de… » ou « Épreuve suivante ».
function turn(next){const first=next;A(`${topbar(first?"ÉPREUVE SUIVANTE":"AU TOUR DE "+h(S.players[S.pi]).toUpperCase())}<div class="panel c"><p class="q">${first?"Tout le monde a joué cette épreuve. Choisissez la suivante.":"Même épreuve : "+E[S.ei].n}</p><button class="btn" onclick="${first?"hub()":"pick("+S.ei+")"}">${first?"Choisir l’épreuve":"Je suis prêt"}</button></div>`)}

// ÉCRAN des résultats. Libre : enregistre le record. Compétition : envoie le score au serveur. Versus : classe les joueurs.
async function finish(){clearInterval(tm);let best=ls.get(bestKey(),0),extra="";
if(S.mode==="libre"){const s=S.sc[0],rec=s>best;if(rec)ls.set(bestKey(),s);extra=rec?`<p class="c" style="color:var(--gold)">Nouveau record personnel !</p>`:`<p class="c mut">Ton record : ${best} pts</p>`}
if(S.mode==="compet"){const ok=await API.save(S.players[0],S.sc[0]).then(()=>1,()=>0);extra=`<p class="c mut">${ok?"Score enregistré dans le classement.":"Score non enregistré : serveur injoignable ou session expirée (reconnecte-toi)."}</p>`}
const r=S.players.map((p,i)=>({p,s:S.sc[i]})).sort((a,b)=>b.s-a.s);
A(`<div class="top"><div><small>QUIZ POKÉMON</small><h1>RÉSULTATS</h1></div></div><div class="panel"><table><tr><th>#</th><th>Joueur</th><th>Points</th></tr>${r.map((x,i)=>`<tr><td>${i+1}</td><td>${h(x.p)}</td><td>${x.s}</td></tr>`).join("")}</table>${extra}</div><div class="row"><button class="btn" onclick="modes()">Menu</button>${S.mode==="compet"?`<button class="btn alt" onclick="board()">Classement</button>`:""}</div>`)}

/* ===== COMPTES : gérés par le serveur (le pseudo et le jeton de connexion sont gardés dans le navigateur). ===== */
// U.cur() : pseudo du joueur connecté (ou null).
const U={cur:()=>ls.get("pkq_session",null)};
// bestKey() : clé du localStorage où est gardé le record personnel (une par pseudo).
const bestKey=()=>"pkq_best"+(U.cur()?"_"+U.cur().toLowerCase():"");
// AUTH : inscription (signup) et connexion (login) auprès du serveur ; on garde le pseudo et le jeton dans le navigateur.
const AUTH={
async signup(n,p){const r=await srv("/inscription",{pseudo:n,mdp:p});ls.set("pkq_session",r.pseudo);ls.set("pkq_token",r.token)},
async login(n,p){const r=await srv("/connexion",{pseudo:n,mdp:p});ls.set("pkq_session",r.pseudo);ls.set("pkq_token",r.token)}};
// logout() : efface la session puis retourne à l’accueil.
function logout(){ls.set("pkq_session",null);ls.set("pkq_token",null);home()}
// navHtml() : boutons du bandeau d’accueil (pseudo + Déconnexion, ou Connexion + Créer un compte).
function navHtml(){const u=U.cur();return `<div class="nav">${u?`<span>👤 ${h(u)}</span><button class="btn alt" onclick="logout()">Déconnexion</button>`:`<button class="btn alt" onclick="auth('in')">Connexion</button><button class="btn" onclick="auth('up')">Créer un compte</button>`}</div>`}

// ÉCRAN Connexion / Inscription (next = mode à lancer ensuite, ex. « compet »).
function auth(tab,next){clearInterval(tm);const up=tab==="up";
A(`<div class="top"><div><small>QUIZ POKÉMON</small><h1>${up?"CRÉER UN COMPTE":"CONNEXION"}</h1></div></div>
<div class="panel" style="max-width:440px;margin:14px auto"><div class="tabs"><button class="btn ${up?"":"alt"}" onclick="auth('in',${next?`'${next}'`:"undefined"})">Connexion</button><button class="btn ${up?"alt":""}" onclick="auth('up',${next?`'${next}'`:"undefined"})">Inscription</button></div>
${next?`<p class="mut">La Compétition demande un compte pour t’inscrire au classement.</p>`:""}
<input id="au" maxlength="16" placeholder="Pseudo (3 à 16 caractères)" autocomplete="username"><input id="pw" type="password" placeholder="Mot de passe (8 caractères minimum)" autocomplete="${up?"new-password":"current-password"}">
<p class="err" id="err"></p><div class="row" style="margin-top:6px"><button class="btn alt" onclick="${next?"modes()":"home()"}">Retour</button><button class="btn" onclick="sub(${up},${next?`'${next}'`:"undefined"})">${up?"Créer mon compte":"Me connecter"}</button></div></div>`)}

// sub() : valide le formulaire (vérifie pseudo et mot de passe, appelle AUTH, puis continue).
async function sub(up,next){const n=$("#au").value.trim(),p=$("#pw").value;
if(up&&(n.length<3||!/^[\w\- ]+$/.test(n)))return $("#err").textContent="Le pseudo doit faire 3 à 16 caractères : lettres, chiffres, espace, - ou _.";
if(up&&p.length<8)return $("#err").textContent="Le mot de passe doit faire au moins 8 caractères.";
try{await(up?AUTH.signup(n,p):AUTH.login(n,p))}catch(e){return $("#err").textContent=String(e)}
next?setup(next):home()}

// ÉCRAN D’ACCUEIL : présentation, statistiques, liste des épreuves, bonus, avantages du compte.
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
<h3 class="sec">Un bonus par épreuve</h3><div class="panel"><table>${SB.map(([k,i,n,d])=>`<tr><td>${i}</td><td>Toute la partie</td><td>${n}</td><td>${h(d)}</td></tr>`).join("")}${E.map(x=>`<tr><td>${x.e}</td><td>${h(x.n)}</td><td>${h(x.bn[0])}</td><td>${h(x.bn[1])}</td></tr>`).join("")}</table></div>
<h3 class="sec">Pourquoi créer un compte ?</h3><div class="panel"><table><tr><td>🏆</td><td>Accéder à la Compétition et apparaître dans le classement</td></tr><tr><td>💾</td><td>Garder ton record personnel du mode Libre</td></tr><tr><td>👤</td><td>Jouer sous ton pseudo à chaque visite</td></tr></table>${u?"":`<div class="row"><button class="btn" onclick="auth('up')">Créer mon compte</button></div>`}</div>`)}

// Démarrage : on affiche l’accueil dès que le fichier est chargé.
home();
