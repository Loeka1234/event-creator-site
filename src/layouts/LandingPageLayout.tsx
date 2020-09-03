import { NavBar } from "../components/NavBar";

export interface Props {}

export const LandingPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};
