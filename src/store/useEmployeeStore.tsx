import { create } from "zustand";
import { EmployeeStore } from "../types/type";

const data = [
    {
        "id": "1",
        "name": "Nguyễn Văn A",
        "dob": "1990-05-15",
        "gender": "Male",
        "email": "nguyenvana@example.com",
        "address": "Hà Nội, Việt Nam"
    },
    {
        "id": "2",
        "name": "Trần Thị B",
        "dob": "1995-08-22",
        "gender": "Female",
        "email": "tranthib@example.com",
        "address": "TP. Hồ Chí Minh, Việt Nam"
    },
    {
        "id": "3",
        "name": "Phạm Văn C",
        "dob": "1988-03-10",
        "gender": "Male",
        "email": "phamvanc@example.com",
        "address": "Đà Nẵng, Việt Nam"
    },
    {
        "id": "4",
        "name": "Lê Thị D",
        "dob": "1992-11-05",
        "gender": "Female",
        "email": "lethid@example.com",
        "address": "Hải Phòng, Việt Nam"
    },
    {
        "id": "5",
        "name": "Hoàng Văn E",
        "dob": "1985-07-30",
        "gender": "Male",
        "email": "hoangvane@example.com",
        "address": "Cần Thơ, Việt Nam"
    }
]

const useEmployeeStore = create<EmployeeStore>((set) => ({
    employees: data,
    addEmployee: (employee) => set((state) => ({ employees: [...state.employees, employee] })),
    updateEmployee: (id, updatedEmployee) =>
        set((state) => ({
            employees: state.employees.map((emp) => (emp.id === id ? updatedEmployee : emp)),
        })),
    deleteEmployee: (id) => set((state) => ({ employees: state.employees.filter((emp) => emp.id !== id) })),
}));

export default useEmployeeStore;