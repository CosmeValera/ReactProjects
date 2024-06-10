import type { Meta, StoryObj } from '@storybook/react';
import { Mycomps } from './mycomps';

const meta: Meta<typeof Mycomps> = {
  component: Mycomps,
  title: 'Mycomps',
};
export default meta;
type Story = StoryObj<typeof Mycomps>;

export const Primary = {
  args: {},
};
