export const fakeFetch = () => new Promise<{ data: string }>((resolve, reject) => {
  setTimeout(() => {
    const random = Math.random();
    if (random > 0.5) {
      resolve({ data: 'Fetched data' });
    } else {
      reject(new Error('Fetch error'));
    }
  }, 1000)})