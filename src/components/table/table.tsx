// components/Table/index.tsx
import { ReactNode } from 'react'

interface TableProps {
    children: ReactNode
    className?: string
}

interface TableHeaderProps {
    children: ReactNode
    className?: string
}

interface TableBodyProps {
    children: ReactNode
    className?: string
}

interface TableFooterProps {
    children: ReactNode
    className?: string
}

interface TableRowProps {
    children: ReactNode
    className?: string
    hoverEffect?: boolean
}

interface TableCellProps {
    children: ReactNode
    className?: string
    align?: 'left' | 'center' | 'right'
    colSpan?: number
}

const Table = ({ children, className }: TableProps) => {
    return (
        <div className="overflow-y-auto">
            <table className={`${className} w-full border-collapse`}>
                {children}
            </table>
        </div>
    )
}

const Header = ({ children, className }: TableHeaderProps) => {
    return (
        <thead className={`${className} bg-gray-50 dark:bg-gray-800`}>
        {children}
        </thead>
    )
}

const Body = ({ children, className }: TableBodyProps) => {
    return <tbody className={className}>{children}</tbody>
}

const Footer = ({ children, className }: TableFooterProps) => {
    return (
        <tfoot className={`${className}bg-gray-50 dark:bg-gray-800`}>
        {children}
        </tfoot>
    )
}

const Row = ({ children, className, hoverEffect = true }: TableRowProps) => {

    return (
        <tr
            className={
                `${className} border-b border-gray-200 dark:border-gray-700
                ${hoverEffect===true ? 'hover:bg-gray-700 hover:text-white dark:hover:bg-gray-700':''}`
    }        >
            {children}
        </tr>
    )
}

const Cell = ({ children, className, align = 'left', colSpan }: TableCellProps) => {
    return (
        <td
            className={
                `${className} px-4 py-3 whitespace-nowrap text-${align}`}
            colSpan={colSpan}
        >
            {children}
        </td>
    )
}

const HeadCell = ({ children, className, align = 'left' }: TableCellProps) => {
    return (
        <th
            className={
                `${className} px-4 py-3 text-xs font-bold text-gray-300 dark:text-gray-300 uppercase tracking-wider
                text-${align}`}
        >
            {children}
        </th>
    )
}

// Compondo os subcomponentes
Table.Header = Header
Table.Body = Body
Table.Footer = Footer
Table.Row = Row
Table.Cell = Cell
Table.HeadCell = HeadCell

export default Table