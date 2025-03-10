import React, { useState, useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { UserTeam } from "./components/UserTeam";
import { Fetcher } from "./Fetcher";
import "./index.css";

const fetcher = new Fetcher();

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const loadPokemons = async () => {
      const loadedPokemons = await fetcher.fetchAllPokemons();
      setPokemons(loadedPokemons);
    };

    loadPokemons();
  }, []);

  return (
    <>
      <LoginForm allPokemons={pokemons} setUser={setUser} />
      {user.pokemons ? <UserTeam user={user} setUser={setUser} /> : ""}
    </>
  );
};

export default App;
