const originalConsole = {
  log: console.log.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
};

function obtenirHorodatage() {
  const maintenant = new Date();

  const h = String(maintenant.getHours()).padStart(2, "0");
  const m = String(maintenant.getMinutes()).padStart(2, "0");
  const s = String(maintenant.getSeconds()).padStart(2, "0");
  const ms = String(maintenant.getMilliseconds()).padStart(3, "0");

  return `[${h}:${m}:${s}.${ms}]`;
}

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

console.log = consoleProxy.log;
console.warn = consoleProxy.warn;
console.error = consoleProxy.error;

console.log("Ceci est un message d'information");
console.warn("Attention, ceci est un avertissement");
console.error("Une erreur s'est produite");


