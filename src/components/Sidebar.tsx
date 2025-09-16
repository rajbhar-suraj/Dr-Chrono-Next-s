"use client";

// Sidebar Component
type SidebarProps = {
  actions: { name: string; key: string }[];
  onSelect: (key: string) => void;
};

export function Sidebar({ actions, onSelect }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-100 rounded-2xl shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Actions</h2>
      <ul className="space-y-2">
        {actions.map((action) => (
          <li key={action.key}>
            <button
              onClick={() => onSelect(action.key)}
              className="block w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {action.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
