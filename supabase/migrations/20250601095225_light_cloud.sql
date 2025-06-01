-- Enable the PostGIS extension for geospatial functionality
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create the Users table
CREATE TABLE "Users" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  "displayName" TEXT NOT NULL,
  "photoURLs" TEXT[] DEFAULT '{}',
  bio TEXT,
  last_known_location GEOGRAPHY(POINT),
  "isPremium" BOOLEAN DEFAULT false,
  subscription JSONB DEFAULT '{"revenueCatCustomerID": "", "entitlement": "", "expiresAt": null}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_users_email ON "Users" (email);
CREATE INDEX idx_users_is_premium ON "Users" ("isPremium");
CREATE INDEX idx_users_location ON "Users" USING GIST (last_known_location);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function whenever a record is updated
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON "Users"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create a stored procedure for finding users near a location
CREATE OR REPLACE FUNCTION find_users_near_location(lat FLOAT, lng FLOAT, radius FLOAT)
RETURNS SETOF "Users" AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM "Users"
  WHERE ST_DWithin(
    last_known_location,
    ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography,
    radius
  );
END;
$$ LANGUAGE plpgsql;