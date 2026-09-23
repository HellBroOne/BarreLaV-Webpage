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

    clase_info = serializers.SerializerMethodField()

    class Meta:
        model = Reserva
        fields = [
            "id",
            "clase",
            "clase_info",
            "nombre",
            "edad",
            "tiene_lesion",
            "lesion",
            "fecha_reserva",
        ]

    def get_clase_info(self, obj):

        clase = obj.clase

        return {
            "id": clase.id,
            "fecha": clase.fecha,
            "fecha_completa": clase.fecha_completa,
            "hora": clase.hora.strftime("%H:%M"),
            "hora_fin": clase.hora_fin.strftime("%H:%M"),
            "tipo": clase.tipo,
            "enfoque": clase.enfoque,
            "color": clase.color,
            "capacidad": clase.capacidad,
            "lugares_ocupados": clase.lugares_ocupados(),
            "lugares_disponibles": clase.lugares_disponibles(),
        }
