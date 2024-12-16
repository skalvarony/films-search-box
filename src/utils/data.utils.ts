// utils/data.utils.ts
export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching data, status: ${response.status}`);
  }

  return response.json();
};
