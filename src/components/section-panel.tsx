import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type SectionPanelProps = {
  title: string;
  icon?: ReactNode;
  id?: string;
  href?: string;
  linkLabel?: string;
  command?: string;
  children: ReactNode;
};

export function SectionPanel({
  title,
  icon,
  id,
  href,
  linkLabel = "Open",
  command,
  children,
}: SectionPanelProps) {
  return (
    <section className="section-panel" id={id}>
      <div className="section-panel__header">
        <h2>
          {icon}
          <span>{title}</span>
        </h2>
        {href ? (
          <Link className="text-link" href={href}>
            <span>{linkLabel}</span>
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        ) : null}
      </div>

      <div className="section-panel__body">{children}</div>

      {command ? <div className="section-panel__command">{command}</div> : null}
    </section>
  );
}
