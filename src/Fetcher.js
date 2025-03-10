import axios from "axios";

export class Fetcher {
  // if backend will get update with filter this func could be deleted
  async fetchAllPokemons() {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=10000000`
      );
      return response.data.results;
    } catch (error) {
      console.error("Ошибка при загрузке покемонов:", error);
    }
  }
  //if backend will get update with filter this func could be deleted
  findByIncludes(arr, str) {
    return arr.filter((elem) =>
      elem.name.toLowerCase().includes(str.toLowerCase())
    );
  }

  async fetchPokemon(name) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка загрузки покемона:", error);
      return null;
    }
  }
}
