// @ts-nocheck
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
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
                    content: `You are a design expert specializing in color theory. A user will provide a prompt describing a mood, theme, or idea. Your task is to generate a JSON object containing a color palette of 5 hex codes that match the theme. The JSON object should have a single key "colors" which is an array of 5 strings, where each string is a hex color code (e.g., "#FFFFFF"). Do not include any explanations, just the raw JSON object.`
                },
                {
                    role: 'user',
                    content: prompt,
                }
            ],
            temperature: 0.8,
        }),
    })

    if (!openAiResponse.ok) {
        const errorBody = await openAiResponse.json();
        return new Response(JSON.stringify({ error: 'Failed to call the AI model.', details: errorBody }), {
            status: openAiResponse.status,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }

    const openAiData = await openAiResponse.json()
    const rawContent = openAiData.choices[0].message.content.trim()
    
    const cleanedJson = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();

    return new Response(cleanedJson, {
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