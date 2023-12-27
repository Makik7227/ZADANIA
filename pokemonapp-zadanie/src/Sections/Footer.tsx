import React from 'react';
import {useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {pokemonTabs} from "../utils/Constants";
import {setPokemonTab} from "../app/slices/AppSlice";

function Footer() {
    const location = useLocation();
    const currentPokemonTab = useAppSelector(
        ({ app: { currentPokemonTab } }) => currentPokemonTab
    );
    const dispatch = useAppDispatch();

    const routes = [
        {
            name: pokemonTabs.description,
            value: "Description",
        },
        {
            name: pokemonTabs.evolution,
            value: "Evolution",
        },
        {
            name: pokemonTabs.locations,
            value: "Catching",
        },
        {
            name: pokemonTabs.moves,
            value: "Capable Moves",
        },
    ];
    return (
        <footer>
            <div className="block"></div>
            <div className="data">
                {location.pathname.includes("/pokemon") && (
                    <ul>
                        {routes.map((route) => (
                            <li
                                key={route.name}
                                className={`${
                                    currentPokemonTab === route.name ? "active" : ""
                                }`}
                                onClick={() => dispatch(setPokemonTab(route.name))}
                            >
                                {route.value}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="block">

            </div>
        </footer>
    );
}

export default Footer;