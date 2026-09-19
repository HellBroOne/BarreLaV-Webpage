from django.db import models

class Clase(models.Model):
    fecha = models.DateField()
    hora = models.TimeField()
    tipo = models.CharField(max_length=100)
    capacidad = models.PositiveIntegerField(default=20)

    def lugares_ocupados(self):
        return self.reservas.count()

    def lugares_disponibles(self):
        return self.capacidad - self.lugares_ocupados()

    def __str__(self):
        return f"{self.tipo} - {self.fecha} {self.hora}"


class Reserva(models.Model):
    clase = models.ForeignKey(
        Clase,
        on_delete=models.CASCADE,
        related_name="reservas"
    )

    nombre = models.CharField(max_length=100)
    edad = models.PositiveIntegerField()
    tiene_lesion = models.BooleanField(default=False)

    fecha_reserva = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - {self.clase}"

# Create your models here.
