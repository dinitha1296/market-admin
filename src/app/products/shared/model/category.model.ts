import { SubDepartment } from "./index";

export interface Category {

    categoryId: number;
    categoryName: string;
    categoryCode: string;
    subDepartment: SubDepartment
}