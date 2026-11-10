"use client"

import * as React from "react"

import {
  DirectionProvider,
  type Direction,
} from "@/components/providers/direction-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
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
        <TooltipProvider>{children}</TooltipProvider>
      </DirectionProvider>
    </ThemeProvider>
  )
}

export { AppProviders }
