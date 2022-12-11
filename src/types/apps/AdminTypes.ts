export type AdminType = {
    id: string
    name: string
    email: string
    phone: string
    image_uri: string
    created_at: string
}

export type AdminInputType = {
    id?: string
    name: string
    email: string
    phone: string
    password: string
    confirm_password?: string
    role: number
    image_uri?: string
}

export type AdminSearchType = {
    name?: string
    email?: string
    phone?: string
}
