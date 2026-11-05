'use client';

/**
 * ContentScriptShim — restores the small client-side behaviours the original
 * inline scripts provided on content pages (without any backend):
 *   1. `.accordion-btn` toggles its sibling `.accordion-content` (adds `open`,
 *      rotates the chevron icon) and reports section views for progress.
 *   2. `[data-bidemy-toggle-modal]` toggles the `show` class on the target
 *      element (PhET attribution modal).
 */

import * as React from 'react';

export default function ContentScriptShim() {
  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const modalBtn = target.closest('[data-bidemy-toggle-modal]') as HTMLElement | null;
      if (modalBtn) {
        const id = modalBtn.getAttribute('data-bidemy-toggle-modal');
        if (id) {
          const modal = document.getElementById(id);
          if (modal) modal.classList.toggle('show');
          event.preventDefault();
          return;
        }
      }

      const accBtn = target.closest('.accordion-btn') as HTMLElement | null;
      if (accBtn) {
        const content = accBtn.nextElementSibling as HTMLElement | null;
        if (content && content.classList.contains('accordion-content')) {
          content.classList.toggle('open');
          const icon = accBtn.querySelector('.mi, .material-icons');
          if (icon) icon.classList.toggle('rotate-180');
        }
        const section = accBtn.closest('section[id]') as HTMLElement | null;
        if (section?.id) {
          window.dispatchEvent(
            new CustomEvent('bidemy-section-viewed', { detail: section.id, bubbles: true }),
          );
        }
        event.preventDefault();
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
