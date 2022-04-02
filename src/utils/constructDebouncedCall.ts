import debounce from 'lodash/debounce'

export const DEFAULT_DEBOUNCE_TIMEOUT = 500

const constructDebouncedCall = (
  callback: (params?: unknown) => void,
  timeout: number = DEFAULT_DEBOUNCE_TIMEOUT,
) => debounce(callback, timeout)

export default constructDebouncedCall
