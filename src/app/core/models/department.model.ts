import { SubDepartment } from "./sub-department.model";

export interface Depratment {

    departmentId: String,
    departmentName: String,
    departmentCode: String,
    subDepartments: Set<SubDepartment>,
}