import { fetchPokemonByName, type PokemonListItem } from "../api/pokemonApi";
import { renderPokemonDetail } from "./pokemondetail";

const typeIcons: Record<string, string> = {
  normal: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/normal.svg",
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
};

export async function renderPokemonList(
  container: HTMLElement,
  list: PokemonListItem[],
  detailContainer: HTMLElement,
  shiny: boolean
) {
  container.innerHTML = "";

  const sortedList = await Promise.all(
    list.map(async (p) => {
      const detail = await fetchPokemonByName(p.name);
      return { ...p, id: detail.id, nameFR: detail.nameFR, sprites: detail.sprites, types: detail.types };
    })
  );

  sortedList.sort((a, b) => (a.id || 0) - (b.id || 0));

  for (const pokemon of sortedList) {
    const card = document.createElement("div");
    card.className = "pokemon-card";

    const typesHTML = pokemon.types.map(t => `
      <span class="type-small ${t.type.name}">
        <img src="${typeIcons[t.type.name]}" alt="${t.type.name}">
      </span>
    `).join('');

    card.innerHTML = `
      <img src="${shiny ? pokemon.sprites.shiny : pokemon.sprites.normal}" alt="${pokemon.nameFR}">
      <h3>#${pokemon.id} ${pokemon.nameFR}</h3>
      <div class="types-list">
        ${typesHTML}
      </div>
    `;

    card.addEventListener("click", async () => {
      const detail = await fetchPokemonByName(pokemon.name);
      renderPokemonDetail(detail, detailContainer, shiny);
    });

    container.appendChild(card);
  }
}
