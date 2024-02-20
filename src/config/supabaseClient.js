import { createClient } from '@supabase/supabase-js'

//fix API KEY- should be hidden.
const supabaseUrl = 'https://zmfhvnelgkzhncnedzfl.supabase.co'
const supabaseKey = process.env.local.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

// This file isn't working properly. WHy is it when you console.log supabase you get undefined objects. SHould you not get createClient with its args?