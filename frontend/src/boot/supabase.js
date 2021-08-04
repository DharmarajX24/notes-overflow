import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.FE_SUPABASE_URL
const supabaseKey = process.env.FE_SUPABASE_KEY

const {auth, storage} = createClient(supabaseUrl, supabaseKey)

export {auth, storage}
