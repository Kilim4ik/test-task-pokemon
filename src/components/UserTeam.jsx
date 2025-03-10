import React from "react";
import { PokemonCard } from "./PokemonCard";
import "./UserTeam.modules.scss";
export const UserTeam = ({ user, setUser }) => {
  const clickOnBackdrop = () => {
    setUser({});
  };
  return (
    <div className="backdrop" onClick={clickOnBackdrop}>
      <div className="user-container">
        <h2>
          `{user.firstName} {user.lastName}`
        </h2>
        <ul className="user__pokemon-list">
          {user.pokemons.map((pokemon, index) => (
            <PokemonCard elem={pokemon} index={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};
