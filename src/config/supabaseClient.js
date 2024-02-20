import { createClient } from '@supabase/supabase-js'

//fix API KEY- should be hidden.
const supabaseUrl = 'https://zmfhvnelgkzhncnedzfl.supabase.co'
// const supabaseKey = process.env.local.SUPABASE_KEY
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptZmh2bmVsZ2t6aG5jbmVkemZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNjIxMDEsImV4cCI6MjAyMzkzODEwMX0.iq_nGZtVaBwg4lTvhxaXPlUuTn18tk-Bjr7Jq5jLsi8"


const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

// This file isn't working properly. WHy is it when you console.log supabase you get undefined objects. SHould you not get createClient with its args?