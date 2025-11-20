import { describe, it, expect } from 'vitest';
import { getFilePathFromUrl, BUCKET_NAME } from '../utils/storage';

describe('Storage Utils', () => {
  describe('getFilePathFromUrl', () => {
    it('should extract file path from full URL', () => {
      const url = `https://example.supabase.co/storage/v1/object/public/${BUCKET_NAME}/general/123-test.jpg`;
      const path = getFilePathFromUrl(url);
      expect(path).toBe('general/123-test.jpg');
    });

    it('should return empty string for invalid URL', () => {
      const url = 'https://example.com/invalid-url';
      const path = getFilePathFromUrl(url);
      expect(path).toBe('');
    });

    it('should handle URLs with nested paths', () => {
      const url = `https://example.supabase.co/storage/v1/object/public/${BUCKET_NAME}/event-123/subfolder/456-file.pdf`;
      const path = getFilePathFromUrl(url);
      expect(path).toBe('event-123/subfolder/456-file.pdf');
    });
  });

  describe('BUCKET_NAME', () => {
    it('should be set to myfamily', () => {
      expect(BUCKET_NAME).toBe('myfamily');
    });
  });
});
