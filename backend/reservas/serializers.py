from rest_framework import serializers
from .models import Clase, Reserva

class ClaseSerial(serializers.ModelSerializer):

    ocupados = serializers.IntegerField(
        source="reservas.count",
        read_only=True
    )

    class Meta:
        model = Clase
        fields = [
            "id",
            "fecha",
            "hora",
            "tipo",
            "capacidad",
            "ocupados",
        ]

class ReservaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reserva
        fields = [
            "id",
            "clase",
            "nombre",
            "edad",
            "tiene_lesion",
            "fecha_reserva",
        ]
