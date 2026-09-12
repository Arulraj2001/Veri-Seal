import { StoredGarageVehicle } from './types';
export type { StoredGarageVehicle };

const STORAGE_KEY = 'Kagazo_vehicle_garage_v1';

export const DEFAULT_GARAGE_VEHICLES: StoredGarageVehicle[] = [
  {
    id: 'demo-car-1',
    nickname: 'Family Swift',
    make: 'Maruti Suzuki',
    model: 'Swift ZXi',
    year: 2023,
    fuelType: 'petrol',
    category: 'car',
    odometer: 18450,
    monthlyKm: 1100,
    registrationNumber: 'TN 07 BX 4920',
    insuranceExpiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 45 days left
    pucExpiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    lastServiceDate: '2024-03-15',
    lastServiceOdo: 15200,
    batteryInstalledDate: '2023-01-10',
    tyreInstalledOdo: 0,
    createdAt: new Date().toISOString(),
  },
];

export function getGarageVehicles(): StoredGarageVehicle[] {
  if (typeof window === 'undefined') return DEFAULT_GARAGE_VEHICLES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_GARAGE_VEHICLES));
      return DEFAULT_GARAGE_VEHICLES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_GARAGE_VEHICLES;
  } catch {
    return DEFAULT_GARAGE_VEHICLES;
  }
}

export function saveGarageVehicle(vehicle: StoredGarageVehicle): StoredGarageVehicle[] {
  if (typeof window === 'undefined') return [vehicle];
  try {
    const current = getGarageVehicles();
    const existingIndex = current.findIndex((v) => v.id === vehicle.id);
    let updated: StoredGarageVehicle[];

    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = vehicle;
    } else {
      updated = [vehicle, ...current];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [vehicle];
  }
}

export function deleteGarageVehicle(id: string): StoredGarageVehicle[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getGarageVehicles();
    const updated = current.filter((v) => v.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}
