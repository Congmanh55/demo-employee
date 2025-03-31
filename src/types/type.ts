export interface IEmployee {
    id?: string;
    name: string;
    dob: string;
    gender: string;
    email: string;
    address: string;
}

export interface EmployeeStore {
    employees: IEmployee[];
    addEmployee: (employee: IEmployee) => void;
    updateEmployee: (id: string, updatedEmployee: IEmployee) => void;
    deleteEmployee: (id: string) => void;
}