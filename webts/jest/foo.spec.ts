import { mocked } from 'ts-jest/utils'
import { foo } from '../src/foo'
jest.mock('../src/foo')

const mockedFoo = mocked(foo, true)
const mockedFoo1 = mocked(foo.name)
test('deep', () => {
  mockedFoo.a.b.c.hello('me')
  console.log((mockedFoo.a.b.c.hello as any).mock.calls.length)
  expect((mockedFoo.a.b.c.hello as any).mock.calls).toHaveLength(1)
});

test('direct', () => {
  foo.name()
  console.log((mockedFoo1 as any).mock.calls.length)
  expect((mockedFoo1 as any).mock.calls).toHaveLength(1)
})
