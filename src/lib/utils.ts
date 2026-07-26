import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The brief's type scale uses word tokens (text-body, text-small, text-h2…) instead of
 * Tailwind's t-shirt sizes. tailwind-merge cannot infer those, so it files them under
 * `text-color` and treats them as conflicting with real colors — silently dropping
 * whichever came first. That is how `bg-accent text-ink-inverse` + `text-small`
 * collapsed into a charcoal fill with inherited ink (black on black), and how
 * `bg-ink-inverse text-ink` + `text-body` collapsed into cream on cream.
 * Registering the scale keeps size and color in separate conflict groups.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "hero",
            "h1",
            "h2",
            "h3",
            "h4",
            "lead",
            "body",
            "small",
            "caption",
            "eyebrow",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
