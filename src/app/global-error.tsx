"use client";

import React, { useEffect } from "react";

// global-error.tsx catches errors thrown in the root layout.tsx itself.
// It MUST include its own <html> and <body> tags because it replaces the root layout.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: "monospace",
          padding: "1rem",
        }}
      >
        <div
          style={{
            maxWidth: "420px",
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {/* Badge */}
          <div
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "#ef4444",
              border: "1px solid rgba(239,68,68,0.2)",
              padding: "4px 12px",
              backgroundColor: "rgba(239,68,68,0.05)",
              userSelect: "none",
            }}
          >
            Critical Error
          </div>

          {/* Heading */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h1
              style={{
                fontSize: "1.875rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              Something Went Wrong
            </h1>
            <p
              style={{
                fontSize: "12px",
                color: "#a3a3a3",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              A critical error occurred while loading Feedy. We&apos;ve logged
              this and are looking into it.
            </p>
            {error?.digest && (
              <p style={{ fontSize: "10px", color: "#525252", margin: 0 }}>
                Error ID: {error.digest}
              </p>
            )}
          </div>

          {/* Actions */}
          <div
            style={{
              width: "100%",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <button
              onClick={() => reset()}
              style={{
                width: "100%",
                backgroundColor: "#fff",
                color: "#000",
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "12px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
            <a
              href="/"
              style={{
                width: "100%",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "12px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                boxSizing: "border-box",
              }}
            >
              Back to Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
