"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { fetchCampaignData } from "../../../components/api"
import { deleteCampaign } from "../../../components/api"


export default function CampaignDetails() {
    const redirect = useRouter()
    const router = useParams();
    const { id } = router; // Get the dynamic ID from the route
    const [campaignDetail, setCampaignDetail] = useState(null);
    const [linkedKeywordsInput, setLinkedKeywordsInput] = useState('');
    const [isDeleteClicked, setIsDeleteClicked] = useState(false);
    
    const [campaignData, setCampaignData] = useState({
        id: "",
        campaignName: "",
        campaignDescription: "",
        startDate: "",
        endDate: "",
        digestCampaign: false,
        linkedKeywords: [],
        dailyDigest: "",
    });

    useEffect(() => {
        if (id) {
          async function loadCampaign() {
            try {
                const data = await fetchCampaignData(id)
                setCampaignDetail(data)
                setCampaignData({
                    id: data.id,
                    campaignName: data.campaignName,
                    campaignDescription: data.campaignDescription,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    digestCampaign: data.digestCampaign,
                    linkedKeywords: data.linkedKeywords || [],
                    dailyDigest: data.dailyDigest,
                });
            } catch (error) {
              console.error('Error fetching campaign data:', error);
            }
        }
    
        loadCampaign();
        }
    }, [id]);

    // Function to toggle the 
    const handleIsDeleteClicked = () => {
        setIsDeleteClicked(true);
    };

    const handleCloseIsDeleteClicked = () => {
        setIsDeleteClicked(false);
    };

    const handleSubscriptionToggle = () => {
        setCampaignData((prevData) => ({
          ...prevData,
          digestCampaign: !prevData.digestCampaign,
        }));
    };

    // Handle form input changes
    const handleInputChange = (e) => {
    const {name, value} = e.target;
    setCampaignData({...campaignData, [name]: value});
    };

    // Handle Enter key press to add a keyword to the array
    const handleLinkedKeywordsInput = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (linkedKeywordsInput.trim()) {
                setCampaignData((prevData) => ({
                ...prevData,
                linkedKeywords: [...prevData.linkedKeywords, linkedKeywordsInput.trim()],
                }));
                setLinkedKeywordsInput(''); // Clear input after adding
            }
        }
    };

    // Handle keyword deletion
    const handleDeleteKeyword = (index) => {
        setCampaignData((prevData) => ({
        ...prevData,
        linkedKeywords: prevData.linkedKeywords.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(campaignData),
          });

          if (response.ok) {
            alert('Campaign updated successfully');
          } else {
            alert('Failed to update campaign ');
          }
        } catch (error) {
            alert(error)
          console.error('Error updating campaign:', error);
        }
    };

    // Function to handle delete action
    const handleDelete = async (id) => {
        try {
            const response = await deleteCampaign(id)
            if (response.ok) {
                alert('Campaign deleted successfully');
                redirect.push("/campaign")
            } else {
                alert('Failed to delete campaign');
            }
        } catch (error) {
        console.error('Error deleting campaign:', error);
        }
    };
        
    if (!campaignDetail) {
        return <p className="text-black">Loading...</p>
    }

    return(
        <main className="w-full">
            <div className="px-20 py-11 font-[family-name:var(--font-nunito)] font-medium text-sm text-gray-600">
                <Link href="/campaign">
                    <div className="flex items-center font-semibold text-base mb-6">
                            <Image 
                                src={"/arrow.png"}
                                width={24}
                                height={24}
                                alt=""
                                className="mr-2"
                            />
                            <p>Back</p>
                    </div>
                </Link>
                <div className="flex justify-between items-center mb-4 w-4/5">
                    <h1 className="text-xl font-[family-name:var(--font-work-sans)] font-bold text-customTeal">
                        Campaign Information
                    </h1>
                    <div className="flex items-center p-2 bg-backgroundTeal">
                        <div className="border-r-2 px-2">Campaign Status</div>
                        <p></p>
                    </div>
                </div>
                
                <form className="w-4/5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="campaignName" className="mb-1">
                                Campaign Name <span className="text-red-800">*</span> 
                            </label> 
                            <input
                                id="campaignName"  
                                type="text" 
                                name="campaignName"
                                value={campaignData.campaignName}
                                onChange={handleInputChange}
                                placeholder="e.g The Future is now" 
                                className="p-2.5 border rounded"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="campaignDescription" className="mb-1">
                                Campaign Description
                            </label> 
                            <textarea 
                            id="campaignDescription"
                            name="campaignDescription" 
                            value={campaignData.campaignDescription}
                            onChange={handleInputChange}
                            placeholder="Please add a description to your campaign" 
                            className="p-2.5 border rounded h-28 text-start" />
                        </div>
                        <div className="flex space-x-6">
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="startDate" className="mb-1">
                                    Start Date <span className="text-red-800">*</span> 
                                </label> 
                                <input 
                                    type="text" 
                                    id="startDate"
                                    name="startDate"
                                    value={campaignData.startDate}
                                    onChange={handleInputChange}
                                    placeholder="dd/mm/yy" 
                                    className="p-2.5 border rounded "
                                    required
                                />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="endDate" className="mb-1">
                                    End Date 
                                </label> 
                                <input 
                                    type="text" 
                                    id="endDate" 
                                    name="endDate"
                                    value={campaignData.endDate}
                                    onChange={handleInputChange}
                                    placeholder="dd/mm/yy" 
                                    className="p-2.5 border rounded"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="linkedKeywords" className="mb-1">
                                Linked Keywords <span className="text-red-800">*</span> 
                            </label> 
                            <textarea 
                                id="linkedKeywords" 
                                name="linkedKeywords"
                                value={linkedKeywordsInput}
                                onChange={(e) => setLinkedKeywordsInput(e.target.value)}
                                onKeyDown={handleLinkedKeywordsInput}
                                placeholder="To add keywords, type your keyword and press enter" 
                                className="p-2.5 border rounded h-20"   
                            >  
                            </textarea>
                            <div className="mt-2">
                                {campaignData.linkedKeywords.map((keyword, index) => (
                                    <span
                                        key={index}
                                        className="bg-customTeal text-gray-100 py-1 px-2 rounded mr-2 mb-2 inline-block cursor-pointer"
                                        onClick={() => handleDeleteKeyword(index)} // Delete feature on click
                                    >
                                        {keyword} &times; {/* Display "x" to indicate deletion */}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex justify-between pt-2">
                            <p>Want to recieve daily digest about the campaign?</p>
                            <div>
                                {/* Toggle switch button */}
                                <div
                                    className={`relative inline-block w-12 h-6 transition duration-200 ease-linear rounded-full cursor-pointer 
                                    ${campaignData.digestCampaign ? 'bg-purple-700' : 'bg-gray-300'}`}
                                    onClick={handleSubscriptionToggle}
                                >
                                    <span
                                    className={`absolute top-0 left-0 w-6 h-6 bg-white border-2 rounded-full transition-transform duration-200 ease-linear
                                    transform ${campaignData.digestCampaign ? 'translate-x-6' : 'translate-x-0'}`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1">
                                Kindly select how often you want to recieve daily digest
                            </label> 
                            <select 
                                name="dailyDigest"
                                value={campaignData.dailyDigest}
                                onChange={handleInputChange}
                                className="p-2.5 border rounded"
                            >
                                <option value="" disabled>Select</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-10 flex font-semibold space-x-5">
                        <div onClick={handleIsDeleteClicked} className="py-2.5 cursor-pointer w-48 bg-red-800 rounded text-gray-200 text-center">
                            Stop Campaign
                        </div>
                        <button 
                        type="submit" 
                        className="py-2.5 w-48 border border-customTeal text-customTeal rounded text-center" 
                        >
                            Edit Information
                        </button>
                    </div>
                </form>
            </div>

            {isDeleteClicked && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="px-16 py-20 bg-white p-8 rounded-lg shadow-md text-center text-gray-600">
                    <h2 className="pb-4 text-xl font-bold mb-4 border-b-2 text-gray-800">Stop Campaign</h2>
                    <div className="my-11">
                        <p>Are you sure you want to delete this campaign?</p>
                        <p>This action cannot be undone.</p>
                    </div>
                    <div className="flex space-x-4 justify-center text-xs">
                        <div
                            className="px-4 py-2 w-32 border border-black text-black rounded hover:bg-gray-300"
                            onClick={handleCloseIsDeleteClicked}
                        >
                            Cancel
                        </div>
                        
                        <button
                            className="px-4 py-2 w-32 bg-red-800 text-gray-200 rounded hover:bg-red-500"
                            onClick={() => handleDelete(id)}
                        >
                            Delete Campaign
                        </button>
                    </div>
                </div>
                </div>
            )}
        </main>
    )
}