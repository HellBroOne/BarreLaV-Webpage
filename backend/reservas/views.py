from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Clase, Reserva
from .serializers import ReservaSerializer

from .services import actualizar_clases_pasadas

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

        # Comprobar si la clase ya pasó
        if clase.ya_paso():
            return Response(
                {'error': 'Esta clase ya pasó'},
                status=status.HTTP_400_BAD_REQUEST
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
                "fecha_completa": clase.fecha_completa,
                "hora": clase.hora,
                "tipo": clase.tipo,
                "capacidad": clase.capacidad,
                "lugares_ocupados": clase.lugares_ocupados(),
                "lugares_disponibles": clase.lugares_disponibles()
            }

            for clase in clases

        ]

        return Response(
            data,
            status=status.HTTP_200_OK
        )


class ListaClasesView(APIView):

    def get(self, request):
        actualizar_clases_pasadas()
        clases = Clase.objects.all()
        data = []

        for clase in clases:

            data.append({

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

            })

        return Response(data)


class UsuarioActualView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):

        return Response({

            "usuario": request.user.username,
            "autenticado": request.user.is_authenticated

        })


class ListaReservasAdminView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):

        reservas = Reserva.objects.all()

        serializer = ReservaSerializer(
            reservas,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

class EliminarReservaView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, reserva_id):

        try:
            reserva = Reserva.objects.get(id=reserva_id)

        except Reserva.DoesNotExist:
            return Response(
                {"error": "La reserva no existe"},
                status=status.HTTP_404_NOT_FOUND
            )

        reserva.delete()

        return Response(
            {"mensaje": "Reserva eliminada correctamente"},
            status=status.HTTP_204_NO_CONTENT
        )

class ModificarReservaView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, reserva_id):

        try:
            reserva = Reserva.objects.get(id=reserva_id)

        except Reserva.DoesNotExist:

            return Response(
                {"error": "La reserva no existe"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ReservaSerializer(
            reserva,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class ReservaAdminDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, reserva_id):

        try:
            reserva = Reserva.objects.get(id=reserva_id)

        except Reserva.DoesNotExist:

            return Response(
                {"error": "La reserva no existe"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ReservaSerializer(
            reserva,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, reserva_id):

        try:
            reserva = Reserva.objects.get(id=reserva_id)

        except Reserva.DoesNotExist:

            return Response(
                {"error": "La reserva no existe"},
                status=status.HTTP_404_NOT_FOUND
            )

        reserva.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )