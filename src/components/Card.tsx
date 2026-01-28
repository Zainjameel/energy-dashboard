import { ReactNode } from "react";

export default function Card({
  title,
  right,
  children,
  className = "",
}: {
  title: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      <div className="panelHeader">
        <div className="panelTitle">{title}</div>
        <div className="panelTools">{right ?? "⋯"}</div>
      </div>
      {children}
    </section>
  );
}