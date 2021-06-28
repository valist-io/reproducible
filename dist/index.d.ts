export declare const createImage: (imageTag: string, dockerFilePath?: string | undefined) => Promise<boolean>;
export declare const runBuild: ({ image, outputPath, artifacts }: any) => Promise<void>;
