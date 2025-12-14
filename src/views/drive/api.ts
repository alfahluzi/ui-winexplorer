export namespace DriveApi {
  export const getAllData = async (): Promise<{ data: any; error: any }> => {
    let data
    let error
    try {
      const res = await fetch('http://localhost:3000/folders/')
      if (!res.ok) error = new Error('Failed to fetch data')
      data = await res.json()
    } catch (e) {
      error = e
    } finally {
      return { data, error }
    }
  }
  export const searchByName = async (name: string): Promise<{ data: any; error: any }> => {
    let data
    let error

    const baseUrl = 'http://localhost:3000/folders/search'
    const params = new URLSearchParams({ name: name })
    const url = `${baseUrl}?${params.toString()}`

    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
      data = await res.json()
    } catch (e) {
      error = e
    } finally {
      return { data, error }
    }
  }

  export const getFolderById = async (id: string): Promise<{ data: any; error: any }> => {
    let data
    let error

    try {
      const res = await fetch(`http://localhost:3000/folder/${id}`)
      if (!res.ok) throw new Error(`Failed to fetch data`)
      data = await res.json()
    } catch (e) {
      error = e
    } finally {
      return { data, error }
    }
  }
}
