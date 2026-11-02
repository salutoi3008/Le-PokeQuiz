/* ===== ÉPREUVES (cahier des charges). ok:false = pas encore jouable. q: [question, bonne réponse, autres réponses acceptées…] ===== */
const E=[
{n:"Écho Sauvage",d:"Retrouve le Pokémon grâce à son cri",e:"🔊",c:"#3d6fd0",max:15,bn:["Clairvoyance","Affiche le type (manche 4)"],ok:false,q:[]},
{n:"Les Archives du Pokédex",d:"Retrouve le Pokémon grâce à sa description",e:"📖",c:"#2fa36b",max:9,pts:3,nq:3,arch:1,bn:["Échange Psy","Change la description"],ok:false,q:[]},
{n:"Carte au Trésor",d:"Retrouve le jeu d’où provient le lieu",e:"📍",c:"#2a9bb0",max:6,bn:["Téléport","Change le lieu"],ok:false,q:[]},
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
{n:"Duel de Types",d:"Donne un Pokémon qui a le type affiché",e:"🔥",c:"#d0662b",max:20,bn:["Multi-Type","Change le double type"],ok:true,duel:1,pts:5,mal:3,man:4,q:[]},
{n:"Défis du Dresseur",d:"Donne 3 Pokémon du dresseur affiché",e:"🧢",c:"#7b4fd0",max:16,bn:["Détection","Donne un Pokémon, sans point"],ok:false,q:[]}
];
/* Archives du Pokédex : les descriptions viennent du fichier donnees-pokedex.js (l’épreuve reste « bientôt » si ce fichier est absent). */
const GEN={};
if(typeof ARCH!=="undefined"){const x=E.find(e=>e.arch);x.q=ARCH.flatMap(([n,g,ds])=>{GEN[n]=g;return ds.map(d=>[d,n])});x.ok=true}
const BI={"Clairvoyance":"🔮","Échange Psy":"🔄","Téléport":"🌀","Jackpot":"🎰","Multi-Type":"🌈","Détection":"🔍"};
const SB=[["g","💪","Gonflette","Double les points de la prochaine épreuve que tu choisis"],["m","⏱️","Métronome","Choisit une épreuve au hasard à ta place"]];
const RESTE=()=>E.map((x,i)=>i).filter(i=>E[i].ok&&!S.played.includes(i));
const MAXE=E.filter(x=>x.ok).length,TIME=30;
const norm=s=>String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]/g,"");
const $=s=>document.querySelector(s),h=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
/* ===== DUEL DE TYPES : base (type ou double type → Pokémon, formes comprises, noms français). Source : PokéAPI. ===== */
/*DUEL-START*/
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
const TY={"Normal":"#a8a878","Combat":"#c03028","Vol":"#a890f0","Poison":"#a040a0","Sol":"#c9a84a","Roche":"#b8a038","Insecte":"#a8b820","Spectre":"#705898","Acier":"#9a9ab8","Feu":"#f08030","Eau":"#6890f0","Plante":"#78c850","Électrik":"#e0b800","Psy":"#f85888","Glace":"#7cc8c8","Dragon":"#7038f8","Ténèbres":"#705848","Fée":"#e0829a"};
const TYL=Object.keys(TY);
let TIDX=null;
function tidx(){if(TIDX)return TIDX;TIDX={noms:new Map(),dbl:[]};
for(const k in TYPES_D){const ts=k.split("/");if(ts.length===2)TIDX.dbl.push(ts);
for(const n of TYPES_D[k].split("|")){const z=norm(n);if(!TIDX.noms.has(z))TIDX.noms.set(z,[]);TIDX.noms.get(z).push(ts)}}
return TIDX}
/* cible = [type] (le Pokémon doit avoir ce type) ou [type1,type2] (il doit avoir exactement ces deux types, dans n’importe quel ordre) */
const duelMatch=(ts,c)=>c.length===1?ts.includes(c[0]):ts.length===2&&c.every(t=>ts.includes(t));
function duelOk(rep,c){const l=tidx().noms.get(norm(rep));return !!l&&l.some(ts=>duelMatch(ts,c))}
function exemple(c){const l=[];for(const k in TYPES_D)if(duelMatch(k.split("/"),c))l.push(...TYPES_D[k].split("|").filter(n=>n!=="Arceus"&&n!=="Silvallié"));return l[Math.random()*l.length|0]}
function duelType(){if(Math.random()<.5){const d=tidx().dbl;return [...d[Math.random()*d.length|0]]}return [TYL[Math.random()*TYL.length|0]]}
function multiType(c){const d=tidx().dbl.filter(ts=>ts.some(t=>c.includes(t))&&!(c.length===2&&c.every(t=>ts.includes(t))));return d.length?[...d[Math.random()*d.length|0]]:c}
/*DUEL-END*/
const ls={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
/* Serveur : comptes et classement. Remplacer l’adresse par celle du serveur une fois hébergé en ligne. */
const SERVEUR="https://pokequiz-serveur.onrender.com";
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

function begin(mode,players){S={mode,players,sc:players.map(()=>0),b:players.map(()=>({g:1,m:1,e:{}})),played:[],pi:0};hub()}

function topbar(title){const mx=S.mode==="libre"?"":`<div class="mid">ÉPREUVES JOUÉES<div class="dots">${Array.from({length:MAXE},(_,i)=>`<i class="${i<S.played.length?"on":""}"></i>`).join("")}</div></div>`;
const sc=S.players.length>1?S.players.map((p,i)=>`${h(p)} : ${S.sc[i]}`).join(" | "):"";
return `<div class="top"><div><small>QUIZ POKÉMON</small><h1>${title}</h1></div>${mx}<div class="score" style="${mx?"":"margin-left:auto"}"><small>SCORE${S.players.length>1?" — "+h(S.players[S.pi]):""}</small><b>${S.sc[S.pi]}</b></div></div>${sc?`<p class="c mut" style="margin-top:8px">${sc}</p>`:""}`}

function bonusBar(live){const x=E[S.ei],u=S.b[S.pi].e[S.ei];return `<div class="panel bonus"><button class="bn" ${live&&!u?"":"disabled"} onclick="useB()" title="${h(x.bn[1])}"><span>${BI[x.bn[0]]}</span>${h(x.bn[0])}<br>${h(x.bn[1])}</button></div>`}

function hub(){clearInterval(tm);
A(`${topbar("CHOIX DE L’ÉPREUVE")}<div class="panel"><div class="grid">${E.map((x,i)=>`<button class="tile" title="${h(x.d)}" style="--c:${x.c}" ${S.played.includes(i)||!x.ok?"disabled":""} onclick="pick(${i})"><em>${x.max}</em><span>${x.e}</span>${h(x.n.toUpperCase())}${x.ok?"":"<small>BIENTÔT</small>"}</button>`).join("")}</div></div><h3 class="sec">Tes bonus</h3><p class="mut">Chaque bonus s’utilise une fois par partie.</p><div class="panel bonus">${SB.map(([k,i,n,d])=>{const b=S.b[S.pi],on=k==="g"?b.g:b.m&&RESTE().length,st=k==="g"&&b.arm?"activé : prochaine épreuve ×2":b[k]?"disponible":"utilisé";return `<button class="bn info${b[k]?"":" used"}" ${on?"":"disabled"} onclick="${k==="g"?"useGonf()":"useMetro()"}" title="${h(d)}"><span>${i}</span>${n}<br>${h(d)}<br><b>${st}</b></button>`}).join("")}</div>${S.mode==="libre"?`<div class="row"><button class="btn" onclick="finish()">Terminer la partie</button></div>`:""}`)}

function useGonf(){const b=S.b[S.pi];if(!b.g)return;b.g=0;b.arm=1;hub()}

function useMetro(){const b=S.b[S.pi],l=RESTE();if(!b.m||!l.length)return;b.m=0;const i=l[Math.floor(Math.random()*l.length)];
A(`${topbar("MÉTRONOME")}<div class="panel c"><p class="q">⏱️ Métronome choisit une épreuve…</p><p class="q">${E[i].e} ${h(E[i].n)}</p></div>`);setTimeout(()=>pick(i),1600)}

function pick(i){S.ei=i;S.qi=0;S.got=0;S.dbl=!!S.b[S.pi].arm;S.b[S.pi].arm=0;
/* en Versus, tous les joueurs reçoivent les mêmes questions / les mêmes types */
if(!(S.players.length>1&&S.pi>0&&S.qsEi===i)){S.qs0=E[i].duel?Array.from({length:E[i].man},duelType):sh(E[i].q).slice(0,E[i].nq);S.qsEi=i}
S.qs=S.qs0;E[i].duel?askD():ask()}

function ask(){clearInterval(tm);const x=E[S.ei],q=S.qs[S.qi];S.t=TIME;S.frozen=false;S.done=false;S.zero=false;
A(`${topbar(h(x.n.toUpperCase()))}<div class="panel"><div class="bar"><div id="bar" style="width:100%"></div></div><p class="mut c">${h(x.d)}</p><p class="mut c" id="qn" style="margin-top:8px">Question ${S.qi+1}/${S.qs.length} — ${x.pts} pts${S.dbl?" ×2":""}</p><p class="q" id="qt"${x.arch?' style="font-size:19px"':""}>${h(q[0])}</p>${x.arch?'<div class="c"><button class="btn alt" id="gen" onclick="showGen()">🎓 Génération ?</button></div>':""}<input id="rep" autocomplete="off" placeholder="Ta réponse" onkeydown="if(event.key==='Enter')resp()"><p class="c" id="fb" style="min-height:22px"></p><div class="row"><button class="btn" onclick="resp()">Valider</button></div></div>${bonusBar(true)}`);
$("#rep").focus();
tm=setInterval(()=>{if(S.frozen)return;S.t-=.25;$("#bar").style.width=S.t/TIME*100+"%";if(S.t<=0)resp(true)},250)}

function useB(){if(S.done||S.b[S.pi].e[S.ei])return;S.b[S.pi].e[S.ei]=1;if(E[S.ei].duel)return multiT();if(E[S.ei].arch)return swapQ();S.zero=true;
$("#fb").innerHTML=`Réponse : <b>${h(S.qs[S.qi][1])}</b> (cette question ne rapporte aucun point)`;
document.querySelectorAll(".bn").forEach(b=>b.disabled=true)}

function resp(to){if(S.done)return;S.done=true;clearInterval(tm);const x=E[S.ei],q=S.qs[S.qi],v=norm($("#rep").value),ok=!to&&v&&q.slice(1).some(a=>norm(a)===v);
$("#rep").disabled=true;document.querySelectorAll(".bn").forEach(b=>b.disabled=true);
const pp=x.pts*(S.dbl?2:1);if(ok&&!S.zero){S.sc[S.pi]+=pp;S.got++}
$("#fb").innerHTML=ok?`<span style="color:var(--ok)">Bonne réponse${S.zero?" (0 point, bonus utilisé)":" ! +"+pp}</span>`:`<span style="color:var(--ko)">${to?"Temps écoulé. ":"Raté. "}Réponse : ${h(q[1])}</span>`;
setTimeout(()=>{if(++S.qi<S.qs.length)ask();else endEp()},1600)}

/* ----- Épreuve Archives du Pokédex : badge génération et bonus Échange Psy ----- */
function showGen(){const b=$("#gen");b.textContent="Génération "+GEN[S.qs[S.qi][1]];b.disabled=true}
function swapQ(){const used=S.qs.map(q=>q[0]),pool=E[S.ei].q.filter(q=>!used.includes(q[0])),n=pool[Math.random()*pool.length|0];
S.qs=[...S.qs];S.qs[S.qi]=n;S.t=TIME;$("#qt").textContent=n[0];const g=$("#gen");g.textContent="🎓 Génération ?";g.disabled=false;$("#fb").innerHTML="";
document.querySelectorAll(".bn").forEach(b=>b.disabled=true)}

/* ----- Épreuve Duel de Types : +5 si bonne réponse, −3 sinon (le score peut descendre sous zéro) ----- */
const tpHtml=c=>c.map(t=>`<span style="display:inline-block;margin:4px 6px;padding:10px 22px;border-radius:999px;background:${TY[t]};color:#fff;text-shadow:0 1px 3px #000a;font:900 24px Impact,sans-serif">${h(t.toUpperCase())}</span>`).join("");

function askD(){clearInterval(tm);const x=E[S.ei];S.cur=[...S.qs[S.qi]];S.t=TIME;S.frozen=false;S.done=false;
A(`${topbar(h(x.n.toUpperCase()))}<div class="panel"><div class="bar"><div id="bar" style="width:100%"></div></div><p class="mut c">${h(x.d)}</p><p class="mut c" style="margin-top:8px">Manche ${S.qi+1}/${S.qs.length} — +${x.pts} si juste, −${x.mal} si faux${S.dbl?" (×2)":""}</p><div class="c" id="tp" style="margin:18px 0">${tpHtml(S.cur)}</div><input id="rep" autocomplete="off" placeholder="Nom d’un Pokémon" onkeydown="if(event.key==='Enter')respD()"><p class="c" id="fb" style="min-height:22px"></p><div class="row"><button class="btn" onclick="respD()">Valider</button></div></div>${bonusBar(true)}`);
$("#rep").focus();
tm=setInterval(()=>{if(S.frozen)return;S.t-=.25;$("#bar").style.width=S.t/TIME*100+"%";if(S.t<=0)respD(true)},250)}

function multiT(){S.cur=multiType(S.cur);$("#tp").innerHTML=tpHtml(S.cur);document.querySelectorAll(".bn").forEach(b=>b.disabled=true)}

function respD(to){const v=$("#rep").value.trim();if(S.done||(!to&&!v))return;S.done=true;clearInterval(tm);const x=E[S.ei],m=S.dbl?2:1,ok=!to&&duelOk(v,S.cur),pp=ok?x.pts*m:-x.mal*m;
$("#rep").disabled=true;document.querySelectorAll(".bn").forEach(b=>b.disabled=true);
S.sc[S.pi]+=pp;if(ok)S.got++;
$("#fb").innerHTML=ok?`<span style="color:var(--ok)">Bonne réponse ! +${pp}</span>`:`<span style="color:var(--ko)">${to?"Temps écoulé. ":"Raté. "}${pp} pts. Exemple : ${h(exemple(S.cur))}</span>`;
setTimeout(()=>{if(++S.qi<S.qs.length)askD();else endEp()},1600)}

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
<h3 class="sec">Un bonus par épreuve</h3><div class="panel"><table>${SB.map(([k,i,n,d])=>`<tr><td>${i}</td><td>Toute la partie</td><td>${n}</td><td>${h(d)}</td></tr>`).join("")}${E.map(x=>`<tr><td>${x.e}</td><td>${h(x.n)}</td><td>${h(x.bn[0])}</td><td>${h(x.bn[1])}</td></tr>`).join("")}</table></div>
<h3 class="sec">Pourquoi créer un compte ?</h3><div class="panel"><table><tr><td>🏆</td><td>Accéder à la Compétition et apparaître dans le classement</td></tr><tr><td>💾</td><td>Garder ton record personnel du mode Libre</td></tr><tr><td>👤</td><td>Jouer sous ton pseudo à chaque visite</td></tr></table>${u?"":`<div class="row"><button class="btn" onclick="auth('up')">Créer mon compte</button></div>`}</div>`)}

home();
