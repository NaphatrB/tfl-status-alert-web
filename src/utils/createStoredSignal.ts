import { useState, useEffect, Dispatch, SetStateAction } from "react";

export function createStoredSignal<T>(
  key: string,
  defaultValue?: T,
  storage = localStorage,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] {
  const getInitialValue = (): T | undefined => {
    try {
      const item = storage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [value, setValue] = useState<T | undefined>(getInitialValue);

  useEffect(() => {
    if (value !== undefined) {
      storage.setItem(key, JSON.stringify(value));
    }
  }, [value, key, storage]);

  const remove = () => {
    setValue(undefined);
    storage.removeItem(key);
  };

  return [value, setValue, remove];
}
