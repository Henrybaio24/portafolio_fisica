import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds) {
    const [activeId, setActiveId] = useState(sectionIds[0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                // Considera "activa" la sección que ocupa la franja central de la pantalla
                rootMargin: "-40% 0px -55% 0px",
                threshold: 0,
            }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sectionIds]);

    return activeId;
}