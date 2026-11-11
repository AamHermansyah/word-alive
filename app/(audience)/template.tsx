import { PageTransition } from "@/components/templates/page-transition"

export default function AudienceTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PageTransition>{children}</PageTransition>
}
