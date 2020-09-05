import {
	Flex,
	InputGroup,
	InputAddon,
	Text,
	NumberInput,
	Icon,
	Popover,
	PopoverTrigger,
	PopoverContent,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	FlexProps,
	FormErrorMessage,
	FormControl,
} from "@chakra-ui/core";
import { useState, useEffect } from "react";
import { isLeapYear } from "./../../utils/isLeapYear";

// Check for max days of the month
const calculateMax = (month: number, year: number) => {
	switch (month) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			return 31;
		case 2:
			return isLeapYear(year) ? 29 : 28; // TODO: Check for leap year
		case 4:
		case 6:
		case 9:
		case 11:
			return 30;
		default:
			console.log("Invalid month.");
			return 31;
	}
};

type DateProps = FlexProps & {
	label: string;
	initialDate: number;
	onNewDate: (date: number) => void;
	disabled?: boolean;
	error?: string;
};

export const DateField: React.FC<DateProps> = ({
	label,
	initialDate,
	onNewDate,
	disabled = false,
	error,
	...props
}) => {
	const [day, setDay] = useState<number>(new Date(initialDate).getDate());
	const [month, setMonth] = useState<number>(
		new Date(initialDate).getMonth() + 1
	);
	const [year, setYear] = useState<number>(
		new Date(initialDate).getFullYear()
	);
	const [hour, setHour] = useState<number>(new Date(initialDate).getHours());
	const [minute, setMinute] = useState<number>(
		new Date(initialDate).getMinutes()
	);

	const [dayMax, setDayMax] = useState(() => calculateMax(month, year));

	useEffect(() => {
		const newDate = new Date(year, month - 1, day, hour, minute).getTime();
		onNewDate(newDate);
	}, [day, month, year, hour, minute]);

	return (
		<Flex justify="center" align="center" maxW="100%" mt={2} {...props}>
			<Text mr={2}>{label}</Text>
			<Flex align="center" justify="center" flexDir="column">
				<Flex justify="center" align="center">
					<InputGroup size="sm" maxW={{ sm: "90%", md: "80%" }}>
						<NumberInput
							rounded={0}
							width="calc(33.3333% - 20px)"
							value={day}
							onChange={value => setDay(value as number)}
							min={1}
							max={dayMax}
							isDisabled={disabled}
						>
							<NumberInputField />
							<NumberInputStepper
								display={{ sm: "none", md: "flex" }}
							>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<InputAddon
							children="/"
							w={31}
							opacity={disabled ? 0.5 : 1}
						/>
						<NumberInput
							rounded={0}
							width="calc(33.3333% - 20px)"
							value={month}
							onChange={value => {
								setMonth(value as number);
								const max = calculateMax(month + 1, year);
								if (day >= max) setDay(max);
								setDayMax(calculateMax(month + 1, year));
							}}
							min={1}
							max={12}
							isDisabled={disabled}
						>
							<NumberInputField />
							<NumberInputStepper
								display={{ sm: "none", md: "flex" }}
							>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<InputAddon
							children="/"
							w={31}
							opacity={disabled ? 0.5 : 1}
						/>
						<NumberInput
							rounded={0}
							width="calc(33.3333% - 20px)"
							value={year}
							onChange={value => setYear(value as number)}
							min={2020}
							max={2100}
							isDisabled={disabled}
						>
							<NumberInputField />
							<NumberInputStepper
								display={{ sm: "none", md: "flex" }}
							>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</InputGroup>
					<Popover trigger="hover">
						<PopoverTrigger>
							<Icon
								name="info"
								ml={2}
								color="green.400"
								opacity={disabled ? 0.5 : 1}
							/>
						</PopoverTrigger>

						<PopoverContent zIndex={1} w="auto" px={2} py={1}>
							<Flex justify="center" align="center">
								<Text>Day/Month/Year</Text>
							</Flex>
						</PopoverContent>
					</Popover>
				</Flex>
				<Flex justify="center" align="center">
					<InputGroup
						size="sm"
						maxW={{ sm: "90%", md: "80%" }}
						mt={2}
					>
						<NumberInput
							rounded={0}
							width="calc(50% - 15.5px)"
							value={hour}
							onChange={value => setHour(value as number)}
							min={0}
							max={23}
							isDisabled={disabled}
						>
							<NumberInputField />
							<NumberInputStepper
								display={{ sm: "none", md: "flex" }}
							>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<InputAddon
							children=":"
							w={31}
							opacity={disabled ? 0.5 : 1}
						/>
						<NumberInput
							rounded={0}
							width="calc(50% - 15.5px)"
							value={minute}
							onChange={value => setMinute(value as number)}
							min={0}
							max={59}
							isDisabled={disabled}
						>
							<NumberInputField />
							<NumberInputStepper
								display={{ sm: "none", md: "flex" }}
							>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</InputGroup>
					<Popover trigger="hover">
						<PopoverTrigger>
							<Icon
								name="info"
								ml={2}
								color="green.400"
								opacity={disabled ? 0.5 : 1}
							/>
						</PopoverTrigger>

						<PopoverContent zIndex={1} w="auto" px={2} py={1}>
							<Flex justify="center" align="center">
								<Text>Hour:Minute</Text>
							</Flex>
						</PopoverContent>
					</Popover>
				</Flex>
			</Flex>
		</Flex>
	);
};
