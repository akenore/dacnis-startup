import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared 1200x630 social card: dark brand background, light logo, kicker and page title. */
export async function renderOg({ title, kicker, place }: { title: string; kicker: string; place: string }) {
  const logo = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/images/logo-light.png"))).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          backgroundColor: "#03030d",
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(6,182,212,0.32) 0%, rgba(6,182,212,0) 42%), radial-gradient(circle at 4% 104%, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0) 40%)",
          color: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img elements */}
        <img src={logo} width={192} height={120} alt="Dacnis" />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
          <div style={{ fontSize: 28, color: "#67e8f9", marginBottom: 22 }}>{kicker}</div>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 }}>{title}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(255,255,255,0.7)" }}>
          <span>dacnis.com</span>
          <span>{place}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
