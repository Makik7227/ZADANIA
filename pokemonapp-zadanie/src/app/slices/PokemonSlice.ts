import {generatedPokemonType, PokemonTypeInitialState} from "../../utils/Types";
import {createSlice} from "@reduxjs/toolkit";
import {getInitialPokemonData} from "../reducers/PokemonData";
import {pokemonData} from "../reducers/PokemonData";


const initialState: PokemonTypeInitialState = {
    allPokemon: undefined,
    randomPokemons: undefined,
    compareQueue: [],
    userPokemons: [],
    currentPokemon: undefined,
};

export const PokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        addToCompare: (state,action) => {
            const index = state.compareQueue.findIndex(
                (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
            );
            if (index === -1) {
                if (state.compareQueue.length === 2) {
                    state.compareQueue.pop();
                }
                state.compareQueue.unshift(action.payload);
            }
        },
        removeFromCompare: (state,action) => {
            const index = state.compareQueue.findIndex(
                (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
            );
            const queue = [...state.compareQueue];
            queue.splice(index, 1);
            state.compareQueue = queue;
        },
        setCurrentPokemon: (state, action) => {
            state.currentPokemon = action.payload;
        },
        resetRandomPokemons: (state) => {
            state.randomPokemons = undefined;
        },

    },


    extraReducers: (builder) => {
        builder.addCase(getInitialPokemonData.fulfilled,(state,action) => {
            state.allPokemon = action.payload;
        })
        builder.addCase(pokemonData.fulfilled,(state, action) => {
            state.randomPokemons = action.payload;
        })
    }
});

export const {addToCompare,removeFromCompare,setCurrentPokemon,resetRandomPokemons} = PokemonSlice.actions;