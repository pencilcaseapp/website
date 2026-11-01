import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditorMock } from './editor-mock';

/**
 * Resize the frame to see the document switch between desktop, tablet
 * and phone.
 */
const meta = {
  title: 'Data Display/EditorMock',
  component: EditorMock,
  decorators: [Story => (
    <div className="h-[595px] w-[850px] resize-x overflow-hidden rounded-3xl shadow-window">
      <Story />
    </div>
  )],
} satisfies Meta<typeof EditorMock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
