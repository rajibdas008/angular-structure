export class UploadResponse {
    id?: string;
    imageKeywords?: string;
    index?: string;
    mimeType?: string;
    orgFileName?: string;
    sourceKey?: string;
    sourceName?: string;
    uploadDateTime? : string;
    url: string;
    type: string;
    previewUrl?: string;
    displayIndex?: string;
}

export interface MediaResponse {
    id?: string;
}