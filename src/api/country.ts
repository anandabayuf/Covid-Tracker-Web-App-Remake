import instance from '.';

const getAllCountries: () => any = async () => {
    try {
        const response = await instance({url: '/countries'});

        return response;
    }
    catch (error) {
        return error;
    }
}

const getCountryConfirmed: (country: string) => any = async (country) => {
    try {
        const response = await instance({url: `/countries/${country}/confirmed`});

        return response;
    }
    catch (error) {
        return error;
    }
}

const getCountryRecovered: (country: string) => any = async (country) => {
    try {
        const response = await instance({url: `/countries/${country}/recovered`});

        return response;
    }
    catch (error) {
        return error;
    }
}

const getCountryDeaths: (country: string) => any = async (country) => {
    try {
        const response = await instance({url: `/countries/${country}/deaths`});

        return response;
    }
    catch (error) {
        return error;
    }
}

export {
    getAllCountries,
    getCountryConfirmed,
    getCountryDeaths,
    getCountryRecovered
}