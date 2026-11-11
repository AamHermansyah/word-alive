"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"

import { useDirection } from "@/components/providers/direction-provider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CURRENT_USER } from "@/lib/data/navigation"

type ThemeChoice = "light" | "dark" | "system"

/**
 * Avatar button in the top bar. Opens the account popup, which is where the
 * appearance (light / dark / system) and reading direction (LTR / RTL) live.
 */
function UserMenu() {
  const { theme, setTheme } = useTheme()
  const { direction, setDirection } = useDirection()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Account menu"
        className="rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <Avatar className="size-10">
          <AvatarFallback>{CURRENT_USER.initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col gap-0.5 px-3 py-2">
            <span className="text-sm font-semibold text-foreground">
              {CURRENT_USER.name}
            </span>
            <span className="text-xs text-muted-foreground">Starter plan</span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={(theme as ThemeChoice | undefined) ?? "system"}
            onValueChange={(value) => setTheme(value as ThemeChoice)}
          >
            <DropdownMenuRadioItem value="light">
              <SunIcon />
              Light
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              <MoonIcon />
              Dark
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">
              <MonitorIcon />
              System
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Text direction</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={direction}
            onValueChange={(value) => setDirection(value as "ltr" | "rtl")}
          >
            <DropdownMenuRadioItem value="ltr">
              Left to right
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rtl">
              Right to left
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/settings" />}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/history" />}>
            Service history
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/billing" />}>
            Billing and receipts
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/sign-in" />}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { UserMenu }
