import Axios, { AxiosResponse } from "axios";
import { instance } from "../shared/api";
import AdvancedPaymentOfOperatingCosts from "./AdvancedPaymentOfOperatingCosts";
import FeeStep from "./FeeStep";
import Flat from "./Flat";
import OperatingCosts, { calculateTotalOperatingCosts } from "./OperatingCosts";
import Tenant from "./Tenant";

export default interface Contract {
    readonly _id: number,
    tenants: Tenant[],
    flat: Flat[], // because restdb.io sends always an array
    fee: number,
    feesteps?: FeeStep[],
    advancedpaymentofoperatingcosts?: AdvancedPaymentOfOperatingCosts[],
    startDate: Date,
    endDate?: Date
}

export const calculateForUpcomingYear = (operatingCosts: OperatingCosts, totalSize: number): Promise<void | AxiosResponse<any>> => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const sum = calculateTotalOperatingCosts(operatingCosts);

    const requests: Promise<AxiosResponse<any>>[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any

    return instance.get<Contract[]>('/contract?q={"$or":[{"endDate":{"$exists":false}},{"endDate":{"$gt":{"$date":"$now"}}}],"startDate":{"$lte":{"$date":"$now"}}}').then((response) => {
        response.data.map(contract => {
            const partOfTotalSize = contract.flat[0].size / totalSize;

            const contract_ = { ...contract };
            let operatingCosts_: AdvancedPaymentOfOperatingCosts[] = [];

            if (contract_.advancedpaymentofoperatingcosts) {
                operatingCosts_ = [...contract_.advancedpaymentofoperatingcosts]
            }

            const newOperatingCosts = { year: operatingCosts.year + 1, amount: Math.floor(sum * partOfTotalSize / 12) };
            operatingCosts_.push(newOperatingCosts);
            contract_.advancedpaymentofoperatingcosts = operatingCosts_;

            const request = instance.put(`/contract/${contract._id}`, contract_);
            requests.push(request)
        });

        return Axios.all(requests)
            .then(() => {
                const data = { ...operatingCosts, allocated: true };
                return instance.put(`/operatingcosts/${operatingCosts._id}`, data);
            })
            .catch((errors) => {
                console.error(errors);
            });
    });
}