// ===================================
// PARTIE 1 : OBJET DES STRATÉGIES
// ===================================

const strategiesAire = {
<<<<<<< HEAD:1. Fondamentaux/6-strategy.js
  // Rectangle : largeur × hauteur
  rectangle: (largeur, hauteur) => largeur * hauteur,

  // Carré : côté × côté
  carre: (cote) => cote * cote,
=======
  // TODO : Stratégie pour le rectangle
  // Formule : largeur × hauteur
  // Paramètres : largeur, hauteur
  rectangle: (largeur, hauteur) => largeur * hauteur, // Remplacer null par une fonction

  // TODO : Stratégie pour le carré
  // Formule : côté × côté
  // Paramètres : cote
  carre: (cote) => Math.pow(cote, 2), // Remplacer null par une fonction
>>>>>>> dc22850fcc3a032b12910db828b8076593f0d5d2:1. Fondamentaux/correction/6-strategy.js

  // Triangle : (base × hauteur) / 2
  triangle: (base, hauteur) => (base * hauteur) / 2,

  // Cercle : π × rayon²
  cercle: (rayon) => Math.PI * rayon * rayon,

  // Trapèze : ((petiteBase + grandeBase) × hauteur) / 2
  trapeze: (petiteBase, grandeBase, hauteur) =>
    ((petiteBase + grandeBase) * hauteur) / 2,
};

// ===================================
// PARTIE 2 : FONCTION CALCULATEUR
// ===================================

function calculerAire(forme, ...dimensions) {
<<<<<<< HEAD:1. Fondamentaux/6-strategy.js
  const strategie = strategiesAire[forme];

  if (!strategie) {
    return `Erreur : la forme "${forme}" n'existe pas.`;
  }

  return strategie(...dimensions);
=======
  // TODO : Vérifier si la forme existe dans strategiesAire
  // TODO : Si la forme n'existe pas, retourner un message d'erreur
  // TODO : Sinon, appeler la stratégie correspondante avec les dimensions

  const aireFunc = strategiesAire[forme];
  if (!aireFunc) {
    console.log("Forme non accepté");
    return;
  }

  return strategiesAire[forme](...dimensions);
>>>>>>> dc22850fcc3a032b12910db828b8076593f0d5d2:1. Fondamentaux/correction/6-strategy.js
}

// ===================================
// PARTIE 3 : FONCTION D'AFFICHAGE
// ===================================

function afficherResultat(forme, ...dimensions) {
<<<<<<< HEAD:1. Fondamentaux/6-strategy.js
  const resultat = calculerAire(forme, ...dimensions);

  if (typeof resultat === "string") {
    console.log(resultat);
  } else {
    console.log(`L'aire du ${forme} est de ${resultat} unités²`);
=======
  // TODO : Appeler calculerAire
  // TODO : Afficher le résultat de manière lisible
  // Format suggéré : "L'aire du [forme] est de [resultat] unités²"

  const result = calculerAire(forme, ...dimensions);
  if (result != null) {
    console.log(`L'aire du [${forme}] est de [${result}] unités²`);
>>>>>>> dc22850fcc3a032b12910db828b8076593f0d5d2:1. Fondamentaux/correction/6-strategy.js
  }
}

// ===================================
// PARTIE 4 (BONUS) : LISTER LES FORMES DISPONIBLES
// ===================================

function listerFormesDisponibles() {
  return Object.keys(strategiesAire);
}

// ===================================
// TESTS
// ===================================

console.log("=== TESTS DU CALCULATEUR D'AIRES ===\n");

// Test 1 : Rectangle
console.log("Test 1 - Rectangle (5 × 3) :");
<<<<<<< HEAD:1. Fondamentaux/6-strategy.js
=======
// TODO : Décommenter après avoir complété la fonction
>>>>>>> dc22850fcc3a032b12910db828b8076593f0d5d2:1. Fondamentaux/correction/6-strategy.js
afficherResultat("rectangle", 5, 3);
console.log();

// Test 2 : Carré
console.log("Test 2 - Carré (côté = 4) :");
<<<<<<< HEAD:1. Fondamentaux/6-strategy.js
=======
// TODO : Décommenter après avoir complété la fonction
>>>>>>> dc22850fcc3a032b12910db828b8076593f0d5d2:1. Fondamentaux/correction/6-strategy.js
afficherResultat("carre", 4);
console.log();

// Test 3 : Triangle
console.log("Test 3 - Triangle (base = 6, hauteur = 4) :");
afficherResultat("triangle", 6, 4);
console.log();

// Test 4 : Cercle
console.log("Test 4 - Cercle (rayon = 5) :");
afficherResultat("cercle", 5);
console.log();

// Test 5 : Trapèze
console.log("Test 5 - Trapèze (petiteBase = 3, grandeBase = 7, hauteur = 4) :");
afficherResultat("trapeze", 3, 7, 4);
console.log();

// Test 6 : Forme inexistante
console.log("Test 6 - Forme inexistante :");
<<<<<<< HEAD:1. Fondamentaux/6-strategy.js
console.log(calculerAire("pentagone", 5));
=======
// TODO : Décommenter après avoir complété la fonction
afficherResultat("pentagone", 5);
>>>>>>> dc22850fcc3a032b12910db828b8076593f0d5d2:1. Fondamentaux/correction/6-strategy.js
console.log();

// ===================================
// TESTS BONUS
// ===================================

console.log("=== TESTS BONUS ===\n");

// Test 7 : Lister les formes disponibles
console.log("Formes disponibles :");
console.log(listerFormesDisponibles());
console.log();
