/*
 * donnees/dresseurs.js — équipes des dresseurs pour l'épreuve « Défis du Dresseur(s) »
 *
 * FORMAT : const DRESSEURS = [ { id, sprite, nom, role, note, equipes:{ "jeu":[noms de Pokémon…] } }, … ]
 *   - id/nom/role : identifiant interne, nom affiché, catégorie (ici « Rival »)
 *   - sprite      : nom du sprite du dresseur chez Pokémon Showdown (voir TSPR dans script.js)
 *   - equipes     : une liste par jeu ; chaque liste regroupe TOUS les Pokémon rencontrés dans ce jeu
 *                   (tous les combats du dresseur et toutes les variantes selon le starter choisi)
 *   - L'épreuve 8 acceptera un Pokémon présent dans n'importe quelle équipe du dresseur (union des jeux).
 *
 * ORIGINE : données extraites des fichiers de jeu décompilés du projet « pret » (GitHub) :
 *   pokered, pokeyellow, pokecrystal, pokefirered, pokeemerald, pokeheartgold ;
 *   noms français tirés des CSV de PokéAPI (pokemon_species_names.csv, language_id = 5).
 *   Ce ne sont donc pas des listes écrites de mémoire : elles reflètent le contenu réel des jeux.
 *
 * COUVERT : Blue (Rouge/Bleu, Jaune, Rouge Feu/Vert Feuille, HeartGold/SoulSilver), Silver (Or/Argent/Cristal,
 *   HeartGold/SoulSilver), Brendan et May (Émeraude), Giovanni (RB, Jaune, RFVF, HGSS vérifiés dans les données des jeux ;
 *   Let’s Go, Ultra-Soleil/Lune et anime d’après le document fourni, l’anime étant recoupé avec Serebii/Bulbapedia).
 * PAS ENCORE COUVERT : Rubis/Saphir/ROSA/ASO, Barry (DPPt), génération 5 à 9, dresseurs de l'anime et des films.
 *
 * CHAMP FACULTATIF a_verifier : Pokémon dont l'appartenance au dresseur est à confirmer. Le jeu les ACCEPTE comme les autres
 *   (décision d'Enzo) ; le champ sert seulement à garder la trace de ceux qu'il faudra vérifier.
 *
 * POUR AJOUTER UN RIVAL : copier un bloc { … }, changer id/nom/note, remplir « equipes » avec les noms français.
 */
const DRESSEURS=[
  {id:"blue",sprite:"blue",nom:"Blue",role:"Rival",note:"Rival de Rouge/Bleu/Jaune, Rouge Feu/Vert Feuille et HeartGold/SoulSilver (Arène de Jadielle)",
    equipes:{
      "Rouge/Bleu":["Carapuce", "Bulbizarre", "Salamèche", "Roucool", "Roucoups", "Abra", "Rattata", "Rattatac", "Kadabra", "Carabaffe", "Herbizarre", "Reptincel", "Caninos", "Noeunoeuf", "Léviator", "Roucarnage", "Alakazam", "Tortank", "Florizarre", "Dracaufeu", "Rhinocorne", "Rhinoféros", "Arcanin", "Noadkoko"],
      "Jaune":["Évoli", "Piafabec", "Sabelette", "Rattata", "Rapasdepic", "Kokiyas", "Goupix", "Magnéti", "Sablaireau", "Feunard", "Crustabri", "Kadabra", "Voltali", "Magnéton", "Pyroli", "Aquali", "Noeunoeuf", "Alakazam", "Noadkoko"],
      "Rouge Feu/Vert Feuille":["Carapuce", "Bulbizarre", "Salamèche", "Roucool", "Roucoups", "Abra", "Rattata", "Rattatac", "Kadabra", "Carabaffe", "Herbizarre", "Reptincel", "Caninos", "Noeunoeuf", "Léviator", "Roucarnage", "Alakazam", "Tortank", "Florizarre", "Dracaufeu", "Rhinocorne", "Rhinoféros", "Arcanin", "Noadkoko", "Scarhino", "Tyranocif"],
      "HeartGold/SoulSilver":["Noadkoko", "Arcanin", "Rhinoféros", "Léviator", "Mackogneur", "Roucarnage", "Rhinastoc", "Tyranocif"]
    }},
  {id:"silver",sprite:"silver",nom:"Silver",role:"Rival",note:"Rival d’Or/Argent/Cristal et HeartGold/SoulSilver",
    equipes:{
      "Or/Argent/Cristal":["Germignon", "Héricendre", "Kaiminus", "Fantominus", "Nosferapti", "Macronium", "Feurisson", "Crocrodil", "Spectrum", "Magnéti", "Nosferalto", "Farfuret", "Méganium", "Aligatueur", "Magnéton", "Kadabra", "Typhlosion", "Ectoplasma", "Alakazam", "Nostenfer"],
      "HeartGold/SoulSilver":["Fantominus", "Nosferapti", "Macronium", "Héricendre", "Kaiminus", "Magnéti", "Farfuret", "Nosferalto", "Magnéton", "Spectrum", "Kadabra", "Méganium", "Germignon", "Feurisson", "Typhlosion", "Crocrodil", "Aligatueur", "Ectoplasma", "Alakazam", "Nostenfer"]
    }},
  {id:"brendan",sprite:"brendan",nom:"Brendan",role:"Rival",note:"Rival (version Émeraude)",
    equipes:{
      "Émeraude":["Arcko", "Limagma", "Goélise", "Massko", "Bekipan", "Poussifeu", "Lombre", "Galifeu", "Gobou", "Flobio", "Nénupiot", "Tropius", "Ludicolo"]
    }},
  {id:"may",sprite:"may",nom:"May",role:"Rival",note:"Rivale (version Émeraude)",
    equipes:{
      "Émeraude":["Arcko", "Goélise", "Limagma", "Massko", "Lombre", "Poussifeu", "Galifeu", "Bekipan", "Gobou", "Flobio", "Tropius", "Ludicolo", "Nénupiot", "Chartor"]
    }},
  {id:"giovanni",sprite:"giovanni",nom:"Giovanni",role:"Boss de la Team Rocket",note:"Champion de l’Arène de Jadielle et chef de la Team Rocket (jeux et anime)",
    equipes:{
      "Rouge/Bleu":["Onix", "Rhinocorne", "Kangourex", "Nidorino", "Nidoqueen", "Triopikeur", "Nidoking", "Rhinoféros"],
      "Jaune":["Onix", "Rhinocorne", "Persian", "Nidorino", "Nidoqueen", "Triopikeur", "Nidoking", "Rhinoféros"],
      "Rouge Feu/Vert Feuille":["Onix", "Rhinocorne", "Kangourex", "Nidorino", "Nidoqueen", "Triopikeur", "Nidoking"],
      "HeartGold/SoulSilver":["Nidoking", "Kangourex", "Corboss", "Nidoqueen"],
      "Let’s Go Pikachu/Évoli":["Triopikeur", "Nidoqueen", "Nidoking", "Rhinoféros"],
      "Ultra-Soleil/Ultra-Lune":["Triopikeur", "Nidoking", "Nidoqueen", "Rhinastoc", "Mewtwo"],
      "Anime":["Persian", "Grolem", "Krabboss", "Mackogneur", "Rhinoféros", "Crustabri", "Mewtwo", "Meloetta"]
    },
    // Pokémon de l’anime cités dans le document mais NON confirmés (propriétaire incertain ou utilisation temporaire).
    // Le jeu les accepte quand même (décision d’Enzo) ; on les garde ici pour savoir lesquels vérifier.
    a_verifier:["Démétéros", "Boréas", "Fulguris", "Smogo", "Chovsourir", "Tutafeh", "Viskuse", "Gaulet", "Togepi", "Yanma"]}
];
