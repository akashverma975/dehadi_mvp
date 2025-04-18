
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zvaudgjyiqwmbqqeyprs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2YXVkZ2p5aXF3bWJxcWV5cHJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MTAwMzYsImV4cCI6MjA2MDQ4NjAzNn0.AWlNNBwHCygqavi5vtUo8UgI4GtHBgJbKZVReoUacgM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
