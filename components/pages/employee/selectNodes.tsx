"use client"

import { EmploteeApis } from "@/apis/employee"
import { NodesApis } from "@/apis/node"
import { listNodes, NodeDoc } from "@/types/nodes"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SelectNodes() {
  const EmployeeApis = new EmploteeApis()
  const nodesApis = new NodesApis()
  const router = useRouter()
  const [ndoesDefualt, setNodesDefault] = useState<listNodes | null | "error">(null)
  const [selectNode, setSelectNode] = useState<NodeDoc | null>(null)

  useEffect(() => {
    const getNodes = async () => {
      const res = await nodesApis.getListDefaultNodes()
      console.log(res)
      if (res.res.status === 200) setNodesDefault(res)
      else if (res.res.status === 401) router.push("/login")
      else {
        console.log("Error fetching nodes:", res)
        setNodesDefault("error")
      }
    }
    getNodes()
  }, [])




   const handelClickSelectNode = async()=>{
              if (!selectNode) return
              const res  = await EmployeeApis.selcetdNodes({nodeId:selectNode._id.toString()})  
              if (res.res.status===200){router.push("/")}
              else if (res.res.status===401){router.push("/login")}
              console.log(res)
   }




  if (ndoesDefualt === null) {
    return (
      <div className="min-h-screen grid place-items-center bg-background text-text dark:bg-background-dark dark:text-text-dark">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 rounded-full border-2 border-black/20 dark:border-white/20 border-t-black dark:border-t-white animate-spin" />
          <div className="mt-3 text-sm text-secondary dark:text-secondary-dark">
            Loading nodes...
          </div>
        </div>
      </div>
    )
  }

  if (ndoesDefualt === "error") {
    return (
      <div className="min-h-screen grid place-items-center bg-background text-text dark:bg-background-dark dark:text-text-dark">
        <div className="text-center">
          <div className="text-xl font-semibold">Error!</div>
          <div className="mt-2 text-sm text-secondary dark:text-secondary-dark">
            Couldn’t load nodes.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-text dark:bg-background-dark dark:text-text-dark">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl bg-black/10 dark:bg-white/10" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full blur-3xl bg-black/10 dark:bg-white/10" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-10">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs uppercase tracking-widest text-secondary dark:text-secondary-dark">
              World of Nodes
            </div>
            <h1 className="mt-2 text-3xl font-extrabold">Select a node</h1>
            <p className="mt-2 text-secondary dark:text-secondary-dark">
              Choose a node to join as an employee.
            </p>
          </div>

        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ndoesDefualt.data.data.map((node) => {
            const id = node._id?.$oid ?? String(node._id) // safe
            const isSelected = id === (selectNode?._id?.$oid ?? "")

            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectNode(node)}
                className={[
                  "group text-left relative rounded-3xl border p-5 transition",
                  "bg-white/60 dark:bg-black/25",
                  "border-black/10 dark:border-white/10",
                  "hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40",
                  isSelected ? "ring-2 ring-black/70 dark:ring-white/70" : "",
                ].join(" ")}
              >
                {/* Glow when selected */}
                {isSelected && (
                  <div className="pointer-events-none absolute inset-0 rounded-3xl blur-xl bg-black/10 dark:bg-white/10" />
                )}

                <div className="relative flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-2xl grid place-items-center border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/20">
                        {node.icon ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={node.icon}
                            alt={node.name}
                            className="h-7 w-7 object-contain"
                          />
                        ) : (
                          <span className="text-sm font-bold">
                            {node.symbol?.slice(0, 2) ?? "N"}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold truncate">{node.name}</span>
                          {node.symbol ? (
                            <span className="text-[10px] px-2 py-1 rounded-full border border-black/10 dark:border-white/10 text-secondary dark:text-secondary-dark">
                              {node.symbol}
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-0.5 text-xs text-secondary dark:text-secondary-dark">
                          Level {node.level} · rep {node.reputation}
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-secondary dark:text-secondary-dark line-clamp-3">
                      {node.description || "No description yet."}
                    </p>
                  </div>

                  <div className="relative text-right">
                    <div className="text-[11px] text-secondary dark:text-secondary-dark">
                      Current
                    </div>
                    <div className="text-2xl font-extrabold leading-tight">
                      {String(node.currentPrice?.$numberDecimal ?? node.currentPrice ?? "—")}
                    </div>
                    <div className="text-[11px] text-secondary dark:text-secondary-dark">
                      base {String(node.basePrice?.$numberDecimal ?? node.basePrice ?? "—")}
                    </div>
                  </div>
                </div>

                <div className="relative mt-4 flex items-center justify-between">
                  <div className="text-xs text-secondary dark:text-secondary-dark">
                    visibility <b className="text-text dark:text-text-dark">{node.visibilityScore}</b> ·{" "}
                    min {String(node.minPrice?.$numberDecimal ?? node.minPrice ?? "—")} · max{" "}
                    {String(node.maxPrice?.$numberDecimal ?? node.maxPrice ?? "—")}
                  </div>

                  <div className="text-sm font-semibold">
                    {isSelected ? "✓ Selected" : "Select"}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/20 p-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="text-sm text-secondary dark:text-secondary-dark">
            {selectNode ? (
              <>
                You chose{" "}
                <b className="text-text dark:text-text-dark">{selectNode.name}</b>.
              </>
            ) : (
              "Select a node to continue."
            )}
          </div>

          <button
            className={[
              "rounded-2xl px-6 py-3 font-bold transition",
              "bg-black text-white dark:bg-white dark:text-black",
              !selectNode ? "opacity-50 cursor-not-allowed" : "hover:opacity-90",
            ].join(" ")}

            disabled={!selectNode}
            onClick={handelClickSelectNode}
          >
            Enter →
          </button>
        </div>
      </div>
    </div>
  )
}
