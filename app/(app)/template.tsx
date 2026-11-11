import { PageTransition } from "@/components/templates/page-transition"

/** Re-mounts on every navigation, which is what plays the page transition. */
export default function AppTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PageTransition className="gap-4 md:gap-5">{children}</PageTransition>
}
