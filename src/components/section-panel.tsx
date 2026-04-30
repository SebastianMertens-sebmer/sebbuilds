import Link from "next/link";
import type { ReactNode } from "react";

type SectionPanelProps = {
  title: string;
  icon?: ReactNode;
  href?: string;
  command?: string;
  children: ReactNode;
};

export function SectionPanel({
  title,
  icon,
  href,
  command,
  children,
}: SectionPanelProps) {
  return (
    <section className="section-panel">
      <div className="section-panel__header">
        <h2>
          {icon}
          <span>{title}</span>
        </h2>
        {href ? (
          <Link className="text-link" href={href}>
            View all <span aria-hidden="true">-&gt;</span>
          </Link>
        ) : null}
      </div>

      <div className="section-panel__body">{children}</div>

      {command ? <div className="section-panel__command">{command}</div> : null}
    </section>
  );
}
