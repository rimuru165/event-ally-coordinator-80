// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nffwpusithlyesyfhpou.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mZndwdXNpdGhseWVzeWZocG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMzY5NTEsImV4cCI6MjA0OTcxMjk1MX0.OD05VUwkx5qC-fo2hjOK2eQ1Sbx6UK-7EQtKt02fvKM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);