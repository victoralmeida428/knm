'use client'

import {ReactElement} from "react";

export default function Table(props: {
    rows: ReactElement[],
    headers: ReactElement
    className?: string;
}) {
    return (
        <table className={`${props.className} table-auto w-full text-center table-striped`}>
            <thead>
            {props.headers}
            </thead>
            <tbody>
            {props.rows}
            </tbody>
        </table>
    );

}