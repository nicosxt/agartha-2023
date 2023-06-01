import { useCallback, useState } from "react";
import Map, { getServerSideProps as mapGetServerSideProps } from "./map";
import styles from "../components/map/landing.module.css";

export default function Index(props) {
  const [landing, setLanding] = useState(false);
  const toMap = useCallback(() => {
    setLanding(!landing);
  }, [landing]);
  return (
    <div>
      <Map communities={props.communities} isBackground={!landing} />
      <div
        className={`${styles.landingWrapper} ${!landing ? "" : styles.fadeOut}`}
      >
        <h2 className={styles.landingHeader}>
          Solarpunk Communities Intersecting Art, Ecology and Technology
        </h2>
        <div className={styles.enterButtonWrapper}>
          <div className={styles.enterButtonBackground}></div>
          <button className={styles.enterButton} onClick={toMap}>
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps = mapGetServerSideProps;
