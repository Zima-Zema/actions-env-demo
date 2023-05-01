// @ts-check
import { test, expect } from '@playwright/test';
import db from '../data/database.js';

test.describe.configure({ mode: 'serial' });
test.describe('CRUD Operation', () => {
  test('event creation', async ({ request }) => {
    const testTitle = 'Test event';
    const response = await request.post('/', {
      data: {
        title: testTitle,
      },
    });
    expect(response.ok()).toBeTruthy();
    const resDataRaw = await response.body();
    const resData = JSON.parse(resDataRaw.toString());
    expect(resData).toHaveProperty('event.id');
    expect(resData.event.title).toBe(testTitle);
  });

  test('getting events', async ({ request }) => {
    const response = await request.get('/');
    expect(response.ok()).toBeTruthy();
    const resDataRaw = await response.body();
    const resData = JSON.parse(resDataRaw.toString());
    expect(resData).toHaveProperty('events');
    expect(resData.events.length).toBeGreaterThan(0);
  });

  test.afterAll(async () => {
    console.log('Done with tests: Start Cleaning Up');
    await db.collection('events').deleteMany({ title: 'Test event' });
  });

});