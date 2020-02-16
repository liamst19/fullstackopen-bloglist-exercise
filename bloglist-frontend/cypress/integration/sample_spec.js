


describe('My First Test', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(true)
  })
})

describe('My First Test', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(false)
  })
})

describe('Testing again', function() {
  it('does not do much either', () => {
    expect(true).toBe(true)
  })
})