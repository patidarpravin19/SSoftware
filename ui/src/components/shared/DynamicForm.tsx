// DynamicForm.tsx
import React from "react";
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    RadioGroup,
    FormControl,
    FormLabel,
    // FormGroup,
    Radio,
    Switch,
    Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodObject } from "zod";
import { FormField } from "../../types/shared/FormField";
import { LocalizationProvider } from "@mui/x-date-pickers";
// import dayjs from "dayjs";


export interface DynamicFormProps {
    fields: FormField[];
    schema: ZodObject<any>;
    onSubmit: (data: any) => void;
    defaultValues?: Record<string, any>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
    fields,
    schema,
    onSubmit,
    defaultValues = {},
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {fields.map((field) => {
                switch (field.type) {
                    case "text":
                    case "email":
                    case "number":
                    case "password":
                    case "textarea":
                        return (
                            <Controller
                                key={field.name}
                                name={field.name}
                                control={control}
                                render={({ field: controllerField }) => (
                                    <TextField
                                        {...controllerField}
                                        type={field.type}
                                        label={field.label}
                                        multiline={field.type === "textarea"}
                                        fullWidth
                                        margin="normal"
                                        error={!!errors[field.name]}
                                        helperText={errors[field.name]?.message as string}
                                    />
                                )}
                            />
                        );

                    case "select":
                        return (
                            <Controller
                                key={field.name}
                                name={field.name}
                                control={control}
                                render={({ field: controllerField }) => (
                                    <FormControl fullWidth margin="normal" error={!!errors[field.name]}>
                                        <FormLabel>{field.label}</FormLabel>
                                        <Select {...controllerField}>
                                            {field.options.map((opt) => (
                                                <MenuItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors[field.name] && (
                                            <span style={{ color: "red", fontSize: 12 }}>
                                                {errors[field.name]?.message as string}
                                            </span>
                                        )}
                                    </FormControl>
                                )}
                            />
                        );

                    case "checkbox":
                        return (
                            <Controller
                                key={field.name}
                                name={field.name}
                                control={control}
                                render={({ field: controllerField }) => (
                                    <FormControlLabel
                                        control={<Checkbox {...controllerField} checked={controllerField.value} />}
                                        label={field.label}
                                    />
                                )}
                            />
                        );

                    case "radio":
                        return (
                            <Controller
                                key={field.name}
                                name={field.name}
                                control={control}
                                render={({ field: controllerField }) => (
                                    <FormControl margin="normal">
                                        <FormLabel>{field.label}</FormLabel>
                                        <RadioGroup {...controllerField} row>
                                            {field.options.map((opt) => (
                                                <FormControlLabel
                                                    key={opt.value}
                                                    value={opt.value}
                                                    control={<Radio />}
                                                    label={opt.label}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                )}
                            />
                        );

                    case "switch":
                        return (
                            <Controller
                                key={field.name}
                                name={field.name}
                                control={control}
                                render={({ field: controllerField }) => (
                                    <FormControlLabel
                                        control={<Switch {...controllerField} checked={controllerField.value} />}
                                        label={field.label}
                                    />
                                )}
                            />
                        );

                    // case "date":
                    //     return (
                    //         <LocalizationProvider>
                    //             <Controller
                    //                 key={field.name}
                    //                 name={field.name}
                    //                 control={control}
                    //                 render={({ field: controllerField }) => (
                    //                     <DatePicker
                    //                         label={field.label}
                    //                         value={controllerField.value || null}
                    //                         onChange={(val) => controllerField.onChange(val)}
                    //                         slotProps={{
                    //                             textField: {
                    //                                 fullWidth: true,
                    //                                 margin: "normal",
                    //                                 error: !!errors[field.name],
                    //                                 helperText: errors[field.name]?.message as string,
                    //                             },
                    //                         }}
                    //                     />
                    //                 )}
                    //             />
                    //         </LocalizationProvider>
                    //     );

                    default:
                        return null;
                }
            })}

            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit
            </Button>
        </form>
    );
};

export default DynamicForm;
