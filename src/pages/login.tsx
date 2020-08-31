import { NextPage } from "next";
import { Wrapper } from "../components/Wrapper";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import { Button } from "@chakra-ui/core";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { LandingPageLayout } from "../layouts/LandingPageLayout";

const Login: NextPage = () => {
  const [login] = useLoginMutation();
  const router = useRouter();
  return (
    <LandingPageLayout>
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({ variables: values });
            if (response.data?.login.error)
              setErrors(toErrorMap(response.data.login.error));
            else if (response.data?.login.user) router.push("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
              <Button
                type="submit"
                variantColor="teal"
                isLoading={isSubmitting}
                mt={4}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </LandingPageLayout>
  );
};

export default Login;
