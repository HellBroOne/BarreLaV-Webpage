from django.db import models
from django.utils import timezone
from datetime import time, datetime, timedelta

class Clase(models.Model):

    fecha = models.CharField(max_length=20)

    fecha_completa = models.DateField(
        null=True,
        blank=True
    )

    hora = models.TimeField()

    hora_fin = models.TimeField(
        default=time(0, 0)
    )

    tipo = models.CharField(
        max_length=100
    )

    enfoque = models.CharField(
        default="Core",
        max_length=50
    )

    color = models.CharField(
        default="a103fc",
        max_length=20
    )

    capacidad = models.PositiveIntegerField(
        default=10
    )

    def obtener_proxima_fecha(self, dia_semana, siguiente=False):
        dias = {
            "Lunes": 0,
            "Martes": 1,
            "Miercoles": 2,
            "Jueves": 3,
            "Viernes": 4,
            "Sabado": 5,
            "Domingo": 6,
        }

        hoy = timezone.localdate()

        dia_actual = hoy.weekday()
        dia_objetivo = dias[dia_semana]

        diferencia = (dia_objetivo - dia_actual) % 7

        if siguiente and diferencia == 0:
            diferencia = 7

        return hoy + timedelta(days=diferencia)

    def ya_paso(self):
        ahora = timezone.localtime()
        fecha_hora_fin = timezone.make_aware(
            datetime.combine(
                self.fecha_completa,
                self.hora_fin
            )
        )

        return ahora > fecha_hora_fin

    def lugares_ocupados(self):
        return self.reservas.count()

    def lugares_disponibles(self):
        return self.capacidad - self.lugares_ocupados()

    def save(self, *args, **kwargs):
        if not self.fecha_completa:
            self.fecha_completa = self.obtener_proxima_fecha(
                self.fecha
            )
        super().save(*args, **kwargs)

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

