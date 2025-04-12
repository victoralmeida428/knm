import Modal from "@/components/modal/modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import { client } from "../../../generated/prisma";
import ClientRegisterForm from "@/app/client/formRegister";

type props = {
    openRegister: boolean,
    onClose: ()=>void,
    fetchClients: ()=>void,
    closeModal: ()=>void,
    client?: client
}
export default function RegisterClient(props:props ) {
    return (
        <Modal isOpen={props.openRegister} onClose={props.onClose} size='xlg'>
            <Modal.Header>
                            <span className={'px-3'}>
                                <FontAwesomeIcon icon={faUser}/>
                            </span> {props.client ? 'Atualizar Cliente' : 'Cadastro de Cliente'}</Modal.Header>
            <Modal.Body>
                <ClientRegisterForm refreshClients={props.fetchClients} client={props.client} closeModal={props.closeModal}/>
            </Modal.Body>
        </Modal>
    )
}