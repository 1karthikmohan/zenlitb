import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface SubscriptionPayload {
  userID: string
  revenueCatCustomerID: string
  entitlement: string
  purchaseToken: string
}

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const payload: SubscriptionPayload = await req.json()
    const { userID, revenueCatCustomerID, entitlement, purchaseToken } = payload

    // Validate the purchase token with RevenueCat API
    const revenueCatResponse = await fetch('https://api.revenuecat.com/v1/receipts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('REVENUECAT_API_KEY')}`
      },
      body: JSON.stringify({
        app_user_id: revenueCatCustomerID,
        fetch_token: purchaseToken
      })
    })

    if (!revenueCatResponse.ok) {
      throw new Error('Failed to validate subscription with RevenueCat')
    }

    const revenueCatData = await revenueCatResponse.json()
    
    // Verify the entitlement exists and is active
    const entitlementInfo = revenueCatData.subscriber.entitlements[entitlement]
    if (!entitlementInfo || !entitlementInfo.active) {
      throw new Error('Invalid or inactive entitlement')
    }

    // Update the user's subscription status
    const { error: updateError } = await supabaseClient
      .from('Users')
      .update({
        isPremium: true,
        subscription: {
          revenueCatCustomerID,
          entitlement,
          expiresAt: entitlementInfo.expires_date
        }
      })
      .eq('id', userID)

    if (updateError) {
      throw updateError
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Subscription validated and updated successfully'
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})