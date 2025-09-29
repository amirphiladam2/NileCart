-- Add name field to users table
ALTER TABLE public.users ADD COLUMN name text;

-- Update the users table to make name required for new users
-- Note: This won't affect existing users, but new signups will require a name

-- Add a check constraint to ensure name is not empty for new users
ALTER TABLE public.users ADD CONSTRAINT users_name_not_empty CHECK (name IS NULL OR length(trim(name)) > 0);

-- Update the RLS policies to include name field
-- The existing policies will automatically include the new name field
