import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from ".";

const meta: Meta<typeof Input> = {
  title: "Input/Input",
  component: Input,
  args: {
    placeholder: "Type something…",
    type: "text",
    clearable: true,
  },
  argTypes: {
    type: { control: "select", options: ["text", "password", "number"] },
    clearable: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Text: Story = {
  args: { type: "text", placeholder: "Input some text...", clearable: true },
};

export const TextWithoutClearable: Story = {
  args: { type: "text", placeholder: "Input some text...", clearable: false },
};

export const PasswordWithToggle: Story = {
  args: { type: "password", placeholder: "Input password", clearable: false },
};

export const PasswordClearableWithToggle: Story = {
  args: { type: "password", placeholder: "Input password", clearable: true },
};

export const Number: Story = {
  args: { type: "number", placeholder: "123...", clearable: false },
};

export const NumberClearable: Story = {
  args: { type: "number", placeholder: "123...", clearable: true },
};
