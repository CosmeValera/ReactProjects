import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('/api/users',  (resolver) => {
        return HttpResponse.json([
            {
                id: 1,
                name: "anson",
            }
        ])
    }),
    http.post('/api/messages', async ({ request }) => {
        const requestBody = await request.json()
        console.log(requestBody)
        return HttpResponse.json({
            content: requestBody.content,
            createdAt: new Date().toLocaleString
        })
    })
]