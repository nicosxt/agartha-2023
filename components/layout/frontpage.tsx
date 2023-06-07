
import { Banner } from "../styles/styles";
import style from './frontpage.module.css';
import Navbar from "./navbar";


type Props = {
  children: React.ReactNode;
  isDark: boolean;
};
export default function FrontPage({ children, darkMode }: Props) {
  return (
    <>
      <Banner>
        <div
          className="relative flex flex-col min-h-screen"
        >
          <Navbar darkMode={darkMode} />
          <div className={style.children}>{children}</div>
        </div>
      </Banner>
    </>
  );
}
