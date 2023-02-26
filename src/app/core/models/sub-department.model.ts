import { Department } from "./department.model";

export interface SubDepartment {
    subDepartmentId: number;
    subDepartmentName: string;
    subDepartmentCode: string;
    department: Department;
}