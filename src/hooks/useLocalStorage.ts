import { useState } from 'react';

function useLocalStorage(
  key: string,
  value: unknown,
) {
  const [valueStorage, setValueStorage] = useState(
    JSON.parse(localStorage.getItem(key) as string) || value,
  );

  const setValue = (values: unknown) => {
    localStorage.setItem(key, JSON.stringify(values));
    setValueStorage(values);
  };
  return { valueStorage, setValue };
}

export default useLocalStorage;
