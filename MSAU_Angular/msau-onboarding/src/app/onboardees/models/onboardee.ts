export interface OnboardeeModel {
    fname: string,
    lname: string,
    email: string,
    phone: number,
    dob: string,
    startDate: string,
    location: string,
    managerId: number
    bgcStatus: string
    onboardStatus: string,
    etaCompletion: string
    skills: {
        skillList: Array<any>
    }
}
