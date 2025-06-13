export interface auth_request {
    email: string;
    password: string;
}

export interface auth_response {
    status: string;
    message?: string;
    data?: {
        user_data: {
            "id": number;
            "name": string;
            "email": string;
            "phone_number": string;
            "verify_at": string | null;
            "headline": string | null;
            "image_path": string | null;
            "role": string;
            "foul": number;
            "status": string;
            "created_at": string;
            "updated_at": string;
        },
        "token": string;
        message?: string;
    }
};

export interface register_request {
    email: string;
    password: string;
    name: string;
    phone_number: string;
}

export interface register_response {
    status: string;
    data: {
        name: string;
        email: string;
        phone_number: string;
        updated_at: string;
        created_at: string;
        id: number;
    }
}