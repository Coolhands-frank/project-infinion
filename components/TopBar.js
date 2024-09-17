import Image from "next/image"

export default function TopBar() {
    return (
        <main className="border-b-2 flex justify-between items-center w-full px-20 py-6 font-[family-name:var(--font-nunito)]">
            <input type="text" placeholder="Search for anything..." className="border px-3 text-xs font-medium py-2.5 w-96"/>
            <div className="flex items-center font-medium space-x-1.5">
                <div className="pr-1.5 border-r-2">
                    <Image 
                        src={"/notification.png"}
                        width={20}
                        height={20}
                        alt=""
                    /> 
                </div>
                <div>
                    <Image 
                        src={"/Ellipse.png"}
                        width={40}
                        height={40}
                        alt=""
                    /> 
                </div>
                <p className="text-gray-700 text-sm">BigTech</p>
                <div>
                    <Image 
                        src={"/down.png"}
                        width={24}
                        height={24}
                        alt=""
                    /> 
                </div>    
            </div>
        </main>
    )
}