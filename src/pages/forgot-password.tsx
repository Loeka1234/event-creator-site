import { NextPage } from "next";
import { useForgotPasswordMutation } from "../generated/graphql";
import { LandingPageLayout } from "../layouts/LandingPageLayout";
import { withApollo } from "../utils/withApollo";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import { Button, Flex, Heading, Icon } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { useState } from "react";

const ForgotPassword: NextPage = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [emailSent, setEmailSent] = useState(false);

  return (
    <LandingPageLayout>
      {emailSent ? (
        <Flex width="100%" justify="center" align="center" minH="90vh">
          <Icon name="check-circle" color="green.500" size="40px" mr={2} />
          <Heading fontWeight={600} maxW={400} textAlign="center">
            Successfully sent email if this email exists.
          </Heading>
        </Flex>
      ) : (
        <Wrapper variant="small">
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async values => {
              await forgotPassword({ variables: values });
              setEmailSent(true);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="email"
                  label="Email"
                  placeholder="email"
                  type="email"
                />

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  mt={2}
                  variantColor="teal"
                >
                  Reset password
                </Button>
              </Form>
            )}
          </Formik>
        </Wrapper>
      )}
    </LandingPageLayout>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
