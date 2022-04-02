import constructDebouncedCall from './constructDebouncedCall'

jest.useFakeTimers()

describe('constructDebouncedCall', () => {
  const callBackSpy = jest.fn()

  beforeEach(() => {
    callBackSpy.mockReset()
  })

  test('should construct a debounced call', () => {
    const debouncedCall = constructDebouncedCall(callBackSpy)

    for (let i = 0; i < 20; i++) {
      debouncedCall()
    }

    jest.runAllTimers()

    expect(callBackSpy).toBeCalledTimes(1)
  })
})
