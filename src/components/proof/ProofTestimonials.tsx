import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { getPermittedTestimonials } from "@/lib/proof";
import { cn } from "@/lib/utils";

type ProofTestimonialsProps = {
  className?: string;
};

/**
 * Full-width pull quotes — at most two, only when permissionOn is set.
 * Renders nothing when the testimonials array is empty.
 */
export function ProofTestimonials({ className }: ProofTestimonialsProps) {
  const testimonials = getPermittedTestimonials(2);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <Section spacing="standard" tone="alt" className={className} aria-labelledby="proof-testimonials-heading">
      <h2 id="proof-testimonials-heading" className="sr-only">
        Client testimonials
      </h2>
      <div className="space-y-12">
        {testimonials.map((item) => (
          <figure key={`${item.name}-${item.company}`} className="max-w-measure">
            <blockquote className="font-display text-h2 font-semibold text-ink">{item.quote}</blockquote>
            <figcaption className="mt-6 flex items-start gap-4">
              {item.headshot ? (
                <Image
                  src={item.headshot}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 shrink-0 object-cover"
                />
              ) : null}
              <div>
                <p className="font-text text-body font-medium text-ink">{item.name}</p>
                <p className="mt-1 font-text text-small text-ink-muted">
                  {item.title}, {item.company}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
