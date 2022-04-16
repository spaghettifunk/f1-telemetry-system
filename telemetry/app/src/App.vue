<script lang="ts">
// import 'vfonts/Lato.css'

import { defineComponent } from "vue";
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'

export default defineComponent({
  components: {
    Header,
    Sidebar,
    Main,
    Footer
  },
});
</script>

<template>
  <n-space vertical size="large">
    <n-layout has-sider style="height: 100vh">
      <n-layout-sider bordered content-style="padding-left: 24px;padding-right: 24px;">
        <Sidebar />
      </n-layout-sider>
      <n-layout bordered content-style="padding-left: 24px;padding-right: 24px;">
        <n-layout-header>
          <n-loading-bar-provider>
            <n-message-provider>
              <n-notification-provider>
                <n-dialog-provider>
                  <Header />
                </n-dialog-provider>
              </n-notification-provider>
            </n-message-provider>
          </n-loading-bar-provider>
        </n-layout-header>
        <n-layout-content>
          <Main />
        </n-layout-content>
        <n-layout-footer bordered position="absolute">
          <Footer />
        </n-layout-footer>
      </n-layout>
    </n-layout>
    </n-space>
</template>

<style>
#app {}
</style>
