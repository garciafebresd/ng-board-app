export class UserModel {
    id: number;
    email: string;
    uid: string;
    provider: string;
    allow_password_change: boolean;
    first_name: string;
    last_name: string;
    username: string;
    created_at: Date;
    updated_at: Date;
    password?: string;
}