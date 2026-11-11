/**
 * Sample audience slide on the set-up page: the maroon slide with John 3:16 in
 * the church's chosen Bible version. Height comes from the text (with a small
 * floor), so a longer verse or a longer version name is never clipped.
 */
function SetupVersePreview({
  text,
  reference,
  version,
}: {
  text: string
  reference: string
  version: string
}) {
  return (
    <figure className="flex min-h-40 flex-col justify-between gap-6 rounded-lg bg-brand p-6.5 text-start text-brand-foreground">
      <blockquote className="font-serif text-[15px] leading-[1.45] wrap-break-word md:text-base">
        <bdi>{text}</bdi>
      </blockquote>
      <figcaption className="text-sm font-semibold wrap-break-word">
        <bdi>
          {reference} · {version}
        </bdi>
      </figcaption>
    </figure>
  )
}

export { SetupVersePreview }
