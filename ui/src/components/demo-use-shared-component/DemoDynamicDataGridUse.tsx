import React, { useState } from "react";
import DynamicDataGrid from "../shared/DynamicDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { Alert, Snackbar } from "@mui/material";
// Custom icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DynamicDialog from "../shared/DynamicDialog";
import CustomForm from "../shared/CustomForm";


const DemoDynamicDataGridUse = () => {

    const currentUser = {
        role: "Editor",
        permissions: ["view", "edit", "delete"], // no delete access
    };

    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
    const [open, setOpen] = useState(false);
    const [rowData, setRowData] = useState(null);
    const [dialogTitle, setDialogTitle] = useState('');

    const onActionClick = (row: any, msg: string, severity = "info") => {
        setOpen(true);
        setRowData(row);

        setDialogTitle(msg);
    }

    const handleClose = (action: string) => {
        setOpen(false);
        //setSnackbar({ open: true, message: msg, severity });
    }


    const paginationModel = { page: 0, pageSize: 5 };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 10 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ] as any[];

    // 🎯 You control which actions show and what they do
    const hasPermission = (perm: any) => currentUser.permissions.includes(perm);

    const rowActions = [
        {
            label: "View",
            icon: <VisibilityIcon />,
            onClick: (row: any) => onActionClick(row, `Viewing ${row.firstName}`),
            canRender: () => hasPermission("view"),
        },
        {
            label: "Edit",
            icon: <EditIcon />,
            color: "warning",
            onClick: (row: any) => onActionClick(row, `Editing ${row.firstName}`),
            canRender: () => hasPermission("edit"),
        },
        {
            label: "Delete",
            icon: <DeleteIcon />,
            color: "error",
            onClick: (row: any) => {
                // setRows((prev) => prev.filter((r) => r.id !== row.id));
                onActionClick(row, `Delete ${row.firstName}`);
            },
            canRender: () => hasPermission("delete"), // 🔥 won't show if no permission
        }
    ];

    return (
        <div style={{ padding: 20 }}>
            <h2>Dynamic Grid Example</h2>
            <DynamicDataGrid columns={columns} rows={rows} autoHeight={true} paginationModel={paginationModel}
                actions={rowActions} />

            {/* Dialog rendering */}
            <DynamicDialog open={open} title={dialogTitle} onClose={handleClose}
                data={rowData}
                content={<CustomForm />}
                buttons={[
                    { label: 'Cancel', action: 'cancel', variant: 'outlined' },
                    { label: 'Save', action: 'confirm', variant: 'contained', color: 'primary' },
                ]} />
            <Snackbar
                open={snackbar.open}
                autoHideDuration={2000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={"success"}>{snackbar.message}</Alert>
            </Snackbar>
        </div>
    );
};

export default DemoDynamicDataGridUse;
