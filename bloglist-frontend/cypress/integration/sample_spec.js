

<<<<<<< HEAD
describe('site test', () => {
  it('visit site', () => {
    cy.visit('http://localhost:3000')

    cy.contains('Zizek').click()
    cy.url().should('include', '/blogs/')
=======

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
>>>>>>> fad1ea8... cypress setup
  })
})