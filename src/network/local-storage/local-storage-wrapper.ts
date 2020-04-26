type LocalStorageKeys = "isConnectedToAdmin";

class LocalStorageWrapper {
  getItem = <T>(key: LocalStorageKeys): T | null => {
    const valueFromStorage = localStorage.getItem(key);
    return valueFromStorage ? JSON.parse(valueFromStorage) : null;
  };
  setItem = (value, key: LocalStorageKeys) => {
    const valueToString = JSON.stringify(value);
    localStorage.setItem(key, valueToString);
  };
  removeItem = (key: LocalStorageKeys) => localStorage.removeItem(key);
}

export const localStorageWrapper = new LocalStorageWrapper();
