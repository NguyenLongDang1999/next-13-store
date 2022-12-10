export type CategoryType = {
    id: string
    name: string
    status: number
    popular: number
    publish: boolean
    created_at: string
    updated_at: string
}

export type CategoryInputType = {
    id?: string
    name: string
    slug: string
    image_uri?: string
    description?: string
    parent_id?: string
    status?: number
    popular?: number
    meta_title?: string
    meta_keyword?: string
    meta_description?: string
}

export type CategorySearchType = {
    name?: string
    parent_id?: string
    status?: number
    popular?: number
}
