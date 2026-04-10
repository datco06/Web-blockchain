import type { RunTimeLayoutConfig } from 'umi';

export const initialStateConfig = {
  loading: null,
};

export async function getInitialState() {
  return {};
}

export const layout: RunTimeLayoutConfig = () => ({
  childrenRender: (dom) => dom,
});
