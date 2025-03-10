import React, { useState } from "react";
import { Fetcher } from "../Fetcher";
import "./LoginForm.modules.scss";
import { PokemonCard } from "./PokemonCard";
const fetcher = new Fetcher();

export const LoginForm = ({ allPokemons, setUser }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [userPokemons, setUserPokemons] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [isError, setError] = useState(false);

  const addTips = (event) => {
    const query = event.target.value;
    setInputValue(query);
    if (!query.length) {
      setSuggestions([]);
      return;
    }

    const filteredPokemons = fetcher.findByIncludes(allPokemons, query);
    setSuggestions(filteredPokemons);
  };
  const addPokemon = async (e) => {
    e.preventDefault();
    if (userPokemons.length === 4) {
      setError(true);
      setTimeout(() => setError(false), 3000);

      return;
    }

    const newPokemon = await fetcher.fetchPokemon(inputValue);
    if (!newPokemon) {
      setInputValue("");
      return;
    }

    setUserPokemons((prev) => [...prev, newPokemon]);

    setInputValue("");
  };
  const addNewUser = (e, key) => {
    setNewUser((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setUser({ ...newUser, pokemons: [...userPokemons] });
      }}
      className="form"
    >
      <p className="form__title">Create your team</p>
      <div className="form__user-container">
        <input
          minLength={2}
          maxLength={12}
          onChange={(e) => addNewUser(e, "firstName")}
          className="form__user-input"
          type="text"
          placeholder="name"
        />
        <input
          minLength={2}
          maxLength={12}
          onChange={(e) => addNewUser(e, "lastName")}
          className="form__user-input"
          type="text"
          placeholder="last name"
        />
      </div>
      <div>
        <div
          className="input-bar"
          style={{
            border: isError ? "1px solid red" : "none",
          }}
        >
          <input
            className="form__pokemon-input"
            type="text"
            value={inputValue}
            onChange={addTips}
            placeholder="Choose pokemon"
            list="suggestions"
          />
          <datalist id="suggestions">
            {suggestions.length > 0 ? (
              suggestions.map((pokemon, index) => (
                <option key={index} value={pokemon.name} />
              ))
            ) : (
              <option disabled>There are no suitable Pokemon</option>
            )}
          </datalist>
          <button className="form__pokemon-button" onClick={addPokemon}>
            Add
          </button>
        </div>

        <p
          style={{
            display: isError ? "block" : "none",
          }}
        >
          You can add max 4 pokemons
        </p>
      </div>
      {userPokemons.map((elem) => (
        <PokemonCard elem={elem} index={elem.name} />
      ))}
      <button className="form__submit-btn" type="submit">
        submit
      </button>
    </form>
  );
};
