import { NavigateFunction } from "react-router-dom";

declare global {
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
    browserLanguage: string;
  }
  interface Window {
    $navigate: NavigateFunction;
  }
}

export {};
