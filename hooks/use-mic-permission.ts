"use client"

import * as React from "react"

import type { MicPermission } from "@/types/console"

/**
 * First-run microphone permission.
 *
 * Asks the browser for the microphone only when `request()` is called, and
 * lets go of the stream again straight away: the first-run screen only needs
 * to know whether it may listen, it never keeps the microphone open.
 *
 * Everything is guarded so a browser without the API does not break the page:
 *  - the Permissions API (Safari / Firefox may not know "microphone") only
 *    pre-fills the state when it can answer;
 *  - without `mediaDevices.getUserMedia` (an insecure origin, an old browser)
 *    there is nothing to ask, so the flow carries on as if allowed. This is a
 *    UI-only build; the real app has to be served over HTTPS.
 *
 * `grantedNow` is true only when the person allowed it on this page (not when
 * it was already allowed), so the page can move on by itself in that case.
 */
function useMicPermission() {
  const [permission, setPermission] = React.useState<MicPermission>("ask")
  const [noDevice, setNoDevice] = React.useState(false)
  const [grantedNow, setGrantedNow] = React.useState(false)

  // Pick up a decision made earlier, and follow later changes in the browser's
  // site settings (e.g. the person flips the lock-icon switch and comes back).
  React.useEffect(() => {
    let status: PermissionStatus | undefined
    let active = true

    const sync = () => {
      if (!active || !status) return
      setPermission((current) => {
        if (current === "requesting") return current
        if (status?.state === "granted") return "allowed"
        if (status?.state === "denied") return "blocked"
        return current === "allowed" ? "ask" : current
      })
    }

    try {
      navigator.permissions
        ?.query({ name: "microphone" as PermissionName })
        .then((result) => {
          if (!active) return
          status = result
          sync()
          result.addEventListener("change", sync)
        })
        .catch(() => {
          // The browser does not expose this permission: keep asking directly.
        })
    } catch {
      // Same: some browsers throw instead of rejecting.
    }

    return () => {
      active = false
      status?.removeEventListener("change", sync)
    }
  }, [])

  const request = React.useCallback(async () => {
    setPermission("requesting")
    setNoDevice(false)
    setGrantedNow(false)

    const devices = navigator.mediaDevices
    if (!devices?.getUserMedia) {
      setPermission("allowed")
      setGrantedNow(true)
      return
    }

    try {
      const stream = await devices.getUserMedia({ audio: true })
      stream.getTracks().forEach((track) => track.stop())
      setPermission("allowed")
      setGrantedNow(true)
    } catch (error) {
      setNoDevice(error instanceof DOMException && error.name === "NotFoundError")
      setPermission("blocked")
    }
  }, [])

  return { permission, noDevice, grantedNow, request }
}

export { useMicPermission }
