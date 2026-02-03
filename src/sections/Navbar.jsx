import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Palette } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [accent, setAccent] = useState("99 102 241");

  const navItems = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "work", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  useEffect(() => {
    const storedAccent = localStorage.getItem("accent");
    if (storedAccent) setAccent(storedAccent);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.style.setProperty("--accent", accent);
    localStorage.setItem("accent", accent);
  }, [accent]);

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.1 }
    );

    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, [navItems]);

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-x-0 z-30 w-full">
      <div className="mx-auto max-w-7xl c-space">
        <div className="mt-4 rounded-full glass flex items-center justify-between px-3 sm:px-4 py-2">
          <button
            onClick={() => handleNavClick("home")}
            className="text-xs sm:text-sm font-bold tracking-tight min-h-12 flex items-center focus-ring"
          >
            ASB
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={active === item.id ? "page" : undefined}
                className={`px-3 py-2 rounded-full text-xs font-medium transition min-h-10 focus-ring ${
                  active === item.id
                    ? "bg-white/15 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="relative group">
              <button
                className="p-2 rounded-full hover:bg-white/10 transition min-h-10 focus-ring"
                aria-label="Change accent color"
              >
                <Palette size={18} />
              </button>
              <div className="absolute right-0 mt-2 hidden group-hover:flex gap-2 bg-black/60 p-3 rounded-full">
                {["99 102 241", "16 185 129", "59 130 246", "234 88 12"].map(
                  (color) => (
                    <button
                      key={color}
                      onClick={() => setAccent(color)}
                      className="w-5 h-5 rounded-full border-2 border-white/20 transition hover:scale-110 focus-ring"
                      style={{ background: `rgb(${color})` }}
                      aria-label={`Set accent color to ${color}`}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden p-2 rounded-full hover:bg-white/10 transition min-h-10 focus-ring"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden mt-3 mx-4 sm:mx-6 glass rounded-2xl p-4 space-y-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={active === item.id ? "page" : undefined}
                  className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition focus-ring ${
                    active === item.id
                      ? "bg-white/15 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="border-t border-white/10 pt-3 flex items-center gap-2">
              <div className="flex gap-2">
                {["99 102 241", "16 185 129", "59 130 246", "234 88 12"].map(
                  (color) => (
                    <button
                      key={color}
                      onClick={() => setAccent(color)}
                      className="w-5 h-5 rounded-full border-2 border-white/20 transition hover:scale-110 focus-ring"
                      style={{ background: `rgb(${color})` }}
                      aria-label={`Accent color ${color}`}
                    />
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
