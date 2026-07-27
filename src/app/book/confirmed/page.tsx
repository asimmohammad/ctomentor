import type { Metadata } from "next";
import { Suspense } from "react";
import BookConfirmedClient from "./ConfirmedClient";

export const metadata: Metadata = {
  title: "Conversation confirmed",
  robots: { index: false, follow: false },
};

export default function BookConfirmedPage() {
  return (
    <Suspense fallback={null}>
      <BookConfirmedClient />
    </Suspense>
  );
}
