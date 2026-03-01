export interface VersionHistory {
    version: string;
    date: string;
    changes: string[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    fullDescription: string;
    features: string[];
    icon: string;
    windowsDownloadUrl: string;
    androidDownloadUrl: string;
    windowsSha256: string;
    androidSha256: string;
    versionHistory: VersionHistory[];
}

// Static fallback
export const products: Product[] = []; 
