import { describe, it, expect } from 'vitest';
import { applyDiff } from './diff-patch';

describe('applyDiff', () => {
  it('should apply a simple search and replace', () => {
    const original = 'Hello World';
    const diff = `<<<<
Hello
====
Hi
>>>>`;
    const result = applyDiff(original, diff);
    expect(result).toBe('Hi World');
  });

  it('should apply multiple replacements', () => {
    const original = 'one two three';
    const diff = `<<<<
one
====
1
>>>>
<<<<
three
====
3
>>>>`;
    const result = applyDiff(original, diff);
    expect(result).toBe('1 two 3');
  });

  it('should handle whitespace in search blocks', () => {
    const original = `function test() {
  return true;
}`;
    const diff = `<<<<
  return true;
====
  return false;
>>>>`;
    const result = applyDiff(original, diff);
    expect(result).toBe(`function test() {
  return false;
}`);
  });

  it('should handle replacements that span multiple lines', () => {
    const original = `
    <div>
      <span>Old</span>
    </div>
    `;
    const diff = `<<<<
    <div>
      <span>Old</span>
    </div>
====
    <section>
      <span>New</span>
    </section>
>>>>`;
    const result = applyDiff(original, diff);
    expect(result).toContain('<section>');
    expect(result).toContain('<span>New</span>');
    expect(result).toContain('</section>');
  });

  it('should retry with trimmed whitespace if exact match fails', () => {
    const original = '  content  ';
    const diff = `<<<<
content
====
new content
>>>>`;
    const result = applyDiff(original, diff);
    expect(result).toBe('  new content  ');
  });

  it('should return original content if match not found', () => {
    const original = 'some content';
    const diff = `<<<<
missing
====
replacement
>>>>`;
    const result = applyDiff(original, diff);
    expect(result).toBe('some content');
  });
});
