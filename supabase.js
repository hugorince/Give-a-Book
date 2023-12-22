import { createClient } from "@supabase/supabase-js";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjdGRxdGhybnhmYmxwYnRxZGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyNDk4ODMsImV4cCI6MjAxODgyNTg4M30.pl-M2WLDeDbKJAWPKk0Nzq_gpDZPcJ3O5-OZSGkg46Y";
const supabaseUrl = "https://qctdqthrnxfblpbtqdad.supabase.co";

export const supabase = createClient(supabaseUrl, supabaseKey);
