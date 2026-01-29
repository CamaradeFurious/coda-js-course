import type { PokemonDetail } from "../api/pokemonApi";
import { fetchPokemonByName } from "../api/pokemonApi"; 

const typeFR: Record<string, string> = {
  fire: "Feu", water: "Eau", grass: "Plante", electric: "Électrique",
  ice: "Glace", fighting: "Combat", poison: "Poison", ground: "Sol",
  flying: "Vol", psychic: "Psy", bug: "Insecte", rock: "Roche",
  ghost: "Spectre", dark: "Ténèbres", dragon: "Dragon", steel: "Acier",
  fairy: "Fée", normal: "Normal"
};
const statsFR: Record<string, string> = {
  hp: "PV", attack: "Attaque", defense: "Défense",
  "special-attack": "Attaque Spéciale", "special-defense": "Défense Spéciale",
  speed: "Vitesse"
};

const typeIcons: Record<string, string> = {
  fire: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fire.svg",
  water: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/water.svg",
  grass: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/grass.svg",
  electric: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/electric.svg",
  ice: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ice.svg",
  fighting: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fighting.svg",
  poison: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/poison.svg",
  ground: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ground.svg",
  flying: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/flying.svg",
  psychic: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/psychic.svg",
  bug: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/bug.svg",
  rock: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/rock.svg",
  ghost: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ghost.svg",
  dark: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dark.svg",
  dragon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dragon.svg",
  steel: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/steel.svg",
  fairy: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fairy.svg",
  normal: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/normal.svg",
};

// Tableau d’efficacité type (attaquant → défenseur)
const typeEffectiveness: Record<string, Record<string, number>> = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, rock: 2, dark: 2, steel: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, fairy: 0.5, ghost: 0 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 },
};


function calculateTypeAdvantages(types: string[]) {
  const allTypes = Object.keys(typeEffectiveness);
  const weakAgainst: string[] = [];
  const resistantAgainst: string[] = [];
  const immuneAgainst: string[] = [];
  const superEffectiveAgainst: string[] = [];

  
  allTypes.forEach(attacker => {
    let mult = 1;
    types.forEach(defender => {
      mult *= typeEffectiveness[attacker][defender] ?? 1;
    });
    if (mult === 0) immuneAgainst.push(attacker);
    else if (mult > 1) weakAgainst.push(attacker);
    else if (mult < 1) resistantAgainst.push(attacker);
  });

  
  types.forEach(attacker => {
    allTypes.forEach(defender => {
      const mult = typeEffectiveness[attacker][defender] ?? 1;
      if (mult > 1 && !superEffectiveAgainst.includes(defender)) {
        superEffectiveAgainst.push(defender);
      }
    });
  });

  return { weakAgainst, resistantAgainst, immuneAgainst, superEffectiveAgainst };
}

export async function renderPokemonDetail(
  pokemon: PokemonDetail,
  container: HTMLElement,
  shiny: boolean
) {
  const sprite = shiny ? pokemon.sprites.shiny : pokemon.sprites.normal;
  container.dataset.currentId = pokemon.id.toString();

  const { weakAgainst, resistantAgainst, immuneAgainst, superEffectiveAgainst } =
    calculateTypeAdvantages(pokemon.types.map(t => t.type.name));

  container.innerHTML = `
    <div class="pokemon-info">
      <img src="${sprite}" alt="${pokemon.nameFR}">
      <div>
        <h2>#${pokemon.id} ${pokemon.nameFR}</h2>
        <div class="types">
          ${pokemon.types.map(
            (t) => `
            <span class="type ${t.type.name}">
              <img src="${typeIcons[t.type.name]}" class="type-icon">
              ${typeFR[t.type.name] || t.type.name}
            </span>`
          ).join("")}
        </div>
        <ul>
          ${pokemon.stats
            .map(
              (s) =>
                `<li>${statsFR[s.stat.name] || s.stat.name} : ${s.base_stat}</li>`
            )
            .join("")}
        </ul>
        <button id="play-cry">🔊 Jouer le cri</button>
      </div>
    </div>

    <h3>Formes spéciales</h3>
    <div id="special-forms-container">
      ${pokemon.specialForms.length === 0
        ? "<p>Aucune</p>"
        : pokemon.specialForms
            .map(
              (f) => `
          <div class="form-card">
            <img src="${f.sprite}" alt="${f.nameFR}">
            <p>${f.nameFR}</p>
          </div>`
            )
            .join("")}
    </div>

    <h3>Évolution</h3>
    <div class="evolution-chain">
      ${pokemon.evolution
        ?.map(
          (e) => `
        <div class="evo-card" data-id="${e.id}">
          <img src="${e.sprite}" alt="${e.nameFR}">
          <p>#${e.id} ${e.nameFR}</p>
        </div>`
        )
        .join(" → ") || "<p>Aucune</p>"}
    </div>

    <h3>Faiblesses, Résistances et Super efficace</h3>
    <div class="type-advantages">

      <div class="weak">
        <h4>Faible contre :</h4>
        ${weakAgainst
          .map(
            (t) => `
          <span class="type ${t}">
            <img src="${typeIcons[t]}" class="type-icon">${typeFR[t]}
          </span>`
          )
          .join("")}
      </div>

      <div class="resist">
        <h4>Résistant contre :</h4>
        ${resistantAgainst
          .map(
            (t) => `
          <span class="type ${t}">
            <img src="${typeIcons[t]}" class="type-icon">${typeFR[t]}
          </span>`
          )
          .join("")}
      </div>

      <div class="immune">
        <h4>Immunités :</h4>
        ${immuneAgainst
          .map(
            (t) => `
          <span class="type ${t}">
            <img src="${typeIcons[t]}" class="type-icon">${typeFR[t]}
          </span>`
          )
          .join("")}
      </div>

      <div class="super-effective">
        <h4>Super efficace contre :</h4>
        ${superEffectiveAgainst
          .map(
            (t) => `
          <span class="type ${t}">
            <img src="${typeIcons[t]}" class="type-icon">${typeFR[t]}
          </span>`
          )
          .join("")}
      </div>

    </div>
  `;

  
  const cryBtn = document.getElementById("play-cry");
  if (cryBtn && pokemon.cry) {
    cryBtn.addEventListener("click", () => {
      const audio = new Audio(pokemon.cry);
      audio.play();
    });
  }

  
  container.querySelectorAll(".evo-card").forEach((card) => {
    card.addEventListener("click", async () => {
      const id = card.getAttribute("data-id")!;
      const detail = await fetchPokemonByName(id);
      renderPokemonDetail(detail, container, shiny);
    });
    (card as HTMLElement).style.cursor = "pointer";
  });
}
