// Vercel serverless endpoint for The Pixel Muses project enquiries.
// Required Vercel environment variables:
// RESEND_API_KEY, CONTACT_FROM_EMAIL (verified sender), CONTACT_TO_EMAIL.
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const contentLength = Number(req.headers["content-length"] || 0);
  if (contentLength > 12000) {
    return res.status(413).json({ error: "Your enquiry is too large. Please shorten it and try again." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Please check the form and try again." });
  }

  // Honeypot field: silently accept bot submissions without sending email.
  if (String(body.company_website || "").trim()) {
    return res.status(200).json({ ok: true });
  }

  const clean = (value, max) => String(value || "").trim().slice(0, max);
  const name = clean(body.name, 120);
  const company = clean(body.company, 160);
  const email = clean(body.email, 254);
  const website = clean(body.website, 500);
  const project = clean(body.project, 100);
  const budget = clean(body.budget, 100);
  const message = clean(body.message, 5000);

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter your name and a valid email address." });
  }
  if (website) {
    try {
      const parsed = new URL(website);
      if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Invalid protocol");
    } catch {
      return res.status(400).json({ error: "Please enter a valid website URL, including https://." });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "thepixelmuses@gmail.com";
  if (!apiKey || !from) {
    console.error("Contact endpoint is missing RESEND_API_KEY or CONTACT_FROM_EMAIL.");
    return res.status(503).json({ error: "The enquiry service is being configured. Please email thepixelmuses@gmail.com directly for now." });
  }

  const text = [
    "New project enquiry — The Pixel Muses",
    "",
    `Name: ${name}`,
    `Business / Company: ${company || "Not provided"}`,
    `Email: ${email}`,
    `Current website: ${website || "Not provided"}`,
    `Project type: ${project || "Not selected"}`,
    `Approximate budget: ${budget || "Not selected"}`,
    "",
    "Project details:",
    message || "Not provided"
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New project enquiry: ${project || "Website enquiry"} — ${name}`,
        text
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Email provider rejected contact enquiry:", response.status, detail.slice(0, 500));
      return res.status(502).json({ error: "We could not send your enquiry right now. Please email thepixelmuses@gmail.com instead." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact email delivery failed:", error);
    return res.status(502).json({ error: "We could not send your enquiry right now. Please email thepixelmuses@gmail.com instead." });
  }
}
