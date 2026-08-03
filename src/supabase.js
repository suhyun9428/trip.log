import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://sjhfozfmfbkznaazbhbh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_zXwpxzjCrCdAY-BTaIxRIw_GhGXwtkk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
