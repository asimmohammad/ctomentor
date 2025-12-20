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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ApplicationData = await req.json();
    console.log("Received application:", data);

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

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "CTO Mentor <onboarding@resend.dev>",
        to: ["asim@thectomentor.com"],
        reply_to: data.email,
        subject: `New Application: ${data.name} from ${data.company}`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const result = await emailResponse.json();

    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-application function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
