/**
 * Preferences Store
 *
 * Thin abstraction over user preference storage.
 * MVP: reads/writes to AsyncStorage locally.
 * Phase 2: syncs with backend, merges signals from browser extension.
 *
 * The key design decision: preferences are source-agnostic.
 * This module doesn't care if a signal came from the app or the extension.
 * It stores and retrieves UserPreferences — that's it.
 */

import type { UserPreferences } from '../types';

const STORAGE_KEY = 'altitude:preferences';

const defaults: UserPreferences = {
  recentSearches: [],
  preferredAirlines: [],
  preferredCabin: 'economy',
  priceSensitivity: 'medium',
  exploredDestinations: [],
};

// ─── In-memory cache (MVP) ───────────────────────────────
// Replace with AsyncStorage read in a real build.

let cached: UserPreferences = { ...defaults };

export function getPreferences(): UserPreferences {
  return cached;
}

export function updatePreferences(
  partial: Partial<UserPreferences>,
): UserPreferences {
  cached = { ...cached, ...partial };
  // TODO: persist to AsyncStorage
  // TODO (phase 2): push to backend for cross-device + extension sync
  return cached;
}

export function resetPreferences(): void {
  cached = { ...defaults };
}
