"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { AdminCatalogueSearchField } from "@/components/molecules/admin-catalogue-search-field"
import { AdminPageHeader } from "@/components/molecules/admin-page-header"
import { AdminSongPanel } from "@/components/organisms/admin-song-panel"
import { AdminSongTabs } from "@/components/organisms/admin-song-tabs"
import { AdminTakedownPanel } from "@/components/organisms/admin-takedown-panel"
import { Button } from "@/components/ui/button"
import { useAdminSongCatalogue } from "@/hooks/use-admin-song-catalogue"
import { CATALOGUE_SUBTITLE } from "@/lib/data/admin-catalogue"
import type { AdminSongTab } from "@/types/admin-catalogue"

const SONGS_HREF = "/admin/songs"
const TAKEDOWNS_HREF = "/admin/songs/takedowns"

function hrefFor(tab: AdminSongTab) {
  if (tab === "takedowns") return TAKEDOWNS_HREF
  return tab === "all" ? `${SONGS_HREF}?tab=all` : SONGS_HREF
}

/**
 * The song catalogue: one frame (title, tabs, export) for the review queue,
 * the takedown requests and all songs. "/admin/songs" holds the review queue
 * and all songs; the Takedown tab is its own page, "/admin/songs/takedowns",
 * and both pages render this same template with a different `tab`.
 */
function AdminSongCatalogueTemplate({ tab }: { tab: AdminSongTab }) {
  const router = useRouter()
  const catalogue = useAdminSongCatalogue()
  const [songView, setSongView] = React.useState<"review" | "all">(
    tab === "all" ? "all" : "review"
  )
  const [query, setQuery] = React.useState("")

  const active: AdminSongTab = tab === "takedowns" ? "takedowns" : songView

  function changeTab(next: AdminSongTab) {
    if (next === active) return
    if (next === "takedowns" || tab === "takedowns") {
      router.push(hrefFor(next))
      return
    }
    // Review queue <-> All songs stay on the page; keep the address in step.
    setSongView(next as "review" | "all")
    window.history.replaceState(null, "", hrefFor(next))
  }

  return (
    <>
      <AdminPageHeader
        title="Song catalogue"
        subtitle={
          tab === "takedowns"
            ? "Takedown requests from rights holders"
            : CATALOGUE_SUBTITLE
        }
      >
        {tab === "takedowns" ? null : (
          <AdminCatalogueSearchField
            label="Search songs"
            placeholder="Search songs"
            value={query}
            onValueChange={setQuery}
            className="w-full sm:w-56"
          />
        )}
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() =>
            toast.success("Song list exported", {
              description:
                tab === "takedowns"
                  ? "takedown-requests.csv is ready."
                  : "song-catalogue.csv is ready.",
            })
          }
        >
          Export list
        </Button>
      </AdminPageHeader>

      <AdminSongTabs
        active={active}
        reviewCount={catalogue.queue.length}
        takedownCount={catalogue.openTakedowns.length}
        onChange={changeTab}
      />

      {tab === "takedowns" ? (
        <AdminTakedownPanel catalogue={catalogue} />
      ) : (
        <AdminSongPanel
          key={songView}
          view={songView}
          catalogue={catalogue}
          query={query}
        />
      )}
    </>
  )
}

export { AdminSongCatalogueTemplate }
