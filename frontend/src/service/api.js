const API_URL = import.meta.env.VITE_API_URL;

export async function crearReserva(datos) {
    const response = await fetch(
        `${API_URL}/reservas/`,
        {method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        }
    );

    const data = await response.json();
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

    if (!response.ok) {
        throw new Error("No se pudieron obtener las clases");
    }

    return await response.json();
}