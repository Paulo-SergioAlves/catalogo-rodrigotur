import { useState, useEffect } from "react";
import logoImg from "@/imports/images.jpeg";
import mascotImg from "@/imports/ChatGPT_Image_10_de_ago._de_2026__20_48_33.png";
import mascot2Img from "@/imports/ChatGPT_Image_10_de_ago._de_2026__20_48_33-1.png";

/* ─── Brand palette ─────────────────────────────────────── */
const NAVY = "#0D1B3E";
const ORANGE = "#F97316";
const ORANGE_LIGHT = "#FB923C";
const ORANGE_PALE = "#FFF0E6";
const CREAM = "#FAFAF8";
const WARM_GRAY = "#F3F2EE";
const MUTED = "#6B7280";
const BORDER = "#E2E1DC";

/* keep GOLD alias so existing references don't break */
const GOLD = ORANGE;
const GOLD_LIGHT = ORANGE_LIGHT;
const GOLD_PALE = ORANGE_PALE;

/* ─── Images ────────────────────────────────────────────── */
const IMG_HERO =
  "https://images.unsplash.com/photo-1606768666853-403c90a981ad?w=1800&h=900&fit=crop&auto=format";
const IMG_ABOUT =
  "https://images.unsplash.com/photo-1687992176093-6417a93fa3d0?w=900&h=700&fit=crop&auto=format";
const IMG_BEACH =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&h=480&fit=crop&auto=format";
const IMG_ISLAND =
  "https://images.unsplash.com/photo-1535262412227-85541e910204?w=700&h=480&fit=crop&auto=format";
const IMG_AIRPORT =
  "https://images.unsplash.com/photo-1553619948-505cc1cdc320?w=700&h=480&fit=crop&auto=format";
const IMG_TERMINAL =
  "https://images.unsplash.com/photo-1655919640606-28088c64edb0?w=700&h=480&fit=crop&auto=format";
const IMG_PLANE =
  "https://images.unsplash.com/photo-1483841971221-ed628402fe33?w=700&h=480&fit=crop&auto=format";
const IMG_TROPICAL =
  "https://images.unsplash.com/photo-1672841828459-bc913fdcd995?w=700&h=480&fit=crop&auto=format";
const IMG_LUGGAGE =
  "https://images.unsplash.com/photo-1574815963212-14443d0f94be?w=700&h=480&fit=crop&auto=format";

/* ══════════════════════════════════════════════════════════
   ✏️  CONTEÚDO EDITÁVEL — altere aqui para atualizar o site
   ══════════════════════════════════════════════════════════ */
const CONTENT = {
  /* Marca */
  agencia: "Rodrigo.Tur",
  slogan: "Eu te ajudo a viajar mais pagando menos.",
  tagline: "Viaje com confiança, vá de Rodrigo.Tur!",
  subtitulo: "Passagens aéreas com atendimento humano, personalizado e suporte em cada etapa da sua viagem.",
  chamadaPromocional: "Encontre novas possibilidades para sua próxima viagem — consulte as opções disponíveis",

  /* Contato */
  whatsapp: "https://wa.me/5583993686142",
  whatsappDisplay: "(83) 99368-6142",
  site: "https://rodrigotur.com.br",
  siteDisplay: "rodrigotur.com.br",
  instagram: "https://instagram.com/rodrigotur.pb",
  instagramDisplay: "@rodrigotur.pb",
  endereco: "Rua Eunice Ribeiro Araújo, 516 — Centro, Queimadas/PB, 58475-000",
  enderecoMaps: "https://www.google.com/maps/search/Rua+Eunice+Ribeiro+Araujo+516+Queimadas+PB",
  atendimentoOnline: "Todos os dias",
  atendimentoPresencial: "Sábados — Queimadas/PB",

  /* Sobre */
  sobreTitulo: "Sua viagem começa com tranquilidade.",
  sobreTexto1: "A Rodrigo.Tur nasceu para tornar a experiência de viajar mais simples, segura e acessível. Mais do que emitir passagens, acompanhamos cada cliente com atendimento humano e personalizado, ajudando desde a escolha do voo até os detalhes da viagem.",
  sobreTexto2: "Nosso compromisso é fazer com que você viaje com confiança. A agência surgiu do desejo de tornar as viagens mais simples e acessíveis para cada cliente, conectando pessoas a novos destinos com cuidado e atendimento humano.",
  missao: "Tornar a experiência de viajar mais simples, segura e acessível, com atendimento humano e personalizado.",
  visao: "Ser a agência de referência em Queimadas/PB e região, reconhecida pela confiança e qualidade no atendimento.",
  valores: "Cuidado, transparência, agilidade, proximidade e compromisso com cada viagem e cada cliente.",

  /* Como funciona */
  comoFuncionaQuote: "Um processo simples, claro e com acompanhamento em cada etapa.",

  /* Diferenciais */
  diferenciaisQuote: "Você não precisa planejar tudo sozinho. A Rodrigo.Tur acompanha cada etapa para que sua viagem seja mais tranquila.",

  /* Destinos */
  destinosTexto: "Seja para conhecer um novo lugar, visitar alguém especial ou realizar um sonho antigo, a Rodrigo.Tur ajuda você a encontrar caminhos mais simples para viajar.",

  /* Ofertas */
  ofertasStrip: "Fale com a nossa equipe e descubra as melhores possibilidades para a sua viagem.",

  /* Contato */
  contatoTitulo: "Vamos planejar sua próxima viagem?",
  contatoBotao1: "Falar no WhatsApp",
  contatoBotao2: "Acessar o site",
  contatoBotao3: "Seguir no Instagram",

  /* Nossa História */
  historiaTitulo: "Nossa História",
  historiaSubtitulo: "De um sonho a uma agência de confiança",
  historiaTexto: "A Rodrigo.Tur surgiu do desejo de tornar as viagens mais simples, acessíveis e tranquilas para cada cliente. Desde o início, a agência construiu sua atuação com base em atendimento próximo, orientação personalizada e compromisso com todos os detalhes da jornada.",
  historiaTexto2: "O que começou como uma forma de ajudar pessoas a encontrarem melhores caminhos para viajar tornou-se uma agência especializada em passagens aéreas e suporte completo antes, durante e depois da viagem. Hoje, a Rodrigo.Tur conecta pessoas a novos destinos com confiança, cuidado e atendimento humano.",
  historiaTexto3: "✏️ Este espaço está reservado para você contar a história real da Rodrigo.Tur — datas, momentos marcantes, conquistas e tudo que faz parte desta trajetória. Edite o objeto CONTENT no início do arquivo para adicionar seu conteúdo.",
  /* Linha do tempo — edite os itens conforme a história real */
  historiaTimeline: [
    { ano: "Início", titulo: "A ideia nasce", desc: "O desejo de ajudar pessoas a viajar melhor deu origem à Rodrigo.Tur." },
    { ano: "Crescimento", titulo: "Primeiros clientes", desc: "Atendimentos personalizados e indicações construíram a base da agência." },
    { ano: "Consolidação", titulo: "Atendimento especializado", desc: "Foco total em passagens aéreas, com suporte completo em cada etapa." },
    { ano: "Hoje", titulo: "Novos destinos", desc: "Conectando pessoas a novos horizontes com confiança e cuidado." },
  ],
  historiaDestaqueQuote: "Cada cliente que ajudamos a viajar faz parte da nossa história.",

  /* Rodapé */
  copyright: `© ${new Date().getFullYear()} Rodrigo.Tur — Agência de Viagens. Todos os direitos reservados.`,
  avisoEdicao: "As informações comerciais podem ser atualizadas pela equipe da Rodrigo.Tur",
};

/* ─── Nav links ─────────────────────────────────────────── */
const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Nossa História", href: "#historia" },
  { label: "Serviços", href: "#servicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Destinos", href: "#destinos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Contato", href: "#contato" },
];

/* ─── Logo / mascot using real brand images ─────────────── */
function Logo({ size = 40 }: { size?: number }) {
  return (
    <img
      src={logoImg}
      alt="Rodrigo.Tur logo"
      style={{ width: size, height: size, objectFit: "contain", flexShrink: 0 }}
    />
  );
}

function Mascot({ size = 64, variant = 1, flip }: { size?: number; variant?: 1 | 2; flip?: boolean }) {
  return (
    <img
      src={variant === 2 ? mascot2Img : mascotImg}
      alt="Mascote Rodrigo.Tur"
      className="float-anim"
      style={{
        width: size,
        height: size * 1.1,
        objectFit: "contain",
        flexShrink: 0,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    />
  );
}

/* ─── Reusable primitives ───────────────────────────────── */
function Btn({
  children,
  variant = "primary",
  href,
  onClick,
  small,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  href?: string;
  onClick?: () => void;
  small?: boolean;
}) {
  const variantStyle: React.CSSProperties =
    variant === "primary"
      ? { background: ORANGE, color: NAVY, boxShadow: "0 4px 14px rgba(249,115,22,0.4)" }
      : variant === "secondary"
      ? { background: NAVY, color: "white", boxShadow: "0 4px 14px rgba(13,27,62,0.3)" }
      : variant === "outline"
      ? { background: "transparent", color: "white", border: `2px solid white` }
      : { background: "transparent", color: NAVY, textDecoration: "underline" };

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 700,
    fontFamily: "inherit",
    cursor: "pointer",
    transition: "opacity 0.15s, transform 0.15s",
    borderRadius: small ? 10 : 14,
    padding: small ? "8px 16px" : "14px 24px",
    fontSize: small ? "0.85rem" : "1rem",
    border: "none",
    textDecoration: "none",
    ...variantStyle,
  };

  const handleHover = (e: React.MouseEvent<HTMLElement>, enter: boolean) => {
    (e.currentTarget as HTMLElement).style.opacity = enter ? "0.88" : "1";
    (e.currentTarget as HTMLElement).style.transform = enter ? "translateY(-1px)" : "translateY(0)";
  };

  if (href)
    return (
      <a
        href={href}
        style={base}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        {children}
      </a>
    );
  return (
    <button
      style={base}
      onClick={onClick}
      onMouseEnter={(e) => handleHover(e, true)}
      onMouseLeave={(e) => handleHover(e, false)}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        color: ORANGE,
        border: `1px solid ${ORANGE}`,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: "0.72rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        borderRadius: 999,
        padding: "5px 14px",
        marginBottom: 14,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: ORANGE, flexShrink: 0 }} />
      {children}
    </div>
  );
}

function SectionHeading({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      style={{ fontFamily: "Fraunces, Georgia, serif", color: light ? "white" : NAVY }}
      className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight"
    >
      {children}
    </h2>
  );
}

/* ─── Plane route decoration ────────────────────────────── */
function FlightPath() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
      viewBox="0 0 1200 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M-100,400 C200,300 400,200 600,250 C800,300 1000,150 1300,100"
        stroke="white"
        strokeWidth="1.5"
        strokeDasharray="8 6"
        fill="none"
      />
      <path
        d="M-50,200 C150,180 350,350 650,320 C950,290 1100,400 1400,350"
        stroke="white"
        strokeWidth="1"
        strokeDasharray="6 8"
        fill="none"
        opacity={0.6}
      />
      <circle cx="600" cy="250" r="4" fill="white" opacity={0.8} />
      <circle cx="300" cy="330" r="3" fill="white" opacity={0.5} />
      <circle cx="900" cy="200" r="3" fill="white" opacity={0.5} />
    </svg>
  );
}

/* ─── Nav ───────────────────────────────────────────────── */
function Nav({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        background: scrolled ? `rgba(13,27,62,0.97)` : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(255,255,255,0.08)` : "none",
        transition: "all 0.3s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <a href="#inicio" className="flex items-center gap-3">
          <Logo size={38} />
          <div>
            <div
              style={{ fontFamily: "Fraunces, Georgia, serif", color: "white", lineHeight: 1 }}
              className="text-xl font-semibold"
            >
              RODRIGO<span style={{ color: ORANGE }}>TUR</span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.55)" }} className="text-xs tracking-wider">
              Agência de Viagens
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              style={{ color: "rgba(255,255,255,0.8)" }}
              className="px-3 py-2 text-sm font-medium rounded-lg hover:text-white hover:bg-white/10 transition-all"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Btn
            href="https://wa.me/5583993686142"
            variant="primary"
            small
          >
            <WhatsAppIcon />
            WhatsApp
          </Btn>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{ background: NAVY, borderTop: `1px solid rgba(255,255,255,0.1)` }}
          className="lg:hidden"
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                style={{ color: "rgba(255,255,255,0.85)" }}
                className="py-3 px-4 text-base font-medium rounded-lg hover:bg-white/10 transition-all"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            ))}
            <div className="mt-4 pt-4" style={{ borderTop: `1px solid rgba(255,255,255,0.1)` }}>
              <Btn href="https://wa.me/5583993686142" variant="primary">
                <WhatsAppIcon />
                Falar no WhatsApp
              </Btn>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── Icons ─────────────────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.852L.057 23.5l5.797-1.522A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.373l-.36-.214-3.727.978.995-3.636-.234-.374A9.818 9.818 0 012.182 12C2.182 6.574 6.574 2.182 12 2.182c5.426 0 9.818 4.392 9.818 9.818 0 5.425-4.392 9.818-9.818 9.818z" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function PlaneIcon({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function LuggageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="7" width="12" height="14" rx="2" /><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  );
}
function SeatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 20h12M6 16l1-8h10l1 8M8 8V4h8v4" />
    </svg>
  );
}
function HeadsetIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0118 0v6" /><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
    </svg>
  );
}
function CheckinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" /><polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={GOLD} stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/* ─── Hero ──────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="inicio"
      style={{ background: NAVY, minHeight: "100vh", position: "relative", overflow: "hidden" }}
      className="flex flex-col"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMG_HERO}
          alt="Avião voando entre nuvens"
          className="w-full h-full object-cover"
          style={{ opacity: 0.25 }}
        />
        <div
          style={{
            background: `linear-gradient(to bottom, rgba(13,27,62,0.6) 0%, rgba(13,27,62,0.85) 60%, ${NAVY} 100%)`,
          }}
          className="absolute inset-0"
        />
      </div>

      <FlightPath />

      {/* Content */}
      <div className="relative flex-1 flex items-center max-w-7xl mx-auto px-6 w-full pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(232,150,26,0.15)",
                border: `1px solid rgba(232,150,26,0.4)`,
                borderRadius: 999,
                padding: "6px 16px",
                marginBottom: 24,
              }}
            >
              <PlaneIcon size={14} color={GOLD} />
              <span style={{ color: GOLD, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Agência de Viagens • Queimadas/PB
              </span>
            </div>

            <h1
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                color: "white",
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                lineHeight: 1.12,
                fontWeight: 600,
                marginBottom: 20,
              }}
            >
              Viaje com confiança,{" "}
              <span style={{ color: GOLD, fontStyle: "italic" }}>vá de Rodrigo.Tur!</span>
            </h1>

            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 500, marginBottom: 32 }}>
              Passagens aéreas com atendimento humano, personalizado e suporte em cada etapa da sua viagem.
            </p>

            {/* Promotional callout */}
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                padding: "12px 20px",
                marginBottom: 32,
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.9rem",
              }}
            >
              ✈️ Encontre novas possibilidades para sua próxima viagem — consulte as opções disponíveis
            </div>

            <div className="flex flex-wrap gap-3">
              <Btn href="#contato" variant="primary">
                Planejar minha viagem
              </Btn>
              <Btn href="https://wa.me/5583993686142" variant="outline">
                <WhatsAppIcon />
                Falar no WhatsApp
              </Btn>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-10 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {[
                { n: "Todos os dias", l: "Atendimento online" },
                { n: "Sábados", l: "Atendimento presencial" },
                { n: "Cadastur", l: "Agência certificada" },
              ].map((s) => (
                <div key={s.l}>
                  <div style={{ color: GOLD, fontFamily: "Fraunces, Georgia, serif", fontSize: "1.3rem", fontWeight: 600 }}>
                    {s.n}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: mascot + float card */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-6 relative">
            <div className="relative">
              <Mascot size={120} />
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  right: -40,
                  background: GOLD,
                  color: NAVY,
                  borderRadius: 12,
                  padding: "8px 14px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                }}
              >
                Eu te ajudo a viajar<br />mais pagando menos!
              </div>
            </div>

            {/* Float cards */}
            <div className="flex gap-4 w-full max-w-sm">
              {[
                { icon: "🛫", title: "Nacional", sub: "Voos pelo Brasil" },
                { icon: "🌍", title: "Internacional", sub: "Destinos no mundo" },
              ].map((c) => (
                <div
                  key={c.title}
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 16,
                    padding: 20,
                    flex: 1,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ color: "white", fontWeight: 600, fontSize: "0.95rem" }}>{c.title}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative flex justify-center pb-8">
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span>Role para explorar</span>
          <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.2)" }} />
        </div>
      </div>
    </section>
  );
}

/* ─── About ─────────────────────────────────────────────── */
function About() {
  const values = [
    "Cuidado em cada atendimento",
    "Transparência nas orientações",
    "Agilidade para encontrar soluções",
    "Proximidade com cada cliente",
    "Compromisso com uma viagem tranquila",
  ];

  return (
    <section id="sobre" style={{ background: CREAM }} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div
              style={{ borderRadius: 24, overflow: "hidden", background: WARM_GRAY }}
              className="aspect-[4/3]"
            >
              <img
                src={IMG_ABOUT}
                alt="Casal no aeroporto pronto para viajar"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div
              style={{
                position: "absolute",
                bottom: -20,
                right: -20,
                background: GOLD,
                color: NAVY,
                borderRadius: 16,
                padding: "16px 20px",
                boxShadow: "0 8px 32px rgba(232,150,26,0.4)",
                maxWidth: 200,
              }}
            >
              <div style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1.6rem", fontWeight: 700, lineHeight: 1 }}>
                Cadastur
              </div>
              <div style={{ fontSize: "0.78rem", fontWeight: 600, marginTop: 4 }}>Agência certificada</div>
            </div>
            {/* Decorative circle */}
            <div
              style={{
                position: "absolute",
                top: -16,
                left: -16,
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: `2px solid ${GOLD}`,
                opacity: 0.3,
              }}
            />
          </div>

          {/* Text side */}
          <div>
            <SectionLabel>Sobre a Rodrigo.Tur</SectionLabel>
            <SectionHeading>
              Sua viagem começa{" "}
              <em style={{ color: GOLD, fontStyle: "italic" }}>com tranquilidade</em>
            </SectionHeading>

            <p style={{ color: MUTED, lineHeight: 1.8, marginTop: 20, marginBottom: 24 }}>
              A Rodrigo.Tur nasceu para tornar a experiência de viajar mais simples, segura e acessível. Mais do que emitir passagens, acompanhamos cada cliente com atendimento humano e personalizado, ajudando desde a escolha do voo até os detalhes da viagem.
            </p>
            <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: 32 }}>
              Nosso compromisso é fazer com que você viaje com confiança. A agência surgiu do desejo de tornar as viagens mais simples e acessíveis para cada cliente, conectando pessoas a novos destinos com cuidado e atendimento humano.
            </p>

            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontFamily: "Fraunces, Georgia, serif", color: NAVY, fontSize: "1.1rem", marginBottom: 12 }}>
                Nossos valores
              </h3>
              <ul className="flex flex-col gap-2">
                {values.map((v) => (
                  <li key={v} className="flex items-center gap-3" style={{ color: NAVY, fontSize: "0.9rem" }}>
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: GOLD_PALE,
                        color: GOLD,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <CheckIcon />
                    </span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline */}
            <div
              style={{
                background: WARM_GRAY,
                borderRadius: 16,
                padding: 20,
                display: "flex",
                gap: 0,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", bottom: -10, right: -8, opacity: 0.15, pointerEvents: "none" }}>
                <Mascot size={110} variant={2} />
              </div>
              {["Início", "Crescimento", "Atendimento personalizado", "Novos destinos"].map((step, i) => (
                <div key={step} style={{ flex: 1, position: "relative", paddingRight: 8 }}>
                  {i < 3 && (
                    <div
                      style={{
                        position: "absolute",
                        top: 9,
                        right: 0,
                        left: "50%",
                        height: 2,
                        background: i < 3 ? GOLD : BORDER,
                        opacity: 0.4,
                      }}
                    />
                  )}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: GOLD,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1,
                        position: "relative",
                      }}
                    >
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />
                    </div>
                    <span style={{ fontSize: "0.7rem", color: MUTED, textAlign: "center", lineHeight: 1.3 }}>{step}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission / Vision / Values row */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            {
              title: "Missão",
              text: "Tornar a experiência de viajar mais simples, segura e acessível, com atendimento humano e personalizado.",
              icon: "🎯",
            },
            {
              title: "Visão",
              text: "Ser a agência de referência em Queimadas/PB e região, reconhecida pela confiança e qualidade no atendimento.",
              icon: "🔭",
            },
            {
              title: "Valores",
              text: "Cuidado, transparência, agilidade, proximidade e compromisso com cada viagem e cada cliente.",
              icon: "💛",
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                background: "white",
                border: `1px solid ${BORDER}`,
                borderRadius: 16,
                padding: 28,
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>{card.icon}</div>
              <h3 style={{ fontFamily: "Fraunces, Georgia, serif", color: NAVY, fontSize: "1.2rem", fontWeight: 600, marginBottom: 8 }}>
                {card.title}
              </h3>
              <p style={{ color: MUTED, lineHeight: 1.7, fontSize: "0.9rem" }}>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Historia ──────────────────────────────────────────── */
function Historia() {
  return (
    <section
      id="historia"
      style={{ background: NAVY, position: "relative", overflow: "hidden" }}
      className="py-24"
    >
      <FlightPath />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <SectionLabel>Nossa História</SectionLabel>
            <SectionHeading light>
              {CONTENT.historiaSubtitulo.split("agência")[0]}
              <em style={{ color: GOLD, fontStyle: "italic" }}>agência</em>
              {CONTENT.historiaSubtitulo.split("agência")[1]}
            </SectionHeading>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginTop: 20, marginBottom: 16 }}>
              {CONTENT.historiaTexto}
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: 28 }}>
              {CONTENT.historiaTexto2}
            </p>

            {/* Editable notice */}
            <div
              style={{
                background: "rgba(249,115,22,0.12)",
                border: "1px dashed rgba(249,115,22,0.4)",
                borderRadius: 12,
                padding: "14px 18px",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "1.1rem", flexShrink: 0 }}></span>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem", lineHeight: 1.6, margin: 0 }}>
                História
              </p>
            </div>
          </div>

          {/* Mascot + quote */}
          <div className="flex flex-col items-center gap-6">
            <Mascot size={160} variant={1} />
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 18,
                padding: "24px 28px",
                maxWidth: 380,
                textAlign: "center",
              }}
            >
              <span style={{ color: GOLD, fontSize: "2.5rem", lineHeight: 1, display: "block", fontFamily: "Fraunces, Georgia, serif" }}>"</span>
              <p
                style={{
                  fontFamily: "Fraunces, Georgia, serif",
                  color: "white",
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                  marginTop: -8,
                }}
              >
                {CONTENT.historiaDestaqueQuote}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
            padding: "40px 36px",
          }}
        >
          <div
            style={{
              color: GOLD,
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 32,
              textAlign: "center",
            }}
          >
            Linha do tempo
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 relative">
            {/* Horizontal connector line */}
            <div
              className="hidden lg:block absolute"
              style={{
                top: 24,
                left: "12.5%",
                right: "12.5%",
                height: 2,
                background: `linear-gradient(to right, ${GOLD}, rgba(249,115,22,0.2), ${GOLD}, rgba(249,115,22,0.2))`,
                opacity: 0.4,
              }}
            />

            {CONTENT.historiaTimeline.map((item, i) => (
              <div
                key={item.ano}
                style={{
                  position: "relative",
                  padding: "0 20px 0",
                  borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
                className="flex flex-col items-center text-center"
              >
                {/* Node */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_LIGHT} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                    position: "relative",
                    zIndex: 1,
                    boxShadow: `0 0 0 6px rgba(249,115,22,0.12)`,
                  }}
                >
                  <span style={{ color: NAVY, fontWeight: 800, fontSize: "0.75rem" }}>{i + 1}</span>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    padding: "20px 16px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      color: GOLD,
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: 8,
                    }}
                  >
                    {item.ano}
                  </div>
                  <h4
                    style={{
                      fontFamily: "Fraunces, Georgia, serif",
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    {item.titulo}
                  </h4>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.83rem", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom mascot + CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16">
          <div className="hidden sm:block">
            <Mascot size={80} variant={2} flip />
          </div>
          <div className="text-center">
            <p
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                color: "white",
                fontSize: "1.2rem",
                marginBottom: 20,
              }}
            >
              Faça parte dessa história. Viaje com a Rodrigo.Tur.
            </p>
            <Btn href={CONTENT.whatsapp} variant="primary">
              <WhatsAppIcon />
              {CONTENT.contatoBotao1}
            </Btn>
          </div>
          <div className="hidden sm:block">
            <Mascot size={80} variant={1} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Services ──────────────────────────────────────────── */
function Services() {
  const services = [
    {
      icon: <PlaneIcon size={24} color={GOLD} />,
      title: "Passagens nacionais",
      desc: "Encontre opções para viajar pelo Brasil com praticidade e orientação personalizada.",
    },
    {
      icon: <GlobeIcon />,
      title: "Passagens internacionais",
      desc: "Planeje sua viagem para outros países com suporte em cada etapa.",
    },
    {
      icon: <LuggageIcon />,
      title: "Despacho de bagagem",
      desc: "Conte com ajuda para organizar os detalhes da sua bagagem com segurança.",
    },
    {
      icon: <SeatIcon />,
      title: "Escolha de assentos",
      desc: "Tenha mais conforto e praticidade na hora de escolher seu lugar no avião.",
    },
    {
      icon: <CheckinIcon />,
      title: "Check-in e alterações",
      desc: "Receba suporte para realizar check-in e lidar com ajustes na sua viagem.",
    },
    {
      icon: <HeadsetIcon />,
      title: "Suporte completo",
      desc: "Atendimento antes, durante e depois da sua viagem — estamos com você.",
    },
  ];

  const offers = [
    { title: "Atendimento personalizado", desc: "Para a sua próxima viagem", img: IMG_PLANE },
    { title: "Voos nacionais", desc: "Consulte as opções disponíveis", img: IMG_AIRPORT },
    { title: "Voos internacionais", desc: "Novos destinos para descobrir", img: IMG_ISLAND },
    { title: "Suporte completo", desc: "Organize sua viagem conosco", img: IMG_TERMINAL },
  ];

  return (
    <section id="servicos" style={{ background: WARM_GRAY }} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Serviços</SectionLabel>
          <SectionHeading>
            Tudo o que você precisa{" "}
            <em style={{ color: GOLD, fontStyle: "italic" }}>para viajar bem</em>
          </SectionHeading>
        </div>

        {/* Service cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((s) => (
            <div
              key={s.title}
              style={{
                background: "white",
                border: `1px solid ${BORDER}`,
                borderRadius: 20,
                padding: 28,
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              className="hover:shadow-lg hover:-translate-y-0.5"
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: GOLD_PALE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  color: GOLD,
                }}
              >
                {s.icon}
              </div>
              <h3 style={{ fontFamily: "Fraunces, Georgia, serif", color: NAVY, fontSize: "1.1rem", fontWeight: 600, marginBottom: 8 }}>
                {s.title}
              </h3>
              <p style={{ color: MUTED, lineHeight: 1.7, fontSize: "0.9rem" }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Offers */}
        <div className="text-center mb-10">
          <SectionLabel>Oportunidades</SectionLabel>
          <h3 style={{ fontFamily: "Fraunces, Georgia, serif", color: NAVY, fontSize: "1.8rem", fontWeight: 600 }}>
            Consulte as opções disponíveis
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((o) => (
            <div
              key={o.title}
              style={{ borderRadius: 20, overflow: "hidden", background: "white", border: `1px solid ${BORDER}` }}
              className="hover:shadow-lg transition-shadow"
            >
              <div style={{ height: 160, background: WARM_GRAY, overflow: "hidden" }}>
                <img src={o.img} alt={o.title} className="w-full h-full object-cover" />
              </div>
              <div style={{ padding: "20px 20px 16px" }}>
                <h4 style={{ fontFamily: "Fraunces, Georgia, serif", color: NAVY, fontSize: "1rem", fontWeight: 600, marginBottom: 4 }}>
                  {o.title}
                </h4>
                <p style={{ color: MUTED, fontSize: "0.82rem", marginBottom: 14 }}>{o.desc}</p>
                <div style={{ paddingTop: 8, borderTop: `1px solid ${BORDER}` }}>
                  <a
                    href="https://wa.me/5583993686142"
                    style={{ color: GOLD, fontSize: "0.82rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Quero saber mais →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How it works ──────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: <WhatsAppIcon />,
      title: "Fale com a Rodrigo.Tur",
      desc: "Entre em contato pelo WhatsApp, Instagram, site ou atendimento presencial.",
    },
    {
      n: "02",
      icon: <PhoneIcon />,
      title: "Conte o que você precisa",
      desc: "Informe seu destino, período da viagem e preferências.",
    },
    {
      n: "03",
      icon: <HeadsetIcon />,
      title: "Receba orientação personalizada",
      desc: "Nossa equipe ajuda você a encontrar opções adequadas para sua viagem.",
    },
    {
      n: "04",
      icon: <LuggageIcon />,
      title: "Organize os detalhes",
      desc: "Conte com suporte para bagagem, assentos, check-in e alterações.",
    },
    {
      n: "05",
      icon: <PlaneIcon size={20} />,
      title: "Viaje com confiança",
      desc: "Tenha acompanhamento e orientação antes, durante e depois da viagem.",
    },
  ];

  return (
    <section
      id="como-funciona"
      style={{ background: NAVY, position: "relative", overflow: "hidden" }}
      className="py-24"
    >
      <FlightPath />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          <div className="hidden md:block">
            <Mascot size={100} variant={1} flip />
          </div>
          <div className="text-center">
            <SectionLabel>Como funciona</SectionLabel>
            <SectionHeading light>
              Do primeiro contato{" "}
              <em style={{ color: GOLD, fontStyle: "italic" }}>ao voo</em>
            </SectionHeading>
            <p style={{ color: "rgba(255,255,255,0.6)", marginTop: 16, maxWidth: 480, margin: "16px auto 0" }}>
              Um processo simples, claro e com acompanhamento em cada etapa.
            </p>
          </div>
          <div className="hidden md:block">
            <Mascot size={100} variant={2} />
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <div key={s.n} className="relative text-center flex flex-col items-center">
              {/* Connector */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute"
                  style={{
                    top: 28,
                    left: "60%",
                    width: "80%",
                    height: 1,
                    background: `linear-gradient(to right, ${GOLD}, rgba(232,150,26,0.1))`,
                    zIndex: 0,
                  }}
                />
              )}

              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: `rgba(232,150,26,0.15)`,
                  border: `2px solid ${GOLD}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: GOLD,
                  marginBottom: 16,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {s.icon}
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 16,
                  padding: "20px 16px",
                  width: "100%",
                }}
              >
                <div style={{ color: GOLD, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>
                  {s.n}
                </div>
                <h4 style={{ fontFamily: "Fraunces, Georgia, serif", color: "white", fontSize: "0.95rem", fontWeight: 600, marginBottom: 8 }}>
                  {s.title}
                </h4>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Destinations ──────────────────────────────────────── */
function Destinations() {
  const destinations = [
    { cat: "Viagens nacionais", img: IMG_BEACH, tag: "Brasil" },
    { cat: "Viagens internacionais", img: IMG_ISLAND, tag: "Mundo" },
    { cat: "Viagens em família", img: IMG_TERMINAL, tag: "Família" },
    { cat: "Viagens a trabalho", img: IMG_AIRPORT, tag: "Negócios" },
    { cat: "Novos destinos para descobrir", img: IMG_TROPICAL, tag: "Novos" },
    { cat: "Viagens de férias", img: IMG_LUGGAGE, tag: "Férias" },
  ];

  return (
    <section id="destinos" style={{ background: CREAM }} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="lg:flex lg:items-end lg:justify-between mb-16 gap-8">
          <div>
            <SectionLabel>Destinos</SectionLabel>
            <SectionHeading>
              Seu próximo destino começa{" "}
              <em style={{ color: GOLD, fontStyle: "italic" }}>com uma boa escolha</em>
            </SectionHeading>
          </div>
          <p style={{ color: MUTED, maxWidth: 360, lineHeight: 1.7, marginTop: 12 }}>
            Seja para conhecer um novo lugar, visitar alguém especial ou realizar um sonho antigo, a Rodrigo.Tur ajuda você a encontrar caminhos mais simples para viajar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d) => (
            <div
              key={d.cat}
              style={{ borderRadius: 20, overflow: "hidden", position: "relative", cursor: "pointer" }}
              className="group aspect-[4/3]"
            >
              <img
                src={d.img}
                alt={d.cat}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(to top, rgba(13,27,62,0.85) 0%, rgba(13,27,62,0.2) 60%, transparent 100%)`,
                }}
              />
              <div style={{ position: "absolute", top: 16, left: 16 }}>
                <span
                  style={{
                    background: GOLD,
                    color: NAVY,
                    borderRadius: 999,
                    padding: "4px 12px",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                  }}
                >
                  {d.tag}
                </span>
              </div>
              <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                <h4
                  style={{
                    fontFamily: "Fraunces, Georgia, serif",
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  {d.cat}
                </h4>
                <a
                  href="https://wa.me/5583993686142"
                  style={{
                    color: GOLD,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    opacity: 0,
                    display: "inline-block",
                    transition: "opacity 0.2s",
                  }}
                  className="group-hover:opacity-100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar opções →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Differentials ─────────────────────────────────────── */
function Differentials() {
  const items = [
    { icon: "👤", title: "Atendimento humano e personalizado", desc: "Cada cliente recebe atenção individual e orientação dedicada." },
    { icon: "🕐", title: "Atendimento online todos os dias", desc: "Disponíveis para você em qualquer dia da semana." },
    { icon: "✈️", title: "Suporte antes, durante e depois", desc: "Acompanhamento completo em toda a sua jornada de viagem." },
    { icon: "📍", title: "Presencial aos sábados em Queimadas/PB", desc: "Atendimento presencial para quem prefere um contato mais próximo." },
    { icon: "🏆", title: "Agência certificada pelo Cadastur", desc: "Credenciamento que garante segurança e confiança para você." },
    { icon: "🧭", title: "Orientação para escolher voos", desc: "Ajudamos você a encontrar as melhores opções para cada destino." },
    { icon: "💬", title: "Comunicação próxima e acessível", desc: "Falamos a sua língua e estamos sempre disponíveis no WhatsApp." },
  ];

  return (
    <section id="diferenciais" style={{ background: WARM_GRAY }} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-4">
          <SectionLabel>Diferenciais</SectionLabel>
          <SectionHeading>
            Viajar pode ser mais simples{" "}
            <em style={{ color: GOLD, fontStyle: "italic" }}>quando você tem apoio</em>
          </SectionHeading>
        </div>

        {/* Quote */}
        <div
          style={{
            background: `linear-gradient(135deg, ${NAVY} 0%, #1E3561 100%)`,
            borderRadius: 20,
            padding: "32px 40px",
            marginTop: 32,
            marginBottom: 48,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
        >
          <FlightPath />
          <p
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              color: "white",
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              lineHeight: 1.5,
              fontStyle: "italic",
              maxWidth: 680,
              position: "relative",
              flex: 1,
            }}
          >
            "Você não precisa planejar tudo sozinho. A Rodrigo.Tur acompanha cada etapa para que sua viagem seja mais tranquila."
          </p>
          <div style={{ flexShrink: 0, position: "relative", zIndex: 1 }} className="hidden md:block">
            <Mascot size={130} variant={2} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((d, i) => (
            <div
              key={d.title}
              style={{
                background: "white",
                border: `1px solid ${BORDER}`,
                borderRadius: 18,
                padding: 24,
                ...(i === 4
                  ? {
                      background: GOLD,
                      border: "none",
                    }
                  : {}),
              }}
              className="hover:shadow-md transition-shadow"
            >
              <div style={{ fontSize: "1.8rem", marginBottom: 12 }}>{d.icon}</div>
              <h4
                style={{
                  fontFamily: "Fraunces, Georgia, serif",
                  color: i === 4 ? NAVY : NAVY,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                {d.title}
              </h4>
              <p style={{ color: i === 4 ? "rgba(13,27,62,0.75)" : MUTED, fontSize: "0.83rem", lineHeight: 1.6 }}>
                {d.desc}
              </p>
            </div>
          ))}

          {/* CTA card */}
          <div
            style={{
              background: NAVY,
              borderRadius: 18,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 16,
              color: "white",
            }}
          >
            <div>
              <div style={{ fontSize: "1.8rem", marginBottom: 12 }}>🌟</div>
              <p style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "0.95rem", lineHeight: 1.5 }}>
                Pronto para sua próxima viagem?
              </p>
            </div>
            <Btn href="https://wa.me/5583993686142" variant="primary" small>
              <WhatsAppIcon />
              Fale conosco
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Offers strip ──────────────────────────────────────── */
function Offers() {
  const offers = [
    { title: "Passagens nacionais sob consulta", desc: "Consulte disponibilidade e condições para voos nacionais.", img: IMG_BEACH },
    { title: "Passagens internacionais sob consulta", desc: "Seu destino no exterior começa com uma boa orientação.", img: IMG_ISLAND },
    { title: "Atendimento personalizado", desc: "Para o seu destino, no período que você precisar.", img: IMG_ABOUT },
    { title: "Organize sua viagem", desc: "Suporte completo para todos os detalhes da sua viagem.", img: IMG_LUGGAGE },
    { title: "Consulte as opções do seu período", desc: "Planeje com antecedência e encontre as melhores opções.", img: IMG_AIRPORT },
    { title: "Planeje com a Rodrigo.Tur", desc: "Da consulta ao embarque, estamos com você.", img: IMG_TROPICAL },
  ];

  return (
    <section style={{ background: CREAM }} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel>Oportunidades</SectionLabel>
          <SectionHeading>
            Encontre novas possibilidades{" "}
            <em style={{ color: GOLD, fontStyle: "italic" }}>para viajar</em>
          </SectionHeading>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {offers.map((o) => (
            <div
              key={o.title}
              style={{ borderRadius: 20, overflow: "hidden", background: "white", border: `1px solid ${BORDER}` }}
              className="hover:shadow-lg transition-shadow"
            >
              <div style={{ height: 180, background: WARM_GRAY, overflow: "hidden" }}>
                <img src={o.img} alt={o.title} className="w-full h-full object-cover" />
              </div>
              <div style={{ padding: "20px 24px 24px" }}>
                <h4
                  style={{
                    fontFamily: "Fraunces, Georgia, serif",
                    color: NAVY,
                    fontSize: "1rem",
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  {o.title}
                </h4>
                <p style={{ color: MUTED, fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 16 }}>{o.desc}</p>
                <div style={{ fontSize: "0.72rem", color: MUTED, fontStyle: "italic", marginBottom: 16 }}>
                  Condições, datas e destinos podem ser atualizados pela equipe Rodrigo.Tur
                </div>
                <Btn href="https://wa.me/5583993686142" variant="outline" small>
                  Quero saber mais
                </Btn>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight strip */}
        <div
          style={{
            background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
            borderRadius: 20,
            padding: "32px 40px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div style={{ flex: 1, minWidth: 240 }}>
            <p
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                color: NAVY,
                fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                fontWeight: 600,
                maxWidth: 480,
              }}
            >
              Fale com a nossa equipe e descubra as melhores possibilidades para a sua viagem.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div className="hidden sm:block" style={{ marginBottom: -32 }}>
              <Mascot size={100} variant={1} />
            </div>
            <Btn href="https://wa.me/5583993686142" variant="secondary">
              <WhatsAppIcon />
              Falar no WhatsApp
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ───────────────────────────────────────────── */
function Contact() {
  const channels = [
    { icon: <WhatsAppIcon />, label: "WhatsApp", val: CONTENT.whatsappDisplay, href: CONTENT.whatsapp, cta: CONTENT.contatoBotao1 },
    { icon: <GlobeIcon />, label: "Site", val: CONTENT.siteDisplay, href: CONTENT.site, cta: CONTENT.contatoBotao2 },
    { icon: <InstagramIcon />, label: "Instagram", val: CONTENT.instagramDisplay, href: CONTENT.instagram, cta: CONTENT.contatoBotao3 },
  ];

  return (
    <section id="contato" style={{ background: NAVY, position: "relative", overflow: "hidden" }} className="py-24">
      <FlightPath />
      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading + mascot */}
        <div className="flex flex-col items-center gap-4 mb-16 text-center">
          <SectionLabel>Contato</SectionLabel>
          <SectionHeading light>
            {CONTENT.contatoTitulo.split("próxima viagem?")[0]}
            <em style={{ color: GOLD, fontStyle: "italic" }}>próxima viagem?</em>
          </SectionHeading>
          <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 480, lineHeight: 1.7, marginTop: 4 }}>
            Entre em contato por qualquer um dos nossos canais e comece a planejar sua viagem agora mesmo.
          </p>
          <div className="mt-2">
            <Mascot size={100} variant={2} />
          </div>
        </div>

        {/* Channel cards — big, tappable */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 20,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                textDecoration: "none",
                transition: "background 0.2s, transform 0.15s",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <span style={{ color: GOLD, display: "flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: "50%", background: "rgba(249,115,22,0.15)", border: `1px solid rgba(249,115,22,0.3)` }}>
                {c.icon}
              </span>
              <div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
                  {c.label}
                </div>
                <div style={{ color: "white", fontSize: "1rem", fontWeight: 600 }}>{c.val}</div>
              </div>
              <div style={{ marginTop: 8, background: ORANGE, color: NAVY, borderRadius: 10, padding: "8px 18px", fontSize: "0.82rem", fontWeight: 700 }}>
                {c.cta}
              </div>
            </a>
          ))}
        </div>

        {/* Info strip — address + hours */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 16,
              padding: 28,
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            <span style={{ color: GOLD, flexShrink: 0, marginTop: 2 }}><MapPinIcon /></span>
            <div>
              <div style={{ color: "white", fontWeight: 600, marginBottom: 6 }}>Endereço</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                {CONTENT.endereco}
              </div>
              <a
                href={CONTENT.enderecoMaps}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: GOLD, fontSize: "0.82rem", fontWeight: 600, display: "inline-block", marginTop: 10 }}
              >
                Como chegar →
              </a>
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 16,
              padding: 28,
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            <span style={{ color: GOLD, flexShrink: 0, marginTop: 2 }}><ClockIcon /></span>
            <div style={{ width: "100%" }}>
              <div style={{ color: "white", fontWeight: 600, marginBottom: 12 }}>Horários de atendimento</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem" }}>Online</span>
                <span style={{ color: GOLD, fontWeight: 700, fontSize: "0.88rem" }}>{CONTENT.atendimentoOnline}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem" }}>Presencial</span>
                <span style={{ color: GOLD, fontWeight: 700, fontSize: "0.88rem" }}>{CONTENT.atendimentoPresencial}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#071226", borderTop: `1px solid rgba(255,255,255,0.06)` }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Logo size={40} />
              <div>
                <div style={{ fontFamily: "Fraunces, Georgia, serif", color: "white", fontSize: "1.2rem", fontWeight: 600 }}>
                  RODRIGO<span style={{ color: ORANGE }}>TUR</span>
                </div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>Agência de Viagens</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: 16 }}>
              "Eu te ajudo a viajar mais pagando menos."
            </p>
            <div>
              <Mascot size={52} />
            </div>
          </div>

          {/* Nav links */}
          <div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
              Navegação
            </div>
            <ul className="flex flex-col gap-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem" }} className="hover:text-white transition-colors">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
              Serviços
            </div>
            <ul className="flex flex-col gap-2">
              {["Passagens nacionais", "Passagens internacionais", "Despacho de bagagem", "Escolha de assentos", "Check-in e alterações", "Suporte completo"].map((s) => (
                <li key={s}>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem" }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
              Contato
            </div>
            <div className="flex flex-col gap-3">
              {[
                { icon: <WhatsAppIcon />, text: "(83) 99368-6142", href: "https://wa.me/5583993686142" },
                { icon: <GlobeIcon />, text: "rodrigotur.com.br", href: "https://rodrigotur.com.br" },
                { icon: <InstagramIcon />, text: "@rodrigotur.pb", href: "https://instagram.com/rodrigotur.pb" },
                { icon: <MapPinIcon />, text: "Queimadas/PB", href: "#" },
              ].map((c) => (
                <a
                  key={c.text}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: 8 }}
                  className="hover:text-white transition-colors"
                >
                  <span style={{ color: GOLD, flexShrink: 0 }}>{c.icon}</span>
                  {c.text}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 24,
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem" }}>
            {CONTENT.copyright}
          </div>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}>
            {CONTENT.avisoEdicao}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Root ──────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>
      <Nav scrolled={scrolled} />
      <Hero />
      <About />
      <Historia />
      <Services />
      <HowItWorks />
      <Destinations />
      <Differentials />
      <Offers />
      <Contact />
      <Footer />
    </div>
  );
}
