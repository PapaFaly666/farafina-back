import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import * as nodemailer from 'nodemailer';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly resend: Resend | null;
  private readonly from: string;

  private readonly smtpHost: string;
  private readonly smtpPort: number;
  private readonly smtpUser: string | undefined;
  private readonly smtpPass: string | undefined;

  constructor(config: ConfigService) {
    const key = config.get<string>('RESEND_API_KEY');
    this.from =
      config.get<string>('MAIL_FROM') ??
      'Farafina Conseils & Business <onboarding@resend.dev>';
    this.resend = key ? new Resend(key) : null;

    this.smtpHost = config.get<string>('SMTP_HOST') ?? 'smtp.gmail.com';
    this.smtpPort = parseInt(config.get<string>('SMTP_PORT') ?? '587', 10);
    this.smtpUser = config.get<string>('SMTP_USER');
    this.smtpPass = config.get<string>('SMTP_PASS');
  }

  /** True when at least one delivery channel (Resend or SMTP) is available. */
  get configured(): boolean {
    return this.resend !== null || Boolean(this.smtpUser && this.smtpPass);
  }

  private get smtpConfigured(): boolean {
    return Boolean(this.smtpUser && this.smtpPass);
  }

  /** Sends via Gmail SMTP — reliable fallback when Resend fails. */
  private async sendViaSmtp(opts: {
    to: string;
    subject: string;
    text: string;
    html: string;
  }): Promise<void> {
    if (!this.smtpConfigured) {
      throw new InternalServerErrorException(
        'Service e-mail non configuré (Resend et SMTP indisponibles).',
      );
    }

    const transporter = nodemailer.createTransport({
      host: this.smtpHost,
      port: this.smtpPort,
      secure: false,
      auth: { user: this.smtpUser, pass: this.smtpPass },
    });

    await transporter.sendMail({
      from: `Farafina Conseils & Business <${this.smtpUser}>`,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    });
    this.logger.log(`E-mail envoyé via SMTP à ${opts.to}`);
  }

  /**
   * Delivers one e-mail: tries Resend first, falls back to SMTP if Resend is
   * unavailable or returns an error. Throws if every channel fails.
   */
  private async deliver(opts: {
    to: string;
    subject: string;
    text: string;
    html: string;
  }): Promise<void> {
    if (this.resend) {
      try {
        const { data, error } = await this.resend.emails.send({
          from: this.from,
          to: opts.to,
          subject: opts.subject,
          text: opts.text,
          html: opts.html,
        });
        if (!error) {
          this.logger.log(`E-mail envoyé via Resend à ${opts.to} (${data?.id})`);
          return;
        }
        this.logger.warn(
          `Resend a échoué (${error.message}), bascule sur SMTP…`,
        );
      } catch (e) {
        this.logger.warn(
          `Exception Resend (${(e as Error).message}), bascule sur SMTP…`,
        );
      }
    }

    await this.sendViaSmtp(opts);
  }

  /** Turns plain text (with line breaks) into safe HTML paragraphs. */
  private paragraphs(text: string): string {
    return escapeHtml(text.trim())
      .split(/\n{2,}/)
      .map(
        (block) =>
          `<p style="margin:0 0 16px;color:#2a3346;font-size:15px;line-height:1.7">${block.replace(
            /\n/g,
            '<br>',
          )}</p>`,
      )
      .join('');
  }

  /** Shared responsive shell: branded header + content + footer. */
  private layout(opts: {
    eyebrow: string;
    heading: string;
    inner: string;
    footerNote: string;
  }): string {
    return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1ea;font-family:'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(
    opts.heading,
  )}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;padding:28px 12px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e9e5dc">
        <!-- Header -->
        <tr><td style="background:#17233a;padding:26px 32px">
          <span style="display:block;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:.5px">FARAFINA <span style="color:#f49f00">Conseils &amp; Business</span></span>
          <span style="display:block;margin-top:4px;font-size:12px;color:#aab3c4;letter-spacing:.04em">Cabinet de développement commercial — Afrique de l'Ouest</span>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px">
          <span style="display:inline-block;margin-bottom:12px;padding:4px 12px;background:#edf2f9;border-radius:99px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#0c4b8e">${escapeHtml(
            opts.eyebrow,
          )}</span>
          <h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.35;color:#17233a;font-weight:700">${escapeHtml(
            opts.heading,
          )}</h1>
          ${opts.inner}
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:22px 32px;background:#faf7f0;border-top:1px solid #efebe2">
          <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#0c4b8e">Farafina Conseils &amp; Business</p>
          <p style="margin:0 0 10px;font-size:12.5px;line-height:1.6;color:#8a8471">${escapeHtml(
            opts.footerNote,
          )}</p>
          <p style="margin:0;font-size:12px;color:#a49d8c">
            <a href="mailto:contact@fcb-impact.com" style="color:#0c4b8e;text-decoration:none">contact@fcb-impact.com</a>
          </p>
        </td></tr>
      </table>
      <p style="margin:16px 0 0;font-size:11px;color:#b3ab99">© ${new Date().getFullYear()} Farafina Conseils &amp; Business. Tous droits réservés.</p>
    </td></tr>
  </table>
</body>
</html>`;
  }

  /** Structured HTML for a reply to a contact message. */
  private replyHtml(opts: {
    body: string;
    recipientName?: string;
    originalMessage?: string;
  }): string {
    const greeting = opts.recipientName
      ? `<p style="margin:0 0 16px;color:#2a3346;font-size:15px;line-height:1.7">Bonjour ${escapeHtml(
          opts.recipientName,
        )},</p>`
      : '';

    const quoted = opts.originalMessage
      ? `<div style="margin:24px 0 4px;padding:16px 18px;background:#f7f5ef;border-left:3px solid #f49f00;border-radius:0 10px 10px 0">
           <span style="display:block;margin-bottom:6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#9a9382">Rappel de votre message</span>
           <span style="font-size:13.5px;line-height:1.6;color:#6b7280;font-style:italic">${escapeHtml(
             opts.originalMessage.trim(),
           ).replace(/\n/g, '<br>')}</span>
         </div>`
      : '';

    const inner = `${greeting}
      <p style="margin:0 0 16px;color:#2a3346;font-size:15px;line-height:1.7">Merci de nous avoir contactés. Voici notre réponse à votre demande&nbsp;:</p>
      ${this.paragraphs(opts.body)}
      ${quoted}
      <p style="margin:24px 0 0;color:#2a3346;font-size:15px;line-height:1.7">Bien cordialement,<br><strong>L'équipe Farafina Conseils &amp; Business</strong></p>`;

    return this.layout({
      eyebrow: 'Réponse à votre message',
      heading: 'Votre demande a bien été traitée',
      inner,
      footerNote:
        'Vous recevez cet e-mail en réponse à un message envoyé via le formulaire de contact du site Farafina Conseils & Business.',
    });
  }

  /** Structured HTML for a newsletter campaign. */
  private campaignHtml(opts: { subject: string; body: string }): string {
    const inner = `${this.paragraphs(opts.body)}`;
    return this.layout({
      eyebrow: 'Newsletter',
      heading: opts.subject,
      inner,
      footerNote:
        'Vous recevez cette newsletter car vous êtes abonné(e) aux actualités de Farafina Conseils & Business.',
    });
  }

  /** Sends a single reply to a contact message. */
  async sendReply(opts: {
    to: string;
    subject: string;
    body: string;
    recipientName?: string;
    originalMessage?: string;
  }) {
    if (!this.configured) {
      throw new InternalServerErrorException(
        'Service e-mail non configuré (RESEND_API_KEY ou SMTP manquant).',
      );
    }

    try {
      await this.deliver({
        to: opts.to,
        subject: opts.subject,
        text: opts.body,
        html: this.replyHtml({
          body: opts.body,
          recipientName: opts.recipientName,
          originalMessage: opts.originalMessage,
        }),
      });
    } catch (e) {
      this.logger.warn(`Échec de l'envoi à ${opts.to}: ${(e as Error).message}`);
      throw new InternalServerErrorException("Échec de l'envoi de l'e-mail.");
    }

    return { ok: true };
  }

  /**
   * Sends a newsletter campaign to every subscriber. Each recipient gets an
   * individual e-mail (no shared To/BCC), with the same Resend→SMTP fallback.
   */
  async sendCampaign(opts: { to: string[]; subject: string; body: string }) {
    if (!this.configured) {
      throw new InternalServerErrorException(
        'Service e-mail non configuré (RESEND_API_KEY ou SMTP manquant).',
      );
    }

    const html = this.campaignHtml({ subject: opts.subject, body: opts.body });
    let sent = 0;

    for (const to of opts.to) {
      try {
        await this.deliver({ to, subject: opts.subject, text: opts.body, html });
        sent += 1;
      } catch (e) {
        this.logger.warn(
          `Campagne : échec pour ${to} (${(e as Error).message})`,
        );
      }
    }

    if (sent === 0) {
      throw new InternalServerErrorException(
        "Échec de l'envoi de la campagne (aucun e-mail délivré).",
      );
    }

    return { sent };
  }
}
