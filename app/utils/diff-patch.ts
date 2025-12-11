export function applyDiff(originalContent: string, diffContent: string): string {
  const markers = {
    start: '<<<<',
    mid: '====',
    end: '>>>>',
  };

  let result = originalContent;
  const blocks = parseDiffBlocks(diffContent, markers);

  for (const block of blocks) {
    if (result.includes(block.search)) {
      result = result.replace(block.search, block.replace);
    } else {
      // Retry with trimmed whitespace if exact match fails
      const trimmedResult = result.trim();
      const trimmedSearch = block.search.trim();

      if (trimmedResult.includes(trimmedSearch)) {
        result = result.replace(trimmedSearch, block.replace);
      } else {
        console.warn('Could not find match for diff block:', block.search);

        /*
         * We could throw an error or just continue.
         * For resilience, we'll continue but log the failure.
         */
      }
    }
  }

  return result;
}

interface DiffBlock {
  search: string;
  replace: string;
}

function parseDiffBlocks(content: string, markers: { start: string; mid: string; end: string }): DiffBlock[] {
  const blocks: DiffBlock[] = [];
  const lines = content.split('\n');
  let currentBlock: Partial<DiffBlock> | null = null;
  let mode: 'search' | 'replace' | 'idle' = 'idle';
  let buffer: string[] = [];

  for (const line of lines) {
    if (line.trim() === markers.start) {
      if (mode !== 'idle') {
        // malformed previous block, discard or handle error
      }

      mode = 'search';
      buffer = [];
      currentBlock = {};
    } else if (line.trim() === markers.mid) {
      if (mode === 'search') {
        currentBlock!.search = buffer.join('\n');
        mode = 'replace';
        buffer = [];
      }
    } else if (line.trim() === markers.end) {
      if (mode === 'replace') {
        currentBlock!.replace = buffer.join('\n');
        blocks.push(currentBlock as DiffBlock);
        mode = 'idle';
        currentBlock = null;
        buffer = [];
      }
    } else {
      if (mode !== 'idle') {
        buffer.push(line);
      }
    }
  }

  return blocks;
}
