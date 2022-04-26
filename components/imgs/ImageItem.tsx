import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface Props{
    url: string
}

// UI component for main post content
export default function ImageItem(prop: Props) {
  const url = prop.url;

  return (
    <>
    {/* <div className="grid grid-cols-3 gap-4 flex items-center"> */}
        <div className="mb-4">
            <img src={url} className="max-w-full h-auto rounded-lg" alt=""/>
        </div>

    {/* </div> */}
    </>
  );
}