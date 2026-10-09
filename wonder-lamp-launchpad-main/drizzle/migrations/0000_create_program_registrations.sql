CREATE TABLE public.program_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 100),
  mobile TEXT NOT NULL CHECK (mobile ~ '^[6-9][0-9]{9}$'),
  email TEXT NOT NULL CHECK (char_length(email) <= 255),
  city TEXT NOT NULL CHECK (char_length(city) BETWEEN 2 AND 100),
  whatsapp_number TEXT NOT NULL CHECK (whatsapp_number ~ '^[6-9][0-9]{9}$'),
  experience_level TEXT NOT NULL CHECK (experience_level IN ('Beginner', 'Basic Knowledge', 'Intermediate')),
  risk_acknowledged BOOLEAN NOT NULL CHECK (risk_acknowledged = true),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.program_registrations TO service_role;

ALTER TABLE public.program_registrations ENABLE ROW LEVEL SECURITY;

CREATE INDEX program_registrations_created_at_idx ON public.program_registrations (created_at DESC);
CREATE INDEX program_registrations_payment_status_idx ON public.program_registrations (payment_status);