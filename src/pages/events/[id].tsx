import { NextPage } from "next";
import { withApollo } from "../../utils/withApollo";
import { useEventByIdQuery, useReserveMutation } from "../../generated/graphql";
import { LandingPageLayout } from "../../layouts/LandingPageLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Wrapper } from "../../components/Wrapper";
import {
	Flex,
	Heading,
	Text,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@chakra-ui/core";
import { capitalizeFirstLetter } from "./../../utils/capitalizeFirstLetter";
import { Formik, Form } from "formik";
import InputField from "../../components/InputField";
import { toErrorMap } from "./../../utils/toErrorMap";

const EventPage: NextPage = () => {
	const router = useRouter();
	const { data, loading } = useEventByIdQuery({
		variables: { id: parseInt(router.query.id as string) },
	});
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [reserve] = useReserveMutation();
	const [reserved, setReserved] = useState(false);

	useEffect(() => {
		console.log(data, loading);
		console.log(router);
	}, [data, loading, router]);

	if (loading) return null;
	if (!data?.eventById) return null; // TODO: return error or something

	const { title, description, creator } = data.eventById;
	return (
		<LandingPageLayout>
			<Wrapper variant="large">
				<Flex
					justify={!reserved ? "flex-start" : "center"}
					align="center"
					flexDir="column"
					minH="80vh"
				>
					{!reserved ? (
						<>
							<Heading as="h1">{title}</Heading>
							<Heading as="h3" fontSize={20} fontWeight={400}>
								By {capitalizeFirstLetter(creator.username)}
							</Heading>
							<Text mt={4}>{description}</Text>
							<Button variantColor="teal" mt={2} onClick={onOpen}>
								Reserve
							</Button>
							<Modal isOpen={isOpen} onClose={onClose}>
								<ModalOverlay />
								<ModalContent>
									<ModalHeader>
										Reserve for {title}
									</ModalHeader>
									<ModalCloseButton />
									<Formik
										initialValues={{ name: "", email: "" }}
										onSubmit={async (
											values,
											{ setErrors }
										) => {
											const { data } = await reserve({
												variables: {
													...values,
													eventId: parseInt(
														router.query
															.id as string
													),
												},
											});
											if (data?.reserve.error)
												setErrors({
													email: data.reserve.error,
												});
											else if (data?.reserve.fieldError)
												setErrors(
													toErrorMap(
														data.reserve.fieldError
													)
												);
											else if (data?.reserve.success)
												setReserved(true);
										}}
									>
										<Form>
											<ModalBody pb={6}>
												<InputField
													name="name"
													label="Name"
													placeholder="name"
												/>
												<InputField
													name="email"
													label="Email"
													placeholder="email"
												/>
											</ModalBody>
											<ModalFooter>
												<Button
													variantColor="teal"
													mr={3}
													type="submit"
												>
													Submit
												</Button>
												<Button onClick={onClose}>
													Cancel
												</Button>
											</ModalFooter>
										</Form>
									</Formik>
								</ModalContent>
							</Modal>
						</>
					) : (
						<Heading textAlign="center" maxW={400} fontWeight={500}>
							Successfully reserved for {title}
						</Heading>
					)}
				</Flex>
			</Wrapper>
		</LandingPageLayout>
	);
};

export default withApollo({ ssr: true })(EventPage);
