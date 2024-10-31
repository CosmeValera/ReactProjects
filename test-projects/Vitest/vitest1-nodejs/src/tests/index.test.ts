import { describe, test, expect } from 'vitest';

describe("ViewController", () => {
  test('GET', async () => {
    const response = await fetch('http://localhost:3333/views');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([
      { id: 1, name: 'Dashboard', layout: '{}', isPrivate: false },
      { id: 2, name: 'Reports', layout: '{}', isPrivate: true },
    ]);
  });

  test('CREATE', async () => {
    const newView = { name: 'New View', layout: '{}', isPrivate: false };
    const response = await fetch('http://localhost:3333/views', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newView),
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ id: 3, ...newView });
  });

  test('UPDATE', async () => {
    const updatedView = { name: 'Updated View', layout: '{}', isPrivate: true };
    const response = await fetch('http://localhost:3333/views/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedView),
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ id: 1, ...updatedView });
  });

  test('DELETE', async () => {
    const response = await fetch('http://localhost:3333/views/1', {
      method: 'DELETE',
    });
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toEqual({ id: 1, name: 'Dashboard', layout: '{}', isPrivate: false });
  });
})