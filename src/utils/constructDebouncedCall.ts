import debounce from 'lodash/debounce'

export const DEFAULT_DEBOUNCE_TIMEOUT = 700

const constructDebouncedCall = (
  callback: (params?: any) => void,
  timeout: number = DEFAULT_DEBOUNCE_TIMEOUT,
) => debounce(callback, timeout)

export default constructDebouncedCall
