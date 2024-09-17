import Image from "next/image";
import DateRangeDropdown from "@/components/DateRangeDropdown";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="px-20 py-10 w-full font-[family-name:var(--font-nunito)] flex flex-col">
      <div className="flex justify-between items-center">
        <div className="font-[family-name:var(--font-work-sans)] text-customTeal font-bold text-2xl">
          <h1>Overview</h1>
        </div> 
        <div className="flex items-center font-medium ">
          <div className="p-2 text-gray-800 text-xs flex items-center border rounded">
            <Image 
              src={"/calender.png"}
              width={20}
              height={20}
              alt=""
            /> 
            <div className="border-r-2 px-2">Date Range</div>
            <DateRangeDropdown />
          </div>
          <div className="flex px-6 py-2 bg-backgroundTeal ml-4 rounded items-center">
            <Image 
              src={"/export.png"}
              width={20}
              height={20}
              alt=""
              className="mr-2"
            />
            <div className="text-customTeal">Export</div>
          </div> 
        </div>
      </div>

      <div className="flex flex-col h-full justify-center items-center text-sm font-semibold">
        <Image 
          src={"/vector.png"}
          width={426}
          height={290}
          alt=""
        />
        <p className="text-gray-800 my-10">No activity yet. Create a new campaign to get started.</p>
        <Link href="/add-campaign">
          <div className="bg-customTeal px-6 py-2 flex rounded">
            <Image 
              src={"/add.png"}
              width={20}
              height={20}
              alt=""
              className="mr-2"
            />
            <p>New Campaign</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
