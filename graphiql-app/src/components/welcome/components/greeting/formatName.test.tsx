import { formatName } from './formatName';

describe('format name tests', () => {
  test('should return the name without the ellipsis if its length is less than nine letters', () => {
    expect(formatName('TestName')).toBe('TestName');
  });

  test('should return the name with ellipsis if its length is more than nine letters', () => {
    expect(formatName('TestName11111')).toBe('TestName1...');
  });
});
