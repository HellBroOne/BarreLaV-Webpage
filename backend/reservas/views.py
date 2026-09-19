from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status   

from .models import Clase, Reserva
from .serializers import ReservaSerializer


class CrearReservaView(APIView):
    def post(self, request):
        clase_id = request.data.get('clase')

        try:
            clase = Clase.objects.get(id=clase_id)
        except Clase.DoesNotExist:
            return Response(
                {'error': 'La clase no existe'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Comprobar lugares disponibles
        if clase.reservas.count() >= clase.capacidad:
            return Response(
                {'error': 'La clase está llena'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ReservaSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def get(self, request):
        clases = Clase.objects.all()

        data = [
            {
                "id": clase.id,
                "fecha": clase.fecha,
                "hora": clase.hora,
                "tipo": clase.tipo,
                "capacidad": clase.capacidad,
                "lugares_ocupados": clase.lugares_ocupados(),
                "lugares_disponibles": clase.lugares_disponibles()
            }
            for clase in clases
        ]

        return Response(data, status=status.HTTP_200_OK)

class ListaClasesView(APIView):

    def get(self, request):
        clases = Clase.objects.all()
        data = []
        for clase in clases:
            data.append({
                'id': clase.id,
                'fecha': clase.fecha,
                'hora': clase.hora,
                'tipo': clase.tipo,
                'capacidad': clase.capacidad,
                'lugares_ocupados': clase.lugares_ocupados(),
                'lugares_disponibles': clase.lugares_disponibles(),
            })

        return Response(data)