import ImageItem from "./ImageItem";

interface Props {
  urls: string[];
}
export default function ImageFeed(props: Props): any {
  const { urls } = props;

  return urls
    ? urls.map((url: string) => <ImageItem url={url} key={url} />)
    : null;
}
