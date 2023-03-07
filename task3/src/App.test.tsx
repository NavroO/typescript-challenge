import keyCompareService from './service/keyCompareService';

describe('getKeys', () => {
    it('should return an empty array for an empty object', () => {
        expect(keyCompareService.getKeys({})).toEqual([]);
    });

    it('should return an array of keys for a flat object', () => {
        expect(keyCompareService.getKeys({ a: 1, b: 2, c: 3 })).toEqual(['a', 'b', 'c']);
    });

    it('should return an array of keys for a nested object', () => {
        expect(keyCompareService.getKeys({ a: 1, b: { c: 2, d: { e: 3 } } })).toEqual(['a', 'b', 'b.c', 'b.d', 'b.d.e']);
    });
});