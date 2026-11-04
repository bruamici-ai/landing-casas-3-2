import { test } from 'node:test';
import assert from 'node:assert/strict';
import { expireVouchers } from '../src/utils/voucherAvailability.mjs';

test('vouchers remain valid through December 31 in Mendoza and close/remove at expiry', () => {
  let removed=0, closed=0;
  const card={getAttribute:()=> '2027-01-01T00:00:00-03:00', querySelector:()=>({close(){closed++;}}), remove(){removed++;}};
  const document={querySelectorAll:()=>[card]};
  expireVouchers(document,Date.parse('2027-01-01T02:59:59.999Z'));
  assert.equal(removed,0); assert.equal(closed,0);
  expireVouchers(document,Date.parse('2027-01-01T03:00:00.000Z'));
  assert.equal(removed,1); assert.equal(closed,1);
});
