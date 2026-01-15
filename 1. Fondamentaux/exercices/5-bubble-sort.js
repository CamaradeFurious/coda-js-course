// ===================================
// PARTIE 1 : FONCTION D'ÉCHANGE
// ===================================

<<<<<<< HEAD:1. Fondamentaux/5-bubble-sort.js
// Cette fonction NE modifie PAS le tableau original
function echanger(tableau, index1, index2) {
  const copie = [...tableau];
  const temp = copie[index1];
  copie[index1] = copie[index2];
  copie[index2] = temp;
  return copie;
}
=======
// TODO : Créer une fonction qui échange deux éléments dans un tableau
// Paramètres : tableau, index1, index2
// Cette fonction ne modifie pas le tableau directement

function echanger(tableau, index1, index2) {}
>>>>>>> dc22850fcc3a032b12910db828b8076593f0d5d2:1. Fondamentaux/exercices/5-bubble-sort.js

// ===================================
// PARTIE 2 : TRI À BULLE - VERSION BASIQUE
// ===================================

<<<<<<< HEAD:1. Fondamentaux/5-bubble-sort.js
function triABulle(tableau) {
  let resultat = [...tableau];

  for (let i = 0; i < resultat.length - 1; i++) {
    for (let j = 0; j < resultat.length - 1 - i; j++) {
      if (resultat[j] > resultat[j + 1]) {
        resultat = echanger(resultat, j, j + 1);
      }
    }
  }

  return resultat;
}
=======
// TODO : Créer une fonction triABulle qui trie un tableau de nombres
// Paramètres : tableau (array de numbers)
// Return : le tableau trié

function triABulle(tableau) {}
>>>>>>> dc22850fcc3a032b12910db828b8076593f0d5d2:1. Fondamentaux/exercices/5-bubble-sort.js

// ===================================
// PARTIE 3 : TRI À BULLE OPTIMISÉ
// ===================================

function triABulleOptimise(tableau) {
<<<<<<< HEAD:1. Fondamentaux/5-bubble-sort.js
  let resultat = [...tableau];
  let echange;

  for (let i = 0; i < resultat.length - 1; i++) {
    echange = false;

    for (let j = 0; j < resultat.length - 1 - i; j++) {
      if (resultat[j] > resultat[j + 1]) {
        resultat = echanger(resultat, j, j + 1);
        echange = true;
      }
    }

    if (!echange) {
      break;
    }
  }

  return resultat;
=======
    // Votre code ici
>>>>>>> dc22850fcc3a032b12910db828b8076593f0d5d2:1. Fondamentaux/exercices/5-bubble-sort.js
}

// ===================================
// TESTS
// ===================================

console.log("=== TESTS DU TRI À BULLE ===\n");

// Test 1 : Tableau désorganisé
const tableau1 = [64, 34, 25, 12, 22, 11, 90];
console.log("Tableau original :", tableau1);
console.log("Tableau trié :", triABulle([...tableau1]));
console.log();

// Test 2 : Tableau déjà trié
const tableau2 = [1, 2, 3, 4, 5];
console.log("Tableau déjà trié :", tableau2);
console.log("Résultat :", triABulle([...tableau2]));
console.log();

// Test 3 : Tableau en ordre inverse
const tableau3 = [5, 4, 3, 2, 1];
console.log("Tableau inversé :", tableau3);
console.log("Résultat :", triABulle([...tableau3]));
console.log();

// Test 4 : Tableau avec doublons
const tableau4 = [3, 7, 3, 1, 7, 2];
console.log("Tableau avec doublons :", tableau4);
console.log("Résultat :", triABulle([...tableau4]));
console.log();

// ===================================
// TESTS VERSION OPTIMISÉE
// ===================================

console.log("=== TESTS VERSION OPTIMISÉE ===\n");

const tableau5 = [64, 34, 25, 12, 22, 11, 90];
console.log("Avec optimisation :", triABulleOptimise([...tableau5]));
