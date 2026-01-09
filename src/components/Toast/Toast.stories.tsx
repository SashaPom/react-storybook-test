import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { ToastProvider, ToastViewport, useToast } from ".";

function Demo() {
  const { push, clear } = useToast();

  return (
    <div className="sb-card">
      <div className="sb-row">
        <button
          className="sb-btn"
          onClick={() =>
            push({
              type: "success",
              title: "Saved!",
              message: "Your changes were stored successfully.",
              durationMs: 2500,
              closable: true,
            })
          }
        >
          Success (2.5s)
        </button>

        <button
          className="sb-btn"
          onClick={() =>
            push({
              type: "error",
              title: "Error",
              message: "Something went wrong. Try again.",
              durationMs: 4000,
              closable: true,
            })
          }
        >
          Error (4s)
        </button>

        <button
          className="sb-btn"
          onClick={() =>
            push({
              type: "warning",
              title: "Warning",
              message: "Be careful with that action.",
              durationMs: 6000,
              closable: false,
            })
          }
        >
          Warning (6s, no close)
        </button>

        <button
          className="sb-btn"
          onClick={() =>
            push({
              type: "info",
              title: "Info",
              message: "This is an informational toast.",
              durationMs: 1500,
              closable: true,
            })
          }
        >
          Info (1.5s)
        </button>

        <button className="sb-btn" onClick={clear}>
          Clear all
        </button>
      </div>

      <ToastViewport />
    </div>
  );
}

const meta: Meta = {
  title: "Feedback/Toast",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};
