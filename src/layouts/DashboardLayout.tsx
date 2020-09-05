import { LandingPageLayout } from "./LandingPageLayout";
import { Wrapper } from "../components/Wrapper";
import { Pages } from "../components/dashboard/Pages";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { Flex, Spinner } from "@chakra-ui/core";

export interface DashboardLayoutProps {
	pages: DashboardPages;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
	children,
	pages,
}) => {
	const { data, loading, error } = useMeQuery();
	const router = useRouter();

	if (!loading && !data?.me?.username) router.push("/");

	return (
		<LandingPageLayout>
			{loading ? (
				<Flex justify="center" minH="80vh" align="center">
					<Spinner size="xl" />
				</Flex>
			) : (
				<Wrapper variant="large" mx="auto" px={{ sm: 0, md: 5 }}>
					<Pages pages={pages} />
					{children}
				</Wrapper>
			)}
		</LandingPageLayout>
	);
};
