import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://chwqenkkimefffytqafr.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNod3FlbmtraW1lZmZmeXRxYWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNzU1ODYsImV4cCI6MjA1MjY1MTU4Nn0.RK712Fw6ilk4KjgvEneMNN62YlQvpRebWQEpDPJg3m4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
