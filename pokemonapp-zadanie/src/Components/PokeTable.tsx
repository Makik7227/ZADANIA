import * as React from 'react';
import Box from '@mui/material/Box';
import {pokemonTypeInterface, userPokemonsType} from "../utils/Types";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useAppDispatch} from "../app/hooks";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {setPokemonTab, setToast} from "../app/slices/AppSlice";
import {pokemonTabs} from "../utils/Constants";
import {addToCompare, setCurrentPokemon} from "../app/slices/PokemonSlice";

export default function DataTable({pokemons}:{pokemons:userPokemonsType[]}) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();




    return(
        <div style={{ height: 660, width: '100%' }}>
                 <Box sx={{ height: 660, width: '100%' , backgroundColor: 'white', overflow: 'scroll'}}>
                    <Table className="table" sx={{minWidth: 1200, textAlign: 'center'}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><h1>NAME</h1></TableCell>
                            <TableCell align="left"><h1>TYPE</h1></TableCell>
                            <TableCell align="left"><h1>ABILITIES</h1></TableCell>
                            <TableCell align="left"><h1>ACTIONS</h1></TableCell>
                            <Button variant="contained" type="reset"
                                    sx={{backgroundColor: 'lightcoral', color: 'white', marginLeft: 'auto', marginRight: '50px', marginTop: '20px', marginBottom: '10px'}}
                                    onClick={()=>window.location.reload()}>REFRESH</Button>
                        </TableRow>
                    </TableHead>
                        {pokemons && pokemons.length>0 && pokemons?.map((data:any)=> {
                            return  <TableBody>
                                <TableRow
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell className="sticky-table-cell" align="center" key={data.id}>{data.name}</TableCell>
                               <TableCell className="sticky-table-cell" align="right" >
                                   {data.types.map((type:pokemonTypeInterface,index:number)=> {
                                       const keys = Object.keys(type);
                                       return <TableCell><img
                                           src={type[keys[0]].image}
                                           alt="pokemon type"
                                           className="pokemon-card-types-type-image"
                                           loading="lazy"
                                       />
                                       <h6 className="pokemon-card-types-type-text">
                                           {keys[0]}
                                       </h6>
                                        </TableCell>
                                   })}
                               </TableCell>
                            <TableCell className="sticky-table-cell" align="left">
                                     <TableCell>
                                    <Button variant="contained" className="btn" onClick={() => {
                                        dispatch(setPokemonTab(pokemonTabs.moves))
                                        dispatch(setCurrentPokemon(undefined))
                                        navigate(`/pokemon/${data.id}`)
                                    }}>Abilities</Button>
                                    </TableCell>
                            </TableCell>
                                    <TableCell>
                                        <TableCell>
                                            <Button variant="contained" className="btn" onClick={() => {
                                                dispatch(setPokemonTab(pokemonTabs.description))
                                                dispatch(setCurrentPokemon(undefined))
                                                navigate(`/pokemon/${data.id}`)
                                            }}>DETAILS</Button>
                                        </TableCell>
                                       <TableCell>
                                           <Button sx={{}} variant="contained" className="btn" onClick={() => {
                                               dispatch(addToCompare(data));
                                               dispatch(
                                                   setToast(
                                                       `${data.name} has been added to compare queue.`
                                                   )
                                               );
                                           }}>COMPARE</Button>
                                       </TableCell>
                                    </TableCell>
                        </TableRow>
                    </TableBody>
                        })}
                </Table>
                </Box>
    </div>
)}






