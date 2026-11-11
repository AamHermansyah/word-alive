"use client"

import * as React from "react"

import {
  DirectionProvider,
  type Direction,
} from "@/components/providers/direction-provider"
import { PageSwitcher } from "@/components/organisms/page-switcher"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

function AppProviders({
  initialDirection,
  children,
}: {
  initialDirection: Direction
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <DirectionProvider initialDirection={initialDirection}>
        <TooltipProvider>
          {children}
          <PageSwitcher />
          <Toaster position="top-center" />
        </TooltipProvider>
      </DirectionProvider>
    </ThemeProvider>
  )
}

export { AppProviders }
