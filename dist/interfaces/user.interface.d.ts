export interface IUser extends Document {
    name?: string;
    username: string;
    email: string;
    password: string;
    about?: string;
    profile_url?: string;
    authProvider: "email" | "google";
    social_links?: {
        key: string;
        value: string;
    }[];
    createdAt: string | Date;
    updateAt: string | Date;
}
