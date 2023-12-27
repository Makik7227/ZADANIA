import React from "react";
import { useAppSelector } from "../../app/hooks";

function Abilities() {
    const pokemonData = useAppSelector(
        ({ pokemon: { currentPokemon } }) => currentPokemon
    );


    return (
        <div className="page capable-moves">
            <h1 className="capable-moves-title">Abilities</h1>
            <ul className="capable-moves-list ability">
                {pokemonData?.pokemonAbilities?.abilities.map((ability: string) => (
                    <li className="move" key={ability}>
                        {ability}
                    </li>
                ))}
            </ul>
            <h1 className="capable-moves-title">Moves</h1>
        </div>
    );
}

export default Abilities;