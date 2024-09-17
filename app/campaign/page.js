"use client"
import { useEffect, useState } from 'react';
import Image from "next/image";
import { getCampaign } from "../../components/api"
import Link from 'next/link';

export default function Campaigns(){
    const [campaignData, setCampaignData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        try {
            getCampaign()
                .then(result => setCampaignData(result))
                .finally(() => setLoading(false))

        } catch (error) {
            console.error('Error fetching campaigns:', error);
            setError(error.message);
            setLoading(false);
        }
         
    }, []);

    // Get the current items for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCampaignItems = campaignData.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate the total number of pages
    const totalPages = Math.ceil(campaignData.length / itemsPerPage);

    // Handle page navigation
    const handleNextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };

    // Function to go to a specific page number
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    function renderCampaignElements(campaignData) {
        const campaignEls = currentCampaignItems.map((campaign) => (
            <div key={campaign.id} className="flex text-sm text-gray-900 py-3 px-2 border-b-2 font-normal justify-between">
                <p className="w-1/5">{campaign.id}</p>
                <p className="w-2/5">{campaign.campaignName}</p>
                <p className="w-1/5">{campaign.startDay}/{campaign.startMonth}/{campaign.startYear}</p>
                <p className={`${campaign.campaignStatus == "Active" ? "text-green-500":"text-red-500"} font-semibold w-1/5 text-center`}>{campaign.campaignStatus}</p>
                <div className="w-1/5 flex justify-end items-center">
                    <div>
                        <Link href={`/campaign/${campaign.id}`}>
                            <Image 
                                src={"/eye.png"}
                                width={20}
                                height={20}
                                alt=""
                            /> 
                        </Link>
                    </div>
                    <div className="mx-2">
                        <Link href={`/campaign/${campaign.id}`}>
                            <Image 
                                src={"/edit.png"}
                                width={16}
                                height={16}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div>
                        <Link href={`/campaign/${campaign.id}`}>
                            <Image 
                                src={"/delete.png"}
                                width={20}
                                height={20}
                                alt=""
                            />
                        </Link>
                    </div>
                </div>
            </div>
        ))
        return (
            <div className="">
                <section>{campaignEls}</section>
            </div>
        )
    }

    if (error) return <p className="text-black">Error: {error}</p>;

    return (
        <main className="px-20 py-6 font-[family-name:var(--font-nunito)] w-full">
            <div className="font-[family-name:var(--font-work-sans)] text-customTeal text-xl font-semibold">All Campaigns</div>

            <div className="flex justify-between items-center my-8">
                <div className="text-customTeal text-sm font-medium flex space-x-4">
                    <div className="py-2.5 px-1.5 border border-customTeal rounded">All (90)</div>
                    <div className="py-2.5 px-1.5 border border-customTeal rounded">Inactive (90)</div>
                    <div className="py-2.5 px-1.5 border border-customTeal rounded">Active (90)</div>
                </div>
                <div>
                    <div className="border rounded-sm text-xs flex items-center py-3 px-2.5">
                        <input type="text" placeholder="Search..." className="w-56"/>
                        <Image 
                            src={"/search.png"}
                            width={20}
                            height={20}
                            alt=""
                        /> 
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="text-lightTeal">
                <div className="text-xs font-bold flex justify-between items-center bg-backgroundTeal py-3 px-2.5">
                    <p className="w-1/5">S/N</p>
                    <p className="w-2/5">Campaign Name</p>
                    <p className="w-1/5">Start Date</p>
                    <p className="w-1/5 text-center">Status</p>
                    <p className="w-1/5 text-end">Actions</p>
                </div>
                {
                    loading
                    ? <h1 className="text-gray-800 text-base my-4">Loading...</h1>
                    : (
                        <>
                            {renderCampaignElements(campaignData)}
                        </>
                    )
                }

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-8 text-lightTeal font-bold text-base">
                    <div className="flex items-center space-x-2">
                        {/* Previous Button */}
                        <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="disabled:opacity-50"
                        >
                            &lt;
                        </button>

                        {/* Page Numbers */}
            
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                            key={index}
                            onClick={() => handlePageClick(index + 1)}
                            className={`px-3 py-1 rounded-full ${
                                currentPage === index + 1
                                ? 'bg-customTeal text-white'
                                : ''
                            }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        
                        {/* Next Button */}
                        <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="disabled:opacity-50"
                        >
                            &gt;
                        </button>
                    </div>
                    <div className="text-gray-800 text-sm font-medium">
                        showing {itemsPerPage} of {campaignData.length} result
                    </div>
                </div>
            </div>
        </main>
    )
}