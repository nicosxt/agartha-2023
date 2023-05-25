
import Flower from "../svgs/flower";
import Hamburger from "../svgs/hamburger";

import style from './toggleButton.module.css';

export default function ToggleButton(props: any) {
  const { onClick, open } = props;

  return (
    <label className={style.toggleListButton} htmlFor="mapListToggle">
        <input onClick={onClick} type="checkbox" id="mapListToggle" />

        <div className={style.toggleTrack}>
          <div className={style.toggleIndicator}></div>
          <Flower blue={open} />
          {/* hamburgher */}
          <Hamburger blue={open} />
        </div>
      </label>
  );
}