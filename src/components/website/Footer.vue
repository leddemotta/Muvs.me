<template>

    aaaaaa

    <div class="row justify-center">
        <div class="col-12 col-md-2">
          .col-12 .col-md-2
        </div>
        <div class="col-12 col-md-auto">
          .col-12 .col-md-auto (Variable width content)
        </div>
        <div class="col-12 col-md-2">
          .col-12 .col-md-2
        </div>
      </div>

      <div class="row">
        <div class="col">
          .col
        </div>
        <div class="col-12 col-md-auto">
          .col-12 .col-md-auto (Variable width content)
        </div>
        <div class="col">
          .col
        </div>
      </div>
  <footer class="footer">
    <a-row type="flex" justify="space-between">
      <a-col> © Copyright 2022- Muvs.me - Todos os direitos reservados. </a-col>

      <a-col>
        <ul>
          <li>
            <RouterLink to="/terms">Termos e condições de uso</RouterLink>
          </li>
          <li><RouterLink to="/code">Código de conduta</RouterLink></li>
          <li><RouterLink to="/privacity">Privacidade</RouterLink></li>
          <li>
            <RouterLink to="/security-tips">Dicas de segurança</RouterLink>
          </li>
        </ul>
      </a-col>
    </a-row>
  </footer>
</template>

<style lang="sass" scoped>
.footer
  padding: 30px 30px 20px 140px
  background: #fafafa
  ul
    list-style: none
    li
      display: inline-block
      margin-left: 20px
      a
        font-weight: 600
        color: #aaa
</style>
