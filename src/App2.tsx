import { useState } from "react";
import { fakeFetch } from "./fetch";

export const App = () => {
  const [data, setData] = useState<{ data: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fakeFetch();
      setData(res);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }

  return <div>
      {!isLoading && !error && <button onClick={fetchData}>fetchData</button>}
      {isLoading && !error && <p>Загрузка...</p>}
      {data && !error && (
        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', alignItems: 'center' }}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button onClick={fetchData}>fetchData</button>
        </div>
      )}
      {error && !isLoading && (
        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', alignItems: 'center' }}>
          <p>Ошибка: {error?.message}</p>
          <button onClick={fetchData}>fetchData</button>
          <button onClick={reset}>ResetData</button>
      </div>
      )}
    </div>
}