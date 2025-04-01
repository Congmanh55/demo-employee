import {
    Box,
    Button,
    Divider,
    MenuItem,
    Modal,
    Select,
    TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { IEmployee } from "../../types/type";
import { v4 as uuidv4 } from "uuid";
import useEmployeeStore from "../../store/useEmployeeStore";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import useEmployeeSchema from "../../hooks/useEmployeeSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
};

export const EmployeeForm = (props: any) => {
    const { isOpen, setIsOpen, selectedEmployee } = props;
    const [originalEmployee, setOriginalEmployee] = useState<IEmployee | null>(null);
    const employeeSchema = useEmployeeSchema();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm<IEmployee>({
        resolver: yupResolver(employeeSchema),
        defaultValues: {
            name: "",
            dob: "",
            gender: "Male",
            email: "",
            address: "",
        },
    });
    const { addEmployee, updateEmployee } = useEmployeeStore();

    const id = uuidv4();

    useEffect(() => {
        if (selectedEmployee) {
            setOriginalEmployee(selectedEmployee);
            Object.keys(selectedEmployee).forEach((key) => {
                setValue(
                    key as keyof IEmployee,
                    selectedEmployee[key as keyof IEmployee]
                );
            });
        } else {
            setOriginalEmployee(null);
            reset({
                name: "",
                dob: "",
                gender: "Male",
                email: "",
                address: "",
            });
        }
    }, [selectedEmployee, setValue, reset]);

    const onClose = () => {
        if (originalEmployee) {
            Object.keys(originalEmployee).forEach((key) => {
                setValue(key as keyof IEmployee, originalEmployee[key as keyof IEmployee]);
            });
        } else {
            reset({
                name: "",
                dob: "",
                gender: "Male",
                email: "",
                address: "",
            });
        }
        setIsOpen(false);
    };

    const onSubmit = (data: IEmployee) => {
        if (selectedEmployee) {
            updateEmployee(selectedEmployee.id, { ...data, id: selectedEmployee.id });
            toast.success("Employee updated successfully!");
        } else {
            addEmployee({ ...data, id });
            toast.success("Employee created successfully!");
        }
        reset({
            name: "",
            dob: "",
            gender: "Male",
            email: "",
            address: "",
        });
        setIsOpen(false);
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={style}>
                <h2 style={{ marginBottom: "50px" }}>
                    {selectedEmployee ? "Edit Employee" : "Add Employee"}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register("name")}
                        label="Name"
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <TextField
                            {...register("dob")}
                            type="date"
                            label="Date of Birth"
                            fullWidth
                            required
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.dob}
                            helperText={errors.dob?.message}
                        />
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue="Male"
                            render={({ field }) => (
                                <Select {...field} fullWidth>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            )}
                        />
                    </Box>
                    <TextField
                        {...register("email")}
                        label="Email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        {...register("address")}
                        label="Address"
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                    />
                    <Divider sx={{ mb: 2 }} />
                    <div style={{ display: "flex", gap: "20px", justifyContent: "end" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mr: 2 }}
                        >
                            {selectedEmployee ? "Update" : "Create"}
                        </Button>
                        <Button onClick={onClose} variant="contained" color="error">
                            Cancel
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};
