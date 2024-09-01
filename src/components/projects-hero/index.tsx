import classNames from "classnames";
import { Flex } from "../flex";
import { ResponsiveImage } from "../responsiveImage";
import "./style.scss";
import Link from "next/link";

export const ProjectsHero = () => {
    return (
        <Flex
            as="div"
            dir="row"
            flex="auto"
            className="sfd-project-hero bg-sfdGray2 rounded-md shadow-md"
        >
            <Flex as="div" className="relative w-[400px] min-h-[400px]">
                <ResponsiveImage
                    title="IMG:Eric working on project"
                    url="projects/box-on-legs/photo-me-1.webp"
                    position="right"
                    className="rounded-l-md"
                    backgroundClassName="rounded-l-md"
                    contain={"cover"}
                />
            </Flex>
            <Flex as="div" dir="col" className="w-full text-white p-10">
                <h2 className="text-3xl  font-light">
                    Explore My Latest Custom
                    <div className="text-sfdPrimary2">Furniture Creations</div>
                </h2>
                <h5 className="text-lg mt-4 font-light text-white/60">
                    Custom furniture projects, where craftsmanship meets
                    innovation. Each piece is thoughtfully designed and
                    meticulously crafted to bring your unique vision to life.
                    Explore our latest creations and get inspired for your next
                    project.
                </h5>
                <Flex
                    as="div"
                    dir="row"
                    className={classNames("sfd-project-list")}
                >
                    <Link href="/projects">
                        <Flex
                            as="div"
                            dir="col"
                            full="both"
                            className={classNames("project-list-item")}
                        >
                            <ResponsiveImage
                                url="projects/box-on-legs/project-1.webp"
                                contain="contain"
                                className={classNames("w-[200px] h-[200px]")}
                            />
                            <h4>Project 1</h4>
                        </Flex>
                    </Link>
                    <Link href="/projects">
                        <Flex
                            as="div"
                            dir="col"
                            full="both"
                            className={classNames("project-list-item")}
                        >
                            <ResponsiveImage
                                url="projects/desk/3d-1.webp"
                                contain="contain"
                                className={classNames("w-[200px] h-[200px]")}
                            />
                            <h4>Project 1</h4>
                        </Flex>
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    );
};
