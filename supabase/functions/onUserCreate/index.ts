import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  const { event, data } = await req.json()

  if (event === 'auth.create') {
    await supabaseClient.from('Users').insert({
      id: data.user.id,
      email: data.user.email,
      displayName: '',
      photoURLs: [],
      bio: '',
      last_known_location: null,
      isPremium: false,
      subscription: null
    })
  }

  return new Response(JSON.stringify({ message: 'Success' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})