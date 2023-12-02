const createUrl = (path: string) => {
  return window.location.origin + path
}

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createUrl('/api/journal'), {
      method: 'POST',
      body: JSON.stringify({content: 'new entry'}),
    }),
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  } else {
    throw new Error('Failed to create new entry')
  }
}

export const updateEntry = async (id: string, updates: string) => {
  const res = await fetch(
    new Request(createUrl(`/api/journal/${id}`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({updates}),
    }),
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const askQuestion = async (question: string) => {
  const res = await fetch(
    new Request(createUrl('/api/question'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({question}),
    }),
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
