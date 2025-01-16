"use client"

import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode } from "react"
import { LayoutDashboard, Videotape } from 'lucide-react';
import { ContentLayout } from '@/components/dashboard/layout/content-layout';

const tabs = [
  { icon: LayoutDashboard, label: "Films", path: "/dashboard/contents/all" },
  { icon: Videotape, label: "Series", path: "/dashboard/contents/all/series" },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  return (
      <ContentLayout title="All Contents">
        <nav className="bg-background border-b">
          <ul className="flex">
            {tabs.map((item) => (
                <motion.li
                    key={item.label}
                    className="flex-1"
                    initial={false}
                    animate={{
                      backgroundColor: pathname === item.path ? "var(WA--background)" : "transparent",
                    }}
                >
                  <button
                      onClick={() => router.push(item.path)}
                      className="w-full p-4 flex items-center justify-center gap-2 text-sm font-medium relative"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                    {pathname === item.path && (
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            layoutId="underline"
                        />
                    )}
                  </button>
                </motion.li>
            ))}
          </ul>
        </nav>
        <main className="flex-1 p-6 bg-background">
          <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                // initial={{ opacity: 0, y: 20 }}
                // animate={{ opacity: 1, y: 0 }}
                // exit={{ opacity: 0, y: -20 }}
                // transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </ContentLayout>
  )
}

