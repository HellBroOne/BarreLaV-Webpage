import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

username = os.getenv("ADMIN_USERNAME")
password = os.getenv("ADMIN_PASSWORD")
email = os.getenv("ADMIN_EMAIL", "")

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(
        username=username,
        email=email,
        password=password,
    )
    print(f"Superusuario '{username}' creado correctamente.")
else:
    print(f"El usuario '{username}' ya existe.")