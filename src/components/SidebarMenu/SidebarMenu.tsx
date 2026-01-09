import React, { useState } from "react";
import "./SidebarMenu.css";

export type SidebarItem = {
  id: string;
  label: string;
  onClick?: () => void;
  children?: SidebarItem[];
};

export type SidebarMenuProps = {
  open: boolean;
  title?: string;
  items: SidebarItem[];
  width?: number; // px
  onOpen: () => void;
  onClose: () => void;
};

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={open ? "sbm-chev open" : "sbm-chev"}
    >
      <path
        d="M9 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  open,
  title = "Menu",
  items,
  width = 360,
  onOpen,
  onClose,
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function renderItems(list: SidebarItem[], level: number) {
    return (
      <div className="sbm-list" data-level={level}>
        {list.map((it) => {
          const canExpand = level === 0;
          const isExpandable = canExpand && !!it.children?.length;
          const isOpen = !!expanded[it.id];

          return (
            <div key={it.id} className="sbm-item">
              <button
                type="button"
                className="sbm-row"
                onClick={() => {
                  if (isExpandable) {
                    toggle(it.id);
                  } else {
                    it.onClick?.();
                    onClose();
                  }
                }}
              >
                <span className="sbm-label">{it.label}</span>
                {isExpandable && <Chevron open={isOpen} />}
              </button>

              {isExpandable && (
                <div className="sbm-sub" data-open={isOpen ? "true" : "false"}>
                  {renderItems(it.children!, level + 1)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      {!open && (
        <button type="button" className="sbm-trigger" onClick={onOpen} aria-label="Open menu">
          <HamburgerIcon />
        </button>
      )}

      <div className="sbm-overlay" data-open={open ? "true" : "false"} onClick={onClose} />

      <aside className="sbm-panel" data-open={open ? "true" : "false"} style={{ width }}>
        <div className="sbm-head">
          <div className="sbm-title">{title}</div>
          <button className="sbm-close" onClick={onClose} aria-label="Close sidebar">
            ✕
          </button>
        </div>

        <div className="sbm-body">{renderItems(items, 0)}</div>
      </aside>
    </>
  );
};
