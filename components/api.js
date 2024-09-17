
export async function getCampaign(){
    const response = await fetch('https://infinion-test-int-test.azurewebsites.net/api/Campaign');
    const result = await response.json();   
    // Checks if the result is an array and slice the first 50 objects
    if (Array.isArray(result)) {
        const limitedCampaignData = result.slice(-50).map(item => {
            const startDate = new Date(item.startDate); // Converts the date string to a Date object
            const formattedStartDate = {
                startYear: startDate.getFullYear(),
                startMonth: startDate.getMonth() + 1, // Months are zero-based in JS, so add 1
                startDay: startDate.getDate(),
                ...item // Keep other object fields intact
            };
            return formattedStartDate;
            });
        return limitedCampaignData;
    } else {
        throw new Error("API response is not an array");
    } 
}

export async function fetchCampaignData(id) {
    const response = await fetch(`https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`); 
    const result = await response.json();
    const campaignInformation = result
    return campaignInformation;
}

export async function addCampaign(campaignData) {
    const response = await fetch('https://infinion-test-int-test.azurewebsites.net/api/Campaign', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData), // Send form data as JSON
    });
    const data = response
    return data
}

export async function deleteCampaign(id) {
    const response = await fetch(`https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`, {
        method: 'DELETE',
    });
    return response
}
