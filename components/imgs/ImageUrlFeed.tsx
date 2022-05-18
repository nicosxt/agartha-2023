import ImageUrl from './ImageUrl'

interface Props {
    urls: string[]
}
export default function ImageUrlFeed(props: Props): any {
    const {urls} = props;

    return urls? urls.map((url:string) =><ImageUrl url={url} key={url}/>) : null;
}
