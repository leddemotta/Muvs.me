import PageHeader from '../components/general/PageHeader.vue'

describe('<PageHeader />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    // props: {
    //   title: "tes",
    //   subTitle: "tes",
    // },
    cy.mount(PageHeader)
  })
})