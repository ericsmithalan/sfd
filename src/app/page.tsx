import Link from "next/link";

type WebPageProps = {
    params: Promise<{ slug: string }>;
};

const WebPage = async (props: WebPageProps) => {
    const { slug } = await props.params;

    return (
        <div>
            <Link href="/model">Open Models</Link>
        </div>
    );
};

export default WebPage;
