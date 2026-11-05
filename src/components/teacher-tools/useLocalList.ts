'use client';

/**
 * localStorage-backed state helper for the teacher tools.
 * The original HTML pages persisted `teacherTodos`, `teacherNotes`,
 * `teacherPlans`, `teacherLinks` and lecture notes in localStorage; the
 * migration keeps that behaviour, namespaced per subject so each subject
 * dashboard gets its own data. Falls back to the provided demo seed on
 * first visit.
 */

import * as React from 'react';

export function useLocalList<T>(
  storageKey: string,
  seed: T[],
): [T[], React.Dispatch<React.SetStateAction<T[]>>, boolean] {
  const [items, setItems] = React.useState<T[]>(seed);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw !== null) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed as T[]);
      }
    } catch {
      // corrupted storage — keep seed
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // storage full/unavailable — demo continues in memory
    }
  }, [items, hydrated, storageKey]);

  return [items, setItems, hydrated];
}

export function useLocalValue(
  storageKey: string,
  seed: string,
): [string, React.Dispatch<React.SetStateAction<string>>, boolean] {
  const [value, setValue] = React.useState(seed);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw !== null) setValue(raw);
    } catch {
      // keep seed
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, value);
    } catch {
      // ignore
    }
  }, [value, hydrated, storageKey]);

  return [value, setValue, hydrated];
}
