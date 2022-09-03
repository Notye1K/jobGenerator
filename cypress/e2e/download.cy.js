import { join } from 'path'

const form = {
    title: 'Atendente de balcão',
    salary: '2000',
    bonus: ['Seguro de vida', 'Dentista'],
    activity: 'Ficar no caixa atendendo os clientes e suas necessidades',
    phases: ['Entrevista com RH', 'Proposta'],
    skills: ['Agilidade', 'Coordenação'],
    experience: '1 mês',
}

describe('file download', () => {
    it('verifies download', () => {
        window.localStorage.setItem('forms', JSON.stringify([form]))
        cy.visit('http://localhost:5173/')
        cy.contains('Outros modelos').click()
        cy.contains(form.title).click()
        cy.contains('Avançar').click()
        cy.contains('Exportar pdf').click()

        const downloadsFolder = Cypress.config('downloadsFolder')
        cy.readFile(join(downloadsFolder, `${form.title}.pdf`)).should('exist')
    })
})
