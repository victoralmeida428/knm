import {FormikValues, useFormik} from "formik";
import FormField from "@/components/form/Formulario";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import * as yup from 'yup';
import {ValidationCNPJ, ValidationCPF} from "@/app/utils/Validation";
import {CEP} from "@/app/utils/cep";
import {useState} from "react";
import Loading from "@/components/loading/loading";
import {maskCEP, maskCpfCnpj, maskPhone} from "@/app/utils/maks";
import {client} from "../../../generated/prisma";
import Button from "@/components/button/button";



const yupSchema = yup.object({
    nome: yup.string(),
    email: yup.string().email(),
    documento: yup.string()

        .min(10).max(18)
        .trim()
        .matches(
            /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{2}\.?\d{3}\.?\d{3}\/\d{4}-?\d{2})$/,
            "formato necessário: 999.999.999-99 ou 99.999.999/999-99")
        .test('valid-document', "Documento inválido", (value?: string) => value ? ValidationCPF(value) || ValidationCNPJ(value): true),
    telefone: yup.string().matches(/^(\(?\d{2}\)?\s?\d{1}\s?\d{4}-?\d{4})$/, "formato necessário: 99 99999-9999"),
    cep: yup.string().min(8, "Mínimo de 8 caracteres").matches(/^(\d{2}\.?\d{3}-?\d{3})$/, "formato necessário: 99.999-999"),
    cidade: yup.string(),
    bairro: yup.string(),
    rua: yup.string(),
    numero: yup.number().min(0),
    complemento: yup.string(),
})

export default function ClientRegisterForm(props:{
    refreshClients: () => void,
    closeModal?: () => void,
    client?: client
}) {
    const [loading, setLoading] = useState(false);

    const initialValues: FormikValues = {
        nome: props.client?.nome??'',
        email: props.client?.email??'',
        documento: props.client?.documento??'',
        telefone: props.client?.telefone??'',
        cep: props.client?.cep??'',
        cidade: props.client?.cidade??'',
        bairro: props.client?.bairro??'',
        rua: props.client?.rua??'',
        numero: props.client?.numero??0,
        complemento: props.client?.complemento??''
    }

    const formik = useFormik({
        initialValues,
        validationSchema: yupSchema,
        onSubmit: async (values, {resetForm}) => {

            values['criado_em'] = props.client?props.client.criado_em : new Date().toISOString();
            if (props.client) {
                values["id"] = props.client.id;
            }

            const response = await fetch('/api/clients', {
                method: props.client?'PUT':'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            if (!response.ok) {
                const data = await response.json()
                alert(JSON.stringify(data, null, 2))

            } else {
                props.refreshClients()
                if (!props.client) setTimeout(()=> {resetForm()}, 500)
                if (props.closeModal) props.closeModal()
            }
        },
    })
    return (
        <form onSubmit={formik.handleSubmit} className="form overflow-y-auto">

            <FormField
                formik={formik}
                id="nome"
                label="Nome"
                name="nome"
                type="text"
                required={true}
            />
            <FormField
                formik={formik}
                id="documento"
                label="CPF / CNPJ"
                name="documento"
                type="text"
                required={true}
                disabled={props.client!=undefined}
                onChange={(e)=> {
                    e.target.value = maskCpfCnpj(e.target.value)
                    formik.handleChange(e)
                }}
            />
            <div className={'flex justify-between'}>
                <FormField
                    formik={formik}
                    icon={<FontAwesomeIcon icon={faPhone} className={'text-gray-500'} /> }
                    id="telefone"
                    containerClassName={'w-[50%] pr-2'}
                    label="Celular"
                    name="telefone"
                    type="text"
                    required={true}
                    onChange={(e)=> {
                        e.target.value = maskPhone(e.target.value)
                        formik.handleChange(e)
                    }}
                />
                <FormField
                    formik={formik}
                    id="email"
                    label="Email"
                    containerClassName={'w-[50%]'}
                    name="email"
                    type="text"
                    icon={<FontAwesomeIcon icon={faEnvelope} className={'text-gray-500'} />}
                    required={false}
                />
            </div>
            <div className={'flex justify-between'}>
                <FormField
                    formik={formik}
                    containerClassName={'w-[50%] pr-2'}
                    id="cep"
                    label="CEP"
                    name="cep"
                    type="text"
                    required={true}
                    onChange={(e)=> {
                        e.target.value = maskCEP(e.target.value)
                        formik.handleChange(e)
                    }}
                    onBlur={async (e)=>{
                        setLoading(true);
                        formik.handleBlur(e)
                        const cep = new CEP()
                        const load = await cep.buscar(e.target.value)
                        if (load) {
                            formik.values.cidade = cep.localidade
                            formik.values.bairro = cep.bairro
                            formik.values.rua = cep.logradouro
                        }
                        setLoading(false)

                    }}
                />
                <FormField
                    formik={formik}
                    id="cidade"
                    label="Cidade"
                    icon={loading && <Loading size={1}/>}
                    name="cidade"
                    type="text"
                    containerClassName={'w-[50%]'}
                    required={true}
                />
            </div>

            <div className={`flex flex-row justify-items-stretch justify-between`}>

                <FormField
                    formik={formik}
                    id="bairro"
                    label="Bairro"
                    name="bairro"
                    icon={loading && <Loading size={1}/>}
                    type="text"
                    required={true}
                />
                <FormField
                    formik={formik}
                    id="rua"
                    label="Rua"
                    name="rua"
                    icon={loading && <Loading size={1}/>}
                    type="text"
                    required={true}
                />
                <FormField
                    containerClassName={'w-24'}
                    formik={formik}
                    id="numero"
                    label="Numero"
                    name="numero"
                    type="number"
                    required={true}
                />


            </div>
            <FormField
                formik={formik}
                id="complemento"
                label="Complemento"
                name="complemento"
                type="text"
                required={false}
            />
            <div className={'flex justify-end'}>
                <Button type={'submit'} mode={'primary'}>Salvar</Button>
            </div>

        </form>
    );
}