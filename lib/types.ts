export interface DownloadItem {
    id: string
    before: string;
    fileName: string
    format: string
    blob: Blob
    timestamp: number
}