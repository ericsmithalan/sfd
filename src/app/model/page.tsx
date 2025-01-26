import "./page.scss";

type AppPageProps = {
    params: Promise<{ slug: string }>;
};

const EditPage = async (props: AppPageProps) => {
    return <div className="models-page">hello</div>;
};

export default EditPage;
