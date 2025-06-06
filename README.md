# Supabase Users Database

This project sets up a Supabase database with a Users table that includes the following fields:

- **email** (String, unique, indexed)
- **displayName** (String)
- **photoURLs** (Array<String>)
- **bio** (String)
- **last_known_location** (Geopoint with Geo Index enabled)
- **isPremium** (Boolean, indexed)
- **subscription** (Object with subfields: revenueCatCustomerID as String, entitlement as String, expiresAt as Timestamp)
- **createdAt** and **updatedAt** (Automatic timestamps)

## Setup Instructions

1. Create a Supabase project at [https://supabase.com](https://supabase.com)

2. In your Supabase project:
   - Go to the SQL Editor
   - Copy the contents of `supabase-schema.sql` from this project
   - Run the SQL to create the table, indexes, and functions

3. Get your Supabase URL and anon key:
   - Go to Project Settings > API
   - Copy the URL and anon key

4. Update the `.env.local` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Run the application:
   ```
   npm run dev
   ```

## Using the Users Table

The `src/lib/supabase.ts` file includes helper functions for working with the Users table:

- `createUser`: Add a new user
- `getUserByEmail`: Find a user by email
- `getPremiumUsers`: Get all premium users
- `updateUser`: Update a user's information
- `deleteUser`: Remove a user
- `findUsersNearLocation`: Find users near a geographic location

## Geospatial Queries

The table includes PostGIS support for geospatial queries. The `last_known_location` field is indexed for efficient proximity searches.

## Automatic Timestamps

The `created_at` and `updated_at` fields are automatically managed by the database:
- `created_at` is set when a record is inserted
- `updated_at` is updated whenever a record is modified

---

## Zenlit Web Frontend

The `zenlit-web` directory contains a React application configured for deployment on GitHub Pages. It provides a simple demo with dummy authentication, a Leaflet map, and basic chat interface. See [`zenlit-web/README.md`](zenlit-web/README.md) for setup and deployment instructions.
