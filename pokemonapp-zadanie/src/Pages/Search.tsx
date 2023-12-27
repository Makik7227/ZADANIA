import {useEffect} from 'react';
import Wrapper from "../Sections/Wrapper";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getInitialPokemonData} from "../app/reducers/PokemonData";
import {pokemonData} from "../app/reducers/PokemonData";
import PokemonCardGrid from "../Components/PokemonCardGrid";
import {debounce} from "../utils/Debounce";
// @ts-nocheck
function Search() {
    const handleChange = debounce((value: string) => getPokemon(value), 300);

    const dispatch = useAppDispatch();
    const { allPokemon, randomPokemons } = useAppSelector(
        ({ pokemon }) => pokemon
    );

    useEffect(() => {
        dispatch(getInitialPokemonData());
    }, [dispatch]);

    useEffect(() => {
        if (allPokemon) {
            const clonedPokemons = [...allPokemon];
            const randomPokemonsId = clonedPokemons
                .sort(() => Math.random() - Math.random())
                .slice(0, 20);
            dispatch(pokemonData(randomPokemonsId));
        }
    }, [allPokemon, dispatch]);



    const getPokemon = async (value: string) => {
        if (value.length) {
            const pokemons = allPokemon!.filter((pokemon) =>
                pokemon.name.includes(value.toLowerCase())
            );
            dispatch(pokemonData(pokemons));
        } else {
            const clonedPokemons = [...allPokemon!];
            const randomPokemonsId = clonedPokemons
                .sort(() => Math.random() - Math.random())
                .slice(0, 20);
            dispatch(pokemonData(randomPokemonsId));
        }
    };

    return (
        <>
            <div className="search">
                <input type="text" className="pokemon-searchbar" placeholder="Search Pokemon"
                       onChange={(e) => handleChange(e.target.value)}
                />
                <PokemonCardGrid pokemons={randomPokemons!}/>


            </div>
        </>
    );
}

export default Wrapper(Search);