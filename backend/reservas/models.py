from django.db import models
from datetime import time
from django.utils import timezone
from datetime import datetime

class Clase(models.Model):

    fecha = models.CharField(max_length=20)

    hora = models.TimeField()

    hora_fin = models.TimeField(default=time(0, 0))

    tipo = models.CharField(max_length=100)

    enfoque = models.CharField(default="Core",max_length=50)

    color = models.CharField(default="a103fc", max_length=20)

    capacidad = models.PositiveIntegerField(default=10)

    def ya_paso(self):

        ahora = timezone.localtime()
        fecha_hora_fin = timezone.make_aware(
            datetime.combine(self.dia, self.hora_fin)

        )
        return ahora > fecha_hora_fin

    def lugares_ocupados(self):
        return self.reservas.count()

    def lugares_disponibles(self):
        return self.capacidad - self.lugares_ocupados()

    def __str__(self):
        return f"{self.fecha} - {self.tipo}: {self.enfoque} - ({self.hora} - {self.hora_fin})"

class Reserva(models.Model):
    clase = models.ForeignKey(
        Clase,
        on_delete=models.CASCADE,
        related_name="reservas"
    )

    nombre = models.CharField(max_length=100)
    edad = models.PositiveIntegerField()
    tiene_lesion = models.BooleanField(default=False)
    lesion = models.CharField(default="" ,max_length=25)
    fecha_reserva = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - {self.clase}"

