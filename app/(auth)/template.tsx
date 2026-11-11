import { PageTransition } from "@/components/templates/page-transition"

export default function AuthTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PageTransition className="w-full items-center justify-center gap-7">
      {children}
    </PageTransition>
  )
}
