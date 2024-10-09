"use client"
import Image from "next/image"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useParams } from 'next/navigation'

export default function Sidebar() {
    
    const pathname = usePathname()
    const pathParam = useParams()
    const {id} = pathParam
    const pathArray = ["/campaign", `/campaign/${id}`]

    return (
        <main>
            <div className="h-full w-80 flex flex-col items-center py-6 bg-backgroundTeal">
                <div className="font-[family-name:var(--font-nunito)] flex items-center text-sm font-medium">
                    <div>
                        <Image 
                            src={"/logo.png"}
                            width={48}
                            height={48}
                            alt="logo icon"
                            className="mr-4"
                        />
                    </div>
                    <div className="font-[family-name:var(--font-work-sans)] text-4xl font-bold" style={{background: "linear-gradient(99deg, #247B7B 2.54%, #3B247B 101.29%)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>
                        Scrutz
                    </div>
                </div>

                <Link href="/add-campaign">
                <div className="rounded-md bg-customTeal py-2 px-8 flex items-center mt-14 mb-10">
                        <Image 
                            src={"/add.png"}
                            width={20}
                            height={20}
                            alt="logo icon2"
                            className="mr-2"
                        />
                        <p>New Campaign</p>
                    
                </div>
                </Link>

                <div>
                    <ul className="space-y-4 text-lightTeal">
                        
                        <li className={`${pathname === "/" ? 'bg-white text-customTeal' : ''} hover:text-customTeal py-2 px-6`}>
                            <Link className="flex items-center" href="/">
                                <Image
                                    src={"/dashboard.png"}
                                    width={24}
                                    height={24}
                                    alt=""
                                    className="mr-2" 
                                />
                                <p>Overview</p>
                            </Link>
                        </li>
                        
                        <li className={`${pathArray.includes(pathname) ? "bg-white text-customTeal" : ""} hover:text-customTeal py-2 px-6`}>
                            <Link className="flex items-center" href="/campaign">
                                <Image
                                    src={"/speaker.png"}
                                    width={24}
                                    height={24}
                                    alt=""
                                    className="mr-2" 
                                />
                                <p>Campaign</p>
                            </Link>
                        </li>
                        
                        <li className={`${pathname === "/market" ? 'bg-white text-customTeal' : ''} hover:text-customTeal py-2 px-6`}>
                            <Link className="flex items-center" href="#">
                                <Image
                                    src={"/bulb.png"}
                                    width={24}
                                    height={24}
                                    alt=""
                                    className="mr-2" 
                                />
                                <p>Market Intelligence</p>
                            </Link>
                        </li>
                        <li className={`${pathname === "/settings" ? 'bg-white text-customTeal' : ''} hover:text-customTeal py-2 px-6`}>
                            <Link className="flex items-center" href="#">
                                <Image
                                    src={"/setting.png"}
                                    width={24}
                                    height={24}
                                    alt="" 
                                    className="mr-2"
                                />
                                <p>Account Settings</p>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col w-56 items-center text-lightTeal text-xs bg-white p-6 mt-14">
                    <Image
                        src={"/question.png"}
                        width={24}
                        height={24}
                        alt="" 
                    />
                    <div className="mx-2 border-gray-700 flex flex-col items-center text-center">
                        <p className="my-2 font-semibold">Need Help?</p>
                        <p>We are readily available to provide help</p>
                    </div>
                    
                    <div className="mt-2 px-6 py-2 border border-gray-700 rounded-md">Get Help</div>
                </div>
            </div>
        </main>
    )
}