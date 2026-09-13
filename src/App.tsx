import { useState, useEffect, useRef } from "react";
import logoImg from "@/imports/images.jpeg";
import mascotImg from "@/imports/ChatGPT_Image_10_de_ago._de_2026__20_48_33.png";
import mascot2Img from "@/imports/ChatGPT_Image_10_de_ago._de_2026__20_48_33-1.png";

/* ─── Palette ────────────────────────────────────────────── */
const NAVY   = "#0D1B3E";
const NAVY2  = "#162B5C";
const ORANGE = "#F97316";
const CREAM  = "#FAFAF8";
const WARM   = "#F3F2EE";
const MUTED  = "#6B7280";
const BORDER = "#E2E1DC";

/* ─── Images ─────────────────────────────────────────────── */
const IMG_HERO    = "https://images.unsplash.com/photo-1606768666853-403c90a981ad?w=1800&h=900&fit=crop&auto=format";
const IMG_ABOUT   = "https://images.unsplash.com/photo-1687992176093-6417a93fa3d0?w=900&h=700&fit=crop&auto=format";
const IMG_BEACH   = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&h=480&fit=crop&auto=format";
const IMG_ISLAND  = "https://images.unsplash.com/photo-1535262412227-85541e910204?w=700&h=480&fit=crop&auto=format";
const IMG_AIRPORT = "https://images.unsplash.com/photo-1553619948-505cc1cdc320?w=700&h=480&fit=crop&auto=format";

/* ══════════════════════════════════════════════════════════
   ✏️  CONTEÚDO EDITÁVEL
   ══════════════════════════════════════════════════════════ */
const CONTENT = {
  tagline:   "Viaje com confiança, vá de Rodrigo.Tur!",
  subtitulo: "Passagens aéreas nacionais e internacionais com atendimento humano, personalizado e suporte em cada etapa da sua viagem.",
  slogan:    "Eu te ajudo a viajar mais pagando menos.",

  whatsapp:          "https://wa.me/5583993686142",
  whatsappDisplay:   "(83) 99368-6142",
  site:              "https://rodrigotur.com.br",
  siteDisplay:       "rodrigotur.com.br",
  instagram:         "https://instagram.com/rodrigotur.pb",
  instagramDisplay:  "@rodrigotur.pb",
  endereco:          "Rua Eunice Ribeiro Araújo, 516 — Centro, Queimadas/PB, 58475-000",
  enderecoMaps:      "https://www.google.com/maps/search/Rua+Eunice+Ribeiro+Araujo+516+Queimadas+PB",
  atendimentoOnline:     "Todos os dias",
  atendimentoPresencial: "Sábados — Queimadas/PB",

  sobreTexto: "A Rodrigo.Tur nasceu para tornar a experiência de viajar mais simples, segura e acessível. Mais do que emitir passagens, acompanhamos cada cliente com atendimento humano e personalizado, ajudando desde a escolha do voo até os detalhes da viagem. Nosso compromisso é fazer com que você viaje com confiança.",
  missao:  "Tornar as viagens mais simples, seguras e acessíveis com atendimento humano e personalizado.",
  visao:   "Ser a agência de referência em Queimadas/PB, reconhecida pela confiança e qualidade.",
  valores: "Cuidado, transparência, agilidade e compromisso com cada viagem.",

  historiaSubtitulo: "De um sonho a uma agência de confiança",
  historiaTexto: "O que começou como uma vontade de ajudar pessoas a encontrar melhores caminhos para viajar tornou-se uma agência especializada em passagens aéreas, com suporte completo antes, durante e depois da viagem.",
  historiaTimeline: [
    { ano: "Início",       titulo: "A ideia nasce",           desc: "O desejo de ajudar pessoas a viajar melhor deu origem à Rodrigo.Tur." },
    { ano: "Crescimento",  titulo: "Primeiros clientes",      desc: "Atendimento personalizado e indicações construíram a base da agência." },
    { ano: "Consolidação", titulo: "Especialização",          desc: "Foco em passagens aéreas e suporte completo em cada etapa." },
    { ano: "Hoje",         titulo: "Novos horizontes",        desc: "Conectando pessoas a novos destinos com confiança e cuidado." },
  ],

  diferenciaisQuote: "Você não precisa planejar tudo sozinho. A Rodrigo.Tur acompanha cada etapa para que sua viagem seja mais tranquila.",

  copyright:   `© ${new Date().getFullYear()} Rodrigo.Tur — Agência de Viagens. Todos os direitos reservados.`,
  avisoEdicao: "Informações comerciais podem ser atualizadas pela equipe da Rodrigo.Tur",
};

/* ─── Nav ────────────────────────────────────────────────── */
const NAV = [
  { label: "Início",        href: "#inicio" },
  { label: "Sobre nós",     href: "#sobre" },
  { label: "Serviços",      href: "#servicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Diferenciais",  href: "#diferenciais" },
  { label: "Contato",       href: "#contato" },
];

/* ─── Brand images ───────────────────────────────────────── */
function Logo({ size = 40 }: { size?: number }) {
  return <img src={logoImg} alt="Rodrigo.Tur logo" style={{ width: size, height: size, objectFit: "contain", flexShrink: 0 }} />;
}
function Mascot({ size = 64, variant = 1, flip }: { size?: number; variant?: 1 | 2; flip?: boolean }) {
  return (
    <img
      src={variant === 2 ? mascot2Img : mascotImg}
      alt="Mascote Rodrigo.Tur"
      className="float-anim"
      style={{ width: size, height: size * 1.1, objectFit: "contain", flexShrink: 0, transform: flip ? "scaleX(-1)" : undefined }}
    />
  );
}

/* ─── Button ─────────────────────────────────────────────── */
function Btn({
  children, variant = "primary", href, onClick, small, block,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  href?: string;
  onClick?: () => void;
  small?: boolean;
  block?: boolean;
}) {
  const vs: Record<string, React.CSSProperties> = {
    primary:   { background: ORANGE, color: NAVY,  boxShadow: "0 4px 18px rgba(249,115,22,0.45)" },
    secondary: { background: "rgba(255,255,255,0.12)", color: "white", border: "1.5px solid rgba(255,255,255,0.25)" },
    outline:   { background: "transparent", color: "white", border: "2px solid white" },
    ghost:     { background: "transparent", color: NAVY, textDecoration: "underline" },
  };
  const base: React.CSSProperties = {
    display: block ? "flex" : "inline-flex",
    width: block ? "100%" : undefined,
    alignItems: "center",
    justifyContent: block ? "center" : undefined,
    gap: 8,
    fontWeight: 700, fontFamily: "inherit", cursor: "pointer",
    transition: "opacity .15s, transform .15s",
    borderRadius: small ? 10 : 14,
    padding: small ? "9px 18px" : "15px 20px",
    fontSize: small ? "0.85rem" : "0.95rem",
    border: "none", textDecoration: "none",
    whiteSpace: "nowrap",
    ...vs[variant],
  };
  const hover = (e: React.MouseEvent<HTMLElement>, on: boolean) => {
    (e.currentTarget as HTMLElement).style.opacity = on ? "0.85" : "1";
    (e.currentTarget as HTMLElement).style.transform = on ? "translateY(-1px)" : "translateY(0)";
  };
  if (href) return (
    <a href={href} style={base} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
      onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{children}</a>
  );
  return <button style={base} onClick={onClick} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{children}</button>;
}

/* ─── Section CTA ────────────────────────────────────────── */
function SectionCTA({ label, href }: { label: string; href: string }) {
  return (
    <div style={{ textAlign: "center", marginTop: 52 }}>
      <Btn href={href} variant="primary">
        <WhatsAppIcon />{label}
      </Btn>
    </div>
  );
}

/* ─── Section primitives ─────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, color: ORANGE, border: `1px solid ${ORANGE}`, borderRadius: 999, padding: "5px 14px", marginBottom: 14, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: ORANGE, flexShrink: 0 }} />
      {children}
    </div>
  );
}
function SectionHeading({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{ fontFamily: "Fraunces, Georgia, serif", color: light ? "white" : NAVY, fontSize: "clamp(1.7rem, 4vw, 2.9rem)", fontWeight: 600, lineHeight: 1.18 }}>
      {children}
    </h2>
  );
}

/* ─── Flight decoration ──────────────────────────────────── */
function FlightPath() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.06, overflow: "hidden" }}
      viewBox="0 0 1200 600" fill="none" preserveAspectRatio="xMidYMid slice"
    >
      <path d="M-100,400 C200,280 450,180 700,220 C900,255 1050,140 1300,90" stroke="white" strokeWidth="1.5" strokeDasharray="9 7" />
      <path d="M0,200 C180,195 380,330 650,300 C900,270 1080,370 1400,330" stroke="white" strokeWidth="1" strokeDasharray="6 10" />
    </svg>
  );
}

/* ─── Icons (consistent outlined style) ─────────────────── */
const I = ({ d, size = 22 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);
const MenuIcon = () => <I d="M3 6h18M3 12h18M3 18h18" />;
const XIcon    = () => <I d="M18 6L6 18M6 6l12 12" />;
const PlaneIcon  = () => <I d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />;
const GlobeIcon  = () => <I d="M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />;
const LuggageIcon = () => <I d="M6 7h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2zM9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M12 12v4M10 14h4" />;
const SeatIcon   = () => <I d="M7 20h10M7 16l1-9h8l1 9M8 7V4h8v3" />;
const HeadsetIcon = () => <I d="M3 18v-6a9 9 0 0118 0v6M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />;
const CheckinIcon = () => <I d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />;
const MapPinIcon  = () => <I d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0zM12 10a2 2 0 100-4 2 2 0 000 4" />;
const ClockIcon   = () => <I d="M12 2a10 10 0 100 20A10 10 0 0012 2zM12 6v6l4 2" />;
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);
const ShieldIcon  = () => <I d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;
const CalendarIcon = () => <I d="M3 4h18a1 1 0 011 1v15a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1zM16 2v4M8 2v4M1 10h22" />;
const PersonIcon  = () => <I d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8" />;
const CheckIcon   = () => <I d="M20 6L9 17l-5-5" size={15} />;
const PhoneIcon   = () => <I d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />;

/* ─── useIsMobile ────────────────────────────────────────── */
function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(() => window.innerWidth < breakpoint);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, [breakpoint]);
  return mobile;
}

/* ─── useReveal (IntersectionObserver scroll reveal) ────── */
function useReveal(rootMargin = "-40px") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.08, rootMargin: `0px 0px ${rootMargin} 0px` }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);
  return [ref, visible] as const;
}

function Reveal({
  children, delay = 0, className, style,
}: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties;
}) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Floating WhatsApp button ───────────────────────────── */
function FloatingWhatsApp() {
  const [entered, setEntered] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 700);
    return () => clearTimeout(t);
  }, []);
  const size = isMobile ? 56 : "auto";
  return (
    <a
      href={CONTENT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        background: ORANGE,
        color: NAVY,
        borderRadius: isMobile ? "50%" : 999,
        width: size,
        height: size,
        padding: isMobile ? 0 : "13px 22px",
        fontWeight: 700,
        fontSize: "0.9rem",
        fontFamily: "Outfit, system-ui, sans-serif",
        textDecoration: "none",
        boxShadow: "0 4px 24px rgba(249,115,22,0.45), 0 2px 8px rgba(0,0,0,0.15)",
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.4s ease, transform 0.4s ease, box-shadow 0.2s, opacity 0.2s",
        flexShrink: 0,
        whiteSpace: "nowrap",
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 32px rgba(249,115,22,0.65), 0 2px 8px rgba(0,0,0,0.15)")}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 24px rgba(249,115,22,0.45), 0 2px 8px rgba(0,0,0,0.15)")}
    >
      <svg width={isMobile ? 28 : 22} height={isMobile ? 28 : 22} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
      </svg>
      {!isMobile && <span>Fale conosco</span>}
    </a>
  );
}

/* ─── Nav ────────────────────────────────────────────────── */
function Nav({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => { if (!isMobile) setOpen(false); }, [isMobile]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const headerBg = scrolled ? "rgba(13,27,62,0.97)" : "transparent";

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: headerBg,
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        transition: "background .3s, border-color .3s",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "0 20px",
          height: isMobile ? 60 : 68,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          overflow: "hidden",
        }}>
          {/* Brand */}
          <a href="#inicio" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <Logo size={isMobile ? 34 : 42} />
            <div>
              <div style={{ fontFamily: "Fraunces, Georgia, serif", color: "white", fontSize: isMobile ? "0.95rem" : "1.15rem", fontWeight: 700, lineHeight: 1 }}>
                RODRIGO<span style={{ color: ORANGE }}>TUR</span>
              </div>
              <div style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>Agência de Viagens</div>
            </div>
          </a>

          {/* Desktop nav */}
          {!isMobile && (
            <>
              <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
                {NAV.map(n => (
                  <a key={n.href} href={n.href} style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.88rem", fontWeight: 500, padding: "8px 14px", borderRadius: 8, textDecoration: "none", transition: "color .15s, background .15s" }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.color = "white"; (e.target as HTMLElement).style.background = "rgba(255,255,255,0.09)"; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.78)"; (e.target as HTMLElement).style.background = "transparent"; }}
                  >{n.label}</a>
                ))}
              </nav>
              <Btn href={CONTENT.whatsapp} variant="primary" small><WhatsAppIcon />WhatsApp</Btn>
            </>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setOpen(v => !v)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              style={{ color: "white", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, cursor: "pointer", padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            >
              {open ? <XIcon /> : <MenuIcon />}
            </button>
          )}
        </div>
      </header>

      {/* Overlay */}
      {isMobile && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(7,18,38,0.55)", backdropFilter: "blur(3px)",
          opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
          transition: "opacity .25s",
        }} onClick={() => setOpen(false)} />
      )}

      {/* Drawer */}
      {isMobile && (
        <div style={{
          position: "fixed", top: 60, right: 0, bottom: 0, zIndex: 100,
          width: "min(320px, 88vw)",
          background: `linear-gradient(160deg, #0D1B3E 0%, #071226 100%)`,
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          display: "flex", flexDirection: "column",
          padding: "8px 0 32px",
          transform: open ? "translateX(0)" : "translateX(105%)",
          transition: "transform .3s cubic-bezier(.4,0,.2,1)",
          overflowY: "auto",
          boxShadow: "-12px 0 48px rgba(0,0,0,0.4)",
        }}>
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px 16px 4px" }}>
            <button onClick={() => setOpen(false)} aria-label="Fechar menu"
              style={{ color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.07)", border: "none", borderRadius: 8, cursor: "pointer", padding: "8px 10px", display: "flex" }}>
              <XIcon />
            </button>
          </div>

          <nav style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 0" }}>
            {NAV.map((n, i) => (
              <a key={n.href} href={n.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex", alignItems: "center",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "1.05rem", fontWeight: 500,
                  padding: "16px 28px",
                  textDecoration: "none",
                  borderBottom: i < NAV.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  transition: "color .15s, background .15s",
                  minHeight: 56,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div style={{ padding: "20px 24px 0" }}>
            <a href={CONTENT.whatsapp} target="_blank" rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", background: ORANGE, color: NAVY, borderRadius: 14, padding: "16px 20px", fontWeight: 800, fontSize: "1rem", textDecoration: "none", boxShadow: "0 4px 18px rgba(249,115,22,0.4)" }}>
              <WhatsAppIcon />Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Hero ───────────────────────────────────────────────── */
const HERO_DIFFS = [
  "Atendimento online todos os dias",
  "Atendimento presencial aos sábados",
  "Agência cadastrada no Cadastur",
  "Atendimento humano e personalizado",
];

function Hero() {
  const isMobile = useIsMobile();
  const isNarrow = useIsMobile(480);

  return (
    <section id="inicio" style={{ background: NAVY, minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: isMobile ? "flex-start" : "center" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img src={IMG_HERO} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, rgba(13,27,62,0.55) 0%, rgba(13,27,62,0.88) 70%, ${NAVY} 100%)` }} />
      </div>
      <FlightPath />

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: isMobile ? "72px 20px 56px" : "120px 24px 80px", width: "100%" }}>

        {/* ── Mobile: single column, top-aligned ── */}
        {isMobile && (
          <div className="fade-up" style={{ display: "flex", flexDirection: "column", alignItems: "stretch", textAlign: "left" }}>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.14)", border: "1px solid rgba(249,115,22,0.35)", borderRadius: 999, padding: "6px 14px", marginBottom: 18 }}>
              <PlaneIcon />
              <span style={{ color: ORANGE, fontSize: "0.67rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em" }}>Passagens Aéreas · Queimadas/PB</span>
            </div>

            <h1 style={{ fontFamily: "Fraunces, Georgia, serif", color: "white", fontSize: "clamp(1.65rem, 7vw, 2.4rem)", lineHeight: 1.18, fontWeight: 600, marginBottom: 14 }}>
              Viaje com confiança,{" "}
              <em style={{ color: ORANGE, fontStyle: "italic" }}>vá de Rodrigo.Tur!</em>
            </h1>

            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: 24 }}>
              {CONTENT.subtitulo}
            </p>

            {/* Buttons: side by side ≥480px, stacked below */}
            <div style={{ display: "grid", gridTemplateColumns: isNarrow ? "1fr" : "1fr 1fr", gap: 10, width: "100%" }}>
              <Btn href={CONTENT.whatsapp} variant="primary" block>
                <WhatsAppIcon />Falar no WhatsApp
              </Btn>
              <Btn href="#servicos" variant="secondary" block>
                Planejar minha viagem
              </Btn>
            </div>

            {/* Mascote mobile — abaixo dos botões */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 24, padding: "14px 16px", background: "rgba(249,115,22,0.10)", border: "1px solid rgba(249,115,22,0.22)", borderRadius: 14 }}>
              <Mascot size={64} variant={1} />
              <p style={{ color: ORANGE, fontWeight: 700, fontSize: "0.82rem", margin: 0, lineHeight: 1.4 }}>{CONTENT.slogan}</p>
            </div>

            {/* 4 differentials */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px 14px", marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {HERO_DIFFS.map(d => (
                <div key={d} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: ORANGE, flexShrink: 0, marginTop: 4 }} />
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.74rem", lineHeight: 1.4 }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Desktop: 2-column layout ── */}
        {!isMobile && (
          <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center" }}>
            <div style={{ maxWidth: 620 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.14)", border: "1px solid rgba(249,115,22,0.35)", borderRadius: 999, padding: "6px 16px", marginBottom: 28 }}>
                <PlaneIcon />
                <span style={{ color: ORANGE, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Passagens Aéreas · Queimadas/PB</span>
              </div>

              <h1 style={{ fontFamily: "Fraunces, Georgia, serif", color: "white", fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", lineHeight: 1.12, fontWeight: 600, marginBottom: 20 }}>
                Viaje com confiança,{" "}
                <em style={{ color: ORANGE, fontStyle: "italic" }}>vá de Rodrigo.Tur!</em>
              </h1>

              <p style={{ color: "rgba(255,255,255,0.68)", fontSize: "1.08rem", lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
                {CONTENT.subtitulo}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Btn href={CONTENT.whatsapp} variant="primary"><WhatsAppIcon />Falar no WhatsApp</Btn>
                <Btn href="#servicos" variant="secondary">Planejar minha viagem</Btn>
              </div>

              {/* 4 differentials */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 32px", marginTop: 44, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                {HERO_DIFFS.map(d => (
                  <div key={d} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: ORANGE, flexShrink: 0, marginTop: 5 }} />
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", lineHeight: 1.45 }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mascot column */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <Mascot size={180} variant={1} />
              <div style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 14, padding: "12px 18px", textAlign: "center", maxWidth: 200 }}>
                <p style={{ color: ORANGE, fontWeight: 700, fontSize: "0.82rem", margin: 0 }}>{CONTENT.slogan}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── About ──────────────────────────────────────────────── */
function About() {
  const isMobile = useIsMobile();
  return (
    <section id="sobre" style={{ background: CREAM, padding: isMobile ? "64px 0" : "96px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <Reveal style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="grid-1col-md">

          {/* Image */}
          <div style={{ position: "relative", paddingBottom: 20 }}>
            <div style={{ borderRadius: 20, overflow: "hidden", background: WARM, aspectRatio: "4/3" }}>
              <img src={IMG_ABOUT} alt="Casal no aeroporto" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 8, background: ORANGE, color: NAVY, borderRadius: 14, padding: "14px 20px", boxShadow: "0 8px 28px rgba(249,115,22,0.4)" }}>
              <div style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.3rem", fontWeight: 800, lineHeight: 1 }}>Cadastur</div>
              <div style={{ fontSize: "0.7rem", fontWeight: 600, marginTop: 3 }}>Agência certificada</div>
            </div>
          </div>

          {/* Text */}
          <div>
            <SectionLabel>Sobre a Rodrigo.Tur</SectionLabel>
            <SectionHeading>
              Sua viagem começa{" "}
              <em style={{ color: ORANGE, fontStyle: "italic" }}>com tranquilidade</em>
            </SectionHeading>
            <p style={{ color: MUTED, lineHeight: 1.8, marginTop: 18, marginBottom: 28 }}>
              {CONTENT.sobreTexto}
            </p>

            <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
              {["Cuidado em cada atendimento", "Transparência nas orientações", "Agilidade para encontrar soluções", "Compromisso com cada viagem"].map(v => (
                <li key={v} style={{ display: "flex", alignItems: "center", gap: 10, color: NAVY, fontSize: "0.9rem" }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#FFF0E6", color: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><CheckIcon /></span>
                  {v}
                </li>
              ))}
            </ul>

            <Btn href={CONTENT.whatsapp} variant="primary" small><WhatsAppIcon />Fale com a Rodrigo.Tur</Btn>
          </div>
        </Reveal>

        {/* Mission / Vision / Values */}
        <Reveal delay={100} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 56 }} className="grid-1col-md">
          {[
            { t: "Missão", txt: CONTENT.missao  },
            { t: "Visão",  txt: CONTENT.visao   },
            { t: "Valores",txt: CONTENT.valores  },
          ].map(c => (
            <div key={c.t} style={{ background: "white", border: `1px solid ${BORDER}`, borderRadius: 16, padding: 28 }}>
              <h3 style={{ fontFamily: "Fraunces, Georgia, serif", color: NAVY, fontSize: "1.05rem", fontWeight: 600, marginBottom: 10 }}>{c.t}</h3>
              <p style={{ color: MUTED, lineHeight: 1.7, fontSize: "0.88rem" }}>{c.txt}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── História ───────────────────────────────────────────── */
function Historia() {
  const isMobile = useIsMobile();
  return (
    <section id="historia" style={{ background: NAVY, position: "relative", overflow: "hidden", padding: isMobile ? "64px 0" : "96px 0" }}>
      <FlightPath />
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        <Reveal style={{ marginBottom: 48, maxWidth: 680 }}>
          <SectionLabel>Nossa História</SectionLabel>
          <SectionHeading light>{CONTENT.historiaSubtitulo}</SectionHeading>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginTop: 18 }}>
            {CONTENT.historiaTexto}
          </p>
        </Reveal>

        <Reveal delay={120} style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="grid-2col-sm">
          {CONTENT.historiaTimeline.map((item, i) => (
            <div key={item.ano} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <span style={{ color: NAVY, fontWeight: 800, fontSize: "0.8rem" }}>{i + 1}</span>
              </div>
              <div style={{ color: ORANGE, fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{item.ano}</div>
              <h4 style={{ fontFamily: "Fraunces, Georgia, serif", color: "white", fontSize: "0.95rem", fontWeight: 600, marginBottom: 6 }}>{item.titulo}</h4>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </Reveal>

        <SectionCTA label="Planeje sua viagem" href={CONTENT.whatsapp} />
      </div>
    </section>
  );
}

/* ─── Services ───────────────────────────────────────────── */
function Services() {
  const isMobile = useIsMobile();
  const services = [
    { Icon: PlaneIcon,   title: "Passagens nacionais",      desc: "Voos pelo Brasil com orientação personalizada." },
    { Icon: GlobeIcon,   title: "Passagens internacionais", desc: "Destinos no mundo com suporte em cada etapa." },
    { Icon: LuggageIcon, title: "Despacho de bagagem",      desc: "Ajuda para organizar sua bagagem com segurança." },
    { Icon: SeatIcon,    title: "Escolha de assentos",      desc: "Mais conforto na hora de escolher seu lugar." },
    { Icon: CheckinIcon, title: "Check-in e alterações",    desc: "Suporte para check-in e ajustes na viagem." },
    { Icon: HeadsetIcon, title: "Suporte completo",         desc: "Atendimento antes, durante e depois da viagem." },
  ];
  const offers = [
    { title: "Voos nacionais",          desc: "Consulte opções para viajar pelo Brasil.",    img: IMG_BEACH },
    { title: "Voos internacionais",     desc: "Seu destino no exterior começa aqui.",        img: IMG_ISLAND },
    { title: "Atendimento personalizado", desc: "Para o seu destino, no período que precisar.", img: IMG_AIRPORT },
  ];

  return (
    <section id="servicos" style={{ background: WARM, padding: isMobile ? "64px 0" : "96px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>Serviços</SectionLabel>
          <SectionHeading>
            Tudo o que você precisa{" "}
            <em style={{ color: ORANGE, fontStyle: "italic" }}>para viajar bem</em>
          </SectionHeading>
        </Reveal>

        {/* 6 service cards */}
        <Reveal delay={100} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginBottom: 64 }} className="grid-2col-sm grid-1col-xs">
          {services.map(({ Icon, title, desc }) => (
            <div key={title} style={{ background: "white", border: `1px solid ${BORDER}`, borderRadius: 18, padding: 24, transition: "box-shadow .2s" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.09)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
            >
              <div style={{ width: 48, height: 48, borderRadius: 13, background: "#FFF0E6", color: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Icon />
              </div>
              <h3 style={{ fontFamily: "Fraunces, Georgia, serif", color: NAVY, fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>{title}</h3>
              <p style={{ color: MUTED, fontSize: "0.87rem", lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </Reveal>

        {/* 3 opportunity cards */}
        <Reveal delay={80} style={{ textAlign: "center", marginBottom: 28 }}>
          <SectionLabel>Oportunidades</SectionLabel>
          <h3 style={{ fontFamily: "Fraunces, Georgia, serif", color: NAVY, fontSize: "clamp(1.3rem, 3vw, 1.6rem)", fontWeight: 600 }}>Consulte as opções disponíveis</h3>
        </Reveal>
        <Reveal delay={160} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }} className="grid-1col-sm">
          {offers.map(o => (
            <div key={o.title} style={{ borderRadius: 18, overflow: "hidden", background: "white", border: `1px solid ${BORDER}`, transition: "box-shadow .2s" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.09)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
            >
              <div style={{ height: 160, overflow: "hidden", background: WARM }}>
                <img src={o.img} alt={o.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "20px 22px 22px" }}>
                <h4 style={{ fontFamily: "Fraunces, Georgia, serif", color: NAVY, fontSize: "1rem", fontWeight: 600, marginBottom: 6 }}>{o.title}</h4>
                <p style={{ color: MUTED, fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 16 }}>{o.desc}</p>
                <a href={CONTENT.whatsapp} target="_blank" rel="noopener noreferrer" style={{ color: ORANGE, fontWeight: 700, fontSize: "0.83rem" }}>Quero saber mais →</a>
              </div>
            </div>
          ))}
        </Reveal>

        <SectionCTA label="Consultar opções" href={CONTENT.whatsapp} />
      </div>
    </section>
  );
}

/* ─── How it works ───────────────────────────────────────── */
function HowItWorks() {
  const isMobile = useIsMobile();
  const steps = [
    { Icon: WhatsAppIcon, title: "Fale com a Rodrigo.Tur",      desc: "WhatsApp, Instagram, site ou presencial." },
    { Icon: PhoneIcon,    title: "Conte o que você precisa",     desc: "Destino, período e preferências." },
    { Icon: HeadsetIcon,  title: "Receba orientação",            desc: "Ajudamos a encontrar as melhores opções." },
    { Icon: LuggageIcon,  title: "Organize os detalhes",         desc: "Bagagem, assento, check-in e alterações." },
    { Icon: PlaneIcon,    title: "Viaje com confiança",          desc: "Acompanhamento antes, durante e depois." },
  ];
  return (
    <section id="como-funciona" style={{ background: NAVY, position: "relative", overflow: "hidden", padding: isMobile ? "64px 0" : "96px 0" }}>
      <FlightPath />
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>Como funciona</SectionLabel>
          <SectionHeading light>Do primeiro contato <em style={{ color: ORANGE, fontStyle: "italic" }}>ao voo</em></SectionHeading>
          <p style={{ color: "rgba(255,255,255,0.5)", marginTop: 14 }}>Um processo simples, claro e com acompanhamento em cada etapa.</p>
        </Reveal>
        <Reveal delay={120} style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14 }} className="grid-2col-sm grid-1col-xs">
          {steps.map(({ Icon, title, desc }, i) => (
            <div key={title} style={{ textAlign: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(249,115,22,0.14)", border: `2px solid ${ORANGE}`, color: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Icon />
              </div>
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: "16px 12px" }}>
                <div style={{ color: ORANGE, fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>0{i + 1}</div>
                <h4 style={{ fontFamily: "Fraunces, Georgia, serif", color: "white", fontSize: "0.88rem", fontWeight: 600, marginBottom: 6 }}>{title}</h4>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </Reveal>

        <SectionCTA label="Começar meu atendimento" href={CONTENT.whatsapp} />
      </div>
    </section>
  );
}

/* ─── Differentials ──────────────────────────────────────── */
function Differentials() {
  const isMobile = useIsMobile();
  const items = [
    { Icon: PersonIcon,   title: "Atendimento humano e personalizado",       desc: "Cada cliente recebe atenção individual e orientação dedicada." },
    { Icon: ClockIcon,    title: "Atendimento online todos os dias",         desc: "Disponíveis para você em qualquer dia da semana." },
    { Icon: PlaneIcon,    title: "Suporte antes, durante e depois",          desc: "Acompanhamento completo em toda a jornada de viagem." },
    { Icon: MapPinIcon,   title: "Presencial aos sábados em Queimadas/PB",  desc: "Para quem prefere um contato mais próximo e pessoal." },
    { Icon: ShieldIcon,   title: "Agência certificada pelo Cadastur",        desc: "Credenciamento que garante segurança e confiança." },
    { Icon: CalendarIcon, title: "Orientação para escolher voos",            desc: "Ajudamos você a encontrar as melhores opções para o seu destino." },
    { Icon: HeadsetIcon,  title: "Comunicação próxima e acessível",          desc: "Falamos a sua língua e estamos no WhatsApp." },
  ];

  return (
    <section id="diferenciais" style={{ background: CREAM, padding: isMobile ? "64px 0" : "96px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 14 }}>
          <SectionLabel>Diferenciais</SectionLabel>
          <SectionHeading>
            Viajar pode ser mais simples{" "}
            <em style={{ color: ORANGE, fontStyle: "italic" }}>quando você tem apoio</em>
          </SectionHeading>
        </Reveal>

        {/* Quote banner */}
        <Reveal delay={100} style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY2} 100%)`, borderRadius: 18, padding: isMobile ? "28px 24px" : "32px 40px", margin: "32px 0 44px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", gap: 32 }}>
          <FlightPath />
          <p style={{ fontFamily: "Fraunces, Georgia, serif", color: "white", fontSize: "clamp(0.95rem, 2.2vw, 1.3rem)", lineHeight: 1.55, fontStyle: "italic", position: "relative", flex: 1 }}>
            "{CONTENT.diferenciaisQuote}"
          </p>
        </Reveal>

        {/* Cards grid — 7 items, no extra CTA card */}
        <Reveal delay={150} style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="grid-2col-sm grid-1col-xs">
          {items.map(({ Icon, title, desc }, i) => (
            <div key={title} style={{ background: i === 4 ? ORANGE : "white", border: i === 4 ? "none" : `1px solid ${BORDER}`, borderRadius: 16, padding: 22, transition: "box-shadow .2s" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
            >
              <div style={{ color: i === 4 ? NAVY : ORANGE, marginBottom: 12 }}><Icon /></div>
              <h4 style={{ fontFamily: "Fraunces, Georgia, serif", color: NAVY, fontSize: "0.88rem", fontWeight: 600, marginBottom: 6, lineHeight: 1.4 }}>{title}</h4>
              <p style={{ color: i === 4 ? "rgba(13,27,62,0.7)" : MUTED, fontSize: "0.82rem", lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </Reveal>

        <SectionCTA label="Falar no WhatsApp" href={CONTENT.whatsapp} />
      </div>
    </section>
  );
}

/* ─── Contact ────────────────────────────────────────────── */
function Contact() {
  const isMobile = useIsMobile();
  return (
    <section id="contato" style={{ background: NAVY, position: "relative", overflow: "hidden", padding: isMobile ? "64px 0" : "96px 0" }}>
      <FlightPath />
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        <Reveal style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 48, textAlign: "center" }}>
          <SectionLabel>Contato</SectionLabel>
          <SectionHeading light>Vamos planejar sua <em style={{ color: ORANGE, fontStyle: "italic" }}>próxima viagem?</em></SectionHeading>
          <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 440, lineHeight: 1.7, marginTop: 4 }}>
            Entre em contato por qualquer um dos nossos canais e comece a planejar agora mesmo.
          </p>
        </Reveal>

        {/* WhatsApp CTA card */}
        <Reveal delay={80} style={{ background: ORANGE, borderRadius: 20, padding: isMobile ? "24px 20px" : "32px 40px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
            <Mascot size={isMobile ? 68 : 88} variant={1} />
            <div>
              <div style={{ fontFamily: "Fraunces, Georgia, serif", color: NAVY, fontSize: "clamp(1rem,2.5vw,1.5rem)", fontWeight: 700 }}>WhatsApp — o canal mais rápido</div>
              <div style={{ color: "rgba(13,27,62,0.7)", fontSize: "1.05rem", fontWeight: 600, marginTop: 4 }}>{CONTENT.whatsappDisplay}</div>
            </div>
          </div>
          <a href={CONTENT.whatsapp} target="_blank" rel="noopener noreferrer"
            style={{ background: NAVY, color: "white", borderRadius: 12, padding: "14px 28px", fontWeight: 700, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
            <WhatsAppIcon />Falar no WhatsApp
          </a>
        </Reveal>

        {/* 3 channel cards */}
        <Reveal delay={140} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }} className="grid-1col-sm">
          {[
            { Icon: GlobeIcon,     label: "Site",      val: CONTENT.siteDisplay,      href: CONTENT.site      },
            { Icon: InstagramIcon, label: "Instagram", val: CONTENT.instagramDisplay, href: CONTENT.instagram },
          ].map(c => (
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "22px 18px", display: "flex", flexDirection: "column", gap: 10, textDecoration: "none", transition: "background .2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.11)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
            >
              <span style={{ color: ORANGE }}><c.Icon /></span>
              <div style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{c.label}</div>
              <div style={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}>{c.val}</div>
            </a>
          ))}

          {/* Cadastur — visual badge only, no interaction */}
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "22px 18px", display: "flex", flexDirection: "column", gap: 10, cursor: "default" }}>
            <span style={{ color: ORANGE }}><ShieldIcon /></span>
            <div style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Cadastur</div>
            <div style={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}>Agência cadastrada no Cadastur</div>
          </div>
        </Reveal>

        {/* Address + hours */}
        <Reveal delay={180} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="grid-1col-sm">
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 26, display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span style={{ color: ORANGE, flexShrink: 0, marginTop: 2 }}><MapPinIcon /></span>
            <div>
              <div style={{ color: "white", fontWeight: 600, marginBottom: 6 }}>Endereço</div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.87rem", lineHeight: 1.7 }}>{CONTENT.endereco}</div>
              <a href={CONTENT.enderecoMaps} target="_blank" rel="noopener noreferrer"
                style={{ color: ORANGE, fontSize: "0.82rem", fontWeight: 600, display: "inline-block", marginTop: 10 }}>Como chegar →</a>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 26, display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span style={{ color: ORANGE, flexShrink: 0, marginTop: 2 }}><ClockIcon /></span>
            <div style={{ width: "100%" }}>
              <div style={{ color: "white", fontWeight: 600, marginBottom: 14 }}>Horários de atendimento</div>
              {[
                { l: "Online",     v: CONTENT.atendimentoOnline     },
                { l: "Presencial", v: CONTENT.atendimentoPresencial },
              ].map(h => (
                <div key={h.l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.87rem" }}>{h.l}</span>
                  <span style={{ color: ORANGE, fontWeight: 700, fontSize: "0.87rem" }}>{h.v}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */
function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: "#071226", borderTop: "1px solid rgba(255,255,255,0.06)", padding: isMobile ? "48px 0 0" : "64px 0 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 36, marginBottom: 44 }} className="grid-2col-sm grid-1col-xs">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Logo size={44} />
              <div>
                <div style={{ fontFamily: "Fraunces, Georgia, serif", color: "white", fontSize: "1.1rem", fontWeight: 700 }}>RODRIGO<span style={{ color: ORANGE }}>TUR</span></div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.65rem", letterSpacing: "0.1em" }}>AGÊNCIA DE VIAGENS</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.75, marginBottom: 20, maxWidth: 280 }}>{CONTENT.slogan}</p>
            <Mascot size={52} variant={1} />
          </div>

          {/* Nav */}
          <div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>Navegação</div>
            {NAV.map(n => (
              <a key={n.href} href={n.href} style={{ display: "block", color: "rgba(255,255,255,0.55)", fontSize: "0.87rem", marginBottom: 10, textDecoration: "none", transition: "color .15s" }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "white")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.55)")}
              >{n.label}</a>
            ))}
          </div>

          {/* Services */}
          <div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>Serviços</div>
            {["Passagens nacionais","Passagens internacionais","Despacho de bagagem","Escolha de assentos","Check-in e alterações","Suporte completo"].map(s => (
              <div key={s} style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", marginBottom: 8 }}>{s}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>Contato</div>
            {[
              { Icon: WhatsAppIcon, text: CONTENT.whatsappDisplay, href: CONTENT.whatsapp },
              { Icon: GlobeIcon,    text: CONTENT.siteDisplay,     href: CONTENT.site     },
              { Icon: InstagramIcon,text: CONTENT.instagramDisplay,href: CONTENT.instagram},
              { Icon: MapPinIcon,   text: "Queimadas/PB",          href: CONTENT.enderecoMaps },
            ].map(c => (
              <a key={c.text} href={c.href} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", marginBottom: 10, textDecoration: "none", transition: "color .15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "white")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >
                <span style={{ color: ORANGE, flexShrink: 0 }}><c.Icon /></span>{c.text}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "20px 0", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 8 }}>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.76rem" }}>{CONTENT.copyright}</span>
          <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.72rem" }}>{CONTENT.avisoEdicao}</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Root ───────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ fontFamily: "Outfit, system-ui, sans-serif", overflowX: "hidden" }}>
      <FloatingWhatsApp />
      <Nav scrolled={scrolled} />
      <Hero />
      <About />
      <Historia />
      <Services />
      <HowItWorks />
      <Differentials />
      <Contact />
      <Footer />
    </div>
  );
}
