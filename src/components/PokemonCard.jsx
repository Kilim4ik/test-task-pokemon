import React from "react";
import "./PokemonCard.modules.scss";

export const PokemonCard = ({ elem, index }) => {
  return (
    <div
      key={index}
      style={{
        width: "100%",
        display: "grid",
        justifyItems: "center",
      }}
    >
      <img src={elem.sprites.front_default} alt={`${elem.name} logo`} />
      <h2
        style={{
          textAlign: "center",
        }}
      >
        {elem.name}
      </h2>
      {elem.types.map((type, index) => (
        <div key={index} className="pokemon-type">
          <h3>{type.type.name}</h3>
          {
            //when api will have icon of type u could add it
            /* <img src={type.type.url} alt={`${type.type.name} logo`} /> */
          }
        </div>
      ))}
      <ul className="pokemon-stats">
        {elem.stats.map((stat, index) => (
          <li
            key={index}
            style={{
              textAlign: "center",
            }}
          >
            <h3>{stat.stat.name}</h3>
            <p>State:{stat.base_stat}</p>
            <p>Effort:{stat.effort}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
