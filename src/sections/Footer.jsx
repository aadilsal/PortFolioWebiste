import { mySocials } from "../constants";

const Footer = () => {
  return (
    <footer className="section c-space pt-8 md:pt-12">
      <div className="card-surface flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        <p className="text-xs sm:text-sm text-neutral-400">
          © 2025 Aadil Salman Butt · Full Stack | AI & ML Engineer
        </p>
        <div className="flex gap-2 sm:gap-3">
          {mySocials.map((social, index) => (
            <a
              href={social.href}
              key={index}
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-full glass flex items-center justify-center hover:bg-white/15 transition focus-ring"
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={social.icon} className="w-4 h-4" alt={social.name} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
