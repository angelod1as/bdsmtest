type GET = {
  url: string
  query?: Record<string, any>
}

type POST = {
  url: string
  body: Record<string, any>
}

export const callApi = {
  post: async ({ url, body }: POST) => {
    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    })
  },
  get: async ({ url, query }: GET) => {
    const queryString = query ? "?" + new URLSearchParams(query) : ""
    return await fetch(`${url}${queryString}`, {
      method: "GET",
    })
  },
}
