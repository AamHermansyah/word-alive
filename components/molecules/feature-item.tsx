import { CheckMarkIcon } from "@/components/atoms/icons"

/** One line of a plan's feature list: green tick + text. */
function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2.5 py-1.75 text-sm">
      <span className="flex text-success">
        <CheckMarkIcon className="size-4.5" />
      </span>
      <bdi>{children}</bdi>
    </li>
  )
}

export { FeatureItem }
