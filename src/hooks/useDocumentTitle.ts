import { useEffect } from "react";

export default function useDocumentTitle(title: string | undefined) {
  useEffect(() => {
    document.title = `Savorfolio | ${title}`;
  }, [title]);
}