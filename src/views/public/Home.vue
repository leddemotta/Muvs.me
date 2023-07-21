<template>
  <div>
    <img src="@/assets/images/muvsme-child.jpg" style="width: 100%" />

    <br />
    <br />
    <br />

    <div class="container">
      <h1>MUVS.ME</h1>
      <p>
        Conheça a muvs.me! O novo app de aluguel de bikes que veio pra ficar!
      </p>

      <h2>O que é?</h2>

      <p>
        A muvs.me (me move) é uma plataforma focada no aluguel de veículos por
        tração humana, como bicicletas, patinetes, patins entre outros. O
        aluguel dos veículos funciona da seguinte forma: Um usuário cadastra o
        seu veículo no nosso sistema, informa a disponibilidade e o preço para
        alugar.
      </p>

      <h2>Como os veículos serão encontrados?</h2>

      <p>
        Em nosso sistema você poderá fazer a busca através da sua localização ou
        pelo nosso mapa de veículos cadastrados, é bem fácil e prático! Seu
        vizinho pode estar alugando uma bike para você! :D
      </p>

      <h2>Nossa Missão</h2>

      <p>
        Como amantes do ciclismo sentimos falta daqueles apps de aluguel de
        bikes que ficavam pelas ruas, mas que com o passar do tempo foram
        deixando de existir por conta da manutenção cara e pelo descuido de
        alguns usuários. A nossa missão é trazer esta possibilidade de volta em
        qualquer lugar que você esteja, sendo perto de onde você mora ou em
        alguma viagem que você sinta a necessidade de dar umas pedaladas longe
        de casa. Além disto promover a saúde física e lazer de nossos usuários.
      </p>

      <hr />

      <p>
        Sabe aquela bicicleta ou patins que está encostada aí na sua casa? Eles
        podem te dar dinheiro sem você fazer nada! Cadastre-se agora no Muvs.me
        e comece a fazer uma renda extra pra você!
      </p>

      <hr />

      <p>
        Viaja muito e as vezes não consegue levar sua bike com você? Agora você
        pode! Cadastre-se no Muvs.me e busque por aluguel de bicicletas para a
        região onde você irá viajar!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // login() {
    //     this.$router.push(`/login`);
    // },
    // register() {
    //     this.$router.push(`/choose-registration`);
    // },
  },
};
</script>

<style lang="sass">
.content
  padding: 30px
header
  padding: 30px
  border-bottom: 1px solid #eee
nav
  text-align: center
  padding: 24px 0
  width: 100%
  height: 12vh
  float: left
  background-color: #ff4228
  ul
    padding: 0
    margin: 0
    list-style: none
    li
      display: inline-block
      margin: 0 15px
      img
        width: 30px
</style>
