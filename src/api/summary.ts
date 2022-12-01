import instance from ".";

const getAllSummary: () => any = async () => {
    try{
        const response = await instance({});
        
        return response;
    }
    catch (error) {
        return error;
    }
}

const getSummaryByCountry: (country: string) => any = async (country: string) => {
    try{
        const response = await instance({url: `/countries/${country}`})
        return response;
    }
    catch (error) {
        return error;
    }
}

const getAllDailyData: () => any = async () => {
    try{
        const response = await instance({url: `/daily`});
        
        return response;
    }
    catch (error) {
        return error;
    }
}

const getAllConfirmed: () => any = async () => {
    try{
        const response = await instance({url: `/confirmed`});
        
        return response;
    }
    catch (error) {
        return error;
    }
}

const getAllRecovered: () => any = async () => {
    try{
        const response = await instance({url: `/recovered`});
        
        return response;
    }
    catch (error) {
        return error;
    }
}

const getAllDeaths: () => any = async () => {
    try{
        const response = await instance({url: `/deaths`});
        
        return response;
    }
    catch (error) {
        return error;
    }
}

export {
    getAllSummary,
    getSummaryByCountry,
    getAllDailyData,
    getAllConfirmed,
    getAllRecovered,
    getAllDeaths
}