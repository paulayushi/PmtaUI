export interface User {
    memberId: number;
    name: string;
    experience: string;
    skillset: string[];
    description: string;
    projectStartDate: Date;
    projectEndDate: Date;
    allocationPercentage: number;
    isManager: boolean;
    password: string;
}