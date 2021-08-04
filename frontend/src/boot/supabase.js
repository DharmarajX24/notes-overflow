import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const {auth, storage} = createClient(supabaseUrl, supabaseKey)

export {auth, storage}
