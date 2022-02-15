import { Category } from "./category.model";

export interface SubDepartment {
    subDepartmentId: String;
    subDepartmentName: String;
    subDepartmentCode: String;
    categories: Set<Category>
}