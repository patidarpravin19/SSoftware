import React from "react";
import { DataGrid, GridColDef, GridPaginationModel, GridRowsProp } from "@mui/x-data-grid";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import DynamicDialog from "./DynamicDialog";

interface DynamicDataGridProps {
    rows?: GridRowsProp;
    columns?: GridColDef[];
    checkboxSelection?: boolean;
    autoHeight?: boolean;
    paginationModel?: GridPaginationModel;
    actions?: any[];
}

//   const defaultIcons = {
//     edit: <EditIcon />,
//     delete: <DeleteIcon />,
//     view: <VisibilityIcon />,
//   };

const DynamicDataGrid = ({
    rows = [],
    columns = [],
    checkboxSelection = false,
    autoHeight = true,
    paginationModel = { page: 0, pageSize: 10 },
    actions = [],
}: DynamicDataGridProps) => {

    const actionColumn =
        actions.length > 0
            ? [
                {
                    field: "actions",
                    headerName: "Actions",
                    sortable: false,
                    flex: 1,
                    renderCell: (params: any) => (
                        <Stack direction="row" spacing={1}>
                            {actions
                                .filter(
                                    (action) =>
                                        typeof action.canRender !== "function" ||
                                        action.canRender(params.row)
                                )
                                .map((action, idx) => (
                                    <Tooltip title={action.label} key={idx}>
                                        <IconButton
                                            size="small"
                                            color={action.color || "primary"}
                                            onClick={() => action.onClick(params.row)}
                                        >
                                            {action.icon || <span />}
                                        </IconButton>
                                    </Tooltip>
                                ))}
                        </Stack>
                    ),
                },
            ]
            : [];

    const finalColumns = [...columns, ...actionColumn];

    return (
        <div>
            <Box sx={{ width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={finalColumns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection={checkboxSelection}
                    sx={{ border: 0 }}
                    autoHeight={autoHeight}
                />
            </Box>
        </div>
    );
};

export default DynamicDataGrid;
