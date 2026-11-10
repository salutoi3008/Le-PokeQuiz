# Le-PokeQuiz

Quiz Pokémon en français, jouable directement dans le navigateur (page statique, sans installation).
8 épreuves, 3 modes de jeu (Libre, Versus, Compétition) et un classement en ligne.

> Projet de fan, sans lien officiel avec Nintendo, Game Freak ou The Pokémon Company.
> Pokémon et tous les noms associés sont des marques de leurs propriétaires.

## Épreuves

| # | Épreuve | Principe | Points max |
|---|---|---|---|
| 1 | Écho Sauvage | Reconnaître un Pokémon à son cri (4 manches) | 15 |
| 2 | Les Archives du Pokédex | Retrouver le Pokémon grâce à sa description | 9 |
| 3 | Carte au Trésor | *bientôt* | 6 |
| 4 | Anime Attitude | Questions sur l'anime | 10 |
| 5 | Game Master | Questions sur les jeux et spin-off | 10 |
| 6 | Légendes Sonores | *bientôt* | 15 |
| 7 | Duel de Types | Donner un Pokémon qui a le type affiché | 20 |
| 8 | Défis du Dresseur | Donner des Pokémon (de lignées différentes) d'un dresseur | 16 |

## Organisation du dépôt

```
Le-PokeQuiz/
├── index.html          Page unique : charge les données puis script.js
├── style.css           Mise en forme
├── script.js           Tout le jeu (épreuves, modes, écrans, comptes) — commenté en français
├── donnees/            Les données du jeu (un fichier par sujet)
│   ├── echo.js         Pokémon de l'épreuve 1 (numéro, nom, types)
│   ├── pokedex.js      Descriptions de Pokédex de l'épreuve 2
│   ├── dresseurs.js    Rivaux et Giovanni (épreuve 8)
│   ├── champions.js    Champions d'arène et Kahunas (épreuve 8)
│   └── lignees.js      Lignées d'évolution (une lignée = une seule réponse)
├── sprites/
│   └── dresseurs/      Sprites des dresseurs, facultatif (pryce.png, blue.png…)
└── docs/               Documents de travail (cahier des charges, feuilles de route…)
```

L'ordre de chargement dans `index.html` compte : les fichiers de `donnees/` doivent être chargés **avant** `script.js`.

## Modifier le contenu

- **Ajouter une question** (épreuves 4 et 5) : dans `script.js`, ajouter une ligne `["Question ?","Bonne réponse","Variante acceptée"]` dans la liste `q:` de l'épreuve. Les accents et les majuscules sont ignorés.
- **Ajouter un dresseur** : copier un bloc dans `donnees/dresseurs.js`, changer `id`, `sprite`, `nom`, `note` et remplir `equipes` avec les noms français des Pokémon. Un dresseur n'est tiré que s'il a au moins 3 lignées d'évolution différentes.
- **Ajouter un sprite de dresseur** : déposer `sprites/dresseurs/<sprite>.png`, en minuscules (GitHub Pages distingue majuscules et minuscules).

Chaque fichier de `donnees/` commence par un commentaire qui explique son format et comment le régénérer.

## Sources des données

- [PokéAPI](https://pokeapi.co) (fichiers CSV du dépôt `PokeAPI/pokeapi`) : noms français, types, descriptions, lignées d'évolution ; cris et sprites de Pokémon (dépôts `PokeAPI/cries` et `PokeAPI/sprites`).
- Projet [pret](https://github.com/pret) : équipes des dresseurs de Rouge/Bleu, Jaune, Or/Argent/Cristal, Rouge Feu/Vert Feuille, Émeraude et HeartGold/SoulSilver.
- Sprites de dresseurs : [Pokémon Showdown](https://play.pokemonshowdown.com), à titre de repli.
- Équipes des générations 4 à 9, de l'anime et des films : recherches personnelles à partir de Bulbapedia, Serebii, Pokémon Database, etc.

## Lancer en local

Ouvrir `index.html` dans un navigateur. Le classement en ligne nécessite le serveur associé.
