export interface GlobalSelectProps {
    isLoading?: boolean;
    handleChange?: ((value: string, option: OptionType | OptionsType) => void);
}

export type OptionType = {
    value: string;
    label: string;
} | undefined

export type OptionsType = {
    value: string;
    label: string;
}[] | undefined

