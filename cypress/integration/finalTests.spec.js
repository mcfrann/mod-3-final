describe('Shortened Urls', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      response: 200,
      fixture: 'urlExamples.json'
    })
      .as('initialIntercept')
      .visit('http://localhost:3000/')
  })

  it('When a user visits the page, they can view the page title and the existing shortened URLs', () => {
    cy.get('.page-title')
      .should('be.visible')
      .contains('URL Shortener')
      .get('#url1')
      .should('be.visible')
      .get('#url2')
      .should('be.visible')
      .get('#url3')
      .should('be.visible')
  })

  it('When a user visits the page, they can view the Form with the proper inputs', () => {
    cy.get('form')
      .should('be.visible')
      .get('.titleInput')
      .should('be.visible')
      .get('.urlInput')
      .should('be.visible')
  })

  it('When a user fills out the form, the information is reflected in the input fields', () => {
    cy.get('.titleInput')
      .type('Incredible Photo')
      .get('.urlInput')
      .type('www.url.com')
  })

  // it('When a user fills out and submits the form, the new shortened URL is rendered', () => {
  //   cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
  //     fixture: 'urlExamples.json'
  //   })
  //     .as('submitURL')
  //     .get('button')
  //     .click()
  //     .wait('@submitURL')
  //     .then(({ response }) => {
  //       expect(response.statusCode).to.eq(201)
  //     })
  //     .get('#url4')
  //     .should('be.visible')
  // })
})

describe('Posted Urls', () => {
  it('When a user fills out and submits the form, the new shortened URL is rendered', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      fixture: 'postExample.json'
    })
      .as('submitURL')
      .get('button')
      .click()
      .wait('@submitURL')
      .then(({ response }) => {
        expect(response.statusCode).to.eq(200)
      })
      .get('#url4')
      .should('be.visible')
  })
})
