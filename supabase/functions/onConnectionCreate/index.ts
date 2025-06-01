import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  const { record: newConnection } = await req.json()
  
  // Check for a matching pending connection
  const { data: matchingConnection } = await supabaseClient
    .from('Connections')
    .select('*')
    .eq('fromUserID', newConnection.toUserID)
    .eq('toUserID', newConnection.fromUserID)
    .eq('status', 'pending')
    .single()

  if (matchingConnection) {
    const now = new Date().toISOString()
    
    // Update both connections to accepted
    await Promise.all([
      supabaseClient
        .from('Connections')
        .update({ 
          status: 'accepted',
          matchedAt: now
        })
        .eq('id', newConnection.id),
      
      supabaseClient
        .from('Connections')
        .update({ 
          status: 'accepted',
          matchedAt: now
        })
        .eq('id', matchingConnection.id)
    ])
  }

  return new Response(JSON.stringify({ message: 'Success' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})