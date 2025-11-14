-- Create medicines table
CREATE TABLE IF NOT EXISTS public.medicines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_name TEXT NOT NULL,
  generic_name TEXT NOT NULL,
  salt TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  strength TEXT NOT NULL,
  form TEXT NOT NULL CHECK (form IN ('Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Drops', 'Inhaler', 'Other')),
  image_url TEXT,
  is_prescription_required BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_medicines_brand_name ON public.medicines (brand_name);
CREATE INDEX IF NOT EXISTS idx_medicines_generic_name ON public.medicines (generic_name);
CREATE INDEX IF NOT EXISTS idx_medicines_salt ON public.medicines (salt);
CREATE INDEX IF NOT EXISTS idx_medicines_price ON public.medicines (price);

-- Enable Row Level Security
ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (adjust as needed for your security requirements)
CREATE POLICY "Enable read access for all users" ON public.medicines
  FOR SELECT USING (true);

-- Create policy to allow insert for authenticated users (adjust as needed)
CREATE POLICY "Enable insert for authenticated users only" ON public.medicines
  FOR INSERT TO authenticated WITH CHECK (true);

-- Create policy to allow update for authenticated users (adjust as needed)
CREATE POLICY "Enable update for authenticated users only" ON public.medicines
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Create policy to allow delete for authenticated users (adjust as needed)
CREATE POLICY "Enable delete for authenticated users only" ON public.medicines
  FOR DELETE TO authenticated USING (true);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to update the updated_at column
DROP TRIGGER IF EXISTS update_medicines_updated_at ON public.medicines;
CREATE TRIGGER update_medicines_updated_at
BEFORE UPDATE ON public.medicines
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
