import * as Yup from 'yup';

const useEmployeeSchema = () => {
    return Yup.object().shape({
        name: Yup.string().required("Name is required"),
        dob: Yup.string().required("Date of Birth is required"),
        gender: Yup.string().required("Gender is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        address: Yup.string().required("Address is required"),
    });
};

export default useEmployeeSchema;