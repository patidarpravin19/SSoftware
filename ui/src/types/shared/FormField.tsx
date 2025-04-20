export type FormField =
    | {
        name: string;
        label: string;
        type: "text" | "number" | "email" | "password" | "textarea";
        required?: boolean;
    }
    | {
        name: string;
        label: string;
        type: "select";
        options: { label: string; value: string | number }[];
        required?: boolean;
    }
    | {
        name: string;
        label: string;
        type: "checkbox";
        required?: boolean;
    }
    | {
        name: string;
        label: string;
        type: "radio";
        options: { label: string; value: string }[];
        required?: boolean;
    }
    | {
        name: string;
        label: string;
        type: "switch";
        required?: boolean;
    }
    | {
        name: string;
        label: string;
        type: "date";
        required?: boolean;
    };
