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

export {
    getAllCountries
}