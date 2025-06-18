import React, { useState, useEffect, useRef } from "react";
import { 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  Phone, 
  Send, 
  User, 
  MessageSquare,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  link?: string;
  color: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "mintsanavalonajunior@gmail.com",
    link: "mailto:mintsanavalonajunior@gmail.com",
    color: "cyan"
  },
  {
    icon: <Phone size={20} />,
    label: "Phone",
    value: "+261 34 17 14 779",
    link: "tel:+261341714779",
    color: "emerald"
  },
  {
    icon: <MapPin size={20} />,
    label: "Location",
    value: "Antananarivo, Madagascar",
    color: "purple"
  },
  {
    icon: <Github size={20} />,
    label: "GitHub",
    value: "github.com/OsirisJr16",
    link: "https://github.com/OsirisJr16",
    color: "orange"
  },
  {
    icon: <Linkedin size={20} />,
    label: "LinkedIn",
    value: "linkedin.com/in/junior-osiris-mintsanavalona",
    link: "https://www.linkedin.com/in/junior-osiris-mintsanavalona-35307627a/",
    color: "blue"
  }
];

interface ContactCardProps {
  info: ContactInfo;
  isVisible: boolean;
  delay: number;
}

const ContactCard: React.FC<ContactCardProps> = ({ info, isVisible, delay }) => {
  const getColorClasses = (color: string) => {
    const colors = {
      cyan: "border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:shadow-cyan-400/20",
      emerald: "border-emerald-400/50 text-emerald-400 hover:border-emerald-400 hover:shadow-emerald-400/20",
      purple: "border-purple-400/50 text-purple-400 hover:border-purple-400 hover:shadow-purple-400/20",
      orange: "border-orange-400/50 text-orange-400 hover:border-orange-400 hover:shadow-orange-400/20",
      blue: "border-blue-400/50 text-blue-400 hover:border-blue-400 hover:shadow-blue-400/20"
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  const getBgColorClasses = (color: string) => {
    const colors = {
      cyan: "bg-cyan-400/10",
      emerald: "bg-emerald-400/10",
      purple: "bg-purple-400/10",
      orange: "bg-orange-400/10",
      blue: "bg-blue-400/10"
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  const CardContent = () => (
    <div className={`p-4 rounded-lg border-2 transition-all duration-300 bg-gray-900/50 hover:shadow-lg ${getColorClasses(info.color)} ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
    }`}
    style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${getBgColorClasses(info.color)}`}>
          {info.icon}
        </div>
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">{info.label}</div>
          <div className="text-sm text-white font-medium">{info.value}</div>
        </div>
      </div>
    </div>
  );

  return info.link ? (
    <a href={info.link} target="_blank" rel="noopener noreferrer" className="block">
      <CardContent />
    </a>
  ) : (
    <CardContent />
  );
};

const ContactSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [isTyping, setIsTyping] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) {
              setVisibleItems((prev) => new Set([...prev, id]));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-id]");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (visibleItems.has("contact-header")) {
      const timer = setTimeout(() => setIsTyping(true), 500);
      return () => clearTimeout(timer);
    }
  }, [visibleItems]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-20"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className="max-w-6xl mx-auto mb-16 text-center"
          data-id="contact-header"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-emerald-400 text-xl">$</span>
            <span className="text-gray-400 text-xl">curl -X POST /contact</span>
            {isTyping && (
              <span className="animate-pulse text-cyan-400 text-xl">|</span>
            )}
          </div>
          <h2
            className={`text-3xl font-bold text-white mb-4 transition-all duration-700 ${
              visibleItems.has("contact-header")
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <span className="text-cyan-400">{">"} </span>
            Get In Touch
          </h2>
          <p
            className={`text-gray-400 transition-all duration-700 delay-200 ${
              visibleItems.has("contact-header")
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            // Let's connect and build something amazing together
          </p>
        </div>

        {/* Contact Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-emerald-400">$</span>
                  <span className="text-gray-400 text-sm">whoami --contact</span>
                </div>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={info.label} data-id={`contact-info-${index}`}>
                      <ContactCard
                        info={info}
                        isVisible={visibleItems.has(`contact-info-${index}`)}
                        delay={index * 100}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MessageSquare size={20} className="text-cyan-400" />
                  Let's Collaborate
                </h3>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Available for freelance projects and full-time opportunities</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Interested in web development, mobile apps, and innovative solutions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Open to discussing new technologies and best practices</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-emerald-400">$</span>
                <span className="text-gray-400 text-sm">nano message.txt</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User size={16} className="inline mr-2" />
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    placeholder="Project discussion"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MessageSquare size={16} className="inline mr-2" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isSubmitting
                      ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                      : "bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-400 hover:text-cyan-300 border border-cyan-400/30 hover:border-cyan-400/50"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-cyan-400 border-t-transparent"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Submit Status */}
                {submitStatus !== "idle" && (
                  <div className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                    submitStatus === "success"
                      ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/30"
                      : "bg-red-400/10 text-red-400 border border-red-400/30"
                  }`}>
                    {submitStatus === "success" ? (                      <CheckCircle size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                    <span>
                      {submitStatus === "success"
                        ? "Message sent successfully!"
                        : "Something went wrong. Please try again."}
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
