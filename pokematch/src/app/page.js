"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [id, setId] = useState(1);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.com/api/v2/pokemn/${id}`)
    .then((resposta) => resposta.json())
    .then((dados) => {
      const novoPokemon = {
        id: dados.id,
        nome: dados.nome,
        imagem: dados.sprites.front_default
      };

      setPokemon(novoPokemon);
    });
  }, [id]);

  function passar() {
    setPokemon(null);
    setId(id + 1);
  }

  async function capturar() {
    if (!pokemon) {
      return;
    }

    try {
      const resposta = await fetch("/api/favoritos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pokemon)
      });

      if (!resposta.ok) {
        alert("Erro ao capturar Pokémon.");
        return;
      }

      alert("Pokémon capturado!");

      setPokemon(null);
      setId(id + 1);
    } catch (erro) {
      alert("Erro ao conectar com a API.");
    }
  }

  return (
    <main style={{paading: 20, textAlign: "center"}}> 
      <h1> PokéMatch </h1>

      <Link href="/favoritos"> Minha Pokedéx </Link>

      {pokemon ? (
        <div style={{
          border: "1px solid #cc",
          padding: 20,
          margin: "20px auto",
          maxWidth: 300,
          borderRadius: 10
        }}>
          <img
              src = {pokemon.imagem}
              alt = {pokemon.nome}
              width = {160}
              height = {160}
          />

          <h2> {pokemon.nome} </h2>

          <p> Pokémon #{pokemon.id} </p>

          <button onClick={passar}>
            Passar
          </button>

          <button onClick={capturar}>
            Capturar
          </button>
        </div>
      ) : (
        <p> Carregando Pokémon... </p>
      )} 
    </main>
  );
}