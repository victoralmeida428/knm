import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonStyles = 'none' | 'success' | 'warning' | 'danger' | 'info' | 'primary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
    mode?: ButtonStyles;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    function Button({ mode, className='', ...props }, ref) {
        const styleClass: Record<string, string> = {
            'none': '',
            'success': 'bg-green-800 text-white',
            'warning': 'bg-yellow-500 text-black',
            'danger': 'bg-red-500 text-white',
            'info': 'bg-gray-500 text-white',
            'primary': 'bg-primary text-white hover:bg-secondary'
        }

        return (
            <button
                ref={ref}
                className={`${className} px-4 py-1 max-h-10 min-w-1/6 min-h-4 rounded cursor-pointer ${styleClass[mode??'info']}`}
                {...props}
            >
                {props.children}
            </button>
        );
    }
);

export default Button;