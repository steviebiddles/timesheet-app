<template>
    <div class="issue-list-item">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    <slot></slot>
                </p>
                <a class="card-header-icon" @click="toggleCardBody">
                  <span class="icon">
                    <i :class="upOrDownAngle"></i>
                  </span>
                </a>
            </header>
            <div class="card-body" v-show="isCardBodyShown">
                <div class="card-content">
                    <div class="content">
                        <h3>{{ myVariable }}</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.</p>
                        <a>@bulmaio</a>. <a>#css</a> <a>#responsive</a>
                        <br>
                        <small>11:09 PM - 1 Jan 2016</small>
                    </div>
                </div>
                <footer class="card-footer">
                    <a class="card-footer-item is-danger">Delete</a>
                    <a class="card-footer-item">Log Work</a>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
  import Event from '../core/Event'

  export default {
    name: 'issue-list-item',
    data: function () {
      return {
        isCardBodyShown: false
      }
    },
    props: [
      'myVariable'
    ],
    mounted () {
      Event.$emit('toggle', 'issue-list')
    },
    methods: {
      toggleCardBody() {
        this.isCardBodyShown = !this.isCardBodyShown
      }
    },
    computed: {
      upOrDownAngle () {
        if (this.isCardBodyShown) {
          return 'fa fa-angle-up'
        } else {
          return 'fa fa-angle-down'
        }
      }
    }
  }
</script>

<style>
    .issue-list-item {
        background: yellow;
    }
</style>