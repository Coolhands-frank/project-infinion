"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function addCampaign() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [linkedKeywordsInput, setLinkedKeywordsInput] = useState('');

    const [campaignData, setCampaignData] = useState({
        campaignName: "",
        campaignDescription: "",
        startDate: "",
        endDate: "",
        digestCampaign: false,
        linkedKeywords: [],
        dailyDigest: "",
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCampaignData({...campaignData, [name]: value});
    };

    const handleSubscriptionToggle = () => {
        setCampaignData((prevData) => ({
          ...prevData,
          digestCampaign: !prevData.digestCampaign,
        }));
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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
        const response = await fetch('https://infinion-test-int-test.azurewebsites.net/api/Campaign', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(campaignData), // Send form data as JSON
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Item added:', result);
            setCampaignData({ campaignName: '', campaignDescription: '', startDate: '', endDate: '', digestCampaign: false, linkedKeywords: [], dailyDigest: ''});
            alert('Item successfully added!');
        } else {
            console.error('Error adding item:', result);
            alert('Failed to add item.');
        }
        } catch (error) {
        console.error('Request failed:', error);
        alert('An error occurred. Please try again.');
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <main className="w-full">
            <div className="px-20 py-11 font-[family-name:var(--font-nunito)] font-medium text-sm text-gray-600">
                <h1 className="mb-6 text-xl font-[family-name:var(--font-work-sans)] font-bold text-customTeal">Create New Campaign</h1>
                
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
                        <div className="flex space-x-10">
                            <div className="flex flex-col">
                                <label htmlFor="startDate" className="mb-1">
                                    Start Date <span className="text-red-800">*</span> 
                                </label> 
                                <input 
                                    type="date" 
                                    id="startDate"
                                    name="startDate"
                                    value={campaignData.startDate}
                                    onChange={handleInputChange} 
                                    placeholder="" 
                                    className="p-2.5 border rounded"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="endDate" className="mb-1">
                                    End Date 
                                </label> 
                                <input 
                                    type="date" 
                                    id="endDate" 
                                    name="endDate"
                                    value={campaignData.endDate}
                                    onChange={handleInputChange}
                                    placeholder="" 
                                    className="p-2.5 border rounded"
                                />
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
                            />
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
                        <div className="flex flex-col">
                            <label className="mb-1">
                                Kindly select how often you want to recieve daily digest
                            </label> 
                            <select 
                                name="dailyDigest"
                                value={campaignData.dailyDigest}
                                onChange={handleInputChange}
                                className="p-2.5 border rounded w-28"
                            >
                                <option value="" disabled>Select</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-10 flex font-semibold space-x-5">
                        <Link href="/">
                            <div className="py-2.5 w-48 border border-customTeal rounded text-customTeal text-center">Cancel</div>
                        </Link>
                        <button 
                        type="submit" 
                        className="py-2.5 w-48 bg-customTeal rounded text-gray-200 text-center" 
                        disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Create Campaign"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}