# Admin Backend - Quick Reference Guide

## 🚀 Quick Start

```bash
# 1. Start the dev server
npm run dev

# 2. Access admin panel
http://localhost:3000/admin/login

# 3. Login with
Username: admin
Password: admin123
```

## 📡 API Quick Reference

### Authentication
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/admin/login` | Login |
| POST | `/api/admin/logout` | Logout |
| GET | `/api/admin/csrf` | Get CSRF token |

### Items
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/admin/items` | List all items |
| POST | `/api/admin/items` | Create item |
| GET | `/api/admin/items/[id]/get` | Get item details |
| PUT | `/api/admin/items/[id]` | Update item |
| DELETE | `/api/admin/items/[id]` | Delete item |
| PUT | `/api/admin/items/[id]/stock` | Update stock |
| GET | `/api/admin/items/search?q=...` | Search items |
| GET | `/api/admin/items/availability` | Check availability |

### Rentals
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/admin/rentals` | List all rentals |
| GET | `/api/admin/rentals/[id]` | Get rental details |
| POST | `/api/admin/rentals/[id]/cancel` | Cancel rental |

### Analytics
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/admin/dashboard` | Dashboard overview |
| GET | `/api/admin/stats` | Detailed statistics |
| GET | `/api/admin/export` | Export data (JSON) |

## 🔐 Authentication Headers

All requests (except login) need:
```
Cookie: gr_admin=<session-token>
```

All state-changing requests need:
```
Form parameter: csrf=<csrf-token>
```

## 📊 Common Patterns

### Get CSRF Token
```javascript
const response = await fetch("/api/admin/csrf", {
  credentials: "include"
});
const { token } = await response.json();
```

### Create Item
```javascript
const form = new FormData();
form.append("name", "Item Name");
form.append("category", "dress");
form.append("pricePerDay", "99");
form.append("sizes", "S,M,L");
form.append("color", "black");
form.append("description", "Description");
form.append("images", "/image.jpg");
form.append("alt", "Alt text");
form.append("csrf", csrfToken);

const response = await fetch("/api/admin/items", {
  method: "POST",
  body: form,
  credentials: "include"
});
```

### Search Items
```javascript
const params = new URLSearchParams({
  q: "dress",
  category: "dress",
  size: "M",
  sortBy: "price",
  sortOrder: "asc"
});

const response = await fetch(`/api/admin/items/search?${params}`, {
  credentials: "include"
});
```

### Check Availability
```javascript
const response = await fetch(
  "/api/admin/items/availability?start=2025-12-01&end=2025-12-05",
  { credentials: "include" }
);
```

## 🛠️ Utility Functions

### From `admin-client.ts`
```javascript
import { 
  getCookie,           // Get cookie value
  getCSRFToken,       // Get CSRF token
  fetchAdminStats,    // Get statistics
  exportData,         // Download backup
  checkAdminAuth      // Check if logged in
} from "@/lib/admin-client";
```

## 📝 Common Use Cases

### Update Stock
```bash
curl -X PUT http://localhost:3000/api/admin/items/1/stock \
  -F "stock=10" \
  -F "csrf=$CSRF" \
  -H "Cookie: gr_admin=$SESSION"
```

### Delete Item
```bash
curl -X DELETE http://localhost:3000/api/admin/items/1 \
  -F "csrf=$CSRF" \
  -H "Cookie: gr_admin=$SESSION"
```

### Cancel Rental
```bash
curl -X POST http://localhost:3000/api/admin/rentals/rental-id/cancel \
  -F "csrf=$CSRF" \
  -H "Cookie: gr_admin=$SESSION"
```

### Export Backup
```bash
curl -X GET http://localhost:3000/api/admin/export \
  -H "Cookie: gr_admin=$SESSION" \
  > backup.json
```

## 🔍 Query Parameters

### Search
- `q` - Search term
- `category` - Filter by category
- `size` - Filter by size
- `color` - Filter by color
- `style` - Filter by style
- `sortBy` - Sort field (name, price, category)
- `sortOrder` - Sort order (asc, desc)

### Availability
- `start` - Start date (YYYY-MM-DD)
- `end` - End date (YYYY-MM-DD)

## 💾 Response Examples

### Successful Response
```json
{
  "item": {
    "id": 1,
    "name": "Silk Evening Gown",
    "category": "dress",
    "pricePerDay": 79,
    "sizes": ["XS", "S", "M", "L"],
    "color": "champagne",
    "description": "Luxurious silk gown",
    "images": ["/images/dresses/silk-evening-gown.jpg"],
    "alt": "Evening gown",
    "stock": 5
  }
}
```

### Error Response
```json
{
  "error": "Invalid CSRF token"
}
```

## 🧪 Testing

Run automated tests:
```bash
bash admin-test.sh http://localhost:3000
```

## 📚 Documentation Files

- `ADMIN_API.md` - Complete API documentation
- `ADMIN_IMPLEMENTATION.md` - Implementation details
- `IMPLEMENTATION_SUMMARY.md` - Overview of all features
- `QUICK_REFERENCE.md` - This file

## 🎯 Important Notes

1. **Credentials**: Always use `credentials: "include"` in fetch calls
2. **CSRF**: Required for POST, PUT, DELETE requests
3. **Sessions**: Last for 7 days by default
4. **Validation**: Input is validated on the server
5. **Errors**: All errors include HTTP status codes

## 🔗 Related Files

- Backend: `/src/app/api/admin/*`
- Services: `/lib/admin-*.ts`
- Components: `/src/app/admin/components/*`
- Types: `/lib/types.ts`
- Middleware: `/middleware.ts`

## ⚙️ Configuration

### Environment Variables
```env
ADMIN_PASSWORD=admin123
NODE_ENV=development
```

### Cookie Settings
- Name: `gr_admin`
- HttpOnly: true
- SameSite: lax
- Secure: true (production only)
- MaxAge: 7 days

## 🚨 Troubleshooting

### "Unauthorized" Error
- Check if logged in: `curl http://localhost:3000/admin`
- Check session cookie exists
- Try login again

### "Invalid CSRF token"
- Get new token: `fetch("/api/admin/csrf")`
- Include token in form data
- Use same token for each request

### "Item not found"
- Verify item ID is correct
- Check item hasn't been deleted
- Reload items list

## 📞 Support

For issues, check:
1. Console errors
2. Network tab (Dev Tools)
3. Server logs
4. API documentation
5. Component source code
