#!/bin/bash

# Script de testing para el backend del administrador
# Usage: bash admin-test.sh [base-url]

BASE_URL="${1:-http://localhost:3000}"
ADMIN_PASSWORD="admin123"

echo "🧪 Testing Admin Backend API"
echo "Base URL: $BASE_URL"
echo "=================================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para hacer requests
test_request() {
  local name="$1"
  local method="$2"
  local url="$3"
  local data="$4"
  
  echo -e "\n${YELLOW}Testing: $name${NC}"
  echo "Method: $method"
  echo "URL: $url"
  
  if [ -z "$data" ]; then
    response=$(curl -s -X "$method" "$BASE_URL$url" \
      -H "Cookie: gr_admin=$ADMIN_SESSION" \
      -w "\n%{http_code}")
  else
    response=$(curl -s -X "$method" "$BASE_URL$url" \
      -H "Cookie: gr_admin=$ADMIN_SESSION" \
      -d "$data" \
      -H "Content-Type: application/json" \
      -w "\n%{http_code}")
  fi
  
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | head -n-1)
  
  if [[ $http_code =~ ^[2][0-9][0-9]$ ]]; then
    echo -e "${GREEN}✓ Status: $http_code${NC}"
    echo "Response: $body" | head -c 200
    echo ""
  else
    echo -e "${RED}✗ Status: $http_code${NC}"
    echo "Response: $body" | head -c 200
    echo ""
  fi
}

# 1. Test CSRF token
echo -e "\n${YELLOW}Step 1: Getting CSRF token${NC}"
csrf_response=$(curl -s -X GET "$BASE_URL/api/admin/csrf" \
  -w "\n%{http_code}")
http_code=$(echo "$csrf_response" | tail -n1)
body=$(echo "$csrf_response" | head -n-1)

if [[ $http_code =~ ^[2][0-9][0-9]$ ]]; then
  CSRF_TOKEN=$(echo "$body" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
  echo -e "${GREEN}✓ CSRF Token obtained: $CSRF_TOKEN${NC}"
else
  echo -e "${RED}✗ Failed to get CSRF token${NC}"
  CSRF_TOKEN="test-token"
fi

# 2. Test Login
echo -e "\n${YELLOW}Step 2: Testing admin login${NC}"
login_response=$(curl -s -X POST "$BASE_URL/api/admin/login" \
  -F "username=admin" \
  -F "password=$ADMIN_PASSWORD" \
  -F "csrf=$CSRF_TOKEN" \
  -i)

ADMIN_SESSION=$(echo "$login_response" | grep -i "set-cookie" | grep "gr_admin" | cut -d'=' -f2 | cut -d';' -f1)
if [ ! -z "$ADMIN_SESSION" ]; then
  echo -e "${GREEN}✓ Login successful. Session: $ADMIN_SESSION${NC}"
else
  echo -e "${YELLOW}⚠ Session not extracted, using test token${NC}"
  ADMIN_SESSION="test-session"
fi

# 3. Test Get Items
echo -e "\n${YELLOW}Step 3: Getting items list${NC}"
test_request "GET /api/admin/items" "GET" "/api/admin/items"

# 4. Test Create Item
echo -e "\n${YELLOW}Step 4: Creating a new item${NC}"
item_data='{"name":"Test Dress","category":"dress","pricePerDay":99,"sizes":"S,M,L","color":"red","description":"Test description","images":"/test.jpg","alt":"Test","csrf":"'$CSRF_TOKEN'"}'
test_request "POST /api/admin/items" "POST" "/api/admin/items" "$item_data"

# 5. Test Search Items
echo -e "\n${YELLOW}Step 5: Searching items${NC}"
test_request "GET /api/admin/items/search?q=dress" "GET" "/api/admin/items/search?q=dress"

# 6. Test Get Item Details
echo -e "\n${YELLOW}Step 6: Getting item details${NC}"
test_request "GET /api/admin/items/1/get" "GET" "/api/admin/items/1/get"

# 7. Test Get Rentals
echo -e "\n${YELLOW}Step 7: Getting rentals list${NC}"
test_request "GET /api/admin/rentals" "GET" "/api/admin/rentals"

# 8. Test Dashboard
echo -e "\n${YELLOW}Step 8: Getting dashboard stats${NC}"
test_request "GET /api/admin/dashboard" "GET" "/api/admin/dashboard"

# 9. Test Stats
echo -e "\n${YELLOW}Step 9: Getting detailed stats${NC}"
test_request "GET /api/admin/stats" "GET" "/api/admin/stats"

# 10. Test Item Availability
echo -e "\n${YELLOW}Step 10: Checking item availability${NC}"
test_request "GET /api/admin/items/availability" "GET" "/api/admin/items/availability?start=2025-12-01&end=2025-12-05"

echo -e "\n${GREEN}=================================================="
echo "✓ Testing completed!${NC}"
