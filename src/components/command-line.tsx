type CommandLineProps = {
  command: string;
  prefix?: string;
  variant?: "hero" | "compact";
};

export function CommandLine({
  command,
  prefix = "seb@sebmer.com ~ %",
  variant = "compact",
}: CommandLineProps) {
  return (
    <p className={`command-line command-line--${variant}`}>
      <span className="command-line__prefix">{prefix}</span>
      {" "}
      <span className="command-line__command">{command}</span>
    </p>
  );
}
