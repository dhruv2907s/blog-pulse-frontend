import { Link } from "react-router-dom";
import { images } from "../../../../constants";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { MdDashboard, MdOutlineInsights } from "react-icons/md";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";
import { useWindowSize } from "@uidotdev/usehooks";

const menu_items = [
    {
        title: "Insights",
        link: "/admin/insights",
        icon: <MdOutlineInsights className="text-xl" />,
        name: "insights",
        type: "link",
    },
    {
        title: "Comments",
        link: "/admin/comments",
        icon: <FaComments className="text-xl" />,
        name: "comments",
        type: "link",
    },
    {
        title: "Posts",
        content: [
            { title: "New", link: "/admin/posts/new" },
            { title: "Manage", link: "/admin/posts/manage" },
        ],
        icon: <MdDashboard className="text-xl" />,
        name: "posts",
        type: "collapse",
    },
];
const Header = () => {
    const [activeNavName, setActiveNavName] = useState("dashboard");
    const [isMenuActive, setIsMenuActive] = useState(false);
    const windowSize = useWindowSize();
    const toggleMenuHandler = () => {
        setIsMenuActive((prevState) => !prevState);
    };
    useEffect(() => {
        if (windowSize.width < 1024) {
            setIsMenuActive(false);
        } else {
            setIsMenuActive(true);
        }
    }, [windowSize.width]);
    return (
        <header className="flex h-fit w-full items-center justify-between p-4 lg:h-full max-w-[300px] lg:flex-col lg:items-start lg:p-0 lg:justify-start">
            {/* logo */}
            <Link to="/">
                <img src={images.Logo} alt="logo" className="w-16 lg:hidden" />
            </Link>
            {/* menu burger icon */}
            <div className="cursor-pointer lg:hidden">
                {isMenuActive ? (
                    <AiOutlineClose
                        className="w-6 h-6"
                        onClick={toggleMenuHandler}
                    />
                ) : (
                    <AiOutlineMenu
                        className="w-6 h-6"
                        onClick={toggleMenuHandler}
                    />
                )}
            </div>
            {/* sidebar container */}
            {isMenuActive && (
                <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
                    {/* underlay */}
                    <div
                        className="fixed inset-0 bg-black opacity-50 lg:hidden"
                        onClick={toggleMenuHandler}
                    />
                    {/* sidebar */}
                    <div className="fixed top-0 bottom-0 left-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-full lg:w-full lg:p-6 ">
                        <Link to="/">
                            <img
                                src={images.Logo}
                                alt="Logo"
                                className="w-[300px]"
                            />
                        </Link>
                        <h4 className="mt-10 font-bold text-[#C7C7C7]">
                            MAIN MENU
                        </h4>
                        {/* menu items */}
                        <div className="mt-6 flex flex-col gap-y-[0.563rem]">
                            {menu_items.map((item) =>
                                item.type === "link" ? (
                                    <NavItem
                                        key={item.title}
                                        title={item.title}
                                        link={item.link}
                                        icon={item.icon}
                                        name={item.name}
                                        activeNavName={activeNavName}
                                        setActiveNavName={setActiveNavName}
                                    />
                                ) : (
                                    <NavItemCollapse
                                        key={item.title}
                                        title={item.title}
                                        content={item.content}
                                        icon={item.icon}
                                        name={item.name}
                                        activeNavName={activeNavName}
                                        setActiveNavName={setActiveNavName}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
