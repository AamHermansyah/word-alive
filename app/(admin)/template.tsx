import { PageTransition } from "@/components/templates/page-transition"

export default function AdminTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PageTransition className="gap-4 md:gap-5">{children}</PageTransition>
}
