export interface DummyUser {
  id: number;
  displayName: string;
  bio: string;
  avatar: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export const dummyUsers: DummyUser[] = [
  {
    id: 1,
    displayName: 'Alice',
    bio: 'Enjoys hiking and outdoor adventures.',
    avatar: 'https://i.pravatar.cc/80?img=1',
    location: { latitude: 37.776, longitude: -122.417 },
  },
  {
    id: 2,
    displayName: 'Bob',
    bio: 'Coffee enthusiast and music lover.',
    avatar: 'https://i.pravatar.cc/80?img=2',
    location: { latitude: 37.774, longitude: -122.42 },
  },
  {
    id: 3,
    displayName: 'Charlie',
    bio: 'Avid reader and writer.',
    avatar: 'https://i.pravatar.cc/80?img=3',
    location: { latitude: 37.772, longitude: -122.418 },
  },
  {
    id: 4,
    displayName: 'Dana',
    bio: 'Tech enthusiast.',
    avatar: 'https://i.pravatar.cc/80?img=4',
    location: { latitude: 37.7755, longitude: -122.415 },
  },
  {
    id: 5,
    displayName: 'Eve',
    bio: 'Fitness trainer and foodie.',
    avatar: 'https://i.pravatar.cc/80?img=5',
    location: { latitude: 37.777, longitude: -122.419 },
  },
];
