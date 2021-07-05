export declare const generateDockerfile: (baseImage: string, source: string, buildCommand?: string | undefined, installCommand?: string | undefined) => void;
export declare const createBuild: (imageTag: string) => Promise<unknown>;
export declare const exportBuild: (image: any, out: any) => Promise<unknown>;
