import { ValidationError } from ".";

export interface ValidationMessages {
  [control: string]: ValidationError[];
}