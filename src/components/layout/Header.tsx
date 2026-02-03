import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="6" className="fill-primary" />
            <path d="M8 12H24M12 12V22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="text-xl font-semibold text-foreground">typeform</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Products <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Solutions <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Templates <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Integrations <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Resources <ChevronDown className="w-4 h-4" />
          </button>
          <Link to="/pricing" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/enterprise" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Enterprise
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" className="text-sm font-medium">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-foreground text-background hover:bg-foreground/90 text-sm font-medium px-4">
              Get started free
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
