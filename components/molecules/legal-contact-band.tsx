import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

/** "Questions about this page?" band under a legal document. */
function LegalContactBand() {
  return (
    <Card className="mt-6 gap-0 [--card-spacing:--spacing(7)] md:min-h-30">
      <CardContent className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-bold">
            <bdi>Questions about this page?</bdi>
          </h2>
          <p className="text-sm text-muted-foreground">
            <bdi>Our support team will help.</bdi>
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/#support" />}
          size="lg"
          className="w-full rounded-lg px-6 text-[15px] md:w-auto"
        >
          Contact support
        </Button>
      </CardContent>
    </Card>
  )
}

export { LegalContactBand }
