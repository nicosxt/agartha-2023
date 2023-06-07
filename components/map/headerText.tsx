import Desktop from "./headerText/desktop";
import Mobile from "./headerText/mobile";
import Tablet from "./headerText/tablet";

import style from "./headerText.module.css";

export default function HeaderText() {
  return (
    <>
      <Desktop className={style.headerTextDesktop} />
      <Tablet className={style.headerTextTablet} />
      <Mobile className={style.headerTextMobile} />
    </>
  );
}
