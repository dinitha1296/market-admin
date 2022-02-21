import { SubDepartment } from "./sub-department.model";

export interface Department {

    departmentId: String,
    departmentName: String,
    departmentCode: String,
    subDepartments: Set<SubDepartment>,
}