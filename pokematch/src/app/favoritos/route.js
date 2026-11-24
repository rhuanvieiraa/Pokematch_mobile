"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Favoritos() {
    const [lista, setLista] = useState([]);

    useEffect(() => {
        fetch("/api/favoritos")
            .then((resposta) => resposta.json())
            .then((dados) => {
                setLista(dados);
            });
    }, []);

    return (
        <main style={{ padding: 20, textAlign: "center" }}>
            <Link href="/">Voltar ao PokéMatch</Link>

            <h1>Minha Pokédex ({lista.length})</h1>

            {lista.length === 0 && (
                <p>Nenhum Pokémon capturado ainda.</p>
            )}

            <div style={{
                display: "flex",
                gap: 15,
                justifyContent: "center",
                flexWrap: "wrap"
            }}>
                {lista.map((pokemon) => (
                    <div
                        key={pokemon.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: 15,
                            borderRadius: 10,
                            width: 150
                        }}
                    >
                        <img
                            src={pokemon.imagem}
                            alt={pokemon.nome}
                            width={100}
                            height={100}
                        />

                        <h3>{pokemon.nome}</h3>

                        <p>#{pokemon.id}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}