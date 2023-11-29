const createUrl = (path: string) => {
  return window.location.origin + path
}

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createUrl('/api/journal'), {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      // body: JSON.stringify({}),
    }),
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
