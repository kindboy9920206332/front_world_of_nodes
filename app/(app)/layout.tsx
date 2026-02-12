import SidebarMenu from "@/components/layout/menu"

interface Prop {
    children : React.ReactNode
}

export default function LayoutApp ({children}:Prop){
    return (
        <>
        {/* <div className="w-[100%] h-[50px] bg-red-400"></div> */}
        <div className="max-h-screen overflow-hidden w-full grid grid-cols-8 ">
            {/* menu */}
            <div className="col-span-1 h-full ">
      <SidebarMenu  />            
      </div>


        <div className="col-span-7 h-full w-full">  
             {children}
        </div>  
             
        
        </div>          
        </>
    )
}