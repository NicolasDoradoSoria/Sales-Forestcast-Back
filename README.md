# Sales Forecast App

Aplicación backend para cargar datos históricos de ventas y generar predicciones de demanda.

# Login
email: 'user@example.com'.
passworld: "user123"

## 🚀 Features

- Autenticación con JWT
- Carga de archivos CSV con datos de ventas
- Generación de pronósticos por SKU
- Persistencia en PostgreSQL con Prisma ORM
- Validación de input con class-validator

## 📦 Endpoints

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Files

- `POST /files` - Carga de archivo CSV con datos de ventas (requiere autenticación)
- `GET /files` - Devuelve lista de archivos cargados (requiere autenticación)


### Forecast

- `POST /forecast` - Genera predicción (requiere `sku`, `horizon_months`)
- `GET /forecast/:sku` - Devuelve predicciones anteriores para un SKU

## 📂 Estructura del Proyecto

src/
│
├── controllers/
├── dao/
├── domain/
├── dtos/
├── services/
├── utils/
└── utils/middlewares
└── utils/exceptions
└── db/


## 🧪 Validaciones

Se usa `class-validator` y `class-transformer` para asegurar la estructura del input.

## 🐳 Docker

Se incluye un `Dockerfile` y `docker-compose.yml` (si lo agregás) para correr el backend con PostgreSQL.

## 🧠 Notas

- El backend sigue una arquitectura en capas.
- Se utiliza una abstracción de repositorios para separar la lógica de acceso a datos.
- En caso de error de validación o falta de archivo, se devuelven errores estructurados.

## ✅ Requisitos

- Node.js 20+
- PostgreSQL
- Prisma (migraciones y cliente)

## 👨‍💻 Autor

Nicolás Dorado Soria
