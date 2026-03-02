import { MouseEventHandler } from "react"

export interface TaskRaw {
    id: number,
    completed: boolean,
    content: string
}

export interface Task {
    customer_id: number
    completed: boolean,
    content: string,
}


export interface TaskBoxValues {
    id: number
    completed: boolean,
    content: string
}

export interface Customer {
    name: string,
    password: string
}