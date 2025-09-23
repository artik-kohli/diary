export interface Memo {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    isPublic: boolean;
    mediaUrls?: string[];
}

export interface CreateMemo {
    content: string;
    isPublic?: boolean;
    mediaUrls?: string[];
}

export interface UpdateMemo {
    content?: string;
    isPublic?: boolean;
    mediaUrls?: string[];
}