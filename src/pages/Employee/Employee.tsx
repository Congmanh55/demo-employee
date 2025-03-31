import { Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material'
import { useState } from 'react'
import { EmployeeForm } from '../../components/Employee/EmployeeForm'
import useEmployeeStore from '../../store/useEmployeeStore'
import { IEmployee } from '../../types/type'

const Employee = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderBy, setOrderBy] = useState<string>('name');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | undefined>();
    const { employees, deleteEmployee } = useEmployeeStore()

    const onOpenModal = () => {
        setIsOpen(true)
        setSelectedEmployee(undefined)
    }

    const handleEdit = (item: IEmployee) => {
        setIsOpen(true)
        setSelectedEmployee(item)
    }

    const handelSort = (property: keyof IEmployee) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const sortedEmployees = [...employees].sort((a, b) => {
        const key = orderBy as keyof IEmployee;
        if (!a[key] || !b[key]) return 0;
        return order === 'asc'
            ? String(a[key]).localeCompare(String(b[key]))
            : String(b[key]).localeCompare(String(a[key]));
    });

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                <h2>Employee</h2>
                <Button variant="contained" color="primary" onClick={onOpenModal}>Add Employee</Button>
                <EmployeeForm isOpen={isOpen} setIsOpen={setIsOpen} selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />
            </div>
            <Divider />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell

                        >
                            <TableSortLabel
                                active={orderBy === 'name'}
                                direction={orderBy === 'name' ? order : 'asc'}
                                onClick={() => handelSort('name')}>
                                Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Date of Birth</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell

                        >
                            <TableSortLabel
                                active={orderBy === 'address'}
                                direction={orderBy === 'address' ? order : 'asc'}
                                onClick={() => handelSort('address')}
                            >
                                Address
                            </TableSortLabel>

                        </TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        sortedEmployees?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((item: IEmployee) => (
                            <TableRow>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.dob}</TableCell>
                                <TableCell>{item.gender}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.address}</TableCell>
                                <TableCell >
                                    <Button onClick={() => handleEdit(item)} variant="contained" color='primary' >Edit</Button>
                                    <Button onClick={() => deleteEmployee(item.id!)} variant="contained" color="error" sx={{ mx: 2 }}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={employees.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    )
}

export default Employee;
