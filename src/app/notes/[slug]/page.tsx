import { permanentRedirect } from "next/navigation";

export default function NotePage() {
  permanentRedirect("/logs");
}
