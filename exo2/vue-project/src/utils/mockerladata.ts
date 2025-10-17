import type { User } from '@/stores/userStore';

export function mockerLesUsers() {

  const mockerladataUser: User[] = [
    {
      id: '1',
      name: 'François Hollande',
      email: 'francois.hollande@example.com'
    },
    {
      id: '2',
      name: 'Nicolas Sarkozy',
      email: 'nicolas.sarkozy@example.com'
    },
    {
      id: '3',
      name: 'Emmanuel Macron',
      email: 'emmanuel.macron@example.com'
    },
    {
      id: '4',
      name: 'Pipoune Keduback',
      email: 'pipoune.keduback@example.com'
    }
  ]

  localStorage.setItem('users', JSON.stringify(mockerladataUser));
  console.log('données test good');
  return mockerladataUser;
}
