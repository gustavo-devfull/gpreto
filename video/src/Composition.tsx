import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

const sans = "Helvetica Neue, Arial, sans-serif";
const serif = "Georgia, Times New Roman, serif";

const INK = "#151513";
const PAPER = "#f3f2ee";
const MUTED = "#55534c";
const GREEN = "#2fb36b";

const FADE = 15;
const SCENES = [150, 180, 270, 150, 150];
export const TOTAL_FRAMES =
  SCENES.reduce((a, b) => a + b, 0) - FADE * (SCENES.length - 1);

const useIn = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return {
    opacity: p,
    transform: `translateY(${interpolate(p, [0, 1], [50, 0])}px)`,
  };
};

const Eyebrow: React.FC<{ children: string; dark?: boolean }> = ({
  children,
  dark,
}) => (
  <div
    style={{
      fontFamily: serif,
      fontStyle: "italic",
      fontSize: 48,
      color: dark ? "#b9b7ae" : MUTED,
      ...useIn(0),
    }}
  >
    {children}
  </div>
);

const Hero: React.FC = () => (
  <AbsoluteFill
    style={{
      background: PAPER,
      fontFamily: sans,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      gap: 36,
      padding: "0 160px",
    }}
  >
    <Img src={staticFile("img/logo-gpreto.png")} style={{ height: 90, ...useIn(0) }} />
    <div
      style={{
        fontSize: 40,
        padding: "12px 30px",
        borderRadius: 999,
        background: "#fff",
        color: MUTED,
        ...useIn(8),
      }}
    >
      Agenda aberta — novos projetos
    </div>
    <div
      style={{
        fontSize: 124,
        fontWeight: 500,
        letterSpacing: "-0.045em",
        lineHeight: 1,
        color: INK,
        ...useIn(14),
      }}
    >
      Design e soluções digitais
    </div>
    <div
      style={{
        fontFamily: serif,
        fontStyle: "italic",
        fontSize: 124,
        lineHeight: 1,
        color: INK,
        ...useIn(24),
      }}
    >
      que fazem sua marca crescer
    </div>
  </AbsoluteFill>
);

const SERVICES = [
  { t: "Landing Pages", b: "Conversão e SEO, design responsivo" },
  { t: "Site Institucional", b: "Credibilidade e presença online" },
  { t: "E-commerce", b: "Pagamentos seguros, feito para vender" },
];

const Services: React.FC = () => (
  <AbsoluteFill
    style={{
      background: PAPER,
      fontFamily: sans,
      padding: "100px 120px",
      gap: 60,
    }}
  >
    <div>
      <Eyebrow>Serviços</Eyebrow>
      <div
        style={{
          fontSize: 108,
          fontWeight: 500,
          letterSpacing: "-0.04em",
          color: INK,
          ...useIn(6),
        }}
      >
        Nossos serviços
      </div>
    </div>
    <div style={{ display: "flex", gap: 40, flex: 1 }}>
      {SERVICES.map((s, i) => (
        <div
          key={s.t}
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 40,
            padding: 56,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
            ...useIn(20 + i * 12),
          }}
        >
          <div style={{ fontSize: 30, color: GREEN, fontWeight: 600 }}>✓</div>
          <div style={{ fontSize: 56, fontWeight: 500, letterSpacing: "-0.03em", color: INK }}>
            {s.t}
          </div>
          <div style={{ fontSize: 40, color: MUTED, lineHeight: 1.3 }}>{s.b}</div>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);

const PROJECTS = [
  ["andreza.webp", "Dra. Andreza Gilio", "Site Onepage"],
  ["asksuite.webp", "Asksuite", "Portal Institucional"],
  ["mori1.webp", "Mori", "Site Institucional"],
  ["hands.webp", "takeoff by hands", "Landing Page"],
  ["eusp.webp", "Escola de Enfermagem USP", "Portal Institucional"],
  ["rocket.webp", "Rocket Science", "Site Institucional"],
];

const Projects: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ background: PAPER, fontFamily: sans, padding: "90px 120px", gap: 40 }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 40 }}>
        <div
          style={{
            fontSize: 108,
            fontWeight: 500,
            letterSpacing: "-0.04em",
            color: INK,
            ...useIn(0),
          }}
        >
          Trabalhos recentes
        </div>
        <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 56, color: MUTED, ...useIn(6) }}>
          Portfólio
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 32,
          flex: 1,
        }}
      >
        {PROJECTS.map(([img, name, cat], i) => {
          const p = spring({ frame: frame - (10 + i * 14), fps, config: { damping: 200 } });
          return (
            <div
              key={img}
              style={{
                background: "#fff",
                borderRadius: 28,
                padding: 12,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                opacity: p,
                transform: `scale(${interpolate(p, [0, 1], [0.92, 1])})`,
                overflow: "hidden",
              }}
            >
              <Img
                src={staticFile(`img/${img}`)}
                style={{ width: "100%", flex: 1, minHeight: 0, objectFit: "cover", borderRadius: 18 }}
              />
              <div style={{ padding: "0 12px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 36, fontWeight: 500, color: INK }}>{name}</div>
                <div style={{ fontSize: 28, color: MUTED, whiteSpace: "nowrap" }}>{cat}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const About: React.FC = () => (
  <AbsoluteFill
    style={{
      background: PAPER,
      fontFamily: sans,
      flexDirection: "row",
      alignItems: "center",
      padding: "0 140px",
      gap: 100,
    }}
  >
    <Img
      src={staticFile("img/guto.jpg")}
      style={{ width: 520, height: 640, objectFit: "cover", borderRadius: 40, ...useIn(0) }}
    />
    <div style={{ display: "flex", flexDirection: "column", gap: 28, flex: 1 }}>
      <Eyebrow>Sobre a GPRETO</Eyebrow>
      <div style={{ fontSize: 96, fontWeight: 500, letterSpacing: "-0.04em", color: INK, ...useIn(8) }}>
        Gustavo Santos
      </div>
      <div style={{ fontSize: 44, color: MUTED, lineHeight: 1.3, ...useIn(16) }}>
        Desenvolvedor Web, Designer e Fotógrafo
      </div>
      <div style={{ display: "flex", gap: 24, marginTop: 20, ...useIn(26) }}>
        {["20+ anos", "Qualidade e rapidez"].map((t) => (
          <div
            key={t}
            style={{
              background: "#fff",
              borderRadius: 28,
              padding: "28px 40px",
              fontSize: 48,
              fontWeight: 500,
              color: INK,
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);

const Contact: React.FC = () => (
  <AbsoluteFill
    style={{
      background: INK,
      fontFamily: sans,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      gap: 36,
      padding: "0 160px",
    }}
  >
    <Eyebrow dark>Agenda aberta</Eyebrow>
    <div style={{ fontSize: 220, fontWeight: 500, letterSpacing: "-0.05em", lineHeight: 0.95, color: "#fff", ...useIn(6) }}>
      Vamos <span style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400 }}>conversar</span>
    </div>
    <div style={{ fontSize: 48, color: "#b9b7ae", ...useIn(16) }}>
      Receba um orçamento sem compromisso
    </div>
    <div
      style={{
        fontSize: 48,
        fontWeight: 500,
        background: "#fff",
        color: INK,
        borderRadius: 999,
        padding: "26px 56px",
        ...useIn(26),
      }}
    >
      WhatsApp +55 16 99752-0110
    </div>
  </AbsoluteFill>
);

export const GpretoPromo: React.FC = () => {
  const scenes = [Hero, Services, Projects, About, Contact];
  return (
    <TransitionSeries>
      {scenes.flatMap((Scene, i) => {
        const items = [
          <TransitionSeries.Sequence key={`s${i}`} durationInFrames={SCENES[i]}>
            <Scene />
          </TransitionSeries.Sequence>,
        ];
        if (i < scenes.length - 1) {
          items.push(
            <TransitionSeries.Transition
              key={`t${i}`}
              presentation={fade()}
              timing={linearTiming({ durationInFrames: FADE })}
            />,
          );
        }
        return items;
      })}
    </TransitionSeries>
  );
};
