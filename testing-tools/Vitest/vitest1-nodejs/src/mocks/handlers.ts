import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:3333/views', () => {
    return HttpResponse.json([
      { id: 1, name: 'Dashboard', layout: '{}', isPrivate: false },
      { id: 2, name: 'Reports', layout: '{}', isPrivate: true },
    ])
  }),

  http.post('http://localhost:3333/views', async ({ request }) => {
    const { name, layout, isPrivate } = await request.json() as ViewRequestDTO;
    const newView = { id: 3, name, layout, isPrivate }; // Mock ID generation
    return HttpResponse.json(newView);
  }),

  http.put('http://localhost:3333/views/:id', async ({ request, params }) => {
    const { id } = params;
    const { name, layout, isPrivate } = await request.json() as ViewRequestDTO;
    return HttpResponse.json({ id: Number(id), name, layout, isPrivate });
  }),

  http.delete('http://localhost:3333/views/:id', ({ request, params }) => {
    const { id } = params;
    return HttpResponse.json({ id: Number(id), name: 'Dashboard', layout: '{}', isPrivate: false });
  }),
];
