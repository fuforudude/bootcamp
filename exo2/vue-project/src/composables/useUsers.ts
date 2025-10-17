export interface User {
  id: number | string
  name: string
  email: string
}

export function useUsers() {
  function getUserById(id: number | string) : User | null {
    const dataStockée = localStorage.getItem('users');
    const users: User[] = dataStockée ? JSON.parse(dataStockée) : [];
    const user = users.find (u => Number(u.id) === Number(id)) || null;
    return user;
  };

  return { getUserById };
};