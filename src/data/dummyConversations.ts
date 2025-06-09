export interface DummyConversation {
  id: number;
  participantId: number;
  lastMessage: string;
  unreadCount: number;
}

import { dummyUsers } from './dummyUsers';

export const dummyConversations: DummyConversation[] = [
  {
    id: 1,
    participantId: 2,
    lastMessage: 'Hey there! How are you?',
    unreadCount: 1,
  },
  {
    id: 2,
    participantId: 3,
    lastMessage: 'Let\'s grab coffee soon.',
    unreadCount: 0,
  },
  {
    id: 3,
    participantId: 5,
    lastMessage: 'Great workout session yesterday!',
    unreadCount: 3,
  },
];

export function getConversationUser(conversation: DummyConversation) {
  return dummyUsers.find((u) => u.id === conversation.participantId)!;
}
