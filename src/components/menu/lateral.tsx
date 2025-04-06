'use client'

import {ReactElement} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHome,
    faSearch,
    faUser,
    faSignOutAlt,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import {usePathname} from "next/navigation";

export default function MenuLateral(props: {
    className?: string;
}): ReactElement {
    const path = usePathname()
    const menus: {icon: IconDefinition, title: string, link: string|undefined}[] = [
        {icon: faHome, link: "/", title:"Página Inicial"},
        {icon: faUser, link: "/client", title:"Clientes"},
        {icon: faSearch, link: "/search", title:"Ordem de Serviço"},

    ]
    return (
        <section className={`${props.className} h-screen w-56 bg-gray-100 p-4 shadow-md flex flex-col`}>
            {/* Conteúdo principal do menu */}
            <div className="flex-1 overflow-y-auto">
                <Image
                    width={300}
                    height={300}
                    src="https://www.knm.srv.br/wp-content/uploads/2024/05/LOGO-COM-NOME.webp"
                    priority={true}
                    alt="logo"/>
                <ul className="space-y-3 w-full mt-5">
                    {menus.map((e, index) =>
                        <MenuItem key={index}
                                  className="mt-2"
                                  link={e.link}
                                  icon={e.icon}
                                  text={e.title}
                                  active={path === e.link}/>)}
                </ul>
            </div>

            {/* Item Sair fixo no rodapé */}
            <div className="mt-auto">
                <MenuItem icon={faSignOutAlt} text="Sair" className="hover:bg-red-400 hover:text-red-950"/>
            </div>
        </section>
    );
}

function MenuItem({icon, text, className, active, link}: {
    icon: IconDefinition,
    text: string,
    className?: string,
    active?: boolean,
    link?: string
}) {

    const colors = active ? "bg-[#081E3F] text-white" :
        "bg-white text-[#081E3F]";

    return (
        <a href={link}>
            <li className={`${className} cursor-pointer select-none flex items-center space-x-3 p-2 
        ${colors}
        hover:bg-[#081E3F] 
        hover:text-white 
        rounded-md transition-colors group`}>
                <FontAwesomeIcon
                    icon={icon}
                    className={`${colors} w-4 h-4 group-hover:text-white group-hover:bg-[#081E3F] transition-colors`}
                />
                <span className="text-sm">{text}</span>
            </li>
        </a>
    );
}