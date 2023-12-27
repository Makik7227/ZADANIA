

export interface AppTypeInitialState {
    isLoading: boolean;
    userInfo: undefined | { email: string };
    toasts: string[];
    currentPokemonTab: string;
}

export interface PokemonTypeInitialState {
    allPokemon: undefined | genericPokemonType[];
    randomPokemons: generatedPokemonType[] | undefined;
    compareQueue: generatedPokemonType[];
    userPokemons: userPokemonsType[];
    currentPokemon: currentPokemonType | undefined;
}

export interface genericPokemonType {
    name: string;
    url: string;
}

export interface generatedPokemonType {
    name: string;
    id: number;
    image: string;
    types: pokemonTypeInterface[];
}

export interface userPokemonsType extends generatedPokemonType {
    firebaseId?: string;

}

export interface currentPokemonType {
    id: number;
    name: string;
    types: pokemonTypeInterface[];
    image: string;
    stats: pokemonStatsType[];
    encounters: string[];
    evolutionLevel: number;
    evolution: { level: number; pokemon: { name: string; url: string } }[];
    pokemonAbilities: { abilities: string[]; moves: string[] };
}



export interface pokemonStatsType {
    name: string;
    value: string;
}

export interface pokemonTypeInterface {
    [key: string]: {
        image: string;
        resistance: string[];
        strength: string[];
        weakness: string[];
        vulnerable: string[];
    };
}


export type pokemonStatType =
    | "vulnerable"
    | "weakness"
    | "strength"
    | "resistance";

export type pokemonElementType =
    | "bug"
    | "dark"
    | "dragon"
    | "electric"
    | "fairy"
    | "fighting"
    | "fire"
    | "flying"
    | "ghost"
    | "grass"
    | "ground"
    | "ice"
    | "normal"
    | "poison"
    | "psychic"
    | "rock"
    | "steel"
    | "water";

export interface abilityPokemonType {
    name: string;
    url: string;
}


