import { Category } from './index'

export interface CategoryTree {
  [department: string]: {
    [subDepartment: string]: Category[]
  }
}