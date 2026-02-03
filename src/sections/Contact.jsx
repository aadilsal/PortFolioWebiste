import { useState } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const next = {};
    if (formData.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      next.email = "Please enter a valid email.";
    if (formData.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const showToast = (type, message) => {
    setToastType(type);
    setToast(message);
    setTimeout(() => setToast(""), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      await emailjs.send(
        "service_2067avr",
        "template_6oi6udc",
        {
          from_name: formData.name,
          to_name: "Aadil Salman Butt",
          from_email: formData.email,
          to_email: "salmanaadil52@gmail.com",
          message: formData.message,
        },
        "KljKO0KZIjac-XAhs"
      );
      setFormData({ name: "", email: "", message: "" });
      showToast("success", "Message sent successfully!");
    } catch (error) {
      showToast("error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="section c-space">
      <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-8 items-start">
        <div>
          <h2 className="section-title">Let's build something great</h2>
          <p className="section-subtitle max-w-xl mt-4">
            Need a full‑stack product, AI feature, or a high‑performance UI? I'd love to help.
          </p>
          <div className="mt-6 md:mt-8 space-y-2 md:space-y-3 text-xs md:text-sm text-neutral-400">
            <p>📍 Lahore, Pakistan · Remote worldwide</p>
            <p>⚡ Fast response · 24–48 hours</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-surface space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="focus-ring w-full"
              placeholder="John Doe"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="focus-ring w-full"
              placeholder="john@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="focus-ring w-full"
              placeholder="Tell me about your project..."
              value={formData.message}
              onChange={handleChange}
              required
            />
            {errors.message && (
              <p className="text-xs text-red-400 mt-1.5">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn-primary w-full justify-center focus-ring"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
            <Send size={16} className="hidden sm:inline" />
          </button>
        </form>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 glass rounded-xl px-4 py-3 text-sm z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-center gap-3">
              {toastType === "success" ? (
                <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
              ) : (
                <AlertTriangle size={18} className="text-red-400 flex-shrink-0" />
              )}
              <span>{toast}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
