import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

// These are required for every edge function
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const openAiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAiKey) {
        return new Response(JSON.stringify({ error: 'This feature is not fully configured. The site owner needs to provide an OpenAI API key.' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }

    // Call OpenAI API
    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${openAiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert React and Tailwind CSS developer. A user will provide a prompt, and your task is to generate a single, clean, and production-ready React component using TypeScript, Tailwind CSS for styling, and shadcn/ui components where appropriate. The code should be complete and ready to be dropped into a file. Do not include any explanations, just the code.'
                },
                {
                    role: 'user',
                    content: prompt,
                }
            ],
            temperature: 0.7,
        }),
    })

    if (!openAiResponse.ok) {
        const errorBody = await openAiResponse.json();
        console.error('OpenAI API error:', errorBody);
        return new Response(JSON.stringify({ error: 'Failed to call the AI model.', details: errorBody }), {
            status: openAiResponse.status,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }

    const openAiData = await openAiResponse.json()
    const code = openAiData.choices[0].message.content.trim()
    
    // The AI might wrap the code in markdown, so we need to remove it.
    const cleanedCode = code.replace(/```(jsx|tsx|javascript|typescript)?/g, '').trim();

    return new Response(JSON.stringify({ code: cleanedCode }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})