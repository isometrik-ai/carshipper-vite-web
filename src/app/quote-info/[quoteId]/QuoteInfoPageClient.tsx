"use client";

import Link from "next/link";
import { useDebugValue, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Compass, Pin, Phone, ArrowRight, Star, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import GumletImage from "@/components/media/GumletImage";
import FillImageFrame from "@/components/media/FillImageFrame";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { DELIVERY_TRUCK_ICON_LARRY } from "@/lib/config";
import { parseQuoteIntoPageResponse } from "@/lib/quoteIntoPage.viewModel";
import { resolveSafeQuoteInfoTarget } from "@/shared/routes";
import { useQuoteIntoPage } from "@/api/quoteIntoPage";
import { useQuoteDetails } from "@/api/quoteDetails";
import type { QuoteIntoPageResponse } from "@/types/QuoteIntoPage.types";

const PHONE_DISPLAY = "(888) 555-1234";
const PHONE_TEL = "8885551234";

const RESOURCE_LINKS = [
  { href: "/faq", label: "Pickup, delivery & vehicle condition FAQs" },
  { href: "/blog", label: "Tips from the CarShippers.ai team" },
  { href: "/pricing", label: "What drives your quoted price" },
  { href: "/how-it-works", label: "How our transport process works" },
] as const;

const DEFAULT_TRUST_ITEMS: { label: string; icon: LucideIcon }[] = [
  { label: "Google Reviews", icon: Star },
  { label: "Accredited business", icon: ShieldCheck },
  { label: "DOT registered", icon: ShieldCheck },
  { label: "Trusted transport", icon: ShieldCheck },
];

function reviewBadgeIcon(iconName: string | null | undefined): LucideIcon {
  const key = iconName?.toLowerCase() ?? "";
  if (key === "star") return Star;
  if (key === "compass") return Compass;
  return ShieldCheck;
}

/** Renders Strapi `highlighted_text` (e.g. "email and text") with emphasis, similar to quote hero. */
function HighlightedChannels({ text }: { text: string | null | undefined }) {
  const raw = text?.trim();
  if (!raw) return null;
  const parts = raw.split(/\s+and\s+/i).filter(Boolean);
  if (parts.length >= 2) {
    return (
      <>
        <strong className="font-semibold">{parts[0]}</strong>
        {" and "}
        <strong className="font-semibold">{parts.slice(1).join(" and ")}</strong>
      </>
    );
  }
  return <strong className="font-semibold">{raw}</strong>;
}

function GuaranteeSeal({
  topLabel,
  middleLabel,
  bottomLabel,
}: {
  topLabel: string;
  middleLabel: string;
  bottomLabel: string;
}) {
  return (
    <div
      className="mx-auto flex h-[220px] w-[220px] shrink-0 items-center justify-center rounded-full border-[6px] border-blue-800 bg-gradient-to-br from-blue-700 to-blue-900 text-center shadow-lg ring-4 ring-blue-900/10 md:h-[272px] md:w-[272px] md:border-[7px] md:ring-8 lg:h-[300px] lg:w-[300px]"
      aria-hidden
    >
      <div className="px-4 md:px-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100 md:text-xs">
          {topLabel}
        </p>
        <p className="my-2 rounded-md bg-white px-2 py-1.5 text-sm font-extrabold text-blue-900 shadow-sm md:my-2.5 md:px-3 md:py-2 md:text-base">
          {middleLabel}
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-100 md:text-xs">
          {bottomLabel}
        </p>
      </div>
    </div>
  );
}

const GUARANTEE_POINTS = [
  {
    title: "No Hidden Fees",
    body: "What you see is what you pay. Clear, upfront pricing every time.",
  },
  {
    title: "Verified & Insured Carriers",
    body: "Your vehicle is handled by licensed, vetted professionals.",
  },
  {
    title: "Delivery You Can Count On",
    body: "Real-time coordination ensures your shipment stays on track.",
  },
  {
    title: "Money-Back Assurance",
    body: "If we fall short, you're protected with our risk-free guarantee.",
  },
] as const;

export type QuoteInfoPageClientProps = {
  params: { quoteId: string };
  /** Optional seed (tests); production uses server prefetch + `useQuoteIntoPage` hydration. */
  initialQuoteIntoData?: QuoteIntoPageResponse;
};

function digitsOnlyPhone(s: string): string {
  return s.replace(/\D/g, "");
}

export default function QuoteInfoPageClient({ params, initialQuoteIntoData }: QuoteInfoPageClientProps) {
  const { quoteId } = params;

  const { data: quoteIntoStrapi, isLoading: quoteIntoStrapiLoading } = useQuoteIntoPage(initialQuoteIntoData, {
    refetchOnMount: initialQuoteIntoData !== undefined ? false : "always",
  });

  const quoteIntoPageVm = useMemo(
    () => parseQuoteIntoPageResponse(quoteIntoStrapi),
    [quoteIntoStrapi]
  );

  const trustItems = useMemo(() => {
    const reviews = quoteIntoPageVm?.reviews ?? [];
    if (reviews.length === 0) return DEFAULT_TRUST_ITEMS;
    return reviews.map((r) => ({
      label: r.section_title,
      icon: reviewBadgeIcon(r.section_icon_name),
    }));
  }, [quoteIntoPageVm?.reviews]);

  const questionCta = quoteIntoPageVm?.questionBlocks?.[0];
  const displayPhone = questionCta?.phone_number?.trim() || PHONE_DISPLAY;
  const telHref =
    questionCta?.phone_number && digitsOnlyPhone(questionCta.phone_number).length >= 10
      ? `tel:+1${digitsOnlyPhone(questionCta.phone_number).slice(-10)}`
      : `tel:+1${PHONE_TEL}`;

  useDebugValue(
    { vm: quoteIntoPageVm, strapiLoading: quoteIntoStrapiLoading },
    (s) => (s.vm ? "quote-into Strapi ready" : s.strapiLoading ? "loading" : "empty")
  );

  const safeTarget = useMemo(() => resolveSafeQuoteInfoTarget(quoteId), [quoteId]);
  const safeQuoteId = safeTarget?.quoteId;

  useEffect(() => {
    if (!safeTarget) {
      console.error("Invalid quoteId");
    }
  }, [safeTarget]);

  const { data: quoteDetails, isLoading: quoteDetailsLoading } = useQuoteDetails(safeQuoteId);

  const loading = quoteDetailsLoading && !quoteDetails;

  const firstName = useMemo(() => {
    const quoteData = (quoteDetails as any)?.data?.quote?.customerDetails ?? (quoteDetails as any)?.quote;
    const firstNameNormalized = quoteData?.first_name?.trim().toLowerCase() ?? "";
    const lastNameNormalized = quoteData?.last_name?.trim().toLowerCase() ?? "";
    const name = `${firstNameNormalized} ${lastNameNormalized}`.trim();
    return name || "Customer";
  }, [quoteDetails]);

  const seoMetadata = quoteIntoStrapi?.data?.SeoMetaData ?? null;

  useEffect(() => {
    if (!loading && !seoMetadata?.meta_title) {
      document.title = "Quote sent | CarShippers.ai";
    }
  }, [loading, seoMetadata?.meta_title]);

  if (loading && !quoteDetails) {
    return (
      <>
        <PageSEO seoMetadata={seoMetadata} pageContent={null} />
        <PageSkeleton />
      </>
    );
  }

  const hero = quoteIntoPageVm?.hero;
  const helpful = quoteIntoPageVm?.helpfulGuides;
  const gHero = quoteIntoPageVm?.guaranteeHero;
  const gContact = quoteIntoPageVm?.guaranteeContact;
  const ready = quoteIntoPageVm?.readyToShipment;

  const sealMiddle = (() => {
    const line = gHero?.main_headline?.trim();
    if (!line) return "100% Risk Free";
    const first = line.split(".")[0]?.trim();
    return first || line;
  })();

  return (
    <>
      <PageSEO seoMetadata={seoMetadata} pageContent={null} />

      <div className="w-full flex-col bg-slate-100 pt-20">
        {/* Transport quote confirmation */}
        <section className="relative py-10 md:py-14 lg:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="order-2 text-center lg:order-1 lg:text-left"
              >
                <p className="text-lg text-slate-800 md:text-xl">
                  {hero?.description ?? "Hi"}
                  <strong>
                    &nbsp;&nbsp;{firstName},
                  </strong>
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
                  {hero?.secondary_description ??
                    "Your personalized CarShippers.ai quote is on its way by"}{" "}
                  <HighlightedChannels
                    text={hero?.highlighted_text ?? "email and text"}
                  />{" "}
                  {hero?.main_headline ??
                    "so you can review pricing, tiers, and timing on your schedule. Prefer to talk it through? We're here when you need us."}
                </p>

                <h1 className="mt-10 text-2xl font-bold text-blue-900 md:text-3xl">
                  {helpful?.tagline ?? "Helpful guides while you compare options"}
                </h1>
                <p className="mt-3 text-slate-600">
                  {helpful?.main_headline ??
                    "Get clear, practical answers before you book—no jargon, just what matters for your move:"}
                </p>
                <ul className="mt-6 space-y-3 text-left">
                  {RESOURCE_LINKS.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 + index * 0.06 }}
                      className="flex items-start gap-3"
                    >
                      <Pin
                        className="mt-0.5 h-5 w-5 shrink-0 text-rose-600"
                        aria-hidden
                      />
                      <Link
                        href={item.href}
                        className="text-base font-medium text-blue-500 underline-offset-4 hover:underline"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <p className="mt-8 text-slate-700">
                  {helpful?.FooterTitle ?? "Have a question about your quote or route? "}
                  <strong className="font-semibold text-slate-900">
                    {helpful?.BolderFooterTitle ??
                      "Reach out anytime—we'll help you choose the option that fits your timeline and budget."}
                  </strong>
                </p>

                <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-slate-800 lg:justify-start">
                  <Phone className="h-5 w-5 text-rose-600" aria-hidden />
                  <span>{questionCta?.title ?? "Questions"}? Call</span>
                  <a
                    href={telHref}
                    className="font-semibold text-blue-500 underline-offset-4 hover:underline"
                  >
                    {displayPhone}
                  </a>
                  <span className="hidden sm:inline">and we&apos;ll walk you through it.</span>
                </p>
                <p className="mt-1 text-center text-sm text-slate-600 sm:hidden">
                  and we&apos;ll walk you through it.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="order-1 flex justify-center lg:order-2 lg:justify-end"
              >
                <FillImageFrame
                  aspectClassName="aspect-square w-[152px] shrink-0 rounded-full border-4 border-sky-200/90 shadow-lg ring-4 ring-blue-900/10
                  sm:w-[168px] md:w-[300px] lg:w-[300px]"
                  className="bg-gradient-to-br from-blue-900 to-blue-950"
                >
                  <GumletImage
                    src={DELIVERY_TRUCK_ICON_LARRY}
                    alt="Delivery truck — vehicle transport"
                    fill
                    priority
                    className="object-contain object-center p-1.5 sm:p-2 md:p-2.5"
                    sizes="(max-width: 640px) 152px, (max-width: 1024px) 192px, 216px"
                  />
                </FillImageFrame>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="container mx-auto mt-8 max-w-5xl px-4"
          >
            <div className="rounded-full border border-slate-200/80 bg-white px-4 py-4 shadow-lg shadow-slate-300/40 md:px-8">
              <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:flex-wrap md:justify-center md:overflow-visible [&::-webkit-scrollbar]:hidden">
                {trustItems.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex min-w-[7.5rem] shrink-0 snap-center flex-col items-center gap-1 text-center md:min-w-0"
                  >
                    <Icon className="h-6 w-6 text-slate-800" strokeWidth={1.5} aria-hidden />
                    <span className="text-xs font-medium text-slate-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Guarantee + CTA */}
        <section className="bg-white">
          <div className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
            <div className="grid items-start gap-10 md:grid-cols-2 md:items-stretch md:gap-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex min-h-0 items-center justify-center md:justify-start md:py-4"
              >
                <GuaranteeSeal
                  topLabel={gContact?.title ?? "Money back"}
                  middleLabel={sealMiddle}
                  bottomLabel={gContact?.description ?? "Guarantee"}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-center md:text-left"
              >
                <h2 className="text-3xl font-bold text-blue-950 md:text-4xl">
                  {gHero?.tagline ?? "The CarShippers Guarantee"}
                </h2>
                <p className="mt-4 text-xl font-bold text-blue-950 md:text-2xl">
                  {gHero?.main_headline ?? "100% Risk-Free. Total Peace of Mind."}
                </p>
                <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
                  {gHero?.description ??
                    "At CarShippers, we combine AI-powered precision with real human support to deliver a car shipping experience you can trust from start to finish. From instant quotes to final delivery, every step is designed to be transparent, reliable, and stress-free."}
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                  {gHero?.secondary_description ??
                    "If we don't deliver on what we promise, we make it right—no questions, no hassle."}
                </p>
                <ol className="mt-8 list-none space-y-5 p-0 text-left text-base leading-relaxed text-slate-700 md:text-lg">
                  {GUARANTEE_POINTS.map((item, index) => (
                    <motion.li
                      key={item.title}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 * index }}
                      className="flex gap-3"
                    >
                      <span className="mt-0.5 shrink-0 font-bold tabular-nums text-blue-950">
                        {index + 1}.
                      </span>
                      <span>
                        <span className="font-semibold text-slate-900">{item.title}</span>
                        <span className="text-slate-600"> – {item.body}</span>
                      </span>
                    </motion.li>
                  ))}
                </ol>
                <p className="mt-8 text-base font-medium leading-relaxed text-slate-700 md:text-lg">
                  {gHero?.BolderFooterTitle ??
                    "Because shipping your car isn't just about moving a vehicle—it's about delivering confidence, reliability, and complete peace of mind."}
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-[hsl(var(--success))] py-7 md:py-9"
          >
            <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 md:flex-row md:gap-8">
              <p className="text-center text-2xl font-bold text-white md:text-left md:text-3xl">
                {ready?.headline ?? "Ready to lock in your shipment?"}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-3.5 text-base font-bold text-slate-900 shadow-md transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Speak to agent
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
