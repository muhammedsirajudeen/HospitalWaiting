import { hashPassword, verifyPassword } from "~/lib/bcryptHelper";
import pool from "./pool";

interface User {
    id: number; // Corresponds to the integer primary key
    email: string; // Corresponds to the TEXT column (non-nullable)
    password: string; // Corresponds to the TEXT column (non-nullable)
    authorization: string; // Optional field (TEXT, nullable)
    location: string; // Optional field (TEXT, nullable)
    oauth: boolean; // Corresponds to the BOOLEAN column (default false)
    created_at: string; // Corresponds to the timestamp without time zone (string or Date)
    updated_at: string; // Corresponds to the timestamp without time zone (string or Date)
}

async function LoginUser(email:string,password:string):Promise<null | User>{
    try {
        const result=await pool.query('SELECT * FROM users WHERE email=$1 AND password = $2',[email,password])
        return null
    } catch (error) {
        console.log(error)
        return null
    }
}

export default {
    LoginUser
}