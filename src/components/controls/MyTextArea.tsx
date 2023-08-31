import { FieldHookConfig, useField } from "formik";

interface IProps{
	className: string,
	placeholder:string,
	id: string,
	rows?: number,
	maxLength?: number,
	name: string
}

export default function MyTextArea (props : IProps) {
	const [field, meta] = useField(props.name);

	return (
		<textarea
			className={props.className}
			placeholder={props.placeholder}
			rows={props.rows || 4}
			id={props.id}
			maxLength={props.maxLength}
			{...field}
		></textarea>
	);
};