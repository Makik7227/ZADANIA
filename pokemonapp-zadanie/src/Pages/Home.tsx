import {useEffect} from 'react';
import Wrapper from "../Sections/Wrapper";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getInitialPokemonData} from "../app/reducers/PokemonData";
import {pokemonData} from "../app/reducers/PokemonData";
import {debounce} from "../utils/Debounce";
import DataTable from "../Components/PokeTable";
// @ts-nocheck
function Home() {
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

            <DataTable pokemons={randomPokemons!}/>

            </div>
        </>
    );
}

export default Wrapper(Home);