"use client"

interface Prop {
  itemProp: "orders" | "nodes" | "management" | "join_request" | "actions"
  setItemProp: (stat: "orders" | "nodes" | "management"| "join_request" | "actions") => void
}

export default function NavbarEmployee({ itemProp, setItemProp }: Prop) {
  const items: Array<{ id: Prop["itemProp"]; name: string }> = [
    { id: "nodes", name: "nodes" },
    { id: "orders", name: "orders" },
    { id: "management", name: "Management" },
    { id:"join_request" , name:"Join Requests"},
    { id:"actions" , name:"Actions"}
  ]

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-2 rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur border border-black/10 dark:border-white/10 p-2 shadow-sm">
        {items.map((item) => {
          const active = itemProp === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setItemProp(item.id)}
              className={[
                "flex-1 h-10 rounded-xl text-sm font-medium transition",
                "border border-transparent",
                active
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow"
                  : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-900/5 dark:hover:bg-white/10",
              ].join(" ")}
            >
              {item.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
