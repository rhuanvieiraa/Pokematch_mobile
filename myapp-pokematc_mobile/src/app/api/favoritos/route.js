
import { favoritos } from "../../../lib/db";

export async function GET() {
    return Response.json(favoritos);
}

export async function POST(request) {
    const pokemon = await request.json();

    const jaExiste = favoritos.some((item) => {
        return item.id === pokemon.id;
    });

    if (!jaExiste) {
        favoritos.push(pokemon);
    }

    return Response.json(
        { status: "Capturado!" },
        { status: 201 }
    );
}
