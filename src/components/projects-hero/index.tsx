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
            className="sfd-project-hero bg-sfdPrimary4"
        >
            <Flex as="div" contain className="">
                <Flex as="div" className="relative w-[500px] min-h-[500px]">
                    <ResponsiveImage
                        title="IMG:Eric working on project"
                        url="projects/box-on-legs/photo-me-1.webp"
                        position="right"
                        className="w-full h-full rounded-l-md"
                        contain={"cover"}
                    />
                </Flex>
                <Flex
                    as="div"
                    dir="col"
                    className="w-full text-sfdGray2/60 p-10"
                >
                    <h2 className="text-3xl font-light">
                        Custom{" "}
                        <span className="text-sfdPrimary2">
                            Furniture Projects
                        </span>
                    </h2>
                    <h5 className="text-lg mt-4 font-light text-sfdGray2/60">
                        Each piece is thoughtfully designed and meticulously
                        crafted to bring your unique vision to life. Explore my
                        latest creations and get inspired for your next project.
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
                                    contain="cover"
                                    className={classNames(
                                        "w-[200px] h-[200px]"
                                    )}
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
                                    contain="cover"
                                    className={classNames(
                                        "w-[200px] h-[200px]"
                                    )}
                                />
                                <h4>Project 1</h4>
                            </Flex>
                        </Link>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
