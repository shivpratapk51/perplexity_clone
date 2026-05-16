import { Button } from '@/components/ui/button'
import React from 'react'
import { createClient } from '@supabase/supabase-js'

type Provider = "GOOGLE" | "GITHUB"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
)
const Auth = () => {
    function login(provider: Provider){

    }
  return (
    <div>
      <Button onClick={()=>login("GOOGLE")}>Login with Google</Button>
      <Button onClick={()=>login("GITHUB")}>Login with GitHub</Button>
    </div>
  )
}

export default Auth
