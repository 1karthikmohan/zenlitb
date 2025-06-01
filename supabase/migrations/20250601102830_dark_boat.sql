-- Create the Connections table
CREATE TABLE "Connections" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "fromUserID" UUID NOT NULL REFERENCES "Users"(id),
  "toUserID" UUID NOT NULL REFERENCES "Users"(id),
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')),
  "matchedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE("fromUserID", "toUserID")
);

-- Create the Conversations table
CREATE TABLE "Conversations" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participants UUID[] NOT NULL,
  "lastMessageText" TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT "valid_participants" CHECK (array_length(participants, 1) >= 2)
);

-- Create indexes
CREATE INDEX idx_connections_from_user ON "Connections"("fromUserID");
CREATE INDEX idx_connections_to_user ON "Connections"("toUserID");
CREATE INDEX idx_conversations_participants ON "Conversations" USING GIN (participants);

-- Add updated_at trigger for Connections
CREATE TRIGGER update_connections_updated_at
  BEFORE UPDATE ON "Connections"
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add updated_at trigger for Conversations
CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON "Conversations"
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE "Connections" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Conversations" ENABLE ROW LEVEL SECURITY;

-- Connections policies
CREATE POLICY "Users can create pending connections"
  ON "Connections"
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid()::text = "fromUserID"::text
    AND status = 'pending'
  );

CREATE POLICY "Users can read their own connections"
  ON "Connections"
  FOR SELECT
  TO authenticated
  USING (
    auth.uid()::text = "fromUserID"::text
    OR auth.uid()::text = "toUserID"::text
  );

-- Conversations policies
CREATE POLICY "Users can read their conversations"
  ON "Conversations"
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = ANY(participants::text[]));

CREATE POLICY "Users can create conversations they're part of"
  ON "Conversations"
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = ANY(participants::text[]));

CREATE POLICY "Users can update conversations they're part of"
  ON "Conversations"
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = ANY(participants::text[]))
  WITH CHECK (auth.uid()::text = ANY(participants::text[]));