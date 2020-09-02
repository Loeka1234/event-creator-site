import { useField } from "formik";
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Textarea,
} from "@chakra-ui/core";
import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	textarea?: boolean;
};

const InputField: React.FC<Props> = ({
	label,
	size: _,
	textarea = false,
	...props
}) => {
	const [field, { error }] = useField(props);

	const C = textarea ? Textarea : Input;

	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={props.name}>{label}</FormLabel>
			<C {...field} {...props} id={field.name} />
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	);
};

export default InputField;
