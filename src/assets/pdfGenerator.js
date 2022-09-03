import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function pdfGenerator(form, alignment) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const docDefinitions = {
        pageSize: 'A4',

        content: [
            { text: form.title.toUpperCase(), style: 'title' },
            { text: `Salário:`, style: 'subtitle' },
            { text: 'R$: ' + form.salary, style: 'content' },
            {
                text: `Atividades do dia a dia:`,
                style: 'subtitle',
            },
            { text: form.activity, style: 'content' },
            { text: `Benefícios:`, style: 'subtitle' },
            { text: form.bonus.join(' + '), style: 'content' },
            { text: `Fases do processo:`, style: 'subtitle' },
            { text: form.phases.join(' => '), style: 'content' },
            { text: `Habilidades necessárias:`, style: 'subtitle' },
            { text: form.skills.join(' - '), style: 'content' },
            { text: `Experiência necessária:`, style: 'subtitle' },
            { text: form.experience, style: 'content' },
        ],

        styles: {
            title: {
                alignment: 'center',
                fontSize: 30,
                bold: true,
                margin: [0, 10, 0, 90],
            },
            subtitle: {
                fontSize: 20,
                bold: true,
                alignment,
            },
            content: {
                fontSize: 15,
                margin: [0, 10, 0, 30],
                alignment,
            },
        },
    }

    pdfMake.createPdf(docDefinitions).download(form.title)
}
export default pdfGenerator
