export interface ICountry {
    name: string;
    iso2: string;
    iso3: string;
}

export interface SearchBoxProps {
    data?: ICountry[];
    handleChange?: ((value: string, option: OptionType | OptionsType) => void);
    handleSearch?: (value: string) => void;
}

export type OptionType = {
    value: string;
    label: string;
} | undefined

export type OptionsType = {
    value: string;
    label: string;
}[] | undefined

