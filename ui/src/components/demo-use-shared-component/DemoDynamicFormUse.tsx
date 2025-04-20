// App.tsx
import React from "react";
import { z } from "zod";
import { FormField } from "../../types/shared/FormField";
import DynamicForm from "../shared/DynamicForm";

const formFields: FormField[] = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "gender", label: "Gender", type: "radio", options: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]},
  { name: "country", label: "Country", type: "select", options: [
    { label: "USA", value: "usa" },
    { label: "India", value: "india" },
  ]},
  { name: "subscribe", label: "Subscribe to Newsletter", type: "checkbox" },
  { name: "dob", label: "Date of Birth", type: "date" },
];

const schema = z.object({
  fullName: z.string().nonempty("Full Name is required"),
  email: z.string().nonempty("Email is required").email("Invalid email"),
  gender: z.string(),
  country: z.string(),
  subscribe: z.boolean().optional(),
  dob: z.date({ required_error: "Date is required" }),
});

function DemoDynamicFormUse() {
  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Shared Dynamic Form</h2>
      <DynamicForm fields={formFields} schema={schema} onSubmit={handleFormSubmit} />
    </div>
  );
}

export default DemoDynamicFormUse;
