<template>
    <div class="vehicle-box" :class="`id-${vehicle.id}`">
        <a-row :gutter="20">
            <a-col class="picture" span="24">
                <!-- <img
                    src="../../../assets/images/vechicle/bicicleta.png"
                    alt="vehicle-pic"
                /> -->
                <lightbox
                    css="h-200 rad-6"
                    :items="images"
                    :cells="1"
                ></lightbox>

                <a-icon class="favorite" type="heart" />
            </a-col>
            <a-col class="details" span="24">
                <h2>{{ vehicle.name }} <ic icon="Home" /></h2>
                <div class="location">
                    <a-icon type="environment" /> {{ vehicle.address.city }},
                    {{ vehicle.address.state }}
                </div>
                <div class="features">
                    <a-tag
                        ><a :href="`/vehicle/${vehicle.type}`">
                            <a-icon type="tag" />
                            {{ formatVehicleTypeName(vehicle.type) }}
                        </a></a-tag
                    >
                </div>
            </a-col>

            <a-col class="footer" span="24">
                <a-row type="flex" justify="space-between">
                    <a-col>
                        <span class="value">R${{ vehicle.value }}</span>
                        <span class="by-day">/dia</span>
                    </a-col>

                    <a-col>
                        <a-button
                            class="view"
                            type="primary"
                            shape="circle"
                            icon="arrow-right"
                            @click="
                                $router.push(
                                    `/vehicle/${vehicle.type}/${vehicle.id}/${vehicle.slug}`
                                )
                            "
                        />
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import formatThings from "@/mixins/general/formatThings.js";

export default {
    props: { vehicle: Object },
    mixins: [formatThings],
    data() {
        return {
            images: [
                "https://lasmagrelas.com.br/wp-content/uploads/2021/09/IMG_3596-600x400.png",
            ],
        };
    },
};
</script>

<style lang="sass" scoped>
.vehicle-box
  background: #FFF
  padding: 10px
  border-radius: 6px
  transition: .3s

  &:hover
    box-shadow: 0px 10px 20px #ddd
  .picture
    position: relative
    .favorite
      position: absolute
      right: 20px
      top: 12px
      font-size: 24px
      color: #FFF
    img
      width: 100%
      border-radius: 6px
  .footer
    // cursor: pointer
    border-top: 1px solid #eee
    padding: 10px 0 0px
    margin-top: 10px
    .view
      background-color: #fff
      border-color: #fff
      box-shadow: none
      font-size: 20px
      color: #bbb
      transition: .3s
      &:hover
        color: #666
    .value
      color: #34a853 // #ff4228
      font-size: 24px
      font-weight: 700
      letter-spacing: -1px
    .by-day
      color: #999
      // font-style: oblique;
      font-size: 14px
  .details
    .features
      padding-top: 5px
      .ant-tag
        background: #FFF
        font-size: 10px
        padding: 0px 6px
        border-color: #ddd
        a
          color: #999
          font-weight: 500
    .location
      color: #999
      font-size: 12px
    h2
      font-size: 18px
      font-weight: 700
      letter-spacing: -0.5px
      color: #333 !important
      margin: 14px 0 5px 0
      line-height: 1
</style>
