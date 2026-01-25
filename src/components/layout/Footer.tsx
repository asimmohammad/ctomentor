import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

const navigation = {
  services: [
    { name: "Operator-in-Residence", href: "/services" },
    { name: "CTO Mentor Circle", href: "/circle" },
    { name: "Technical Assessments", href: "/services" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Our Experience", href: "/experience" },
    { name: "Pricing", href: "/pricing" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Insights", href: "/insights" },
  ],
  connect: [
    { name: "Apply for an Operator-in-Residence Engagement", href: "/apply" },
    { name: "LinkedIn", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <img src={logo} alt="The CTO Mentor" className="h-16 w-auto" />
            </Link>
            <p className="text-sm text-primary-foreground/70 font-body leading-relaxed max-w-xs">
              Technology leadership that turns chaos into clarity.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-body font-semibold uppercase tracking-wider mb-4 text-primary-foreground/50">
              Services
            </h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm font-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-body font-semibold uppercase tracking-wider mb-4 text-primary-foreground/50">
              Company
            </h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm font-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-body font-semibold uppercase tracking-wider mb-4 text-primary-foreground/50">
              Connect
            </h3>
            <ul className="space-y-3">
              {navigation.connect.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm font-body text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <p className="text-xs font-body text-primary-foreground/50">
            © {new Date().getFullYear()} The CTO Mentor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
