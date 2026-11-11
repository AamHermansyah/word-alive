import type { HomeLibraryStat } from "@/types/site"

/** A figure on the navy "Shared song library" band. */
function HomeStatTile({ stat }: { stat: HomeLibraryStat }) {
  return (
    <li className="min-w-0 rounded-xl border border-white/14 bg-white/8 p-5 xl:max-w-72 xl:min-w-45">
      <p className="text-3xl font-bold wrap-break-word text-navy-foreground">
        <bdi>{stat.value}</bdi>
      </p>
      <p className="text-sm text-navy-muted">{stat.label}</p>
    </li>
  )
}

export { HomeStatTile }
