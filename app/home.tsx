"use client"

import Management from "@/components/pages/home/management"
import NavbarHome from "@/components/pages/home/navbar"
import TableNodesInHome from "@/components/pages/home/tableNodes"
import TableOrdersInHome from "@/components/pages/home/tableOrders"
import { DarkLightToggleButton } from "@/components/ui/btns/darkLight"
import { useMemo, useState } from "react"

type PageId = "orders" | "nodes" | "management"

export default function HomeGame() {
  const [selectPage, setSelectPage] = useState<PageId>("management")

  const pages = useMemo(
    () => ({
      management: (
          <Management />
      ),
      orders: <TableOrdersInHome />,
      nodes: <TableNodesInHome/>

      // TableNodesInHome
    }),
    []
  )

  return (
    <div className="  from-zinc-50 to-zinc-100 dark:from-zinc-950 max-h-screen dark:to-zinc-900 text-zinc-900 dark:text-zinc-100 flex items-start justify-center px-4 py-10 ">
      <div className="w-full  max-w-7xl ">
          <div className="flex justify-center items-center flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              World of Nodes
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
              Manage your nodes, orders, and settings from one place.
            </p>
          </div>
        {/* Header Card */}
        <div className="p-6">
          <div className="mt-5">
            <NavbarHome itemProp={selectPage} setItemProp={setSelectPage} />
          </div>
        </div>

        {/* Content Card */}
        <div className="mt-6 rounded-3xl max-h-[calc(100vh-290px)]  overflow-auto backdrop-blur p-6 shadow-sm">
          {pages[selectPage]}
        </div>
      </div>
    </div>
  )
}
