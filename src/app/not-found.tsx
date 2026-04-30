import Link from "next/link";
import { CommandLine } from "@/components/command-line";
import { TerminalFrame } from "@/components/terminal-frame";

export default function NotFound() {
  return (
    <main className="site-shell">
      <TerminalFrame>
        <section className="terminal-page">
          <CommandLine command="cat missing-file.md" />
          <h1>404: command not found</h1>
          <p>The file you asked for is not in this build log.</p>
          <Link className="button button--primary" href="/">
            Return Home
          </Link>
        </section>
      </TerminalFrame>
    </main>
  );
}
