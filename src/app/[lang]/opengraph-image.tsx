import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "YOPHI Studio";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#e8e6e1",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#0d1f33",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <svg width="92" height="118" viewBox="0 0 72 92" fill="none">
            <path d="M10 12 L40 20 L40 74 L10 82 Z" fill="#0d1f33" />
            <path
              d="M40 18 L64 14 L64 80 L40 76 Z"
              stroke="#0d1f33"
              strokeWidth="2.4"
              strokeLinejoin="miter"
            />
          </svg>
          <div
            style={{
              marginTop: 28,
              fontSize: 72,
              letterSpacing: "0.18em",
              lineHeight: 1,
              fontFamily: "Georgia, serif",
              textTransform: "uppercase",
            }}
          >
            YOPHI
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 18,
              letterSpacing: "0.46em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            STUDIO
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
