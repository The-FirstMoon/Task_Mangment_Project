type role = "USER" | "ADMIN"

export interface UserModel {
    id: number,
    email: string,
    username: string,
    password_hash: string,
    role: role,
    update_date: Date,
    created_date: Date
}
