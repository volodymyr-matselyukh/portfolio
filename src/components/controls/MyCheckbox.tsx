import { Form, Label } from "semantic-ui-react";
import { FieldHookConfig, useField } from "formik";

export default function MyCheckbox(props: FieldHookConfig<any>) {
	const [field, meta] = useField(props);

	return (
		<>
			<Form.Field label={props["aria-label"]} control='input' type='checkbox'
				{...field} 
				{...meta}
				checked={meta.value}
			/>

			{meta.touched && meta.error ? (
				<Label basic color="red">
					{meta.error}
				</Label>
			) : null}
		</>
	);
}
