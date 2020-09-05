import { Formik, Form, FormikHelpers } from "formik";
import InputField from "../InputField";
import {
	Button,
	FormLabel,
	Switch,
	Flex,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Checkbox,
} from "@chakra-ui/core";
import { parse } from "path";
import { CheckboxField } from "../CheckboxField";

type values = {
	title: string;
	description: string;
	useMaxReservations: boolean;
	maxReservations: number;
};

interface EventFormProps {
	onSubmit: (
		values: values,
		formikHelpers: FormikHelpers<values>
	) => void | Promise<void>;
	buttonText: string;
	initialValues?: values;
}

export const EventForm: React.FC<EventFormProps> = ({
	onSubmit,
	buttonText,
	initialValues,
}) => {

	return (
		<>
			<Formik
				initialValues={{
					title: initialValues?.title || "",
					description: initialValues?.description || "",
					useMaxReservations:
						typeof initialValues?.useMaxReservations !== "undefined"
							? initialValues.useMaxReservations
							: false,
					maxReservations:
						typeof initialValues?.maxReservations !== "undefined"
							? initialValues.maxReservations
							: 10,
				}}
				onSubmit={onSubmit}
			>
				{({ isSubmitting, values, setValues }) => (
					<Form>
						<InputField
							name="title"
							label="Title*"
							placeholder="title"
						/>
						<InputField
							name="description"
							label="Description"
							placeholder="description"
							textarea
						/>
						<Flex justify="flex-start" align="center" mt={2}>
							<CheckboxField
								name="useMaxReservations"
								label="Max reservations"
							/>
							<NumberInput
								value={values.maxReservations}
								min={0}
								max={10000}
								maxW={100}
								ml={2}
								isDisabled={!values.useMaxReservations}
								onChange={value => {
									setValues({
										...values,
										maxReservations: parseInt(
											value as string
										),
									});
								}}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</Flex>
						<Button
							type="submit"
							variantColor="teal"
							mt={2}
							isLoading={isSubmitting}
						>
							{buttonText}
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
};
