import "./page.scss";

type AppPageProps = {
    params: Promise<{ id: string }>;
};
// export const dynamicParams = true;
// export async function generateStaticParams(params: any) {
//     console.log(params);
// }

const EditPage = async (props: AppPageProps) => {
    const { id } = await props.params;

    return <div className="model-page">hello again {id}</div>;
};

export default EditPage;
