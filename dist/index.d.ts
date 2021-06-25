export declare const createImage: (imageTag: string, dockerFilePath?: string | undefined) => Promise<unknown>;
export declare const runBuild: ({ image, buildPath, outputPath, artifacts, }: any) => Promise<void>;
