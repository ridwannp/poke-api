import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Toolbar,
  AppBar,
  TextField,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "./constants";
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from "@material-ui/icons/Search";
import LaunchIcon from '@material-ui/icons/Launch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import axios from "axios";
import './App.css'

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
}));



const Pokedex = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <Grid item xs={4} key={pokemonId}>
        <Card className="content">
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: "130px", height: "130px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Expand To Get Detail Information" style={{margin:'auto'}}>
              <LaunchIcon onClick={() => history.push(`/${id}`)} />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <div className="searchBar">
            <TextField
              className="searchText"
              onChange={handleSearchChange}
              label="Search Pokemon"
              variant="standard"
            />
            <SearchIcon className="searchIcon"/>
          </div>
        </Grid>
        <Grid item xs={6}>
        <FormControl component="fieldset" required>
            <RadioGroup
              className="d-flex flex-row"
              aria-label="gender"
              name="gender"
              style={{display:'inline-block',padding:'30px'}}
              // value={this.state.value}
              // onChange={this.handleChange}
            >
              <FormControlLabel value="Water" control={<Radio color="primary"/>} label="Water"/>
              <FormControlLabel value="Fire" control={<Radio color="primary"/>} label="Fire"/>
              <FormControlLabel value="Grass" control={<Radio color="primary"/>} label="Grass"/>
              {/*<FormControlLabel value="disabled" disabled control={<Radio />} label="Disabled" />*/}
            </RadioGroup>
          </FormControl>
        </Grid>
        {pokemonData ? (
          <Grid container spacing={2}>
            {Object.keys(pokemonData).map(
              (pokemonId) =>
                pokemonData[pokemonId].name.includes(filter) &&
                getPokemonCard(pokemonId)
            )}
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </>
  );
};

export default Pokedex;
