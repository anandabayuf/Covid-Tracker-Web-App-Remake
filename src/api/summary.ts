import instance from ".";
import { isAxiosError } from 'axios';

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

export {
    getAllSummary,
    getSummaryByCountry
}