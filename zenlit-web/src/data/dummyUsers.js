// An array of dummy user profiles with id, name, avatar URL, bio, and lat/lng
export const dummyUsers = [
  {
    id: 'user1',
    displayName: 'Alice Johnson',
    avatar: 'https://via.placeholder.com/80/007BFF/FFFFFF?text=A',
    bio: 'Coffee lover and coder.',
    location: { latitude: 37.7749, longitude: -122.4194 }
  },
  {
    id: 'user2',
    displayName: 'Bob Smith',
    avatar: 'https://via.placeholder.com/80/28A745/FFFFFF?text=B',
    bio: 'Hiker and photographer.',
    location: { latitude: 37.7849, longitude: -122.4094 }
  },
  {
    id: 'user3',
    displayName: 'Carol Lee',
    avatar: 'https://via.placeholder.com/80/DC3545/FFFFFF?text=C',
    bio: 'Traveler and foodie.',
    location: { latitude: 37.7649, longitude: -122.4294 }
  },
  {
    id: 'user4',
    displayName: 'David Kim',
    avatar: 'https://via.placeholder.com/80/FFC107/FFFFFF?text=D',
    bio: 'Music fan and gamer.',
    location: { latitude: 37.7689, longitude: -122.4124 }
  },
  {
    id: 'user5',
    displayName: 'Eva Chan',
    avatar: 'https://via.placeholder.com/80/6F42C1/FFFFFF?text=E',
    bio: 'Runner and blogger.',
    location: { latitude: 37.7729, longitude: -122.4274 }
  }
];

// Messages keyed by conversation ID (constructed as "user1-user2")
export const dummyMessages = {
  'user1-user2': [
    { id: 'm1', sender: 'user1', text: 'Hey Bob, how\u2019s it going?', timestamp: '2025-06-01T10:00:00Z' },
    { id: 'm2', sender: 'user2', text: 'Pretty good, Alice! You?', timestamp: '2025-06-01T10:05:00Z' }
  ],
  'user2-user3': [
    { id: 'm3', sender: 'user2', text: 'Hi Carol, want to grab coffee?', timestamp: '2025-06-02T11:00:00Z' },
    { id: 'm4', sender: 'user3', text: 'Sure thing, Bob!', timestamp: '2025-06-02T11:10:00Z' }
  ],
  'user3-user4': [
    { id: 'm5', sender: 'user3', text: 'Hey David!', timestamp: '2025-06-03T09:00:00Z' },
    { id: 'm6', sender: 'user4', text: 'Hi Carol!', timestamp: '2025-06-03T09:05:00Z' }
  ]
};
