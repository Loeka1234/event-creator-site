import { NextPage } from "next";
import { withApollo } from "../../utils/withApollo";
import { useEventByIdQuery, useEventsQuery } from "../../generated/graphql";
import { LandingPageLayout } from "../../layouts/LandingPageLayout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Wrapper } from "../../components/Wrapper";
import { Flex, Heading, Text } from "@chakra-ui/core";
import { capitalizeFirstLetter } from "./../../utils/capitalizeFirstLetter";

const EventPage: NextPage = () => {
	const router = useRouter();
	const { data, loading } = useEventByIdQuery({
		variables: { id: parseInt(router.query.id as string) },
	});

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
				<Flex justify="center" align="center" flexDir="column">
					<Heading as="h1">{title}</Heading>
					<Heading as="h3" fontSize={20} fontWeight={400}>
						By {capitalizeFirstLetter(creator.username)}
					</Heading>
					<Text mt={4}>{description}</Text>
				</Flex>
			</Wrapper>
		</LandingPageLayout>
	);
};

export default withApollo({ ssr: true })(EventPage);
