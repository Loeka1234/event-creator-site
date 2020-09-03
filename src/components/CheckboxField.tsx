import * as React from "react";
import { Checkbox } from "@chakra-ui/core";
import { useField } from "formik";

type CheckboxFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
};

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
	label,
	size: _,
	...props
}) => {
	const [field] = useField(props);
	return (
		<Checkbox {...field} {...props}>
			{label}
		</Checkbox>
	);
};
