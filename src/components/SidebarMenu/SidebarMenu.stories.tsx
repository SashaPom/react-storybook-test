import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { SidebarMenu, type SidebarItem } from ".";

const meta: Meta<typeof SidebarMenu> = {
  title: "Navigation/SidebarMenu",
  component: SidebarMenu,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof SidebarMenu>;

const oneLevel: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", onClick: () => console.log("Dashboard") },
  { id: "profile", label: "Profile", onClick: () => console.log("Profile") },
  { id: "settings", label: "Settings", onClick: () => console.log("Settings") },
  { id: "messages", label: "Messages", onClick: () => console.log("Messages") },
  { id: "logout", label: "Logout", onClick: () => console.log("Logout") },
];

const twoLevel: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    children: [
      { id: "analytics", label: "Analytics", onClick: () => console.log("Analytics") },
      { id: "reports", label: "Reports", onClick: () => console.log("Reports") },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    children: [
      { id: "project-a", label: "Project A", onClick: () => console.log("Project A") },
      { id: "project-b", label: "Project B", onClick: () => console.log("Project B") },
    ],
  },
  { id: "help", label: "Help", onClick: () => console.log("Help") },
];

export const OneLevelMenu: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <SidebarMenu
          open={open}
          title="Menu"
          items={oneLevel}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const TwoLevelMenu: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <SidebarMenu
          open={open}
          title="Menu"
          items={twoLevel}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};
