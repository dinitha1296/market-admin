import { Department } from "./index";

export interface SubDepartment {
    subDepartmentId: number;
    subDepartmentName: string;
    subDepartmentCode: string;
    department: Department;
}