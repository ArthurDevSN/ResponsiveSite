import { Sparkles } from "lucide-react";

export default function Logo() {
  return (
    <span className="logo">
      <span className="logo-symbol">
        <Sparkles size={22} aria-hidden="true" />
      </span>
      luma<span className="logo-dot">.</span>
    </span>
  );
}
