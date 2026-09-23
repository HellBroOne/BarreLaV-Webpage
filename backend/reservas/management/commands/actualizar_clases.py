from django.core.management.base import BaseCommand

from reservas.models import Clase


class Command(BaseCommand):

    help = "Actualiza las clases que ya pasaron"

    def handle(self, *args, **kwargs):

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

                self.stdout.write(
                    self.style.SUCCESS(
                        f"Clase {clase.id} actualizada: "
                        f"{clase.fecha_completa}"
                    )
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"Proceso terminado. "
                f"Clases actualizadas: {actualizadas}"
            )
        )