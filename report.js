//const cypress = require("cypress")
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

it('visit',()=>{
    cy.visit('/')
})

it('login',()=>{
  Cypress.config()
    cy.get('.log-in > .table > .table-cell > form > :nth-child(1) > .form-control').click() .type(Cypress.env('email-id '))
    cy.get('.log-in > .table > .table-cell > form > :nth-child(2) > .form-control').click().type(Cypress.env('password'))
    cy.get('.log-in > .table > .table-cell > form > .text-center > .btn').click()
    // scrolls to find report button
    cy.get('#Reports > a').scrollIntoView()
    .click()
    cy.get(':nth-child(1) > .integration-wrapper > .integration-btn > .btn').click()
    cy.wait(5000)
    
    it('').on('click', (e) => {
        const one = confirm('first confirm')
      
        if (one) {
          const two = confirm('second confirm')
      
          if (!two) {
            const three = confirm('third confirm')
      
            confirm('third confirm was ' + three)
          }
        }
      })
      
      // test code
      it('can control application confirms', (done) => {
        let count = 0
      
        // make sure you bind to this **before** the
        // confirm method is called in your application
        //
        // this event will automatically be unbound when this
        // test ends because it's attached to 'cy'
        cy.on('window:confirm', (str) => {
          count += 1
      
          switch (count) {
            case 1:
              expect(str).to.eq('first confirm')
            // returning nothing here automatically
            // accepts the confirmation
            case 2:
              expect(str).to.eq('second confirm')
      
              // reject the confirmation
              return false
      
            case 3:
              expect(str).to.eq('third confirm')
      
              // don't have to return true but it works
              // as well
              return true
      
            case 4:
              expect(str).to.eq('third confirm was true')
      
              // using mocha's async done callback to finish
              // this test so we are guaranteed everything
              // got to this point okay without throwing an error
              done()
          }
        })
      
        // click the button causing the confirm to fire
        cy.get(':nth-child(1) > .integration-wrapper > .integration-btn > .btn').click()
      })
      
      it('could also use a stub instead of imperative code', () => {
        const stub = cy.stub()
      
        // not necessary but showing for clarity
        stub.onFirstCall().returns(undefined)
        stub.onSecondCall().returns(false)
        stub.onThirdCall().returns(true)
      
        cy.on('window:confirm', stub)
      
        cy.get(':nth-child(1) > .integration-wrapper > .integration-btn > .btn')
          .click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith('first confirm')
            expect(stub.getCall(1)).to.be.calledWith('second confirm')
            expect(stub.getCall(2)).to.be.calledWith('third confirm')
            expect(stub.getCall(3)).to.be.calledWith('third confirm was true')
          })
      })
})