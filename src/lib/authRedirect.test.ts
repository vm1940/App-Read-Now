import assert from 'node:assert/strict';
import test from 'node:test';
import { getAppRouteUrl, getLoginReturnPath, getSafeReturnPath } from './authRedirect';

test('accepts an internal return route including its query and fragment', () => {
  assert.equal(getLoginReturnPath({
    from: { pathname: '/libro/123', search: '?tab=details', hash: '#reviews' },
  }), '/libro/123?tab=details#reviews');
});

test('rejects external and malformed return destinations', () => {
  assert.equal(getSafeReturnPath('//example.com'), null);
  assert.equal(getLoginReturnPath({ from: 'https://example.com' }), null);
});

test('builds app URLs with the configured deployment base path', () => {
  assert.equal(
    getAppRouteUrl('/reset-password', 'https://vm1940.github.io', '/App-Read-Now/'),
    'https://vm1940.github.io/App-Read-Now/reset-password',
  );
  assert.equal(
    getAppRouteUrl('/reset-password', 'http://localhost:3000', '/'),
    'http://localhost:3000/reset-password',
  );
});
