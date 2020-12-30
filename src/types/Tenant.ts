import { Gender } from "./Gender";

export default interface Tenant {
    readonly _id: number
    gender: Gender,
    name: string,
    dateOfBirth: Date,
    address: string,
    phone: string,
    email: string
}