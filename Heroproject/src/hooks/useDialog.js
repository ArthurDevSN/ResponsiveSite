import { useEffect } from "react";

export default function useDialog(open, ref, close) {
  useEffect(() => {
    if (!open) return undefined;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () =>
      [
        ...(ref.current?.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex="0"]',
        ) ?? []),
      ].filter((node) => node.getClientRects().length);
    const frame = requestAnimationFrame(() =>
      (focusable()[0] ?? ref.current)?.focus(),
    );
    const handleKey = (event) => {
      if (event.key === "Escape") close();
      if (event.key !== "Tab") return;
      const elements = focusable();
      const first = elements[0];
      const last = elements.at(-1);
      if (!first) {
        event.preventDefault();
        ref.current?.focus();
        return;
      }
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          !ref.current?.contains(document.activeElement))
      ) {
        event.preventDefault();
        last.focus();
      }
      if (
        !event.shiftKey &&
        (document.activeElement === last ||
          !ref.current?.contains(document.activeElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", handleKey);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [open, ref, close]);
}
