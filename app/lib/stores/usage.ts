import { atom } from 'nanostores';

export interface TokenUsage {
  completionTokens: number;
  promptTokens: number;
  totalTokens: number;
}

export const usageStore = atom<TokenUsage>({
  completionTokens: 0,
  promptTokens: 0,
  totalTokens: 0,
});

export function updateUsage(usage: Partial<TokenUsage>) {
  const current = usageStore.get();
  usageStore.set({
    completionTokens: current.completionTokens + (usage.completionTokens || 0),
    promptTokens: current.promptTokens + (usage.promptTokens || 0),
    totalTokens: current.totalTokens + (usage.totalTokens || 0),
  });
}

export function setUsage(usage: TokenUsage) {
  usageStore.set(usage);
}
