import Header from "./header";
import Footer from "./footer";
import FrontPage from "./frontpage";
type Props = {
  children: React.ReactNode;
};
import { Banner, Container } from "../styles/styles";

export default function Layout({ children, darkMode }: Props) {
  return (
    <Banner>
      <div className=" h-16 ">
        <FrontPage darkMode={darkMode}>{children}</FrontPage>
      </div>
    </Banner>
  );
}
