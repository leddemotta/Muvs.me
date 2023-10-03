<template>
  <div>
    <!-- <div class="container">
      <h1>MUVS.ME</h1>
      <p>
        Conheça a muvs.me!
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
    </div> -->

    <div class="relative">
      <img
        src="@/assets/images/muvsme-child.jpg"
        class="absolute inset-0 object-cover w-full h-full"
        alt=""
      />
      <div class="relative">
        <div
          class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-40"
        >
          <div class="flex flex-col items-center justify-between xl:flex-row">
            <div class="w-full max-w-xl xl:px-8 xl:w-5/12"></div>
            <div class="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2
                class="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none"
              >
                O jeito mais fácil <br class="hidden md:block" />
                de alugar uma bicicleta!
              </h2>
              <p class="max-w-xl mb-4 text-base md:text-lg">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudan, totam rem aperiam, eaque ipsa
                quae.
              </p>
              <!-- <a href="/" aria-label="" class="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700">
                Learn more
                <svg class="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"></path>
                </svg>
              </a> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-16">
      <div class="bg-gray-100">
        <div
          class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
        >
          <div
            class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12"
          >
            <div>
              <p
                class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400"
              >
              Conheça a muvs.me!
              </p>
            </div>
            <h2
              class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto"
            >
              <span class="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-gray-400 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                  <defs>
                    <pattern
                      id="dc223fcc-6d72-4ebc-b4ef-abe121034d6e"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7"></circle>
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#dc223fcc-6d72-4ebc-b4ef-abe121034d6e)"
                    width="52"
                    height="24"
                  ></rect>
                </svg>

              </span>
              O novo app de aluguel de bikes que veio pra ficar!
            </h2>
            <p class="text-base text-gray-700 md:text-lg">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque rem aperiam, eaque ipsa quae.
            </p>
          </div>
          <div class="flex items-center sm:justify-center">
            <button
              type="submit"
              class="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
            >
              Get started
            </button>
            <a
              href="/"
              aria-label=""
              class="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700"
              >Learn more</a
            >
          </div>
        </div>
      </div>
      <div class="relative px-4 sm:px-0">
        <div class="absolute inset-0 bg-gray-100 h-1/2"></div>
        <div
          class="relative grid mx-auto overflow-hidden bg-white divide-y rounded shadow sm:divide-y-0 sm:divide-x sm:max-w-screen-sm sm:grid-cols-3 lg:max-w-screen-md"
        >
          <div class="inline-block p-8 text-center">
            <div
              class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-50"
            >
              <svg
                class="w-10 h-10 text-deep-purple-accent-400"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                ></polygon>
              </svg>
            </div>
            <p class="font-bold tracking-wide text-gray-800">Make it better</p>
          </div>
          <div class="inline-block p-8 text-center">
            <div
              class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-50"
            >
              <svg
                class="w-10 h-10 text-deep-purple-accent-400"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                ></polygon>
              </svg>
            </div>
            <p class="font-bold tracking-wide text-gray-800">Do it faster</p>
          </div>
          <div class="inline-block p-8 text-center">
            <div
              class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-50"
            >
              <svg
                class="w-10 h-10 text-deep-purple-accent-400"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                ></polygon>
              </svg>
            </div>
            <p class="font-bold tracking-wide text-gray-800">Working harder</p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
    >
      <div
        class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12"
      >
        <div>
          <p
            class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400"
          >
            Brand new
          </p>
        </div>
        <h2
          class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto"
        >
          <span class="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="3071a3ad-db4a-4cbe-ac9a-47850b69e4b7"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7"></circle>
                </pattern>
              </defs>
              <rect
                fill="url(#3071a3ad-db4a-4cbe-ac9a-47850b69e4b7)"
                width="52"
                height="24"
              ></rect>
            </svg>
            <span class="relative">The</span>
          </span>
          quick, brown fox jumps over a lazy dog
        </h2>
        <p class="text-base text-gray-700 md:text-lg">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque rem aperiam, eaque ipsa quae.
        </p>
      </div>
      <div class="grid max-w-screen-lg gap-8 lg:grid-cols-2 sm:mx-auto">
        <div class="flex flex-col justify-center">
          <div class="flex">
            <div class="mr-4">
              <div
                class="flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-indigo-50"
              >
                <svg
                  class="w-8 h-8 text-deep-purple-accent-400"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  ></polygon>
                </svg>
              </div>
            </div>
            <div>
              <h6 class="mb-2 font-semibold leading-5">
                They urge you to put down
              </h6>
              <p class="text-sm text-gray-900">
                Skate ipsum dolor sit amet, alley oop vert mute-air Colby Carter
                flail 180 berm. Half-cab camel back ollie transition ledge Wes
                Humpston 1080.
              </p>
              <hr class="w-full my-6 border-gray-300" />
            </div>
          </div>
          <div class="flex">
            <div class="mr-4">
              <div
                class="flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-indigo-50"
              >
                <svg
                  class="w-8 h-8 text-deep-purple-accent-400"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  ></polygon>
                </svg>
              </div>
            </div>
            <div>
              <h6 class="mb-2 font-semibold leading-5">
                The powerless in a world
              </h6>
              <p class="text-sm text-gray-900">
                The first mate and his Skipper too will do their very best to
                make the others comfortable in their tropic island nest. Michael
                Knight a young loner.
              </p>
              <hr class="w-full my-6 border-gray-300" />
            </div>
          </div>
          <div class="flex">
            <div class="mr-4">
              <div
                class="flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-indigo-50"
              >
                <svg
                  class="w-8 h-8 text-deep-purple-accent-400"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  ></polygon>
                </svg>
              </div>
            </div>
            <div>
              <h6 class="mb-2 font-semibold leading-5">
                Tell them I hate them
              </h6>
              <p class="text-sm text-gray-900">
                Chase ball of string eat plants, meow, and throw up because I
                ate plants going to catch the red dot today going to catch the
                red dot today. I could pee on this if I had the energy.
              </p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <img
            class="object-cover w-full h-56 col-span-2 rounded shadow-lg"
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            alt=""
          />
          <img
            class="object-cover w-full h-48 rounded shadow-lg"
            src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            alt=""
          />
          <img
            class="object-cover w-full h-48 rounded shadow-lg"
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            alt=""
          />
        </div>
      </div>
    </div>

    <div
      class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
    >
      <div class="max-w-lg sm:text-center sm:mx-auto">
        <a href="/" aria-label="Go Home" title="Logo" class="inline-block mb-4">
          <div
            class="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50"
          >
            <svg
              class="w-10 h-10 text-deep-purple-accent-400"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              ></polygon>
            </svg>
          </div>
        </a>
        <h2
          class="mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none"
        >
          <span class="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-32 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="6b0188f3-b7a1-4e9b-b95e-cad916bb3042"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7"></circle>
                </pattern>
              </defs>
              <rect
                fill="url(#6b0188f3-b7a1-4e9b-b95e-cad916bb3042)"
                width="52"
                height="24"
              ></rect>
            </svg>
            <span class="relative bg-white">The</span>
          </span>
          quick, brown fox jumps over a lazy dog
        </h2>
        <p class="text-base text-gray-700 md:text-lg">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
        </p>
        <hr class="my-8 border-gray-300" />
        <div class="flex items-center mb-3 sm:justify-center">
          <a href="/" class="mr-3 transition duration-300 hover:shadow-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1000px-Download_on_the_App_Store_Badge.svg.png"
              class="object-cover object-top w-32 mx-auto"
              alt=""
            />
          </a>
          <a href="/" class="transition duration-300 hover:shadow-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1000px-Google_Play_Store_badge_EN.svg.png"
              class="object-cover object-top w-32 mx-auto"
              alt=""
            />
          </a>
        </div>
        <p
          class="max-w-xs text-xs text-gray-600 sm:text-sm sm:max-w-sm sm:mx-auto"
        >
          Sed ut unde omnis iste natus accusantium doloremque laudantium omnis
          iste.
        </p>
      </div>
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
