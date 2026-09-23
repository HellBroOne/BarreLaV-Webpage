from .models import Clase

def actualizar_clases_pasadas():
    clases = Clase.objects.all()

    actualizadas = 0

    for clase in clases:

        if not clase.fecha_completa:
            continue

        if clase.ya_paso():

            clase.fecha_completa = clase.obtener_proxima_fecha(
                clase.fecha,
                siguiente=True
            )

            clase.reservas.all().delete()

            clase.save()

            actualizadas += 1

    return actualizadas