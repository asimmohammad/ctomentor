import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ApplicationData {
  name: string;
  email: string;
  company: string;
  role: string;
  stage?: string;
  teamSize?: string;
  stack?: string;
  challenge: string;
  budget?: string;
  timeline?: string;
}

const handler = async (req: Request): Promise<Response> => {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  
  console.log(`[EDGE FUNCTION] Request ${requestId} started at ${new Date().toISOString()}`);
  console.log(`[EDGE FUNCTION] Request method: ${req.method}`);
  console.log(`[EDGE FUNCTION] Request URL: ${req.url}`);
  console.log(`[EDGE FUNCTION] Request headers:`, Object.fromEntries(req.headers.entries()));

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log(`[EDGE FUNCTION] Handling CORS preflight request`);
    return new Response(null, { headers: corsHeaders });
  }

  // Validate RESEND_API_KEY is configured
  console.log(`[EDGE FUNCTION] Checking RESEND_API_KEY configuration...`);
  if (!RESEND_API_KEY) {
    console.error(`[EDGE FUNCTION] RESEND_API_KEY is not configured`);
    console.error(`[EDGE FUNCTION] Available environment variables:`, Object.keys(Deno.env.toObject()).filter(k => k.includes("RESEND") || k.includes("API")));
    return new Response(
      JSON.stringify({ error: "Email service is not configured. Please contact support." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
  
  console.log(`[EDGE FUNCTION] RESEND_API_KEY is configured (length: ${RESEND_API_KEY.length} chars)`);

  try {
    console.log(`[EDGE FUNCTION] Parsing request body...`);
    const data: ApplicationData = await req.json();
    console.log(`[EDGE FUNCTION] Request body parsed successfully`);
    console.log(`[EDGE FUNCTION] Parsed application data:`, {
      name: data.name,
      email: data.email,
      company: data.company,
      role: data.role,
      stage: data.stage,
      hasChallenge: !!data.challenge,
      challengeLength: data.challenge?.length || 0,
      teamSize: data.teamSize,
      stack: data.stack,
      budget: data.budget,
      timeline: data.timeline,
    });

    const emailHtml = `
      <h1>New Application Received</h1>
      <h2>Contact Information</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      
      <h2>Company Details</h2>
      <p><strong>Company:</strong> ${data.company}</p>
      <p><strong>Role:</strong> ${data.role}</p>
      <p><strong>Stage:</strong> ${data.stage || "Not specified"}</p>
      <p><strong>Team Size:</strong> ${data.teamSize || "Not specified"}</p>
      <p><strong>Tech Stack:</strong> ${data.stack || "Not specified"}</p>
      
      <h2>Project Details</h2>
      <p><strong>Biggest Challenge:</strong></p>
      <p>${data.challenge}</p>
      
      <h2>Budget & Timeline</h2>
      <p><strong>Budget Range:</strong> ${data.budget || "Not specified"}</p>
      <p><strong>Timeline:</strong> ${data.timeline || "Not specified"}</p>
      
      <hr>
      <p><em>Reply directly to this email to respond to ${data.name}</em></p>
    `;

    console.log(`[EDGE FUNCTION] Constructing email payload...`);
    const emailPayload = {
      from: "The CTO Mentor <onboarding@resend.dev>",
      to: ["asim@thectomentor.com"],
      reply_to: data.email,
      subject: `New Application: ${data.name} from ${data.company}`,
      html: emailHtml,
    };

    console.log(`[EDGE FUNCTION] Email payload:`, {
      from: emailPayload.from,
      to: emailPayload.to,
      reply_to: emailPayload.reply_to,
      subject: emailPayload.subject,
      htmlLength: emailHtml.length,
    });

    console.log(`[EDGE FUNCTION] Sending email via Resend API...`);
    const emailStartTime = Date.now();
    
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailPayload),
    });

    const emailDuration = Date.now() - emailStartTime;
    console.log(`[EDGE FUNCTION] Resend API response received in ${emailDuration}ms`);
    console.log(`[EDGE FUNCTION] Response status: ${emailResponse.status} ${emailResponse.statusText}`);
    console.log(`[EDGE FUNCTION] Response headers:`, Object.fromEntries(emailResponse.headers.entries()));

    const responseText = await emailResponse.text();
    console.log(`[EDGE FUNCTION] Response body length: ${responseText.length} chars`);
    console.log(`[EDGE FUNCTION] Response body:`, responseText);

    if (!emailResponse.ok) {
      console.error(`[EDGE FUNCTION] Resend API error:`, {
        status: emailResponse.status,
        statusText: emailResponse.statusText,
        response: responseText,
      });
      throw new Error(`Failed to send email (${emailResponse.status}): ${responseText}`);
    }

    console.log(`[EDGE FUNCTION] Parsing successful response...`);
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error(`[EDGE FUNCTION] Failed to parse response as JSON:`, responseText);
      throw new Error(`Invalid response from Resend API: ${responseText}`);
    }
    
    console.log(`[EDGE FUNCTION] Email sent successfully:`, {
      id: result.id,
      from: result.from,
      to: result.to,
      createdAt: result.created_at,
    });

    const totalDuration = Date.now() - startTime;
    console.log(`[EDGE FUNCTION] Request ${requestId} completed successfully in ${totalDuration}ms`);
    
    return new Response(JSON.stringify({ success: true, requestId }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    const totalDuration = Date.now() - startTime;
    console.error(`[EDGE FUNCTION] Request ${requestId} failed after ${totalDuration}ms`);
    console.error(`[EDGE FUNCTION] Error details:`, {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      error,
      timestamp: new Date().toISOString(),
    });
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "An unexpected error occurred",
        requestId,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
