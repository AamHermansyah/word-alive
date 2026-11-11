import { AdminCustomersAuthenticatorSetupCard } from "@/components/organisms/admin-customers-authenticator-setup-card"
import { AdminCustomersRecoveryCard } from "@/components/organisms/admin-customers-recovery-card"

/**
 * Authenticator set-up and recovery, with no console chrome: the set-up card
 * and the "Lost your authenticator?" card side by side from `xl`, stacked
 * (set-up first) below it, vertically centred on the viewport.
 */
function AdminTwoFactorTemplate() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-4 pb-24 md:gap-6 md:p-8 md:pb-24 xl:flex-row xl:gap-10">
      <AdminCustomersAuthenticatorSetupCard />
      <AdminCustomersRecoveryCard />
    </main>
  )
}

export { AdminTwoFactorTemplate }
