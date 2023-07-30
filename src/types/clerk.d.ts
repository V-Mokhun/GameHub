declare global {
  interface UserPublicMetadata {
    [k: string]: unknown;
  }
  interface UserPrivateMetadata {
    [k: string]: unknown;
  }
  interface UserUnsafeMetadata {
    [k: string]: unknown;
    isPrivateLibrary: boolean;
  }
}

export {};
