/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import {CardBody, CardImg} from 'reactstrap';
const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
      <Grid item xs={12}>
        <div className="detailcontent">
        <Card className="shadow border-0">
          <CardImg top style={{ width: "300px", height: "300px" }} src={fullImageUrl}/>
          <CardBody>
            <h2 className="mb-0">{toFirstCharUppercase(name)}</h2>
            <h4 className="font-weight-light">
              Pokemon Info
            </h4>
            <p className="card-text text-muted">
            <Typography>Height: {height} </Typography>
            <Typography>Weight: {weight} </Typography>
            </p>
          </CardBody>
          <h3 className="mb-0">{"Species: "}
            <Link href={species.url}>{species.name} </Link>
          </h3>
          <div className="card-mt-footer">
              <div>
                  <Typography variant="h6"> Types:</Typography>
                  {types.map((typeInfo) => {
                    const { type } = typeInfo;
                    const { name } = type;
                    return <Typography key={name}> {`${name}`}</Typography>;
                  })}          
              </div>
          </div>
        </Card>
        </div>
      </Grid>
      </>
    );
  };

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}

      {pokemon !== undefined && (
        <Button className="backButton" variant="contained" onClick={() => history.push("/")}>
          back to pokedex
        </Button>
      )}
    </>
  );
};

export default Pokemon;
