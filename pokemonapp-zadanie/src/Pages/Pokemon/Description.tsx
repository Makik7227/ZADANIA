import React from "react";
import PokemonContainer from "../../Components/PokemonContainer";
import { useAppSelector } from "../../app/hooks";
import Info from "../../Components/Info";

function Description() {
    const pokemonData = useAppSelector(
        ({ pokemon: { currentPokemon } }) => currentPokemon
    );
    return (
        <div>
            {pokemonData && (
                <>
                    <Info data={pokemonData}/>
                    <PokemonContainer image={pokemonData?.image!} />
                </>
            )}

        </div>

    );
}

export default Description;