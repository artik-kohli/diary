export interface Entry {
    id: number;
    content: string;
    createAt: string;
    updatedAt: string;
    mediaUrls?: string[];
    diaryId: number;
}

export interface CreateEntry {
    content: string;
    mediaUrls?: string[];
}

export interface UpdateEntry {
    content?: string;
    mediaUrls?: string[];
}