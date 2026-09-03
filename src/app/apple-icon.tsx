import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#e8e6e1",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="108"
          height="138"
          viewBox="0 0 72 92"
          fill="none"
        >
          <path d="M10 12 L40 20 L40 74 L10 82 Z" fill="#0d1f33" />
          <path
            d="M40 18 L64 14 L64 80 L40 76 Z"
            stroke="#0d1f33"
            strokeWidth="3.2"
            strokeLinejoin="miter"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
