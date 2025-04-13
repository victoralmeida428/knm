// components/Modal/index.tsx
'use client'

import { ReactNode, useEffect } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xlg'
    closeOnOverlayClick?: boolean
    showCloseButton?: boolean
    className?: string
}

interface ModalHeaderProps {
    children: ReactNode
    className?: string
    withBorder?: boolean
}

interface ModalBodyProps {
    children: ReactNode
    className?: string
    padding?: 'none' | 'sm' | 'md' | 'lg'
}

interface ModalFooterProps {
    children: ReactNode
    className?: string
    withBorder?: boolean
    align?: 'left' | 'center' | 'right' | 'between'
}

const Modal = ({
                   isOpen,
                   onClose,
                   children,
                   size = 'md',
                   closeOnOverlayClick = true,
                   showCloseButton = true,
                   className = ''
               }: ModalProps) => {
    // Fechar modal com tecla ESC
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose()
        }

        if (isOpen) {
            document.body.style.overflow = 'hidden'
            window.addEventListener('keydown', handleEsc)
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
            window.removeEventListener('keydown', handleEsc)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        xlg: 'max-w-2xl',
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 overflow-y-auto"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 transition-opacity"
                onClick={closeOnOverlayClick ? onClose : undefined}
            />

            {/* Container do Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className={`relative w-full transform transition-all max-w- ${sizeClasses[size]} ${className}`}>
                    <div
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {showCloseButton && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
                                aria-label="Fechar"
                            >
                                <FontAwesomeIcon icon={faClose} className="h-6 w-6" />
                            </button>
                        )}

                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Header = ({ children, className = '', withBorder = true }: ModalHeaderProps) => {
    const borderClass = withBorder ? 'border-b border-gray-700' : ''
    return (
        <div className={`px-6 pt-6 pb-4 bg-primary ${borderClass} ${className}`}>
            <h3 className="text-lg font-medium  text-white">
                {children}
            </h3>
        </div>
    )
}

const Body = ({ children, className = '', padding = 'md' }: ModalBodyProps) => {
    const paddingClasses = {
        none: 'p-0',
        sm: 'p-4',
        md: 'px-6 py-4',
        lg: 'p-6',
    }

    return (
        <div className={`${paddingClasses[padding]} ${className}`}>
            <div className="text-sm text-gray-80000 dark:text-gray-300">
                {children}
            </div>
        </div>
    )
}

const Footer = ({ children, className = '', withBorder = true, align = 'right' }: ModalFooterProps) => {
    const alignClasses = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
        between: 'justify-between'
    }
    const borderClass = withBorder ? 'border-t border-gray-200 dark:border-gray-700' : ''

    return (
        <div className={`px-6 py-4 flex gap-3 ${borderClass} ${alignClasses[align]} ${className}`}>
            {children}
        </div>
    )
}

// Compondo os subcomponentes
Modal.Header = Header
Modal.Body = Body
Modal.Footer = Footer

export default Modal