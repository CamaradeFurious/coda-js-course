import {
  fetchPokemonByGeneration,
  type PokemonListItem,
  fetchPokemonByName,
  type PokemonDetail,
} from "./api/pokemonApi";
import { renderPokemonList } from "./components/pokemon-list";
import { renderPokemonDetail } from "./components/pokemondetail";

const listContainer = document.getElementById("pokemon-list")!;
const detailContainer = document.getElementById("pokemon-detail")!;
const searchInput = document.getElementById("search") as HTMLInputElement;
const genSelect = document.getElementById("gen-select") as HTMLSelectElement;
const shinySelect = document.getElementById(
  "shiny-select"
) as HTMLSelectElement;

const teamListContainer = document.getElementById("team-list")!;
const saveTeamBtn = document.getElementById("save-team")!;
const loadTeamBtn = document.getElementById("load-team")!;

let allPokemon: PokemonListItem[] = [];
let timeout: number;
let currentDetail: PokemonDetail | null = null;
let team: PokemonDetail[] = [];

async function loadGeneration(genId: number) {
  const list = await fetchPokemonByGeneration(genId);


allPokemon = await Promise.all(
  list.map(async p => {
    const detail = await fetchPokemonByName(p.name);
    return {
      ...p,
      id: detail.id,
      nameFR: detail.nameFR,   
      sprites: detail.sprites,
      types: detail.types
    };
  })
);


allPokemon.sort((a, b) => (a.id || 0) - (b.id || 0));


await renderPokemonList(listContainer, allPokemon, detailContainer, shinySelect.value === "true");

}

async function showPokemonDetail(pokemon: PokemonDetail) {
  currentDetail = pokemon;
  renderPokemonDetail(pokemon, detailContainer, shinySelect.value === "true");
}

async function navigatePokemon(direction: "next" | "prev") {
  if (!currentDetail) return;
  const index = allPokemon.findIndex(
    (p) => p.name === currentDetail!.nameFR.toLowerCase()
  );
  let newIndex = direction === "next" ? index + 1 : index - 1;
  if (newIndex < 0) newIndex = allPokemon.length - 1;
  if (newIndex >= allPokemon.length) newIndex = 0;
  const nextDetail = await fetchPokemonByName(allPokemon[newIndex].name);
  showPokemonDetail(nextDetail);
}

function renderTeam() {
  teamListContainer.innerHTML =
    team.length === 0
      ? "<p>Aucun Pokémon dans l'équipe</p>"
      : team
          .map(
            (p) => `
      <div class="team-card">
        <img src="${
          shinySelect.value === "true" ? p.sprites.shiny : p.sprites.normal
        }">
        <p>#${p.id} ${p.nameFR}</p>
        <button class="remove-btn" data-name="${p.nameFR}">Supprimer</button>
      </div>
    `
          )
          .join("");

  teamListContainer.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const name = (e.currentTarget as HTMLButtonElement).dataset.name!;
      team = team.filter((p) => p.nameFR !== name);
      renderTeam();
    });
  });
}

function saveTeam() {
  localStorage.setItem("myTeam", JSON.stringify(team.map((p) => p.nameFR)));
  alert("Équipe sauvegardée !");
}

async function loadTeam() {
  const saved = localStorage.getItem("myTeam");
  if (!saved) return alert("Aucune équipe sauvegardée !");
  const names: string[] = JSON.parse(saved);
  team = [];
  for (const name of names) {
    const detail = await fetchPokemonByName(name);
    team.push(detail);
  }
  renderTeam();
}

function addToTeam(pokemon: PokemonDetail) {
  if (team.length >= 6) return alert("Équipe complète (6 Pokémon max)");
  if (team.find((p) => p.id === pokemon.id))
    return alert("Ce Pokémon est déjà dans l'équipe !");
  team.push(pokemon);
  renderTeam();
}

async function init() {
  await loadGeneration(parseInt(genSelect.value));
searchInput.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = window.setTimeout(async () => {
    const search = searchInput.value.toLowerCase().trim();

    const filtered = allPokemon.filter((p) => {
      const french = (p.nameFR || "").toLowerCase(); 
      const idStr = p.id ? p.id.toString() : "";

      return (
        french.includes(search) || 
        idStr === search           
      );
    });

    await renderPokemonList(
      listContainer,
      filtered,
      detailContainer,
      shinySelect.value === "true"
    );
  }, 400); 
});


  genSelect.addEventListener("change", async () => {
    await loadGeneration(parseInt(genSelect.value));
  });

  shinySelect.addEventListener("change", async () => {
    await renderPokemonList(
      listContainer,
      allPokemon,
      detailContainer,
      shinySelect.value === "true"
    );
    if (currentDetail) showPokemonDetail(currentDetail);
    renderTeam();
  });

  saveTeamBtn.addEventListener("click", saveTeam);
  loadTeamBtn.addEventListener("click", loadTeam);

  // Navigation clavier
  document.addEventListener("keydown", async (e) => {
    if (!currentDetail) return;
    if (e.key === "ArrowRight") await navigatePokemon("next");
    if (e.key === "ArrowLeft") await navigatePokemon("prev");
    if (e.key === "a") addToTeam(currentDetail);
  });
}

init();
