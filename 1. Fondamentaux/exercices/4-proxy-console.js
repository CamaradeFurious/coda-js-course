const originalConsole = {
  log: console.log.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
};

<<<<<<< HEAD:1. Fondamentaux/4-proxy-console.js
function obtenirHorodatage() {
  const maintenant = new Date();

  const h = String(maintenant.getHours()).padStart(2, "0");
  const m = String(maintenant.getMinutes()).padStart(2, "0");
  const s = String(maintenant.getSeconds()).padStart(2, "0");
  const ms = String(maintenant.getMilliseconds()).padStart(3, "0");

  return `[${h}:${m}:${s}.${ms}]`;
}
=======
function obtenirHorodatage() {}
>>>>>>> dc22850fcc3a032b12910db828b8076593f0d5d2:1. Fondamentaux/exercices/4-proxy-console.js

const consoleProxy = new Proxy(console, {
  get(target, prop) {
    if (["log", "warn", "error"].includes(prop)) {
      return function (...args) {
        const horodatage = obtenirHorodatage();
        originalConsole[prop](horodatage, ...args);
      };
    }
    return target[prop];
  },
});

<<<<<<< HEAD:1. Fondamentaux/4-proxy-console.js
console.log = consoleProxy.log;
console.warn = consoleProxy.warn;
console.error = consoleProxy.error;

=======
// ===================================
// TESTS
// ===================================

// Test de la méthode log
>>>>>>> dc22850fcc3a032b12910db828b8076593f0d5d2:1. Fondamentaux/exercices/4-proxy-console.js
console.log("Ceci est un message d'information");
console.warn("Attention, ceci est un avertissement");
console.error("Une erreur s'est produite");


