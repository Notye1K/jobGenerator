///<reference types="cypress" />

const form = {
    title: 'Atendente de balcão',
    salary: '2000',
    bonus: ['Seguro de vida', 'Dentista'],
    activity: 'Ficar no caixa atendendo os clientes e suas necessidades',
    phases: ['Entrevista com RH', 'Proposta'],
    skills: ['Agilidade', 'Coordenação'],
    experience: '1 mês',
}
const url = 'http://localhost:5173/'
describe('new form', () => {
  it('given input texts should render correctly on next page', () => {
    localStorage.removeItem('forms')
    cy.visit(url)
    cy.get('#title').type(form.title)
    cy.get('#salary').type(form.salary)
    cy.get('#activity').type(form.activity)
    cy.get('#bonus').type(`${form.bonus[0]}{enter}${form.bonus[1]}{enter}`)
    cy.get('#phases').type(
        `${form.phases[0]}{enter}${form.phases[1]}{enter}`
    )
    cy.get('#skills').type(
        `${form.skills[0]}{enter}${form.skills[1]}{enter}`
    )
    cy.get('#experience').type(form.experience)
    cy.contains('Avançar').click()

    cy.url().should('equal', url+'resumo')
    
    cy.get('h4').should('have.text', form.title.toUpperCase())
    cy.get('h6').should('include.text', 'R$: ' + parseFloat(form.salary).toFixed(2).toString())
    cy.get('h6').should('include.text', form.activity)
    cy.get('h6').should('include.text', `${form.bonus[0]} + ${form.bonus[1]}`)
    cy.get('h6').should('include.text', `${form.phases[0]} => ${form.phases[1]}`)
    cy.get('h6').should('include.text', `${form.skills[0]} - ${form.skills[1]}`)
    cy.get('h6').should('include.text', form.experience)
    
    cy.contains('Salvar').click()
    cy.contains('Salvo com sucesso').should('be.visible')
  })
})

describe('load saved form', () => {
  beforeEach(()=>{
    localStorage.setItem('forms', JSON.stringify([form]))
  })
  it('should be able to load saved form and clear inputs', ()=>{
    cy.visit(url)
    cy.contains('Outros modelos').click()
    cy.contains(form.title).click()
    cy.contains(form.activity).should('be.visible')
    cy.contains('Novo formulario').click()
    cy.get('input').should('have.text', '')
  })
  it('should be able to go foward and go back, and change text alignment', ()=>{
    cy.visit(url)
    cy.contains('Outros modelos').click()
    cy.contains(form.title).click()
    cy.contains('Avançar').click()
    cy.contains('Voltar').click()
    cy.contains('Avançar').click()


    cy.get('[data-testid="FormatAlignCenterIcon"]').click()
    cy.get('h6').should('have.css', 'text-align', 'center')
    cy.get('[data-testid="FormatAlignLeftIcon"]').click()
    cy.get('h6').should('have.css', 'text-align', 'left')

  })
})