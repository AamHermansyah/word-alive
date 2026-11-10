import {
  AppearanceCard,
  AudienceScreenCard,
  ServiceSettingsCard,
} from "@/components/organisms/settings-cards"
import { Topbar } from "@/components/organisms/topbar"

function SettingsTemplate() {
  return (
    <>
      <Topbar
        title="Settings"
        subtitle="Church details and display options"
      />

      <div className="flex flex-col gap-5 md:flex-row">
        <ServiceSettingsCard />
        <AppearanceCard />
      </div>

      <AudienceScreenCard />
    </>
  )
}

export { SettingsTemplate }
