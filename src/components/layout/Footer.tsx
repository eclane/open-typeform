import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    Product: [
      { name: "Overview", href: "#" },
      { name: "Features", href: "#" },
      { name: "Templates", href: "#" },
      { name: "Integrations", href: "#" },
      { name: "Pricing", href: "#" },
    ],
    Solutions: [
      { name: "Lead generation", href: "#" },
      { name: "Research", href: "#" },
      { name: "Customer success", href: "#" },
      { name: "Product", href: "#" },
      { name: "Marketing", href: "#" },
    ],
    Resources: [
      { name: "Blog", href: "#" },
      { name: "Help center", href: "#" },
      { name: "Community", href: "#" },
      { name: "Tutorials", href: "#" },
      { name: "API", href: "#" },
    ],
    Company: [
      { name: "About", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Partners", href: "#" },
      { name: "Press", href: "#" },
      { name: "Contact", href: "#" },
    ],
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="6" fill="white" />
                <path d="M8 12H24M12 12V22" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="text-xl font-semibold">typeform</span>
            </Link>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-sm">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/70">© Typeform {new Date().getFullYear()}</p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-sm text-background/70 hover:text-background transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-background/70 hover:text-background transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="text-sm text-background/70 hover:text-background transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
