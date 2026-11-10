/*
 * donnees/champions.js — équipes des Champions d'arène (et Kahunas d'Alola) pour l'épreuve « Défis du Dresseur(s) »
 *
 * FORMAT : identique à donnees/dresseurs.js : const CHAMPIONS = [ { id, sprite, nom, alias, role, note, equipes:{ "source":[Pokémon…] } }, … ]
 *   - nom   : nom affiché (celui de ton document) ; alias : autre nom (ex. nom anglais), affiché entre parenthèses
 *   - equipes : une liste par source ; le jeu accepte l'UNION de toutes les listes d'un dresseur
 * script.js ajoute CHAMPIONS à la liste DRESSEURS au chargement.
 *
 * ORIGINE :
 *   - « Document … » : équipes issues de tes documents Champions_Arene_1G_a_6G.docx et Champions_Arene_1G_a_9G.docx
 *     (tableaux lus automatiquement, noms traduits en français avec les CSV de PokéAPI).
 *   - Autres listes (Rouge/Bleu, Jaune, Or/Argent/Cristal, HeartGold/SoulSilver, Rouge Feu/Vert Feuille, Émeraude) :
 *     AJOUTS tirés des fichiers de jeu décompilés du projet « pret » : ils confirment tes documents et ajoutent les équipes
 *     de HeartGold/SoulSilver (matchs de Kanto) et les revanches d'Émeraude.
 *   - Unys : tableaux de synthèse de ton document. J'ai ajouté Ponchiot aux équipes de Rachid/Chili/Cress (Cilan, Chili, Cress), connu
 *     des jeux mais absent du document. Iris reprend la liste de Drayden (même arène, version Blanc).
 *   - NON vérifiés avec les données de jeu : Sinnoh, Unys, Kalos, Alola, Galar, Paldea (aucune source ouverte) → fidèles à tes documents.
 *   - Giovanni est dans donnees/dresseurs.js, pas ici.
 * LIMITE : un Champion n'a que 2 à 5 lignées d'évolution (ex. Brock : Racaillou et Onix). Le tirage de l'épreuve 8 ne
 *   choisit un dresseur que s'il a au moins E.nbmin lignées (voir script.js) ; les autres restent en réserve tant que
 *   leurs équipes (anime et films) ne sont pas ajoutées.
 */
const CHAMPIONS=[
  {id:"brock",sprite:"brock",nom:"Brock",role:"Champion d’arène",note:"Champion d’arène — Argenta (Kanto)",
    equipes:{
      "Document (jeux de Kanto)":["Racaillou", "Onix"],
      "Variantes (document)":["Racaillou", "Onix"],
      "Rouge/Bleu":["Racaillou", "Onix"],
      "Jaune":["Racaillou", "Onix"],
      "Rouge Feu/Vert Feuille":["Racaillou", "Onix"],
      "HeartGold/SoulSilver":["Gravalanch", "Rhinocorne", "Amonistar", "Onix", "Kabutops", "Grolem", "Relicanth", "Charkos"]
    }},
  {id:"ondine",sprite:"misty",nom:"Ondine",alias:"Misty",role:"Champion d’arène",note:"Champion d’arène — Azuria (Kanto)",
    equipes:{
      "Document (jeux de Kanto)":["Stari", "Staross"],
      "Variantes (document)":["Psykokwak", "Stari", "Staross"],
      "Rouge/Bleu":["Stari", "Staross"],
      "Jaune":["Stari", "Staross"],
      "Rouge Feu/Vert Feuille":["Stari", "Staross"],
      "HeartGold/SoulSilver":["Akwakwak", "Maraiste", "Lokhlass", "Staross", "Lanturn", "Mustéflott", "Milobellus"]
    }},
  {id:"majorbob",sprite:"ltsurge",nom:"Major Bob",alias:"Lt. Surge",role:"Champion d’arène",note:"Champion d’arène — Carmin (Kanto)",
    equipes:{
      "Document (jeux de Kanto)":["Voltorbe", "Pikachu", "Raichu"],
      "Variantes (document)":["Raichu", "Voltorbe", "Magnéti"],
      "Rouge/Bleu":["Voltorbe", "Pikachu", "Raichu"],
      "Jaune":["Raichu"],
      "Rouge Feu/Vert Feuille":["Voltorbe", "Pikachu", "Raichu"],
      "HeartGold/SoulSilver":["Raichu", "Électrode", "Magnéton", "Élektek", "Élecsprint", "Magnézone", "Pachirisu", "Élekable"]
    }},
  {id:"erika",sprite:"erika",nom:"Erika",role:"Champion d’arène",note:"Champion d’arène — Céladopole (Kanto)",
    equipes:{
      "Document (jeux de Kanto)":["Empiflor", "Saquedeneu", "Rafflesia"],
      "Variantes (document)":["Saquedeneu", "Boustiflor", "Ortide"],
      "Rouge/Bleu":["Empiflor", "Saquedeneu", "Rafflesia"],
      "Jaune":["Saquedeneu", "Boustiflor", "Ortide"],
      "Rouge Feu/Vert Feuille":["Empiflor", "Saquedeneu", "Rafflesia"],
      "HeartGold/SoulSilver":["Cotovol", "Saquedeneu", "Empiflor", "Joliflor", "Tengalice", "Bouldeneu", "Roserade"]
    }},
  {id:"koga",sprite:"koga",nom:"Koga",role:"Champion d’arène",note:"Champion d’arène — Parmanie (Kanto)",
    equipes:{
      "Document (jeux de Kanto)":["Smogo", "Grotadmorv", "Smogogo"],
      "Variantes (document)":["Mimitoss", "Smogogo"],
      "Rouge/Bleu":["Smogo", "Grotadmorv", "Smogogo"],
      "Jaune":["Mimitoss", "Aéromite"],
      "Rouge Feu/Vert Feuille":["Smogo", "Grotadmorv", "Smogogo"]
    }},
  {id:"morgane",sprite:"sabrina",nom:"Morgane",alias:"Sabrina",role:"Champion d’arène",note:"Champion d’arène — Safrania (Kanto)",
    equipes:{
      "Document (jeux de Kanto)":["Kadabra", "M. Mime", "Aéromite", "Alakazam"],
      "Rouge/Bleu":["Kadabra", "M. Mime", "Aéromite", "Alakazam"],
      "Jaune":["Abra", "Kadabra", "Alakazam"],
      "Rouge Feu/Vert Feuille":["Kadabra", "M. Mime", "Aéromite", "Alakazam"],
      "HeartGold/SoulSilver":["Mentali", "M. Mime", "Alakazam", "Lippoutou", "Qulbutoké", "Gallame"]
    }},
  {id:"auguste",sprite:"blaine",nom:"Auguste",alias:"Blaine",role:"Champion d’arène",note:"Champion d’arène — Cramois'Île (Kanto)",
    equipes:{
      "Document (jeux de Kanto)":["Caninos", "Ponyta", "Galopa", "Arcanin"],
      "Variantes (document)":["Magmar", "Galopa", "Feunard", "Arcanin"],
      "Rouge/Bleu":["Caninos", "Ponyta", "Galopa", "Arcanin"],
      "Jaune":["Feunard", "Galopa", "Arcanin"],
      "Rouge Feu/Vert Feuille":["Caninos", "Ponyta", "Galopa", "Arcanin"],
      "HeartGold/SoulSilver":["Volcaropod", "Magmar", "Galopa", "Chartor", "Camérupt", "Démolosse", "Maganon"]
    }},
  {id:"albert",sprite:"falkner",nom:"Albert",alias:"Falkner",role:"Champion d’arène",note:"Champion d’arène — Mauville (Johto)",
    equipes:{
      "Document (jeux de Johto)":["Roucool", "Roucoups"],
      "Variantes (document)":["Roucool", "Roucoups"],
      "Or/Argent/Cristal":["Roucool", "Roucoups"],
      "HeartGold/SoulSilver":["Roucool", "Roucoups", "Étouraptor", "Noarfang", "Hélédelle", "Corboss", "Bekipan", "Roucarnage"]
    }},
  {id:"hector",sprite:"bugsy",nom:"Hector",alias:"Bugsy",role:"Champion d’arène",note:"Champion d’arène — Écorcia (Johto)",
    equipes:{
      "Document (jeux de Johto)":["Chrysacier", "Coconfort", "Insécateur", "Mélofée", "Écrémeuh"],
      "Or/Argent/Cristal":["Chrysacier", "Coconfort", "Insécateur"],
      "HeartGold/SoulSilver":["Insécateur", "Coconfort", "Chrysacier", "Cizayox", "Munja", "Yanmega", "Scarabrute", "Scarhino", "Apireine"]
    }},
  {id:"mortimer",sprite:"morty",nom:"Mortimer",alias:"Morty",role:"Champion d’arène",note:"Champion d’arène — Rosalia (Johto)",
    equipes:{
      "Document (jeux de Johto)":["Fantominus", "Spectrum", "Ectoplasma"],
      "Or/Argent/Cristal":["Fantominus", "Spectrum", "Ectoplasma"],
      "HeartGold/SoulSilver":["Fantominus", "Spectrum", "Ectoplasma", "Grodrive", "Noctunoir", "Ténéfix", "Magirêve"]
    }},
  {id:"chuck",sprite:"chuck",nom:"Chuck",role:"Champion d’arène",note:"Champion d’arène — Irisia (Johto)",
    equipes:{
      "Document (jeux de Johto)":["Colossinge", "Tartard"],
      "Or/Argent/Cristal":["Colossinge", "Tartard"],
      "HeartGold/SoulSilver":["Colossinge", "Tartard", "Charmina", "Tygnon", "Kicklee", "Chapignon"]
    }},
  {id:"jasmine",sprite:"jasmine",nom:"Jasmine",role:"Champion d’arène",note:"Champion d’arène — Oliville (Johto)",
    equipes:{
      "Document (jeux de Johto)":["Magnéti", "Steelix"],
      "Or/Argent/Cristal":["Magnéti", "Steelix"],
      "HeartGold/SoulSilver":["Magnéti", "Steelix", "Métalosse", "Magnézone", "Airmure", "Archéodong", "Pingoléon"]
    }},
  {id:"frdo",sprite:"pryce",nom:"Frédo",alias:"Pryce",role:"Champion d’arène",note:"Champion d’arène — Acajou (Johto)",
    equipes:{
      "Document (jeux de Johto)":["Otaria", "Lamantine", "Cochignon"],
      "Or/Argent/Cristal":["Otaria", "Lamantine", "Cochignon"],
      "HeartGold/SoulSilver":["Otaria", "Lamantine", "Cochignon", "Blizzaroi", "Oniglali", "Momartik", "Kaimorse", "Mammochon"]
    }},
  {id:"sandra",sprite:"clair",nom:"Sandra",alias:"Clair",role:"Champion d’arène",note:"Champion d’arène — Ébène (Johto)",
    equipes:{
      "Document (jeux de Johto)":["Draco", "Hyporoi"],
      "Or/Argent/Cristal":["Draco", "Hyporoi"],
      "HeartGold/SoulSilver":["Léviator", "Draco", "Hyporoi", "Ptéra", "Dracaufeu", "Dracolosse"]
    }},
  {id:"roxanne",sprite:"roxanne",nom:"Roxanne",role:"Champion d’arène",note:"Champion d’arène — Métalville (Hoenn)",
    equipes:{
      "Document (jeux de Hoenn)":["Racaillou", "Tarinor"],
      "Émeraude":["Racaillou", "Tarinor", "Grolem", "Kabuto", "Onix", "Amonita", "Kabutops", "Amonistar", "Ptéra", "Steelix"]
    }},
  {id:"brawly",sprite:"brawly",nom:"Brawly",role:"Champion d’arène",note:"Champion d’arène — Myokara (Hoenn)",
    equipes:{
      "Document (jeux de Hoenn)":["Machoc", "Makuhita"],
      "Émeraude":["Machoc", "Méditikka", "Makuhita", "Mackogneur", "Kapoera", "Hariyama", "Charmina", "Tygnon", "Kicklee"]
    }},
  {id:"wattson",sprite:"wattson",nom:"Wattson",role:"Champion d’arène",note:"Champion d’arène — Lavandia (Hoenn)",
    equipes:{
      "Document (jeux de Hoenn)":["Voltorbe", "Dynavolt", "Magnéton"],
      "Émeraude":["Voltorbe", "Dynavolt", "Magnéton", "Élecsprint", "Wattouat", "Électrode", "Pikachu", "Lainergie", "Raichu", "Pharamp", "Élektek"]
    }},
  {id:"flannery",sprite:"flannery",nom:"Flannery",role:"Champion d’arène",note:"Champion d’arène — Vermilava (Hoenn)",
    equipes:{
      "Document (jeux de Hoenn)":["Limagma", "Chamallot", "Chartor"],
      "Émeraude":["Chamallot", "Limagma", "Camérupt", "Chartor", "Volcaropod", "Ponyta", "Caninos", "Malosse", "Galopa", "Arcanin", "Démolosse"]
    }},
  {id:"norman",sprite:"norman",nom:"Norman",role:"Champion d’arène",note:"Champion d’arène — Clémenti (Hoenn)",
    equipes:{
      "Document (jeux de Hoenn)":["Spinda", "Vigoroth", "Linéon", "Monaflèmit"],
      "Émeraude":["Spinda", "Vigoroth", "Linéon", "Monaflèmit", "Leveinard", "Kangourex", "Leuphorie", "Tauros"]
    }},
  {id:"winona",sprite:"winona",nom:"Winona",role:"Champion d’arène",note:"Champion d’arène — Cimetronelle (Hoenn)",
    equipes:{
      "Document (jeux de Hoenn)":["Hélédelle", "Bekipan", "Airmure", "Altaria"],
      "Émeraude":["Tylton", "Tropius", "Bekipan", "Airmure", "Altaria", "Minidraco", "Hoothoot", "Draco", "Noarfang", "Dracolosse"]
    }},
  {id:"lvyettatia",sprite:"tateandliza",nom:"Lévy et Tatia",alias:"Tate and Liza",role:"Champion d’arène",note:"Champion d’arène — Algatia (Hoenn)",
    equipes:{
      "Document (jeux de Hoenn)":["Solaroc", "Séléroc"],
      "Émeraude":["Kaorine", "Xatu", "Séléroc", "Solaroc", "Ramoloss", "Soporifik", "Hypnomade", "Roigada"]
    }},
  {id:"wallace",sprite:"wallace",nom:"Wallace",role:"Champion d’arène",note:"Champion d’arène — Atalanopolis (Hoenn)",
    equipes:{
      "Document (jeux de Hoenn)":["Lovdisc", "Barbicha", "Phogleur", "Poissoroy", "Milobellus"]
    }},
  {id:"roark",sprite:"roark",nom:"Roark",role:"Champion d’arène",note:"Champion d’arène — Charbourg (Sinnoh)",
    equipes:{
      "Document (jeux de Sinnoh)":["Racaillou", "Onix", "Kranidos"]
    }},
  {id:"gardenia",sprite:"gardenia",nom:"Gardenia",role:"Champion d’arène",note:"Champion d’arène — Vestigion (Sinnoh)",
    equipes:{
      "Document (jeux de Sinnoh)":["Ceribou", "Tortipouss", "Ceriflor", "Roserade"]
    }},
  {id:"maylene",sprite:"maylene",nom:"Maylene",role:"Champion d’arène",note:"Champion d’arène — Voilaroc (Sinnoh)",
    equipes:{
      "Document (jeux de Sinnoh)":["Méditikka", "Machopeur", "Lucario"]
    }},
  {id:"crasherwake",sprite:"crasherwake",nom:"Crasher Wake",role:"Champion d’arène",note:"Champion d’arène — Joliberges (Sinnoh)",
    equipes:{
      "Document (jeux de Sinnoh)":["Léviator", "Maraiste", "Mustéflott"]
    }},
  {id:"fantina",sprite:"fantina",nom:"Fantina",role:"Champion d’arène",note:"Champion d’arène — Unionpolis (Sinnoh)",
    equipes:{
      "Document (jeux de Sinnoh)":["Skelénox", "Grodrive", "Spectrum", "Ectoplasma", "Magirêve"]
    }},
  {id:"byron",sprite:"byron",nom:"Byron",role:"Champion d’arène",note:"Champion d’arène — Rivamar (Sinnoh)",
    equipes:{
      "Document (jeux de Sinnoh)":["Archéomire", "Steelix", "Bastiodon"]
    }},
  {id:"candice",sprite:"candice",nom:"Candice",role:"Champion d’arène",note:"Champion d’arène — Frimapic (Sinnoh)",
    equipes:{
      "Document (jeux de Sinnoh)":["Blizzi", "Farfuret", "Charmina", "Blizzaroi", "Momartik"]
    }},
  {id:"volkner",sprite:"volkner",nom:"Volkner",role:"Champion d’arène",note:"Champion d’arène — Rivamar (Sinnoh)",
    equipes:{
      "Document (jeux de Sinnoh)":["Voltali", "Raichu", "Luxray", "Élekable"]
    }},
  {id:"violette",sprite:"viola",nom:"Violette",alias:"Viola",role:"Champion d’arène",note:"Champion d’arène — Santalune (Kalos)",
    equipes:{
      "Document (Kalos)":["Arakdo", "Prismillon"]
    }},
  {id:"lino",sprite:"grant",nom:"Lino",alias:"Grant",role:"Champion d’arène",note:"Champion d’arène — Cyllage (Kalos)",
    equipes:{
      "Document (Kalos)":["Amagara", "Ptyranidur"]
    }},
  {id:"cornlia",sprite:"korrina",nom:"Cornélia",alias:"Korrina",role:"Champion d’arène",note:"Champion d’arène — Shalour (Kalos)",
    equipes:{
      "Document (Kalos)":["Kungfouine", "Machopeur", "Brutalibré"]
    }},
  {id:"ramos",sprite:"ramos",nom:"Ramos",role:"Champion d’arène",note:"Champion d’arène — Coumarine (Kalos)",
    equipes:{
      "Document (Kalos)":["Cotovol", "Boustiflor", "Chevroum"]
    }},
  {id:"lem",sprite:"clemont",nom:"Lem",alias:"Clemont",role:"Champion d’arène",note:"Champion d’arène — Illumis (Kalos)",
    equipes:{
      "Document (Kalos)":["Emolga", "Magnéton", "Iguolta"]
    }},
  {id:"valriane",sprite:"valerie",nom:"Valériane",alias:"Valerie",role:"Champion d’arène",note:"Champion d’arène — Laverre (Kalos)",
    equipes:{
      "Document (Kalos)":["Mysdibule", "M. Mime", "Nymphali"]
    }},
  {id:"astera",sprite:"olympia",nom:"Astera",alias:"Olympia",role:"Champion d’arène",note:"Champion d’arène — Anistar (Kalos)",
    equipes:{
      "Document (Kalos)":["Cryptéro", "Roigada", "Mistigrix"]
    }},
  {id:"urup",sprite:"wulfric",nom:"Urup",alias:"Wulfric",role:"Champion d’arène",note:"Champion d’arène — Snowbelle (Kalos)",
    equipes:{
      "Document (Kalos)":["Blizzaroi", "Hexagel", "Séracrawl"]
    }},
  {id:"hala",sprite:"hala",nom:"Hala",role:"Kahuna (Grandes Épreuves)",note:"Kahuna (Grandes Épreuves) — Melemele (Alola)",
    equipes:{
      "Document (Alola)":["Machoc", "Makuhita", "Crabagarre"]
    }},
  {id:"olivia",sprite:"olivia",nom:"Olivia",role:"Kahuna (Grandes Épreuves)",note:"Kahuna (Grandes Épreuves) — Akala (Alola)",
    equipes:{
      "Document (Alola)":["Anorith", "Lilia", "Lougaroc"]
    }},
  {id:"nanu",sprite:"nanu",nom:"Nanu",role:"Kahuna (Grandes Épreuves)",note:"Kahuna (Grandes Épreuves) — Ula'ula (Alola)",
    equipes:{
      "Document (Alola)":["Ténéfix", "Escroco", "Absol", "Persian"]
    }},
  {id:"hapu",sprite:"hapu",nom:"Hapu",role:"Kahuna (Grandes Épreuves)",note:"Kahuna (Grandes Épreuves) — Poni (Alola)",
    equipes:{
      "Document (Alola)":["Golemastoc", "Tritosor", "Libégon", "Bourrinos"]
    }},
  {id:"milo",sprite:"milo",nom:"Milo",role:"Champion d’arène",note:"Champion d’arène — Turffield (Galar)",
    equipes:{
      "Document (Galar)":["Tournicoton", "Blancoton"]
    }},
  {id:"nessa",sprite:"nessa",nom:"Nessa",role:"Champion d’arène",note:"Champion d’arène — Hulbury (Galar)",
    equipes:{
      "Document (Galar)":["Poissirène", "Embrochet", "Torgamord"]
    }},
  {id:"kabu",sprite:"kabu",nom:"Kabu",role:"Champion d’arène",note:"Champion d’arène — Motostoke (Galar)",
    equipes:{
      "Document (Galar)":["Feunard", "Arcanin", "Scolocendre"]
    }},
  {id:"bea",sprite:"bea",nom:"Bea",role:"Champion d’arène",note:"Champion d’arène — Stow-on-Side (Galar)",
    equipes:{
      "Document (Galar)":["Kapoera", "Pandarbare", "Palarticho", "Mackogneur"]
    }},
  {id:"allister",sprite:"allister",nom:"Allister",role:"Champion d’arène",note:"Champion d’arène — Stow-on-Side (Galar)",
    equipes:{
      "Document (Galar)":["Tutafeh", "Mimiqui", "Corayôme", "Ectoplasma"]
    }},
  {id:"opal",sprite:"opal",nom:"Opal",role:"Champion d’arène",note:"Champion d’arène — Ballonlea (Galar)",
    equipes:{
      "Document (Galar)":["Smogogo", "Mysdibule", "Togekiss", "Charmilly"]
    }},
  {id:"gordie",sprite:"gordie",nom:"Gordie",role:"Champion d’arène",note:"Champion d’arène — Circhester (Galar)",
    equipes:{
      "Document (Galar)":["Golgopathe", "Caratroc", "Dolman", "Monthracite"]
    }},
  {id:"melony",sprite:"melony",nom:"Melony",role:"Champion d’arène",note:"Champion d’arène — Circhester (Galar)",
    equipes:{
      "Document (Galar)":["Beldeneige", "Darumacho", "Bekaglaçon", "Lokhlass"]
    }},
  {id:"piers",sprite:"piers",nom:"Piers",role:"Champion d’arène",note:"Champion d’arène — Spikemuth (Galar)",
    equipes:{
      "Document (Galar)":["Baggaïd", "Sepiatroce", "Moufflair", "Ixon"]
    }},
  {id:"raihan",sprite:"raihan",nom:"Raihan",role:"Champion d’arène",note:"Champion d’arène — Hammerlocke (Galar)",
    equipes:{
      "Document (Galar)":["Gigalithe", "Libégon", "Dunaconda", "Duralugon"]
    }},
  {id:"katy",sprite:"katy",nom:"Katy",role:"Champion d’arène",note:"Champion d’arène — Cortondo (Paldea)",
    equipes:{
      "Document (Paldea)":["Lilliterelle", "Tissenboule", "Teddiursa"]
    }},
  {id:"brassius",sprite:"brassius",nom:"Brassius",role:"Champion d’arène",note:"Champion d’arène — Artazon (Paldea)",
    equipes:{
      "Document (Paldea)":["Chlorobule", "Olivini", "Simularbre"]
    }},
  {id:"iono",sprite:"iono",nom:"Iono",role:"Champion d’arène",note:"Champion d’arène — Levincia (Paldea)",
    equipes:{
      "Document (Paldea)":["Zapétrel", "Luxio", "Ampibidou", "Magirêve"]
    }},
  {id:"kofu",sprite:"kofu",nom:"Kofu",role:"Champion d’arène",note:"Champion d’arène — Cascarrafa (Paldea)",
    equipes:{
      "Document (Paldea)":["Délestin", "Triopikeau", "Crabominable"]
    }},
  {id:"larry",sprite:"larry",nom:"Larry",role:"Champion d’arène",note:"Champion d’arène — Medali (Paldea)",
    equipes:{
      "Document (Paldea)":["Dodoala", "Deusolourdo", "Étouraptor"]
    }},
  {id:"ryme",sprite:"ryme",nom:"Ryme",role:"Champion d’arène",note:"Champion d’arène — Montenevera (Paldea)",
    equipes:{
      "Document (Paldea)":["Branette", "Mimiqui", "Tomberro", "Salarsen"]
    }},
  {id:"tulip",sprite:"tulip",nom:"Tulip",role:"Champion d’arène",note:"Champion d’arène — Alfornada (Paldea)",
    equipes:{
      "Document (Paldea)":["Farigiraf", "Gardevoir", "Gallame", "Florges"]
    }},
  {id:"grusha",sprite:"grusha",nom:"Grusha",role:"Champion d’arène",note:"Champion d’arène — Glaseado (Paldea)",
    equipes:{
      "Document (Paldea)":["Beldeneige", "Polagriffe", "Balbalèze", "Altaria"]
    }},
  {id:"janine",sprite:"janine",nom:"Janine",role:"Champion d’arène",note:"Champion d’arène — Parmanie (Kanto)",
    equipes:{
      "Document (variantes)":["Nostenfer", "Smogogo", "Migalos", "Aéromite"],
      "HeartGold/SoulSilver":["Nostenfer", "Smogogo", "Migalos", "Aéromite", "Coatox", "Drascore"]
    }},
  {id:"juan",sprite:"juan",nom:"Juan",role:"Champion d’arène",note:"Champion d’arène — Atalanopolis (Hoenn)",
    equipes:{
      "Document (variantes)":["Lovdisc", "Barbicha", "Phogleur", "Colhomard", "Hyporoi"],
      "Émeraude":["Lovdisc", "Barbicha", "Phogleur", "Colhomard", "Hyporoi", "Ptitard", "Kaimorse", "Têtarte", "Lokhlass", "Tarpaud"]
    }},
  {id:"cilan",sprite:"cilan",nom:"Cilan",role:"Champion d’arène",note:"Champion d’arène — Ogozit (Unys)",
    equipes:{
      "Noir/Blanc (document + Ponchiot ajouté)":["Feuillajou", "Ponchiot"]
    }},
  {id:"chili",sprite:"chili",nom:"Chili",role:"Champion d’arène",note:"Champion d’arène — Ogozit (Unys)",
    equipes:{
      "Noir/Blanc (document + Ponchiot ajouté)":["Flamajou", "Ponchiot"]
    }},
  {id:"cress",sprite:"cress",nom:"Cress",role:"Champion d’arène",note:"Champion d’arène — Ogozit (Unys)",
    equipes:{
      "Noir/Blanc (document + Ponchiot ajouté)":["Flotajou", "Ponchiot"]
    }},
  {id:"lenora",sprite:"lenora",nom:"Lenora",role:"Champion d’arène",note:"Champion d’arène — Ondes-sur-Mer (Unys)",
    equipes:{
      "Noir/Blanc":["Ponchien", "Miradar"]
    }},
  {id:"burgh",sprite:"burgh",nom:"Burgh",role:"Champion d’arène",note:"Champion d’arène — Volucité (Unys)",
    equipes:{
      "Noir/Blanc":["Scobolide", "Crabicoque", "Manternel"],
      "Noir 2/Blanc 2":["Couverdure", "Crabicoque", "Manternel"]
    }},
  {id:"elesa",sprite:"elesa",nom:"Elesa",role:"Champion d’arène",note:"Champion d’arène — Méanville (Unys)",
    equipes:{
      "Noir/Blanc":["Emolga", "Zéblitz"],
      "Noir 2/Blanc 2":["Emolga", "Lainergie", "Zéblitz"]
    }},
  {id:"clay",sprite:"clay",nom:"Clay",role:"Champion d’arène",note:"Champion d’arène — Port-Yoneuve (Unys)",
    equipes:{
      "Noir/Blanc":["Escroco", "Batracné", "Minotaupe"],
      "Noir 2/Blanc 2":["Mascaïman", "Batracné", "Minotaupe"]
    }},
  {id:"skyla",sprite:"skyla",nom:"Skyla",role:"Champion d’arène",note:"Champion d’arène — Parmano (Unys)",
    equipes:{
      "Noir/Blanc":["Rhinolove", "Déflaisan", "Lakmécygne"],
      "Noir 2/Blanc 2":["Rhinolove", "Airmure", "Lakmécygne"]
    }},
  {id:"brycen",sprite:"brycen",nom:"Brycen",role:"Champion d’arène",note:"Champion d’arène — Flocombe (Unys)",
    equipes:{
      "Noir/Blanc":["Sorboul", "Hexagel", "Polagriffe"]
    }},
  {id:"drayden",sprite:"drayden",nom:"Drayden",role:"Champion d’arène",note:"Champion d’arène — Parmano (Unys)",
    equipes:{
      "Noir/Blanc":["Incisache", "Drakkarmin", "Tranchodon"],
      "Noir 2/Blanc 2":["Drakkarmin", "Libégon", "Tranchodon"]
    }},
  {id:"iris",sprite:"iris",nom:"Iris",role:"Champion d’arène",note:"Champion d’arène — Parmano (Unys)",
    equipes:{
      "Noir/Blanc":["Incisache", "Drakkarmin", "Tranchodon"]
    }},
  {id:"cheren",sprite:"cheren",nom:"Cheren",role:"Champion d’arène",note:"Champion d’arène — Ogozit (Unys)",
    equipes:{
      "Noir 2/Blanc 2":["Ratentif", "Ponchiot"]
    }},
  {id:"roxie",sprite:"roxie",nom:"Roxie",role:"Champion d’arène",note:"Champion d’arène — Port-Yoneuve (Unys)",
    equipes:{
      "Noir 2/Blanc 2":["Smogo", "Scobolide"]
    }},
  {id:"marlon",sprite:"marlon",nom:"Marlon",role:"Champion d’arène",note:"Champion d’arène — Hurle-Vague (Unys)",
    equipes:{
      "Noir 2/Blanc 2":["Mégapagos", "Wailord", "Moyade"]
    }}
];
