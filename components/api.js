
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
