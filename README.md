# BarreReserv

**A web-based reservation management system for Barre fitness studios.**

BarreReserv is a full-stack web application designed to simplify class scheduling and reservation management for Barre studios. It provides an intuitive interface for clients to explore available classes and book their spots, while offering administrative tools to manage schedules, capacity, and reservations.

## Tech Stack

### Frontend
- **React** – Component-based user interface.
- **Vite** – Development environment and build tool.
- **Tailwind CSS** – Utility-first styling.
- **JavaScript** – Application logic and API integration.

### Backend
- **Python** – Backend programming language.
- **Django** – Backend framework.
- **Django REST Framework** – RESTful API development.
- **JWT Authentication** – Secure authentication and token management.

### Database
- **PostgreSQL** – Relational database for production.
- **SQLite** – Local development database.
- **Supabase** – Managed PostgreSQL database infrastructure.

### Deployment
- **Vercel** – Frontend hosting.
- **Render** – Backend hosting.

## Project Architecture

The application follows a client-server architecture, separating the frontend and backend into independent projects.

```text
BarreReserv/
│
├── frontend/
│   ├── React
│   ├── Vite
│   └── Tailwind CSS
│
└── backend/
    ├── config/
    │   └── Django configuration
    │
    ├── reservas/
    │   ├── models.py
    │   ├── views.py
    │   ├── serializers.py
    │   └── migrations/
    │
    └── manage.py
```

The frontend communicates with the backend through REST API endpoints, allowing both applications to operate independently.

## Main Features

- **Class Scheduling:** Manage Barre classes, schedules, class types, and training focus.
- **Reservation Management:** Create and manage class reservations.
- **Capacity Management:** Track available and occupied spots for each class.
- **User Authentication:** JWT-based authentication and protected endpoints.
- **Administrative Management:** Access reservation information and manage studio operations.
- **Weekly Scheduling:** Automatically manage recurring class schedules.
- **Data Validation:** Prevent reservations for past classes and maintain reservation consistency.

## Associated Projects

BarreReserv is organized into two main development components:

| Project | Description | Technologies |
|---|---|---|
| Frontend | Client-facing web application and user interface. | React, Vite, Tailwind CSS |
| Backend | REST API, business logic, authentication, and reservation management. | Python, Django, DRF |

Both components work together to provide a complete reservation management solution.

## API Overview

Some of the main API endpoints include:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/clases/` | Retrieve available classes. |
| POST | `/api/reservas/` | Create a reservation. |
| POST | `/api/token/` | Obtain authentication tokens. |
| POST | `/api/token/refresh/` | Refresh authentication tokens. |
| GET | `/api/usuario/` | Retrieve authenticated user information. |
| GET | `/api/admin/reservas/` | Retrieve administrative reservation data. |

## Development Goals

This project demonstrates practical experience in:

- Full-stack web application development.
- REST API design and integration.
- Relational database modeling.
- Authentication and authorization.
- Frontend and backend architecture.
- Cloud deployment and application configuration.
- Business process automation and data management.

---

**BarreReserv** — Bringing technology and fitness studio management together.
