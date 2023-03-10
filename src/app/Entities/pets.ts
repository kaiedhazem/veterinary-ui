import { Customer } from "./customer";
import { Treatment} from "./treatments";
export class Pets {
    id?: number | string;
    name?: string;
    weight?: number;
    category?: string;
    entryDate?: Date | string
    customer?: Customer
    treatments?: Treatment[];
}

