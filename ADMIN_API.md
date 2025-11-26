# API de Administrador - Documentación Completa

## Autenticación

Todas las rutas requieren que el usuario esté autenticado como administrador. Las cookies de sesión se establecen mediante el endpoint de login.

### POST `/api/admin/login`
Inicia sesión como administrador.

**Parámetros:**
- `username` (string): Nombre de usuario
- `password` (string): Contraseña
- `csrf` (string): Token CSRF

**Respuesta exitosa:** Redirige a `/admin`

**Respuesta de error:**
```json
{ "error": "Invalid credentials" }
```

### POST `/api/admin/logout`
Cierra la sesión de administrador.

**Respuesta:** Redirige a `/admin/login`

## Gestión de Items (Prendas)

### GET `/api/admin/items`
Obtiene la lista de todos los items.

**Respuesta:**
```json
{
  "items": [
    {
      "id": 1,
      "name": "Silk Evening Gown",
      "category": "dress",
      "pricePerDay": 79,
      "sizes": ["XS", "S", "M", "L"],
      "color": "champagne",
      "style": "evening",
      "description": "Luxurious silk gown with flattering silhouette.",
      "images": ["/images/dresses/silk-evening-gown.jpg"],
      "alt": "Model wearing a champagne silk evening gown",
      "stock": 5
    }
  ]
}
```

### POST `/api/admin/items`
Crea un nuevo item.

**Parámetros (FormData):**
- `name` (string): Nombre del item *
- `category` (string): Categoría (dress, shoes, bag, jacket) *
- `pricePerDay` (number): Precio por día *
- `sizes` (string): Tamaños separados por comas (ej: "XS, S, M, L") *
- `color` (string): Color *
- `style` (string): Estilo (opcional)
- `description` (string): Descripción *
- `images` (string): URLs de imágenes separadas por comas *
- `alt` (string): Texto alternativo de imágenes *
- `stock` (number): Stock disponible (opcional)
- `csrf` (string): Token CSRF *

**Respuesta:**
```json
{
  "item": { /* objeto item */ }
}
```

### GET `/api/admin/items/[id]/get`
Obtiene los detalles de un item específico.

**Parámetros:**
- `id`: ID del item

**Respuesta:**
```json
{
  "item": { /* objeto item */ }
}
```

### PUT `/api/admin/items/[id]`
Actualiza un item existente.

**Parámetros:** Iguales que POST (todos opcionales)

**Respuesta:**
```json
{
  "item": { /* objeto actualizado */ }
}
```

### DELETE `/api/admin/items/[id]`
Elimina un item.

**Parámetros:**
- `csrf` (string): Token CSRF

**Respuesta:**
```json
{
  "success": true
}
```

### PUT `/api/admin/items/[id]/stock`
Actualiza el stock de un item.

**Parámetros (FormData):**
- `stock` (number): Nueva cantidad de stock *
- `csrf` (string): Token CSRF *

**Respuesta:**
```json
{
  "item": { /* objeto actualizado */ },
  "success": true
}
```

### GET `/api/admin/items/search`
Busca items con filtros.

**Query parameters:**
- `q` (string): Término de búsqueda (opcional)
- `category` (string): Filtrar por categoría (opcional)
- `size` (string): Filtrar por tamaño (opcional)
- `color` (string): Filtrar por color (opcional)
- `style` (string): Filtrar por estilo (opcional)

**Respuesta:**
```json
{
  "items": [ /* items filtrados */ ],
  "filters": {
    "sizes": ["XS", "S", "M", ...],
    "colors": ["champagne", "black", ...],
    "styles": ["evening", "cocktail", ...]
  }
}
```

### GET `/api/admin/items/availability`
Verifica disponibilidad de items en un rango de fechas.

**Query parameters:**
- `start` (string): Fecha de inicio (YYYY-MM-DD) *
- `end` (string): Fecha de finalización (YYYY-MM-DD) *

**Respuesta:**
```json
{
  "availability": [
    {
      "id": 1,
      "name": "Silk Evening Gown",
      "available": true,
      "bookedDates": [
        {
          "start": "2025-12-01",
          "end": "2025-12-03",
          "customer": "John Doe"
        }
      ]
    }
  ]
}
```

## Gestión de Alquileres

### GET `/api/admin/rentals`
Obtiene la lista de todos los alquileres.

**Respuesta:**
```json
{
  "rentals": [
    {
      "id": "uuid",
      "itemId": 1,
      "start": "2025-12-01",
      "end": "2025-12-03",
      "customer": {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "+1234567890"
      },
      "createdAt": "2025-11-26T10:00:00Z",
      "status": "active"
    }
  ]
}
```

### GET `/api/admin/rentals/[id]`
Obtiene los detalles de un alquiler específico.

**Parámetros:**
- `id`: ID del alquiler

**Respuesta:**
```json
{
  "rental": { /* objeto alquiler */ }
}
```

### POST `/api/admin/rentals/[id]/cancel`
Cancela un alquiler.

**Parámetros (FormData):**
- `csrf` (string): Token CSRF *

**Respuesta:**
```json
{
  "success": true
}
```

## Dashboard

### GET `/api/admin/dashboard`
Obtiene un resumen del dashboard con estadísticas.

**Respuesta:**
```json
{
  "stats": {
    "totalItems": 10,
    "totalRentals": 25,
    "activeRentals": 18,
    "canceledRentals": 7,
    "totalRevenue": 3500.50
  },
  "items": [
    {
      "id": 1,
      "name": "Silk Evening Gown",
      ...
      "activeRentals": [
        {
          "id": "uuid",
          "start": "2025-12-01",
          "end": "2025-12-03",
          ...
        }
      ]
    }
  ],
  "rentals": [ /* lista de alquileres */ ]
}
```

## Tokens CSRF

### GET `/api/admin/csrf`
Obtiene un token CSRF válido.

**Respuesta:**
```json
{
  "token": "uuid",
  "success": true
}
```

## Códigos de Error

- `400`: Solicitud inválida (parámetros faltantes o inválidos)
- `401`: No autorizado (no está autenticado como administrador)
- `404`: Recurso no encontrado
- `500`: Error interno del servidor

## Ejemplo de uso con cURL

```bash
# Login
curl -X POST http://localhost:3000/api/admin/login \
  -F "username=admin" \
  -F "password=admin123" \
  -F "csrf=token"

# Obtener items
curl -X GET http://localhost:3000/api/admin/items \
  -H "Cookie: gr_admin=session_token"

# Crear item
curl -X POST http://localhost:3000/api/admin/items \
  -F "name=New Dress" \
  -F "category=dress" \
  -F "pricePerDay=99" \
  -F "sizes=S,M,L" \
  -F "color=red" \
  -F "description=Beautiful red dress" \
  -F "images=/images/dress.jpg" \
  -F "alt=Red dress" \
  -F "csrf=token" \
  -H "Cookie: gr_admin=session_token"

# Actualizar stock
curl -X PUT http://localhost:3000/api/admin/items/1/stock \
  -F "stock=10" \
  -F "csrf=token" \
  -H "Cookie: gr_admin=session_token"

# Cancelar alquiler
curl -X POST http://localhost:3000/api/admin/rentals/rental-id/cancel \
  -F "csrf=token" \
  -H "Cookie: gr_admin=session_token"
```

## Variables de Entorno

- `ADMIN_PASSWORD`: Contraseña del administrador (default: "admin123")
- `NODE_ENV`: Entorno (development/production)
