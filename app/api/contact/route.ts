import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    message: string;
};

export async function POST(req: Request) {
    try {
        const apiKey = process.env.RESEND_API_KEY;
        const to = process.env.CONTACT_TO_EMAIL;
        const from = process.env.CONTACT_FROM_EMAIL;

        if (!apiKey) return Response.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
        if (!to) return Response.json({ error: "Missing CONTACT_TO_EMAIL" }, { status: 500 });
        if (!from) return Response.json({ error: "Missing CONTACT_FROM_EMAIL" }, { status: 500 });

        const body = (await req.json()) as Payload;

        if (!body?.name || !body?.email || !body?.message) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        const resend = new Resend(apiKey);

        const subject = `Dopyt z webu: ${body.name}`;
        const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.4">
        <h2>Nový dopyt z webu</h2>
        <p><b>Meno:</b> ${escapeHtml(body.name)}</p>
        <p><b>Email:</b> ${escapeHtml(body.email)}</p>
        <p><b>Telefón:</b> ${escapeHtml(body.phone || "-")}</p>
        <p><b>Miesto fotenia:</b> ${escapeHtml(body.location || "-")}</p>
        <hr />
        <p><b>Správa:</b></p>
        <p>${escapeHtml(body.message).replace(/\n/g, "<br/>")}</p>
      </div>
    `;

        const { data, error } = await resend.emails.send({
            from,
            to,
            subject,
            html,
            replyTo: body.email,
        });

        if (error) return Response.json({ error }, { status: 500 });

        return Response.json({ ok: true, id: data?.id }, { status: 200 });
    } catch (e) {
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}

function escapeHtml(str: string) {
    return str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
