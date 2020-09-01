import { LandingPageLayout } from "../layouts/LandingPageLayout";
import {
	Flex,
	Heading,
	Text,
	Box,
	Badge,
	Button,
	Divider,
	Grid,
	Icon,
} from "@chakra-ui/core";
import Link from "next/link";
import { withApollo } from "./../utils/withApollo";

const Index = () => (
	<LandingPageLayout>
		<Flex
			as="section"
			width="100%"
			maxW={1200}
			mx="auto"
			justify="center"
			align="center"
			flexDir={{ sm: "column", md: "row" }}
			textAlign={{ sm: "center", md: "initial" }}
			mt={3}
		>
			<Flex
				width={{ sm: "95%", md: "45%" }}
				justify="center"
				align="center"
				py={{ sm: 0, md: 12 }}
			>
				<Heading fontSize={60}>
					Eventor{" "}
					<Badge variantColor="green" fontSize={20}>
						Beta
					</Badge>
				</Heading>
			</Flex>
			<Flex
				width={{ sm: "95%", md: "45%" }}
				flexDir="column"
				py={{ sm: 3, md: 6 }}
				align={{ sm: "center", md: "flex-start" }}
			>
				<Box maxW={400}>
					<Heading fontWeight={600} lineHeight={1} my={4}>
						Become the creator of your event
					</Heading>
				</Box>
				<Text>
					Eventor is an amazing tool to create your events. It handles
					reservations for you. Eventor includes the best statistics
					about your events.
				</Text>
				<Box>
					<Link href="/register">
						<Button
							as="a"
							cursor="pointer"
							variantColor="teal"
							mt={3}
						>
							Sign up
						</Button>
					</Link>
					<Button mt={3} ml={3}>
						More info
					</Button>
				</Box>
			</Flex>
		</Flex>

		<Divider />

		<Box width="100%">
			<Flex
				mx="auto"
				width="95%"
				maxW={1200}
				px={{ sm: 0, md: 5 }}
				mt={12}
				flexDir={{ sm: "column", md: "row" }}
				textAlign="center"
			>
				<Flex
					width={{ sm: "100%", md: "30%" }}
					flexDir="column"
					justifyContent="flex-start"
					alignItems="center"
					mx={2}
					my={3}
				>
					<Icon name="check-circle" color="green.400" size="64px" />
					<Heading>Analytics</Heading>
					<Text maxW={300}>
						We got the best analytics to monitor your event.
					</Text>
				</Flex>
				<Flex
					width={{ sm: "100%", md: "30%" }}
					flexDir="column"
					justifyContent="flex-start"
					alignItems="center"
					mx={2}
					my={3}
				>
					<Icon name="lock" color="gray.800" size="64px" />
					<Heading>Secure</Heading>
					<Text maxW={300}>
						We have the most secure servers equipped with the HTTPS
						protocol and data encryption.
					</Text>
				</Flex>
				<Flex
					width={{ sm: "100%", md: "30%" }}
					flexDir="column"
					justifyContent="flex-start"
					alignItems="center"
					mx={2}
					my={3}
				>
					<Icon name="star" color="yellow.400" size="64px" />
					<Heading>Support</Heading>
					<Text maxW={300}>
						You can always contact us if you have any problems. Our
						theme is always there for you!
					</Text>
				</Flex>
			</Flex>
		</Box>
	</LandingPageLayout>
);

export default withApollo({ ssr: false })(Index);
