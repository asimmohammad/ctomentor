import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.svg";

const navigation = [];

const servicesMenu = {
  name: "Services",
  href: "/services",
  items: [
    { name: "Pricing", href: "/pricing" },
    { name: "CTO Mentor Circle", href: "/circle" },
  ],
};

const caseStudiesMenu = {
  name: "Case Studies and Articles",
  href: "/case-studies",
  items: [
    { name: "Case Studies", href: "/case-studies" },
    { name: "Articles", href: "/insights" },
  ],
};

const aboutMenu = {
  name: "About",
  href: "/about",
  items: [
    { name: "Our Experience", href: "/experience" },
  ],
};

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
            <DropdownMenu>
              <DropdownMenuTrigger className={`text-sm font-body font-medium transition-colors flex items-center gap-1 outline-none ${
                location.pathname === servicesMenu.href || location.pathname === "/pricing" || location.pathname === "/circle"
                  ? "text-heading"
                  : "text-subtle hover:text-heading"
              }`}>
                {servicesMenu.name}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[160px]">
                <Link to={servicesMenu.href}>
                  <DropdownMenuItem className="cursor-pointer">
                    Services
                  </DropdownMenuItem>
                </Link>
                {servicesMenu.items.map((item) => (
                  <Link key={item.name} to={item.href}>
                    <DropdownMenuItem className="cursor-pointer">
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
            <DropdownMenu>
              <DropdownMenuTrigger className={`text-sm font-body font-medium transition-colors flex items-center gap-1 outline-none ${
                location.pathname === caseStudiesMenu.href || location.pathname === "/insights"
                  ? "text-heading"
                  : "text-subtle hover:text-heading"
              }`}>
                {caseStudiesMenu.name}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[200px]">
                <Link to={caseStudiesMenu.href}>
                  <DropdownMenuItem className="cursor-pointer">
                    Case Studies and Articles
                  </DropdownMenuItem>
                </Link>
                {caseStudiesMenu.items.map((item) => (
                  <Link key={item.name} to={item.href}>
                    <DropdownMenuItem className="cursor-pointer">
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className={`text-sm font-body font-medium transition-colors flex items-center gap-1 outline-none ${
                location.pathname === aboutMenu.href || location.pathname === "/experience"
                  ? "text-heading"
                  : "text-subtle hover:text-heading"
              }`}>
                {aboutMenu.name}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[160px]">
                <Link to={aboutMenu.href}>
                  <DropdownMenuItem className="cursor-pointer">
                    About
                  </DropdownMenuItem>
                </Link>
                {aboutMenu.items.map((item) => (
                  <Link key={item.name} to={item.href}>
                    <DropdownMenuItem className="cursor-pointer">
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/apply">
              <Button variant="primary" size="default">
                Apply for an Operator-in-Residence Engagement
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
              <div className="py-2">
                <Link
                  to={servicesMenu.href}
                  className={`text-base font-body font-medium py-2 ${
                    location.pathname === servicesMenu.href
                      ? "text-heading"
                      : "text-subtle"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  {servicesMenu.items.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`text-sm font-body font-medium py-1 ${
                        location.pathname === item.href
                          ? "text-heading"
                          : "text-subtle"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
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
              <div className="py-2">
                <Link
                  to={caseStudiesMenu.href}
                  className={`text-base font-body font-medium py-2 ${
                    location.pathname === caseStudiesMenu.href
                      ? "text-heading"
                      : "text-subtle"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {caseStudiesMenu.name}
                </Link>
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  {caseStudiesMenu.items.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`text-sm font-body font-medium py-1 ${
                        location.pathname === item.href
                          ? "text-heading"
                          : "text-subtle"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="py-2">
                <Link
                  to={aboutMenu.href}
                  className={`text-base font-body font-medium py-2 ${
                    location.pathname === aboutMenu.href
                      ? "text-heading"
                      : "text-subtle"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  {aboutMenu.items.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`text-sm font-body font-medium py-1 ${
                        location.pathname === item.href
                          ? "text-heading"
                          : "text-subtle"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-divider">
                <Link to="/apply" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="lg" className="w-full">
                    Apply for an Operator-in-Residence Engagement
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
