import { cn } from "@/lib/utils"

/**
 * Gentle enter animation for content that appears after an interaction
 * (a success message, a revealed panel, the next step of a flow). Give it a
 * `key` that changes with the state so the animation replays when the content
 * swaps. Uses tw-animate-css and is switched off under reduced motion.
 */
function FadeIn({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "animate-in fade-in-0 slide-in-from-bottom-2 duration-300 fill-mode-both motion-reduce:animate-none",
        className
      )}
      {...props}
    />
  )
}

export { FadeIn }
