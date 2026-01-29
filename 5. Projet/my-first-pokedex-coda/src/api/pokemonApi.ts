const BASE_URL = "https://pokeapi.co/api/v2";

export interface PokemonListItem {
  name: string;
  url: string;
  id?: number;
  nameFR?: string;
}

export interface SpecialForm {
  nameFR: string;
  sprite: string;
  type: "mega" | "gmax";
  cry?: string;
}
export interface Evolution {
  id: number;
  nameFR: string;
  sprite: string;
}

export interface PokemonDetail {
  id: number;
  nameFR: string;
  sprites: {
    normal: string;
    shiny: string;
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  specialForms: SpecialForm[];
  cry?: string;
  evolution?: Evolution[];
}


export async function fetchPokemonByGeneration(
  genId: number
): Promise<PokemonListItem[]> {
  const res = await fetch(`${BASE_URL}/generation/${genId}`);
  const data = await res.json();

  return data.pokemon_species.map((p: any) => ({
    name: p.name,
    url: p.url,
  }));
}
async function fetchEvolutions(speciesUrl: string): Promise<Evolution[]> {
  const speciesRes = await fetch(speciesUrl);
  const speciesData = await speciesRes.json();

  if (!speciesData.evolution_chain) return [];

  const evoRes = await fetch(speciesData.evolution_chain.url);
  const evoData = await evoRes.json();

  const evolutions: Evolution[] = [];

  async function traverse(chain: any) {
    const speciesRes = await fetch(chain.species.url);
    const species = await speciesRes.json();
    const nameFR =
      species.names.find((n: any) => n.language.name === "fr")?.name ||
      chain.species.name;

    const id = parseInt(chain.species.url.split("/").slice(-2, -1)[0]);
    const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    evolutions.push({ id, nameFR, sprite });

    for (const next of chain.evolves_to) {
      await traverse(next);
    }
  }

  await traverse(evoData.chain);

  return evolutions;
}



export async function fetchPokemonByName(
  nameOrId: string | number
): Promise<PokemonDetail> {
  let res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);

  // Fallback si le Pokémon n'existe pas directement
  if (!res.ok && typeof nameOrId === "string") {
    const speciesRes = await fetch(`${BASE_URL}/pokemon-species/${nameOrId}`);
    if (!speciesRes.ok) throw new Error(`Pokémon introuvable : ${nameOrId}`);

    const speciesData = await speciesRes.json();
    const variety =
      speciesData.varieties.find((v: any) => v.is_default) ??
      speciesData.varieties[0];

    res = await fetch(variety.pokemon.url);
  }

  if (!res.ok) throw new Error(`Pokémon introuvable : ${nameOrId}`);

  const data = await res.json();

  const speciesRes = await fetch(data.species.url);
  const species = await speciesRes.json();

  const nameFR =
    species.names.find((n: any) => n.language.name === "fr")?.name || data.name;

  const sprites = {
    normal:
      data.sprites.other["official-artwork"]?.front_default ||
      data.sprites.front_default ||
      "",
    shiny:
      data.sprites.other["official-artwork"]?.front_shiny ||
      data.sprites.front_shiny ||
      "",
  };


  const cryUrl = `https://play.pokemonshowdown.com/audio/cries/${data.name.toLowerCase()}.mp3`;

  const specialForms: SpecialForm[] = [];
  if (species.name === "deoxys") {
    for (const v of species.varieties) {
      const fRes = await fetch(v.pokemon.url);
      const fData = await fRes.json();
      const form = fData.name.replace("deoxys-", "");
      specialForms.push({
        nameFR:
          form === "normal"
            ? "Deoxys Normal"
            : form === "attack"
            ? "Deoxys Attaque"
            : form === "defense"
            ? "Deoxys Défense"
            : "Deoxys Vitesse",
        sprite: fData.sprites.other["official-artwork"]?.front_default || "",
        type: "mega",
        cry: `https://play.pokemonshowdown.com/audio/cries/${fData.name.toLowerCase()}.mp3`,
      });
    }
  } else if (species.varieties?.length > 1) {
    for (const v of species.varieties) {
      if (!v.is_default) {
        const fRes = await fetch(v.pokemon.url);
        const fData = await fRes.json();
        const formName = fData.name.toLowerCase();
        if (formName.includes("mega")) {
          specialForms.push({
            nameFR: `Méga ${nameFR}`,
            sprite:
              fData.sprites.other["official-artwork"]?.front_default || "",
            type: "mega",
            cry: `https://play.pokemonshowdown.com/audio/cries/${fData.name.toLowerCase()}.mp3`,
          });
        } else if (formName.includes("gmax")) {
          specialForms.push({
            nameFR: `${nameFR} Gigamax`,
            sprite:
              fData.sprites.other["official-artwork"]?.front_default || "",
            type: "gmax",
            cry: `https://play.pokemonshowdown.com/audio/cries/${fData.name.toLowerCase()}.mp3`,
          });
        }
      }
    }
  }

  const evolution = await fetchEvolutions(data.species.url);

  
  return {
    id: data.id,
    nameFR,
    sprites,
    types: data.types,
    stats: data.stats,
    specialForms,
    cry: cryUrl,
    evolution,
  };
}
