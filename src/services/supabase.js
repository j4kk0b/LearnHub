import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ttknlranfprmimeixisy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0a25scmFuZnBybWltZWl4aXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0NDcyNTAsImV4cCI6MjAzNDAyMzI1MH0.MbkPYkfaGlgRdAWdzyCm29YcaEmnKWXZgrQpTSfqnJ0"
);

export default supabase;
