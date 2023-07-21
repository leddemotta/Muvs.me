<template>
    <footer class="footer">
        <a-row type="flex" justify="space-between">
            <a-col>
                © Copyright 2022- Muvs.me - Todos os direitos reservados.
            </a-col>

            <a-col>
                <ul>
                    <li><a>Termos e condições de uso</a></li>
                    <li><a>Código de conduta</a></li>
                    <li><a>Privacidade</a></li>
                    <li><a>Dicas de segurança</a></li>
                </ul>
            </a-col>
        </a-row>
    </footer>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
.footer
  padding: 30px 30px 20px 140px;
  background: #fafafa;
  ul
    list-style: none;
    li
      display: inline-block
      margin-left: 20px
      a
        font-weight: 600
        color: #aaa
</style>
