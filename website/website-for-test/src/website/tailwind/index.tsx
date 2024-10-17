import { Form } from "@nanhtu/tailwind";
import { zodSchemaBasic } from "./schema";
// import { SwitchToReadonly } from "../components/SwitchToReadonly";

export const TailwindExample = () => {
  return (
    <div>
      <h2>Zod Schema Form</h2>
      <Form
        schema={zodSchemaBasic}
        onSubmit={(data: any) => console.log("Zod:", data)}
        onError={(errors: any) => console.error("Zod:", errors)}
      />
    </div>
  );
};

// const ZodSchemaComplexExample = () => {
//   return (
//     <div>
//       <h2>Complex Zod Schema Form</h2>
//       <FormProvider schema={zodSchema} initialData={initialFormData}>
//         <SwitchToReadonly contextHook={useFormContext} />
//         <BaseFormRoot
//           onSubmit={(data) => console.log("Zod:", data)}
//           onError={(errors) => console.error("Zod:", errors)}
//         />
//       </FormProvider>
//     </div>
//   );
// };
