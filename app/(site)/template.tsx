import { PageTransition } from "@/components/templates/page-transition"

export default function SiteTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PageTransition>{children}</PageTransition>
}
