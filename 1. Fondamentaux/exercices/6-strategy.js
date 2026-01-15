// ===================================
// PARTIE 1 : OBJET DES STRATÉGIES
// ===================================

const strategiesAire = {
  // Rectangle : largeur × hauteur
  rectangle: (largeur, hauteur) => largeur * hauteur,

  // Carré : côté × côté
  carre: (cote) => cote * cote,

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
  const strategie = strategiesAire[forme];

  if (!strategie) {
    return `Erreur : la forme "${forme}" n'existe pas.`;
  }

  return strategie(...dimensions);
}

// ===================================
// PARTIE 3 : FONCTION D'AFFICHAGE
// ===================================

function afficherResultat(forme, ...dimensions) {
  const resultat = calculerAire(forme, ...dimensions);

  if (typeof resultat === "string") {
    console.log(resultat);
  } else {
    console.log(`L'aire du ${forme} est de ${resultat} unités²`);
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
afficherResultat("rectangle", 5, 3);
console.log();

// Test 2 : Carré
console.log("Test 2 - Carré (côté = 4) :");
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
console.log(calculerAire("pentagone", 5));
console.log();

// ===================================
// TESTS BONUS
// ===================================

console.log("=== TESTS BONUS ===\n");

// Test 7 : Lister les formes disponibles
console.log("Formes disponibles :");
console.log(listerFormesDisponibles());
console.log();
