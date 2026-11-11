import type { Metadata } from "next"

import { HomeTemplate } from "@/components/templates/home-template"

export const metadata: Metadata = {
  title: {
    absolute: "WordAlive · Bible scriptures and worship lyrics on your church screen",
  },
  description:
    "Let AI listen, understand and display Bible scriptures and worship lyrics on your church screen, while you focus on the ministry.",
}

export default function HomePage() {
  return <HomeTemplate />
}
