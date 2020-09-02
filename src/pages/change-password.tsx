import { NextPage } from "next";
import { LandingPageLayout } from "../layouts/LandingPageLayout";
import {
  useChangePasswordMutation,
  MeQuery,
  MeDocument,
} from "../generated/graphql";
import { useRouter } from "next/router";
import { withApollo } from "../utils/withApollo";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import { Button } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";

const changePassword: NextPage = () => {
  const [changePassword] = useChangePasswordMutation();

  const router = useRouter();

  return (
    <LandingPageLayout>
      <Wrapper variant="small">
        <Formik
          initialValues={{ newPassword: "" }}
          onSubmit={async ({ newPassword }, { setErrors }) => {
            const { data } = await changePassword({
              variables: {
                newPassword,
                token: router.query.token?.toString() || "",
              },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.changePassword.user,
                  },
                });
              },
            });
            if (data?.changePassword.error) {
              if (data.changePassword.error.field === "token")
                setErrors({
                  newPassword: "Token expired. Please try resend an email.",
								});
							else setErrors(toErrorMap(data.changePassword.error));
            } else router.push("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="newPassword"
                label="New Password"
                placeholder="new password"
                type="password"
              />
              <Button
                type="submit"
                isLoading={isSubmitting}
                mt={2}
                variantColor="teal"
              >
                Change password
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </LandingPageLayout>
  );
};

export default withApollo({ ssr: false })(changePassword);
