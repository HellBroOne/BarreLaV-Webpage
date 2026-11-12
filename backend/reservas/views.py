from django.shortcuts import render
from datetime import datetime
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
            serializer.save(
                tiene_lesion=False,
                lesion=""
            )

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class CrearClaseView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        tipo = request.data.get('tipo')
        hora = request.data.get('hora')
        hora_fin = request.data.get('hora_fin')
        capacidad = request.data.get('capacidad')
        dias = request.data.get('dias')

        # Comprobar que se haya seleccionado al menos un día
        if not dias:
            return Response(
                {'error': 'Debes seleccionar al menos un día'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Convertir las horas de texto a objetos time
        try:
            hora = datetime.strptime(hora, "%H:%M").time()
            hora_fin = datetime.strptime(hora_fin, "%H:%M").time()
        except (ValueError, TypeError):
            return Response(
                {'error': 'El formato de hora debe ser HH:MM'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Comprobar que la hora de fin sea posterior
        if hora_fin <= hora:
            return Response(
                {'error': 'La hora de fin debe ser posterior a la hora de inicio'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validar todos los días ANTES de crear cualquier clase
        for dia in dias:

            clases_existentes = Clase.objects.filter(
                fecha=dia
            )

            for clase_existente in clases_existentes:

                # Comprobar si los horarios se cruzan
                if (
                    hora < clase_existente.hora_fin
                    and hora_fin > clase_existente.hora
                ):
                    return Response(
                        {
                            'error': (
                                f'Ya existe una clase el {dia} '
                                f'de {clase_existente.hora.strftime("%H:%M")} '
                                f'a {clase_existente.hora_fin.strftime("%H:%M")}'
                            )
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

        # Si todas las validaciones pasaron, crear las clases
        clases_creadas = []

        for dia in dias:

            clase = Clase.objects.create(
                fecha=dia,
                hora=hora,
                hora_fin=hora_fin,
                tipo=tipo,
                capacidad=capacidad
            )

            clases_creadas.append({
                "id": clase.id,
                "fecha": clase.fecha,
                "fecha_completa": clase.fecha_completa,
                "hora": str(clase.hora)[:5],
                "hora_fin": str(clase.hora_fin)[:5],
                "tipo": clase.tipo,
                "enfoque": clase.enfoque,
                "color": clase.color,
                "capacidad": clase.capacidad
            })

        # Actualizar las fechas de las clases que ya hayan pasado
        actualizar_clases_pasadas()

        return Response(
            {
                "mensaje": "Clases creadas correctamente",
                "clases": clases_creadas
            },
            status=status.HTTP_201_CREATED
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

class ClaseAdminDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, clase_id):

        try:
            clase = Clase.objects.get(id=clase_id)

        except Clase.DoesNotExist:

            return Response(
                {"error": "La clase no existe"},
                status=status.HTTP_404_NOT_FOUND
            )

        tipo = request.data.get("tipo", clase.tipo)
        hora = request.data.get("hora", clase.hora)
        hora_fin = request.data.get("hora_fin", clase.hora_fin)
        capacidad = request.data.get("capacidad", clase.capacidad)
        enfoque = request.data.get("enfoque", clase.enfoque)

        # --------------------------------
        # Convertir horas
        # --------------------------------
        try:
            if isinstance(hora, str):
                hora = datetime.strptime(
                    hora,
                    "%H:%M"
                ).time()
            if isinstance(hora_fin, str):
                hora_fin = datetime.strptime(
                    hora_fin,
                    "%H:%M"
                ).time()

        except (ValueError, TypeError):
            return Response(
                {
                    "error":
                    "El formato de hora debe ser HH:MM"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # --------------------------------
        # Validar horario
        # --------------------------------
        if hora_fin <= hora:
            return Response(
                {
                    "error":
                    "La hora de fin debe ser posterior "
                    "a la hora de inicio"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # --------------------------------
        # Validar capacidad
        # --------------------------------

        try:
            capacidad = int(capacidad)
        except (ValueError, TypeError):
            return Response(
                {
                    "error":
                    "La capacidad debe ser un número"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if capacidad < 1:
            return Response(
                {
                    "error":
                    "La capacidad debe ser mayor a 0"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # --------------------------------
        # Comprobar reservas actuales
        # --------------------------------
        if capacidad < clase.lugares_ocupados():
            return Response(
                {
                    "error":
                    "La capacidad no puede ser menor "
                    "que el número de reservas actuales"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # --------------------------------
        # Comprobar cruces de horario
        # --------------------------------

        clases_existentes = Clase.objects.filter(
            fecha=clase.fecha
        ).exclude(
            id=clase.id
        )

        for clase_existente in clases_existentes:
            if (
                hora < clase_existente.hora_fin
                and hora_fin > clase_existente.hora
            ):

                return Response(
                    {
                        "error": (
                            f"Ya existe una clase el "
                            f"{clase.fecha} de "
                            f"{clase_existente.hora.strftime('%H:%M')} "
                            f"a "
                            f"{clase_existente.hora_fin.strftime('%H:%M')}"
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        # --------------------------------
        # Guardar cambios
        # --------------------------------

        clase.tipo = tipo
        clase.hora = hora
        clase.hora_fin = hora_fin
        clase.capacidad = capacidad
        clase.enfoque = enfoque

        clase.save()

        return Response(
            {
                "mensaje":
                    "Clase modificada correctamente",

                "clase": {
                    "id": clase.id,
                    "fecha": clase.fecha,
                    "fecha_completa":
                        clase.fecha_completa,
                    "hora":
                        clase.hora.strftime("%H:%M"),
                    "hora_fin":
                        clase.hora_fin.strftime("%H:%M"),
                    "tipo":
                        clase.tipo,
                    "enfoque":
                        clase.enfoque,
                    "color":
                        clase.color,
                    "capacidad":
                        clase.capacidad,
                    "lugares_ocupados":
                        clase.lugares_ocupados(),
                    "lugares_disponibles":
                        clase.lugares_disponibles(),
                }
            },
            status=status.HTTP_200_OK
        )

    def delete(self, request, clase_id):

        try:
            clase = Clase.objects.get(id=clase_id)

        except Clase.DoesNotExist:

            return Response(
                {"error": "La clase no existe"},
                status=status.HTTP_404_NOT_FOUND
            )

        clase.delete()

        return Response(
            {"mensaje": "Clase eliminada correctamente"},
            status=status.HTTP_204_NO_CONTENT
        )

class ListaClasesAdminView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        clases = Clase.objects.all().order_by(
            "fecha_completa",
            "hora"
        )

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

        return Response(
            data,
            status=status.HTTP_200_OK
        )