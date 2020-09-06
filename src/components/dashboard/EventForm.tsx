import { Formik, Form, FormikHelpers } from "formik";
import InputField from "../InputField";
import {
	Button,
	Flex,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/core";
import { CheckboxField } from "../CheckboxField";
import { DateField } from "./DateField";

type values = {
	title: string;
	description: string;
	useMaxReservations: boolean;
	maxReservations: number;
	startDate: number;
	useEndDate: boolean;
	endDate: number | null;
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
					startDate: initialValues?.startDate || Date.now(),
					useEndDate: initialValues?.useEndDate || false,
					endDate: initialValues?.endDate || null,
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
						<DateField
							error="123 test 123"
							mt={4}
							label="Date: "
							initialDate={values.startDate}
							onNewDate={newDate =>
								setValues({
									...values,
									startDate: newDate,
								})
							}
						/>
						<Flex w="100%" justify="center" align="center">
							<CheckboxField
								name="useEndDate"
								label="End date: "
							/>
							<DateField
								label=""
								initialDate={
									values.endDate ? values.endDate : Date.now()
								}
								onNewDate={newDate =>
									setValues({
										...values,
										endDate: newDate,
									})
								}
								disabled={!values.useEndDate}
							/>
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
