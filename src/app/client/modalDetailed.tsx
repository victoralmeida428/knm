import Modal from "@/components/modal/modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLocationDot, faPhone} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/button/button";
import {client} from "../../../generated/prisma";
import {useState} from "react";

type props = {
    client?: client,
    openClient: boolean,
    onClose?: () => void,
    onEdit?: () => void,
}

export function DetailedClient(props: props) {
    const [errorMap, setErrorMap] = useState<boolean>(false);
    return (<Modal isOpen={props.openClient} onClose={props.onClose!} size={'xlg'}>
        <Modal.Header>{props.client?.nome}</Modal.Header>
        <Modal.Body className={`px-3 text-primary`}>
            <p className={'px-3 mb-3 font-bold'}>CPF/CNPJ: {props.client?.documento}</p>
            <p><span className={'px-3'}><FontAwesomeIcon icon={faPhone}/></span> {props.client?.telefone}</p>
            <p><span className={'px-3'}><FontAwesomeIcon icon={faEnvelope}/></span> Email: {props.client?.email}</p>
            <p className={'mt-4 mb-2'}><span className={'px-3'}><FontAwesomeIcon icon={faLocationDot}/></span> Endereço
                -</p>
            {!errorMap && <p className={'px-3'}>Complemento: {props.client?.complemento}</p>}
            <p className={'select-none'}>
                {
                    errorMap ?
                        <>Cidade: {props.client?.cidade}</>
                        : <iframe
                            width="100%"
                            height="350"
                            frameBorder="0"
                            scrolling="no"
                            onError={() => setErrorMap(true)}
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(
                                `${props.client?.rua}, ${props.client?.numero},  ${props.client?.cidade}, ${props.client?.cep}`
                            )}&output=embed`}
                        />
                }
            </p>
            {errorMap && <p>Bairro: {props.client?.bairro}</p>}
            {errorMap && <p>Rua: {props.client?.rua}</p>}
            <p className={'px-3 mt-5 italic text-sm'}>Criado em: <span
                className={'underline underline-offset-3'}>{new Date(String(props.client?.criado_em)).toLocaleString()} </span>
            </p>
        </Modal.Body>
        <Modal.Footer><Button onClick={props.onEdit} mode={'primary'}>Editar</Button></Modal.Footer>
    </Modal>);
}