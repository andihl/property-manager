import FeeStep from "./FeeStep";
import Flat from "./Flat";
import Tenant from "./Tenant";

export default interface Contract {
    _id: number,
    tenants: Tenant[],
    flat: Flat[], // because restdb.io sends always an array
    fee: number,
    feesteps?: FeeStep[],
    startDate: Date,
    endDate?: Date
}