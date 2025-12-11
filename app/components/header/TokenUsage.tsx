import { useStore } from '@nanostores/react';
import { usageStore } from '~/lib/stores/usage';
import { classNames } from '~/utils/classNames';

// GLM-4.6 limit
const CONTEXT_LIMIT = 200000;

export function TokenUsage() {
  const usage = useStore(usageStore);
  const percentage = Math.min((usage.totalTokens / CONTEXT_LIMIT) * 100, 100);

  // Color coding based on usage
  let colorClass = 'bg-green-500';

  if (percentage > 70) {
    colorClass = 'bg-yellow-500';
  }

  if (percentage > 90) {
    colorClass = 'bg-red-500';
  }

  return (
    <div
      className="flex items-center gap-3 px-3 py-1.5 rounded-md border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 text-xs text-bolt-elements-textSecondary"
      title={`Total: ${usage.totalTokens.toLocaleString()} / ${CONTEXT_LIMIT.toLocaleString()}`}
    >
      <div className="flex flex-col gap-0.5 min-w-[120px]">
        <div className="flex justify-between items-center w-full">
          <span>Context Usage</span>
          <span className="font-mono">{percentage.toFixed(1)}%</span>
        </div>
        <div className="w-full h-1.5 bg-bolt-elements-background-depth-3 rounded-full overflow-hidden">
          <div
            className={classNames('h-full transition-all duration-300 rounded-full', colorClass)}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <div className="hidden sm:flex flex-col text-[10px] opacity-70 border-l border-bolt-elements-borderColor pl-3">
        <div title="Prompt Tokens">↑ {usage.promptTokens.toLocaleString()}</div>
        <div title="Completion Tokens">↓ {usage.completionTokens.toLocaleString()}</div>
      </div>
    </div>
  );
}
