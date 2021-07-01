export declare const generateDockerfile: (baseImage: string, source: string, buildCommand?: string | undefined, installCommand?: string | undefined) => void;
export declare const createBuild: (imageTag: string, dockerFilePath?: string | undefined) => Promise<boolean>;
export declare const exportBuild: ({ image, out }: any) => Promise<void>;
