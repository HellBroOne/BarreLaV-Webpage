const API_URL = import.meta.env.VITE_API_URL;

export async function crearReserva(datos) {
    const response = await fetch(
        `${API_URL}/reservas/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        }
    );

    const texto = await response.text();

    let data;

    try {
        data = JSON.parse(texto);
    } catch {
        console.error("Respuesta que NO es JSON:", texto);

        throw new Error(
            "El servidor devolvió una respuesta que no es JSON."
        );
    }

    if (!response.ok) {
        throw new Error(
            data.error || "Error al crear la reserva"
        );
    }

    return data;
}

export async function obtenerClases() {
    const response = await fetch(
        `${API_URL}/clases/`
    );

    const texto = await response.text();

    let data;

    try {
        data = JSON.parse(texto);
    } catch {
        console.error("Respuesta que NO es JSON:", texto);

        throw new Error(
            "El servidor devolvió una respuesta que no es JSON."
        );
    }

    if (!response.ok) {
        throw new Error(
            "No se pudieron obtener las clases"
        );
    }

    return data;
}