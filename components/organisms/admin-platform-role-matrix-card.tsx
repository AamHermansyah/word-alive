import { CheckIcon } from "lucide-react"

import { AdminPlatformPanel } from "@/components/molecules/admin-platform-panel"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ROLE_PERMISSIONS } from "@/lib/data/admin-platform"

const HEAD =
  "h-auto px-0 pb-2.5 text-xs font-normal whitespace-normal text-muted-foreground"
const CELL = "px-0 py-2.5 text-[13px] whitespace-normal wrap-break-word"

function Allowed({ allowed }: { allowed: boolean }) {
  return allowed ? (
    <span className="flex justify-center text-success">
      <CheckIcon aria-hidden="true" className="size-4.5" />
      <span className="sr-only">Allowed</span>
    </span>
  ) : (
    <span className="block text-center text-xs text-muted-foreground">
      <span aria-hidden="true">–</span>
      <span className="sr-only">Not allowed</span>
    </span>
  )
}

/** What a Super Admin and a Support Admin may do. */
function AdminPlatformRoleMatrixCard() {
  return (
    <AdminPlatformPanel title="What each role can do" titleClassName="text-base">
      <Table aria-label="What each role can do">
        <TableHeader>
          <TableRow className="border-b-0 hover:bg-transparent">
            <TableHead className={`${HEAD} w-14/25`}>Action</TableHead>
            <TableHead className={`${HEAD} w-11/50 text-center`}>Super</TableHead>
            <TableHead className={`${HEAD} w-11/50 text-center`}>Support</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROLE_PERMISSIONS.map((permission) => (
            <TableRow key={permission.action} className="border-t border-b-0">
              <TableCell className={CELL}>{permission.action}</TableCell>
              <TableCell className={CELL}>
                <Allowed allowed={permission.super} />
              </TableCell>
              <TableCell className={CELL}>
                <Allowed allowed={permission.support} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminPlatformPanel>
  )
}

export { AdminPlatformRoleMatrixCard }
