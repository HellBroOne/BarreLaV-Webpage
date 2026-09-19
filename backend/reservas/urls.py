from django.urls import path
from .views import CrearReservaView, ListaClasesView

urlpatterns = [
    path(
        'reservas/',
        CrearReservaView.as_view(),
        name='crear-reserva'
    ),
    path(
        'clases/',
        ListaClasesView.as_view(),
        name='lista-clases'
    ),
]