import "./page.scss";

type AppPageProps = {
    params: Promise<{ id: string }>;
};

const EditPage = async (props: AppPageProps) => {
    const { id } = await props.params;

    return <div className="model-page">hello again</div>;
};

export default EditPage;
