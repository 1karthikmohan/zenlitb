import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please add them to your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for the Users table
export type User = {
  id: string;
  email: string;
  displayName: string;
  photoURLs: string[];
  bio: string;
  last_known_location: {
    latitude: number;
    longitude: number;
  };
  isPremium: boolean;
  subscription: {
    revenueCatCustomerID: string;
    entitlement: string;
    expiresAt: string; // ISO string representation of timestamp
  };
  created_at: string;
  updated_at: string;
};

// Types for the Connections table
export type ConnectionStatus = 'pending' | 'accepted' | 'rejected';

export type Connection = {
  id: string;
  fromUserID: string;
  toUserID: string;
  status: ConnectionStatus;
  matchedAt: string;
  created_at: string;
  updated_at: string;
};

// Types for the Conversations table
export type Conversation = {
  id: string;
  participants: string[];
  lastMessageText: string;
  created_at: string;
  updated_at: string;
};

// Types for the Messages table
export type Message = {
  id: string;
  conversationID: string;
  senderID: string;
  content: string;
  readBy: string[];
  created_at: string;
  updated_at: string;
};

// Helper functions for the Users table
export const usersTable = {
  // Create a new user
  async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    return supabase.from('Users').insert([user]).select();
  },

  // Get a user by email
  async getUserByEmail(email: string) {
    return supabase.from('Users').select('*').eq('email', email).single();
  },

  // Get premium users
  async getPremiumUsers() {
    return supabase.from('Users').select('*').eq('isPremium', true);
  },

  // Update a user
  async updateUser(id: string, updates: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>) {
    return supabase.from('Users').update(updates).eq('id', id);
  },

  // Delete a user
  async deleteUser(id: string) {
    return supabase.from('Users').delete().eq('id', id);
  },

  // Find users near a location (using Supabase PostGIS functions)
  async findUsersNearLocation(latitude: number, longitude: number, radiusInMeters: number) {
    // This requires the PostGIS extension to be enabled in Supabase
    return supabase.rpc('find_users_near_location', {
      lat: latitude,
      lng: longitude,
      radius: radiusInMeters
    });
  }
};

// Helper functions for the Connections table
export const connectionsTable = {
  // Create a new connection request
  async createConnection(fromUserID: string, toUserID: string) {
    return supabase.from('Connections').insert([{
      fromUserID,
      toUserID,
      status: 'pending',
      matchedAt: new Date().toISOString()
    }]).select();
  },

  // Get all connections for a user (both incoming and outgoing)
  async getUserConnections(userID: string) {
    return supabase.from('Connections')
      .select('*')
      .or(`fromUserID.eq.${userID},toUserID.eq.${userID}`);
  },

  // Update connection status
  async updateConnectionStatus(fromUserID: string, toUserID: string, status: ConnectionStatus) {
    return supabase.from('Connections')
      .update({ status })
      .match({ fromUserID, toUserID });
  },

  // Check if a connection exists between two users
  async getConnection(userID1: string, userID2: string) {
    return supabase.from('Connections')
      .select('*')
      .or(`and(fromUserID.eq.${userID1},toUserID.eq.${userID2}),and(fromUserID.eq.${userID2},toUserID.eq.${userID1})`)
      .single();
  }
};

// Helper functions for the Conversations table
export const conversationsTable = {
  // Create a new conversation
  async createConversation(participants: string[], initialMessage: string) {
    return supabase.from('Conversations').insert([{
      participants,
      lastMessageText: initialMessage
    }]).select();
  },

  // Get all conversations for a user, sorted by most recent
  async getUserConversations(userID: string) {
    return supabase.from('Conversations')
      .select('*')
      .contains('participants', [userID])
      .order('updated_at', { ascending: false });
  },

  // Update the last message in a conversation
  async updateLastMessage(conversationId: string, lastMessageText: string) {
    return supabase.from('Conversations')
      .update({ lastMessageText })
      .eq('id', conversationId);
  }
};

// Helper functions for the Messages table
export const messagesTable = {
  // Create a new message
  async createMessage(conversationID: string, senderID: string, content: string) {
    return supabase.from('Messages').insert([{
      conversationID,
      senderID,
      content,
      readBy: [senderID]
    }]).select();
  },

  // Get messages for a conversation
  async getConversationMessages(conversationID: string) {
    return supabase.from('Messages')
      .select('*')
      .eq('conversationID', conversationID)
      .order('created_at', { ascending: true });
  },

  // Mark a message as read
  async markMessageAsRead(messageID: string, userID: string) {
    return supabase.from('Messages')
      .update({
        readBy: supabase.sql`array_append(read_by, ${userID})`
      })
      .eq('id', messageID);
  },

  // Get unread messages count for a user
  async getUnreadMessagesCount(userID: string) {
    return supabase.from('Messages')
      .select('*', { count: 'exact' })
      .not('readBy', 'cs', `{${userID}}`);
  }
};