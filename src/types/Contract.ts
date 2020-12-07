import FeeStep from "./FeeStep";
import Flat from "./Flat";
import Tenant from "./Tenant";

export default interface Contract {
    id: number,
    tenants: Tenant[],
    flat: Flat,
    fee: number,
    feeSteps: FeeStep[]
}