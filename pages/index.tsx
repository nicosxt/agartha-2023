import Map, { getServerSideProps as mapGetServerSideProps } from "./map";

export default function Index(props) {
  return (
    <div>
      <div>
        <h2>Solarpunk Communities intersecting Art, Ecology and Technology</h2>
      </div>
      <Map communities={props.communities} isBackground />
    </div>
  );
}
export const getServerSideProps = mapGetServerSideProps;
