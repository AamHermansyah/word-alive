import { SITE_PLACEHOLDERS } from "@/lib/data/site"
import type { LegalDocument } from "@/types/site"

const { company, supportEmail } = SITE_PLACEHOLDERS

/**
 * Text of the three legal pages. Placeholders such as `[DATE]` and
 * `[REFUND TERMS]` stay exactly as in the mockup until the real wording is
 * supplied; the company and support address come from `SITE_PLACEHOLDERS`.
 */
export const PRIVACY_POLICY: LegalDocument = {
  slug: "privacy",
  title: "Privacy Policy",
  updated: "[DATE]",
  intro: "How WordAlive handles your information, in plain language.",
  sections: [
    {
      id: "who-we-are",
      heading: "Who we are",
      paragraphs: [
        `${company} runs WordAlive, a web app that shows Bible scriptures and song lyrics on your church screen. This policy explains what we collect and why.`,
      ],
    },
    {
      id: "what-we-collect",
      heading: "What we collect",
      paragraphs: [
        "Your name, email, city and country when you set up WordAlive. Payments are handled by Paystack, and we never see your card number. We also record talk hours used and songs you add.",
      ],
    },
    {
      id: "audio",
      heading: "Audio",
      paragraphs: [
        "WordAlive listens only after you tap Speak now. Audio is processed live to find scriptures and songs. We do not store recordings by default.",
      ],
    },
    {
      id: "who-processes-your-audio",
      heading: "Who processes your audio",
      paragraphs: [
        "While you are listening, audio is sent to our speech and AI providers: [PROVIDER LIST]. They process it under their own terms.",
      ],
    },
    {
      id: "songs-you-share",
      heading: "Songs you share",
      paragraphs: [
        "Songs you add to the shared library become visible to other churches after review. Only add songs you have the right to share.",
      ],
    },
    {
      id: "how-long-we-keep-data",
      heading: "How long we keep data",
      paragraphs: [
        "We keep account and billing records while your subscription is active and for as long as the law requires. You can ask us to delete your data at any time.",
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights",
      paragraphs: [
        `You can view, correct, export or delete your data from Settings, or by emailing ${supportEmail}.`,
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      paragraphs: [
        `Questions about privacy? Email ${supportEmail}. When this policy changes we tell you by email before the change takes effect.`,
      ],
    },
  ],
}

export const TERMS_OF_SERVICE: LegalDocument = {
  slug: "terms",
  title: "Terms of Service",
  updated: "[DATE]",
  intro: "The rules for using WordAlive.",
  sections: [
    {
      id: "using-wordalive",
      heading: "Using WordAlive",
      paragraphs: [
        "WordAlive helps churches show Bible scriptures and song lyrics during services. You are responsible for what you show and for having the rights to show it.",
      ],
    },
    {
      id: "your-account-and-device",
      heading: "Your account and device",
      paragraphs: [
        "Each subscription works on one device at a time. When you switch devices, the old one is signed out. You can switch once every [DAYS] days, up to [NUMBER] times a year.",
      ],
    },
    {
      id: "plans-and-billing",
      heading: "Plans and billing",
      paragraphs: [
        "Plans are billed monthly or annually through Paystack. Subscriptions renew automatically where your payment method allows. If a renewal fails, you have a grace period of [DAYS] days.",
      ],
    },
    {
      id: "talk-hours",
      heading: "Talk hours",
      paragraphs: [
        "Each plan includes a set number of talk hours per billing cycle. Unused hours do not roll over. We will never cut off a service that is already running.",
      ],
    },
    {
      id: "songs-and-the-shared-library",
      heading: "Songs and the shared library",
      paragraphs: [
        "Songs you add are reviewed before other churches can see them. You confirm you have the right to share them. We remove a song when its rights holder asks us to.",
      ],
    },
    {
      id: "bible-versions",
      heading: "Bible versions",
      paragraphs: [
        "The versions available depend on your plan and the licences we hold. Text is for use in your services only and may not be copied or resold.",
      ],
    },
    {
      id: "refunds-and-cancellation",
      heading: "Refunds and cancellation",
      paragraphs: [
        "Refunds follow our Refund Policy: [REFUND TERMS]. You can cancel at any time and keep access until the end of the period you have paid for.",
      ],
    },
    {
      id: "changes-and-contact",
      heading: "Changes and contact",
      paragraphs: [
        `We may update these terms and will email you before changes take effect. Questions? Email ${supportEmail}.`,
      ],
    },
  ],
}

export const REFUND_POLICY: LegalDocument = {
  slug: "refund",
  title: "Refund Policy",
  updated: "[DATE]",
  intro: "How cancelling and refunds work.",
  sections: [
    {
      id: "free-trial",
      heading: "Free trial",
      paragraphs: [
        "Your 7-day free trial costs nothing. We do not take a card to start it, so nothing is charged when it ends.",
      ],
    },
    {
      id: "cancelling",
      heading: "Cancelling",
      paragraphs: [
        "You can cancel at any time from Billing. You keep access until the end of the period you have paid for.",
      ],
    },
    {
      id: "when-we-refund",
      heading: "When we refund",
      paragraphs: [
        "We refund eligible payments as described here: [REFUND TERMS]. Refunds go back to the original payment method.",
      ],
    },
    {
      id: "how-to-ask",
      heading: "How to ask",
      paragraphs: [
        `Email ${supportEmail} with your payment reference. We reply as soon as we can.`,
      ],
    },
    {
      id: "payments",
      heading: "Payments",
      paragraphs: [
        "Payments are processed by Paystack. Refund timing depends on your bank or card issuer.",
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      paragraphs: [`Questions about a refund? Email ${supportEmail}.`],
    },
  ],
}
