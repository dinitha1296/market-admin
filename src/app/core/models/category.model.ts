import { SubDepartment } from "./sub-department.model";

export interface Category {

    categoryId: number;
    categoryName: string;
    categoryCode: string;
    subDepartment: SubDepartment
}