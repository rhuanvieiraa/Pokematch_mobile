import { favoritos } from "../../../lib/db";

export async function GET() {
    return Response.json(favoritos);
}

export async function POST(request) {
    const pokemon = await request.json();

    if (!pokemon.id || !pokemon.nome || !pokemon.imagem) {
        return Response.json(
            { erro: "Dados do Pokémon incompletos." },
            { status: 400 }
        );
    }

    const jaCapturado = favoritos.some((item) => {
        return item.id === pokemon.id;
    });

    if (jaCapturado) {
        return Response.json(
            { mensagem: "Pokémon já capturado!" },
            { status: 200 }
        );
    }

    favoritos.push(pokemon);

    return Response.json(
        { mensagem: "Pokémon capturado com sucesso!" },
        { status: 201 }
    );
}
