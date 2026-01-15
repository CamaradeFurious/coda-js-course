// DONNÉES DU PANIER
const montantPanier = 230; // Montant initial du panier en euros
const possedeCarteFidelite = false; // Le client a-t-il une carte de fidélité ?
const estJourDeSoldes = true; // Sommes-nous un jour de soldes ?

// VARIABLES À CALCULER
let reductionAppliquee = 0; // Pourcentage de réduction à appliquer
let montantApresReduction = 0; // Montant après application de la réduction
let fraisDePort = 0; // Frais de port à appliquer
let totalFinal = 0; // Montant total final à payer

// ===================================
// ÉTAPE 1 : CALCUL DE LA MEILLEURE RÉDUCTION
// ===================================

// Carte de fidélité : -10%
if (possedeCarteFidelite) {
  reductionAppliquee = 10;
}

// Jour de soldes : -20%
if (estJourDeSoldes && reductionAppliquee < 20) {
  reductionAppliquee = 20;
}

// Montant > 100€ : -5%
if (montantPanier > 100 && reductionAppliquee < 5) {
  reductionAppliquee = 5;
}

// ===================================
// ÉTAPE 2 : CALCUL DU MONTANT APRÈS RÉDUCTION
// ===================================
montantApresReduction =
  montantPanier - (montantPanier * reductionAppliquee) / 100;

// ===================================
// ÉTAPE 3 : CALCUL DES FRAIS DE PORT
// ===================================
if (montantApresReduction > 50) {
  fraisDePort = 0;
} else if (montantApresReduction >= 20) {
  fraisDePort = 5;
} else {
  fraisDePort = 8;
}

// ===================================
// ÉTAPE 4 : CALCUL DU TOTAL FINAL
// ===================================
totalFinal = montantApresReduction + fraisDePort;

// ===================================
// AFFICHAGE DES RÉSULTATS
// ===================================
console.log("=== RÉCAPITULATIF DE VOTRE COMMANDE ===");
console.log(`Montant initial : ${montantPanier}€`);
console.log(`Réduction appliquée : ${reductionAppliquee}%`);
console.log(`Montant après réduction : ${montantApresReduction}€`);
console.log(`Frais de port : ${fraisDePort}€`);
console.log(`TOTAL FINAL : ${totalFinal}€`);
