import type { NavItem } from "@/lib/content";

const linkClass =
  "relative inline-block cursor-pointer py-1 pl-3 text-left transition-colors duration-200 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-0.5 before:rounded-full before:transition-colors ";

type NavOnPageLinksProps = {
  navigation: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function NavOnPageLinks({
  navigation,
  activeId,
  onSelect,
}: NavOnPageLinksProps) {
  return (
    <ul className="flex flex-col gap-1 font-mono text-sm">
      {navigation.map((item) => {
        const isActive = activeId === item.id;
        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              aria-current={isActive ? "location" : undefined}
              className={
                linkClass +
                (isActive
                  ? "font-medium text-accent before:bg-accent"
                  : "text-muted before:bg-transparent hover:text-accent focus-visible:text-accent")
              }
            >
              {item.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
