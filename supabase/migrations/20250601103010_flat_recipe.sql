-- Create the Messages table
CREATE TABLE "Messages" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "conversationID" UUID NOT NULL REFERENCES "Conversations"(id),
  "senderID" UUID NOT NULL REFERENCES "Users"(id),
  content TEXT NOT NULL,
  "readBy" UUID[] DEFAULT ARRAY[]::UUID[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_messages_conversation ON "Messages"("conversationID");
CREATE INDEX idx_messages_sender ON "Messages"("senderID");
CREATE INDEX idx_messages_read_by ON "Messages" USING GIN ("readBy");

-- Add updated_at trigger
CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON "Messages"
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE "Messages" ENABLE ROW LEVEL SECURITY;

-- Messages policies
CREATE POLICY "Users can create messages in their conversations"
  ON "Messages"
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid()::text = "senderID"::text
    AND EXISTS (
      SELECT 1 FROM "Conversations"
      WHERE id = "conversationID"
      AND auth.uid()::text = ANY(participants::text[])
    )
  );

CREATE POLICY "Users can read messages from their conversations"
  ON "Messages"
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM "Conversations"
      WHERE id = "conversationID"
      AND auth.uid()::text = ANY(participants::text[])
    )
  );

CREATE POLICY "Users can mark messages as read"
  ON "Messages"
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM "Conversations"
      WHERE id = "conversationID"
      AND auth.uid()::text = ANY(participants::text[])
    )
  )
  WITH CHECK (
    auth.uid()::text = ANY("readBy"::text[])
  );