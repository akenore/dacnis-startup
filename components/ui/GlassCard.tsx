import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "purple" | "cyan" | "emerald" | "none";
  hoverable?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  glowColor = "none",
  hoverable = true,
}: GlassCardProps) {
  const glowStyles = {
    purple: "hover:glow-purple hover:border-purple-500/30",
    cyan: "hover:glow-cyan hover:border-cyan-500/30",
    emerald: "hover:glow-emerald hover:border-emerald-500/30",
    none: "",
  };

  return (
    <div
      className={`glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 ${
        hoverable ? "glass-panel-hover" : ""
      } ${glowColor !== "none" ? glowStyles[glowColor] : ""} ${className}`}
    >
      {children}
    </div>
  );
}
