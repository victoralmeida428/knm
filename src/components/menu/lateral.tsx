'use client'

import {ReactElement} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHome,
    faFileCirclePlus,
    faSearch,
    faUser,
    faSignOutAlt,
    IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function MenuLateral(props: {
    className?: string;
}): ReactElement {
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
                    <MenuItem link="/" icon={faHome} text="Página Inicial" active={true}/>
                    <MenuItem link="/client" icon={faUser} text="Clientes"/>
                    <MenuItem icon={faSearch} text="Ordem de Serviço"/>
                    <MenuItem icon={faFileCirclePlus} text="Criar Ordem de Serviço"/>
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
        <li className={`${className} cursor-pointer select-none flex items-center space-x-3 p-2 
        ${colors}
        hover:bg-[#081E3F] 
        hover:text-white 
        rounded-md transition-colors group`}>
            <FontAwesomeIcon
                icon={icon}
                className={`${colors} w-4 h-4 group-hover:text-white group-hover:bg-[#081E3F] transition-colors`}
            />
            <span className="text-sm"><a href={link}>{text}</a></span>
        </li>
    );
}