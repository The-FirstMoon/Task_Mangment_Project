import { ROLE } from "../../utils/constants"

export interface UserModel {
    id: number,
    email: string,
    username: string,
    password_hash: string,
    role: ROLE,
    update_date: Date,
    created_date: Date
}
