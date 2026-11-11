/**
 * Projector screen: no navigation, no padding. Each page fills the viewport
 * with its own colours (scripture slide, lyrics slide, waiting screen).
 */
export default function AudienceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex min-h-dvh flex-col animate-in fade-in-0 duration-300 motion-reduce:animate-none">{children}</div>
}
