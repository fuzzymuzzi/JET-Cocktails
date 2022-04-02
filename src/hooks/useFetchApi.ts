import { useCallback } from 'react'

type TConvertor = (data: any) => any
type TFetch = (
  url: string,
  options?: { [key: string]: unknown },
) => Promise<any>

const useFetchApi = (baseUrl: string, convertor?: TConvertor): TFetch => {
  const apiFetch = useCallback(
    (url, options) =>
      fetch(`${baseUrl}/${url}`, options)
        .then(res => res.json())
        .then(json => (convertor ? convertor(json) : json)),
    [baseUrl, convertor],
  )
  return apiFetch
}

export default useFetchApi
