import { Badge } from "@/components/ui/badge"
import {
  ADMIN_PAYMENT_STATUS_LABEL,
  ADMIN_USER_STATUS_LABEL,
} from "@/lib/data/admin-customers"
import type {
  AdminPaymentStatus,
  AdminSupportStatus,
  AdminUserPlan,
  AdminUserStatus,
} from "@/types/admin-customers"

type BadgeVariant = React.ComponentProps<typeof Badge>["variant"]

const USER_VARIANT: Record<AdminUserStatus, BadgeVariant> = {
  trial: "info",
  active: "success",
  expired: "secondary",
  suspended: "destructive",
}

const PAYMENT_VARIANT: Record<AdminPaymentStatus, BadgeVariant> = {
  verified: "success",
  failed: "destructive",
  pending: "warning",
  refunded: "secondary",
}

const SUPPORT_VARIANT: Record<AdminSupportStatus, BadgeVariant> = {
  new: "warning",
  handled: "success",
}

/** Account status pill (Active, Trial, Expired, Suspended). */
function UserStatusBadge({ status }: { status: AdminUserStatus }) {
  return (
    <Badge variant={USER_VARIANT[status]}>
      {ADMIN_USER_STATUS_LABEL[status]}
    </Badge>
  )
}

/** Payment status pill (Verified, Failed, Pending, Refunded). */
function PaymentStatusBadge({ status }: { status: AdminPaymentStatus }) {
  return (
    <Badge variant={PAYMENT_VARIANT[status]}>
      {ADMIN_PAYMENT_STATUS_LABEL[status]}
    </Badge>
  )
}

/** Support message pill (New, Handled). */
function SupportStatusBadge({ status }: { status: AdminSupportStatus }) {
  return (
    <Badge variant={SUPPORT_VARIANT[status]}>
      {status === "new" ? "New" : "Handled"}
    </Badge>
  )
}

/** Plan pill used in the user detail panel. */
function UserPlanBadge({ plan }: { plan: AdminUserPlan }) {
  return <Badge variant="info">{plan}</Badge>
}

export {
  PaymentStatusBadge,
  SupportStatusBadge,
  UserPlanBadge,
  UserStatusBadge,
}
