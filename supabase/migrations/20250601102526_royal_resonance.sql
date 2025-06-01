-- Enable Row Level Security
ALTER TABLE "Users" ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users are publicly readable"
  ON "Users"
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can only be created by themselves"
  ON "Users"
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = id::text);

CREATE POLICY "Users can only update their own data"
  ON "Users"
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- Explicitly deny deletions (default behavior, but making it explicit)
CREATE POLICY "Users cannot be deleted"
  ON "Users"
  FOR DELETE
  TO public
  USING (false);