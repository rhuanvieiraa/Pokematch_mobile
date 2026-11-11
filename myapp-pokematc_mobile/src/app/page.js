
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
    const [id, setId] = useState(1);
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        setPokemon(null);

        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((resposta) => resposta.json())
            .then((dados) => {
                setPokemon(dados);
            });
    }, [id]);

    function passar() {
        setId(id + 1);
    }

    function capturar() {
        const pokemonSalvo = {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default
        };

        fetch("/api/favoritos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pokemonSalvo)
        })
            .then(() => {
                setId(id + 1);
            });
    }

    return (
        <main style={{ textAlign: "center", padding: 30 }}>
            <h1>PokéMatch</h1>

            <Link href="/favoritos">
                Minha Pokédex
            </Link>

            {pokemon ? (
                <div style={{
                    border: "1px solid #ccc",
                    borderRadius: 15,
                    padding: 20,
                    margin: "30px auto",
                    maxWidth: 300
                }}>
                    <h2>{pokemon.name}</h2>

                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        width={180}
                        height={180}
                    />

                    <p>Pokémon Nº {pokemon.id}</p>

                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 10
                    }}>
                        <button onClick={passar}>
                            Passar
                        </button>

                        <button onClick={capturar}>
                            Capturar
                        </button>
                    </div>
                </div>
            ) : (
                <p>Carregando Pokémon...</p>
            )}
        </main>
    );
}
