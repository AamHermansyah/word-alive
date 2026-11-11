import Link from "next/link"

import { AdminCatalogueSwitch } from "@/components/molecules/admin-catalogue-switch"
import {
  DataTable,
  type DataTableColumn,
} from "@/components/organisms/data-table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  BIBLE_SOURCE_LABEL,
  LICENCE_LABEL,
  LICENCE_VARIANT,
} from "@/lib/data/admin-catalogue"
import type { AdminBibleTranslation } from "@/types/admin-catalogue"

/** Version, source, rights, last import and whether it is live. */
function AdminBibleTranslationsCard({
  versions,
  onLiveChange,
}: {
  versions: AdminBibleTranslation[]
  onLiveChange: (code: string, live: boolean) => void
}) {
  const columns: DataTableColumn<AdminBibleTranslation>[] = [
    {
      id: "version",
      header: "Version",
      primary: true,
      className: "w-[35%]",
      cell: (version) => {
        const label = (
          <>
            <span className="block text-sm font-bold">{version.code}</span>
            <span className="block text-xs font-normal text-muted-foreground">
              {version.name}
            </span>
          </>
        )
        return version.sourceHref ? (
          <Link
            href={version.sourceHref}
            aria-label={`${version.code} ${version.name}: source settings`}
            className="block rounded-sm outline-none hover:text-brand-text focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            {label}
          </Link>
        ) : (
          <div>{label}</div>
        )
      },
    },
    {
      id: "source",
      header: "Source",
      className: "w-[16%]",
      cell: (version) => BIBLE_SOURCE_LABEL[version.source],
    },
    {
      id: "rights",
      header: "Rights",
      className: "w-[19%]",
      cell: (version) => (
        <Badge
          variant={LICENCE_VARIANT[version.licence]}
          className="whitespace-normal"
        >
          {LICENCE_LABEL[version.licence]}
        </Badge>
      ),
    },
    {
      id: "imported",
      header: "Imported",
      className: "w-[17%]",
      cell: (version) => <bdi>{version.imported ?? "Not imported"}</bdi>,
    },
    {
      id: "status",
      header: "Status",
      className: "w-[13%]",
      cell: (version) =>
        version.isDefault ? (
          <Badge variant="brand">Default</Badge>
        ) : (
          <AdminCatalogueSwitch
            aria-label={
              version.licence === "missing"
                ? `${version.code} live (locked: licence missing)`
                : `${version.code} live`
            }
            checked={version.live}
            disabled={version.licence === "missing"}
            onCheckedChange={(live) => onLiveChange(version.code, live)}
          />
        ),
    },
  ]

  return (
    <Card className="min-w-0 gap-0">
      <CardContent>
        <DataTable
          aria-label="Bible translations"
          columns={columns}
          rows={versions}
          getRowKey={(version) => version.code}
        />
      </CardContent>
    </Card>
  )
}

export { AdminBibleTranslationsCard }
