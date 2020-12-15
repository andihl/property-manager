export default interface OperatingCosts {
    readonly _id: number,
    year: number,
    water: number,
    electricity: number,
    chimneysweep: number,
    insurance: number,
    salary: number,
    garbagedisposal: number,
    garden: number,
    tax: number,
    allocated: boolean
}

export const calculateTotalOperatingCosts = (oc: OperatingCosts): number => {
    return oc.water +
        oc.electricity +
        oc.chimneysweep +
        oc.insurance +
        oc.salary +
        oc.garbagedisposal +
        oc.garden +
        oc.tax
}