import { useEffect } from "react";

export default function useDocumentTitle(title: string, subtitle?: string) {
  useEffect(() => {
    document.title = `${title}${subtitle ? ` - ${subtitle}` : ""}`;
  }, [title, subtitle]);
}
