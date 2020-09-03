import { FormLabel, Switch } from "@chakra-ui/core";
import { InputHTMLAttributes } from "react";
import { useField } from "formik";

type SwitchFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
};

export const SwitchField: React.FC<SwitchFieldProps> = ({
	label,
	size: _,
	...props
}) => {
	const [{ checked, onChange, ...field }, , { setValue }] = useField({
		...props,
		type: "checkbox",
	});
	return (
		<>
			<FormLabel htmlFor="maxReservations">{label}</FormLabel>
			<Switch
				{...field}
				{...props}
				isChecked={checked}
				id="maxReservations"
				onClick={() => {
					setValue(!checked);
					// TODO: verder werken en custom component van de switch maken, zie formik docs, wss met useField
				}}
			/>
		</>
	);
};
