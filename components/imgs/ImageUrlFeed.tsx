import ImageUrl from "./ImageUrl";

interface Props {
  urls: string[];
  slug: any;
  uid: any;
}
export default function ImageUrlFeed(props: Props): any {
  const { urls, slug, uid } = props;

  return urls
    ? urls.map((url: string) => (
        <ImageUrl url={url} urls={urls} slug={slug} uid={uid} key={url} />
      ))
    : null;
}
