export interface QuotationEmailMessage {
  to: string;
  subject: string;
  body: string;
  pdfUrl: string;
  fromName?: string | null;
  fromEmail?: string | null;
}

export interface EmailDeliveryResult {
  delivered: boolean;
  mode: "provider" | "mailto";
  to: string;
  subject: string;
  body: string;
  pdfUrl: string;
  mailtoUrl?: string;
}

export interface EmailProvider {
  sendQuotationEmail: (
    message: QuotationEmailMessage
  ) => Promise<EmailDeliveryResult>;
}

const emailProvider: EmailProvider | null = null;

function buildMailtoUrl(message: QuotationEmailMessage) {
  const params = new URLSearchParams({
    subject: message.subject,
    body: message.body,
  });

  return `mailto:${message.to}?${params.toString()}`;
}

export async function sendQuotationEmail(
  message: QuotationEmailMessage
): Promise<EmailDeliveryResult> {
  if (emailProvider) {
    return emailProvider.sendQuotationEmail(message);
  }

  return {
    delivered: false,
    mode: "mailto",
    to: message.to,
    subject: message.subject,
    body: message.body,
    pdfUrl: message.pdfUrl,
    mailtoUrl: buildMailtoUrl(message),
  };
}
