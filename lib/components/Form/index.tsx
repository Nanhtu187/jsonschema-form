import {FormProps} from "../../utils/src/types.ts";

export const Form = (props: FormProps) => {
    return (
        <>
            {props.schema.$id}
        </>
    );
}