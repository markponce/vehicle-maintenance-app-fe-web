// import { JsonObject, JsonProperty } from 'typescript-json-serializer'

export interface User {
    readonly id: number
    name: string
    email: string
    email_verified_at?: number // timestamps
}

export interface PageLink {
    url?: string
    label: string
    active: boolean
}

export interface ResponseWrapper<T> {
    data: T
    links?: {
        first?: string
        last?: string
        prev?: string
        next?: string
    }
    meta?: {
        current_page?: number
        from?: number
        last_page?: number
        path?: string
        per_page?: number
        to?: number
        total?: number
        links?: PageLink[]
    }
}

export type ErrorMessages = {
    [key: string]: string[]
}

export interface Make {
    created_at: number
    readonly id: number
    name: string
    user_id: number
    updated_at: number
}
