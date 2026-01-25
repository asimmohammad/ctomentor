import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.svg";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "CTO Mentor Circle", href: "/circle" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Insights", href: "/insights" },
  { name: "About", href: "/about" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-divider">
      <nav className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="The CTO Mentor" className="h-16 w-auto" />
            <span className="font-heading text-xl lg:text-2xl font-semibold text-heading tracking-tight">
              The CTO Mentor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-body font-medium transition-colors link-underline ${
                  location.pathname === item.href
                    ? "text-heading"
                    : "text-subtle hover:text-heading"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/apply">
              <Button variant="primary" size="default">
                Apply to Work Together
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-heading"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-divider animate-fade-in">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-base font-body font-medium py-2 ${
                    location.pathname === item.href
                      ? "text-heading"
                      : "text-subtle"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-divider">
                <Link to="/apply" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="lg" className="w-full">
                    Apply to Work Together
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
