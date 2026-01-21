export interface CreateUserDto {
    name?: string;
    username: string;
    email: string;
    password: string;
    about?: string;
    profile_url?: string;


    social_links?: [{
        key: string;
        value: string
    }];
}