export default interface Tenant {
    readonly _id: number
    name: string,
    dateOfBirth: Date,
    address: string,
    phone: string,
    email: string
}