interface Props {
  show: boolean;
}
export default function Loader(props: Props) {
  const { show } = props;
  return show ? <div className="loader">Loading...</div> : null;
}
