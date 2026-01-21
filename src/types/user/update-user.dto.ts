export interface UpdateUserDto {
    about?: string;
    profile_url?: string;


    social_links?: {
        key: string;
        value: string
    }[];
}