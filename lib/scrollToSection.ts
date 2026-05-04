/** Scroll to a section by `id` (respects `scroll-margin` on the target). */
export function scrollToSectionById(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
