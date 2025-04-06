'use client'

import { ReactNode, useEffect } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

export default function Modal(props: ModalProps) {
    // Fechar modal com tecla ESC
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') props.onClose()
        }

        if (props.isOpen) {
            window.addEventListener('keydown', handleEsc)
        }

        return () => {
            window.removeEventListener('keydown', handleEsc)
        }
    }, [props.isOpen, props.onClose])

    if (!props.isOpen) return null

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 overflow-y-auto"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 transition-opacity"
                onClick={props.onClose}
            />

            {/* Conteúdo do Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-md transform transition-all">
                    <div
                        className="bg-white rounded-lg shadow-xl p-6"
                        onClick={(e) => e.stopPropagation()} // Impede fechar ao clicar no conteúdo
                    >
                        {/* Botão Fechar */}
                        <button
                            type="button"
                            onClick={props.onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                            aria-label="Fechar"
                        >
                            <FontAwesomeIcon icon={faClose} className="h-6 w-6" />
                        </button>

                        {/* Conteúdo Filho */}
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}