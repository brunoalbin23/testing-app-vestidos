/**
 * Utilidades del lado del cliente para el panel de admin
 */

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue || null;
  }
  return null;
}

export async function getCSRFToken(): Promise<string> {
  const cookieToken = getCookie('gr_csrf');
  if (cookieToken) {
    return cookieToken;
  }

  try {
    const response = await fetch("/api/admin/csrf", {
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      return data.token;
    }
  } catch (err) {
    console.error("Failed to get CSRF token:", err);
  }

  return '';
}

export interface AdminStats {
  stats: {
    totalItems: number;
    totalRentals: number;
    activeRentals: number;
    canceledRentals: number;
    totalRevenue: number;
    averageRentalDuration: number;
  };
  topItems: any[];
  topRevenue: any[];
  allItemsStats: any[];
}

export async function fetchAdminStats(): Promise<AdminStats | null> {
  try {
    const response = await fetch("/api/admin/stats", {
      credentials: 'include',
    });
    if (response.ok) {
      return response.json();
    }
  } catch (err) {
    console.error("Failed to fetch stats:", err);
  }
  return null;
}

export async function exportData(): Promise<void> {
  try {
    const response = await fetch("/api/admin/export", {
      credentials: 'include',
    });
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rental-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  } catch (err) {
    console.error("Failed to export data:", err);
    throw err;
  }
}

export async function checkAdminAuth(): Promise<boolean> {
  try {
    const response = await fetch("/api/admin/items", {
      credentials: 'include',
    });
    return response.status !== 401;
  } catch (err) {
    return false;
  }
}