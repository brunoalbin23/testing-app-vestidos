# Backend del Administrador - Guía de Implementación

## Descripción General

Se ha implementado una funcionalidad completa del administrador que incluye:

1. **Autenticación segura** con tokens CSRF
2. **Gestión completa de items** (crear, leer, actualizar, eliminar, stock)
3. **Gestión de alquileres** (listar, ver detalles, cancelar)
4. **Dashboard con estadísticas** avanzadas
5. **Búsqueda y filtrado** de items
6. **Verificación de disponibilidad** de items
7. **Exportación de datos** para backup
8. **Validación de datos** completa

## Rutas Implementadas

### Autenticación
- `POST /api/admin/login` - Login
- `POST /api/admin/logout` - Logout
- `GET /api/admin/csrf` - Obtener token CSRF

### Gestión de Items
- `GET /api/admin/items` - Listar todos
- `POST /api/admin/items` - Crear nuevo
- `GET /api/admin/items/[id]/get` - Obtener detalles
- `PUT /api/admin/items/[id]` - Actualizar
- `DELETE /api/admin/items/[id]` - Eliminar
- `PUT /api/admin/items/[id]/stock` - Actualizar stock
- `GET /api/admin/items/search` - Buscar con filtros
- `GET /api/admin/items/availability` - Verificar disponibilidad

### Gestión de Alquileres
- `GET /api/admin/rentals` - Listar todos
- `GET /api/admin/rentals/[id]` - Obtener detalles
- `POST /api/admin/rentals/[id]/cancel` - Cancelar

### Dashboard y Estadísticas
- `GET /api/admin/dashboard` - Resumen completo del dashboard
- `GET /api/admin/stats` - Estadísticas detalladas
- `GET /api/admin/export` - Exportar datos

## Características Implementadas

### 1. Autenticación y Seguridad
- ✅ Validación de contraseña contra variable de entorno `ADMIN_PASSWORD`
- ✅ Sesiones basadas en cookies HttpOnly
- ✅ Protección CSRF en todos los endpoints que modifican datos
- ✅ Middleware de autenticación en todas las rutas protegidas

### 2. Gestión de Items
- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Validación de datos de entrada
- ✅ Soporte para múltiples tamaños, imágenes y estilos
- ✅ Gestión de stock
- ✅ Filtrado avanzado (por categoría, tamaño, color, estilo, búsqueda)

### 3. Gestión de Alquileres
- ✅ Listar todos los alquileres activos y cancelados
- ✅ Ver detalles de alquileres específicos
- ✅ Cancelar alquileres
- ✅ Información del cliente integrada

### 4. Disponibilidad
- ✅ Verificar disponibilidad de items en rangos de fechas
- ✅ Ver calendarios de reservas para cada item
- ✅ Prevenir conflictos de fechas

### 5. Dashboard
- ✅ Estadísticas en tiempo real (total de items, alquileres, ingresos)
- ✅ Items más alquilados
- ✅ Items con mayor ingresos
- ✅ Duración promedio de alquileres
- ✅ Información detallada de utilización

### 6. Exportación de Datos
- ✅ Exportar todo el inventario como JSON
- ✅ Exportar historial de alquileres
- ✅ Descargar automáticamente con timestamp

## Servicios Creados

### `lib/admin-service.ts`
Servicios de validación y estadísticas:
- `validateItemData()` - Valida datos de items
- `validateRentalData()` - Valida datos de alquileres
- `getSystemStats()` - Obtiene estadísticas generales
- `getItemsWithUsageStats()` - Obtiene estadísticas de uso
- `exportData()` - Exporta datos completos

### `lib/admin-utils.ts`
Utilidades para endpoints:
- `protectAdminRoute()` - Middleware de protección
- `extractFormData()` - Extrae datos de formularios
- `validateRequired()` - Valida campos requeridos
- `parseCommaSeparated()` - Parsea listas separadas por comas
- Funciones de respuesta estándar

### `lib/admin-client.ts`
Utilidades del cliente:
- `getCookie()` - Obtiene cookies
- `getCSRFToken()` - Obtiene token CSRF
- `fetchAdminStats()` - Obtiene estadísticas
- `exportData()` - Exporta datos
- `checkAdminAuth()` - Verifica autenticación

## Componentes Frontend

### `DashboardStats.tsx`
Componente que muestra:
- Estadísticas principales (4 tarjetas)
- Items más alquilados
- Items con mayor ingresos
- Botón de exportación de datos

### `ItemForm.tsx` (mejorado)
- Validación del lado del cliente
- Uso automático de token CSRF
- Soporte para crear y actualizar items

### `InventoryManagement.tsx` (existente)
- Tabla de items con acciones
- Crear, editar, eliminar items
- Actualizar stock

## Cómo Usar

### 1. Login
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -F "username=admin" \
  -F "password=admin123" \
  -F "csrf=token"
```

### 2. Obtener Token CSRF
```bash
curl -X GET http://localhost:3000/api/admin/csrf \
  -H "Cookie: gr_admin=session_token"
```

### 3. Crear un Item
```bash
curl -X POST http://localhost:3000/api/admin/items \
  -F "name=Evening Gown" \
  -F "category=dress" \
  -F "pricePerDay=99" \
  -F "sizes=S,M,L" \
  -F "color=black" \
  -F "description=Elegant evening dress" \
  -F "images=/images/dress.jpg" \
  -F "alt=Evening dress" \
  -F "csrf=token" \
  -H "Cookie: gr_admin=session_token"
```

### 4. Actualizar Stock
```bash
curl -X PUT http://localhost:3000/api/admin/items/1/stock \
  -F "stock=10" \
  -F "csrf=token" \
  -H "Cookie: gr_admin=session_token"
```

### 5. Obtener Dashboard
```bash
curl -X GET http://localhost:3000/api/admin/dashboard \
  -H "Cookie: gr_admin=session_token"
```

### 6. Exportar Datos
```bash
curl -X GET http://localhost:3000/api/admin/export \
  -H "Cookie: gr_admin=session_token" \
  -o backup.json
```

## Variables de Entorno

```env
# Contraseña del administrador
ADMIN_PASSWORD=admin123

# Entorno (development/production)
NODE_ENV=development
```

## Validaciones Implementadas

### Items
- Nombre: Requerido, no vacío
- Categoría: Una de (dress, shoes, bag, jacket)
- Precio: Número positivo
- Tamaños: Al menos uno
- Color: Requerido, no vacío
- Descripción: Requerido, no vacío
- Imágenes: Al menos una
- Alt text: Requerido, no vacío
- Stock: Número no negativo (opcional)

### Alquileres
- Item ID: Número válido
- Fechas: Formato YYYY-MM-DD
- Fecha final > Fecha inicial
- Cliente: Nombre, email, teléfono requeridos
- Email: Validación de formato

## Seguridad

- ✅ Validación de CSRF en todos los POST/PUT/DELETE
- ✅ Cookies HttpOnly para sesiones
- ✅ Autenticación requerida en todas las rutas protegidas
- ✅ Validación de entrada en todos los endpoints
- ✅ Mensajes de error genéricos para no revelar información

## Estructura de Respuestas

### Éxito (200, 201)
```json
{
  "item": { /* objeto */ }
}

{
  "items": [ /* array de objetos */ ],
  "filters": { /* opcionales */ }
}

{
  "stats": { /* estadísticas */ },
  "topItems": [ /* array */ ],
  "allItemsStats": [ /* array */ ]
}
```

### Error (400, 401, 404)
```json
{
  "error": "Descripción del error"
}
```

## Próximas Mejoras Posibles

- [ ] Base de datos persistente (actualmente en memoria)
- [ ] Autenticación multi-usuario
- [ ] Historial de cambios/auditoría
- [ ] Generación de reportes en PDF
- [ ] Integración con pasarela de pago
- [ ] Sistema de notificaciones
- [ ] Búsqueda full-text
- [ ] Importación de datos

## Recursos Adicionales

- Ver `ADMIN_API.md` para documentación completa de endpoints
- Ver `TESTING.md` para guías de testing
- Ver `README.md` para información general del proyecto
