from django.urls import path
from .views import CrearReservaView, ListaClasesView
from .views import CrearReservaView, ListaClasesView, UsuarioActualView, ListaReservasAdminView, EliminarReservaView, ModificarReservaView, ReservaAdminDetailView

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
    path(
        'usuario/',
        UsuarioActualView.as_view(),
        name='usuario-actual'
    ),
    path(
        'admin/reservas/',
        ListaReservasAdminView.as_view(),
        name='lista-reservas-admin'
    ),
    path(
        'admin/reservas/<int:reserva_id>/',
        ReservaAdminDetailView.as_view(),
        name='reserva-admin-detail'
    ),
]