import MailerLite from "@mailerlite/mailerlite-nodejs";

let _client: MailerLite | null = null;

function getClient(): MailerLite | null {
  if (_client) return _client;
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.warn("[MailerLite] MAILERLITE_API_KEY not set — skipping");
    return null;
  }
  _client = new MailerLite({ api_key: apiKey });
  return _client;
}

export async function addSubscriberToMailerLite(email: string): Promise<void> {
  const client = getClient();
  if (!client) return;

  try {
    const params: { email: string; groups?: string[] } = { email };
    const groupId = process.env.MAILERLITE_GROUP_ID;
    if (groupId) {
      params.groups = [groupId];
    }
    await client.subscribers.createOrUpdate(params);
  } catch (error) {
    console.error("[MailerLite] Failed to sync subscriber:", error);
  }
}
