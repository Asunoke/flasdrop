"use client";

import React, { useEffect, useState, useRef } from "react";

interface CountdownTimerProps {
  initialDuration?: number; // milliseconds, default 24h
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialDuration = 24 * 60 * 60 * 1000,
}) => {
  const endTimeRef = useRef<number>(Date.now() + initialDuration);
  const [timeLeft, setTimeLeft] = useState<number>(initialDuration);
  const [tick, setTick] = useState<number>(0);

  useEffect(() => {
    endTimeRef.current = Date.now() + initialDuration;
    setTimeLeft(initialDuration);

    const intervalId = setInterval(() => {
      const now = Date.now();
      let diff = endTimeRef.current - now;

      if (diff <= 0) {
        endTimeRef.current = now + initialDuration;
        diff = initialDuration;
      }
      setTimeLeft(diff);
      setTick((t) => t + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [initialDuration]);

  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));

  const format = (num: number) => num.toString().padStart(2, "0");

  const containerStyle: React.CSSProperties = {
    display: "inline-flex",
    gap: "8px",
    paddingTop: "10px",
    paddingRight: "16px",
    paddingBottom: "10px",
    paddingLeft: "16px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    borderRadius: "12px",
    fontFamily:
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif, system-ui, -apple-system",
    color: "white",
    fontWeight: "700",
    fontSize: "2rem", // default size smaller than before
    userSelect: "none",
    boxShadow: "0 8px 24px rgb(102 126 234 / 0.4)",
    justifyContent: "center",
    minWidth: "280px", // smaller min width to fit small screens nicely
    flexWrap: "nowrap", // prevent wrapping always
  };

  const segmentStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "8px",
    paddingTop: "8px",
    paddingRight: "14px",
    paddingBottom: "8px",
    paddingLeft: "14px",
    minWidth: "60px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "inset 0 0 10px rgb(255 255 255 / 0.2)",
    position: "relative",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.8rem",
    fontWeight: "500",
    opacity: 0.75,
    marginTop: "4px",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  };

  return (
    <>
      <style>
        {`
        @keyframes pulse {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.75;
            transform: scale(0.96);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Responsive: reduce font size and spacing on smaller screens */
        @media (max-width: 480px) {
          .container {
            font-size: 1.5rem !important;
            padding-top: 6px !important;
            padding-right: 10px !important;
            padding-bottom: 6px !important;
            padding-left: 10px !important;
            min-width: 240px !important;
            gap: 6px !important;
          }
          .segment {
            min-width: 50px !important;
            padding-top: 6px !important;
            padding-right: 10px !important;
            padding-bottom: 6px !important;
            padding-left: 10px !important;
          }
          .label {
            font-size: 0.65rem !important;
            margin-top: 3px !important;
          }
          .colon {
            padding-left: 4px !important;
            padding-right: 4px !important;
          }
        }
      `}
      </style>
      <div
        style={containerStyle}
        role="timer"
        aria-live="polite"
        aria-label="Countdown timer"
        className="container"
      >
        <div style={segmentStyle} className="segment">
          <span
            style={{
              animation: tick % 2 === 0 ? "pulse 1s infinite" : undefined,
            }}
            aria-label="hours"
          >
            {format(hours)}
          </span>
          <span style={labelStyle} className="label">
            Heures
          </span>
        </div>
        <div
          style={{
            ...segmentStyle,
            paddingLeft: "8px",
            paddingRight: "8px",
            minWidth: "auto",
            background: "transparent",
            boxShadow: "none",
            userSelect: "none",
            fontWeight: "700",
          }}
          className="colon"
          aria-hidden="true"
        >
          :
        </div>
        <div style={segmentStyle} className="segment">
          <span
            style={{
              animation: tick % 2 !== 0 ? "pulse 1s infinite" : undefined,
            }}
            aria-label="minutes"
          >
            {format(minutes)}
          </span>
          <span style={labelStyle} className="label">
            Minutes
          </span>
        </div>
        <div
          style={{
            ...segmentStyle,
            paddingLeft: "8px",
            paddingRight: "8px",
            minWidth: "auto",
            background: "transparent",
            boxShadow: "none",
            userSelect: "none",
            fontWeight: "700",
          }}
          className="colon"
          aria-hidden="true"
        >
          :
        </div>
        <div style={segmentStyle} className="segment">
          <span style={{ animation: "pulse 1s infinite" }} aria-label="seconds">
            {format(seconds)}
          </span>
          <span style={labelStyle} className="label">
            Secondes
          </span>
        </div>
      </div>
    </>
  );
};

export default CountdownTimer;
