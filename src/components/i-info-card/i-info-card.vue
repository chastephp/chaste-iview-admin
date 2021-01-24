<template>
  <Card :padding="0" :shadow="shadow" class="info-card-wrapper">
    <div class="content-con">
      <div :style="{background: color, width: leftWidth}" class="left-area">
        <Icon :size="iconSize" :type="icon" class="icon" color="#fff"/>
      </div>
      <div :style="{width: rightWidth}" class="right-area">
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'IInfoCard',
  props: {
    left: {
      type: Number,
      default: 36
    },
    color: {
      type: String,
      default: '#2d8cf0'
    },
    icon: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: 20
    },
    shadow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    leftWidth () {
      return `${this.left}%`
    },
    rightWidth () {
      return `${100 - this.left}%`
    }
  }
}
</script>

<style lang="less">
.common {
  position: absolute;
  top: 0px;
  height: 100%;
  display: table;
  text-align: center;
}

.size {
  width: 100%;
  height: 100%;
}

.middle-center {
  display: table-cell;
  vertical-align: middle;
}

.info-card-wrapper {
  .size;
  overflow: hidden;

  .ivu-card-body {
    .size;
  }

  .content-con {
    .size;
    position: relative;

    .left-area {
      .common;
      left: 0px;

      & > .icon {
        .middle-center;
      }
    }

    .right-area {
      .common;
      right: 0px;

      & > div {
        .middle-center;
      }
    }
  }
}
</style>
