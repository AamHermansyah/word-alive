import { AuthShell } from "@/components/templates/auth-shell"

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AuthShell>{children}</AuthShell>
}
