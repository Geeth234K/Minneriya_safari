"use client";

const WHATSAPP_NUMBER = "94762838796";
const DEFAULT_MESSAGE = "Hello! I'm interested in Minneriya safari tours and would like more details.";

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <aside aria-label="WhatsApp Support" className="fixed bottom-4 left-4 sm:bottom-5 sm:left-5 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-800 p-2 sm:p-2.5 rounded-full shadow-lg hover:shadow-[0_8px_20px_-4px_rgba(37,211,102,0.4)] border border-slate-200/90 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* Soft subtle pulse ring animation */}
        <span className="absolute -inset-0.5 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none -z-10" />

        {/* WhatsApp Official Vector Logo - Compact & Balanced */}
        <div className="relative w-6 h-6 sm:w-7 sm:h-7 shrink-0 flex items-center justify-center">
          <svg
            className="w-full h-full transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.16-1.31A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.2c-1.57 0-3.05-.44-4.32-1.21l-.31-.19-3.21.82.86-3.13-.2-.33A8.15 8.15 0 0 1 3.8 12c0-4.52 3.68-8.2 8.2-8.2s8.2 3.68 8.2 8.2-3.68 8.2-8.2 8.2zm4.56-6.14c-.25-.12-1.48-.73-1.71-.81-.23-.08-.4-.12-.57.12-.17.25-.65.81-.8 1-.15.19-.3.21-.55.08-.25-.12-1.06-.39-2.02-1.24-.75-.67-1.26-1.49-1.41-1.74-.15-.25-.02-.39.1-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.57-1.37-.78-1.87-.21-.49-.41-.42-.57-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.2.21-.59.21-1.09.15-1.2-.06-.11-.23-.17-.48-.29z"
              fill="#25D366"
            />
          </svg>
        </div>

        {/* Expandable text label on hover (desktop only) */}
        <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-[11px] font-semibold text-slate-800 pr-0 group-hover:pr-1.5">
          Chat on WhatsApp
        </span>

        {/* Online status indicator dot - delicate size */}
        <span className="absolute top-0 right-0 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366] border-[1.5px] border-white" />
        </span>
      </a>
    </aside>
  );
}
