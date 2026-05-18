/**
 * Wraps a section with position: sticky so each subsequent section
 * slides over the previous one as the user scrolls.
 * z-index must increase with each section; keep below Nav (z-index: 80).
 */
export default function StickySection({ children, zIndex }) {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex }}>
      {children}
    </div>
  );
}
