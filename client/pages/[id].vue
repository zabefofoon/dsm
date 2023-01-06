<template>
  <iframe ref="iframe"
          class="w-full h-full"
          src="https://zabefofoon.github.io/dsm-embbedded/?save=true"
          @load="loadGroups"></iframe>
</template>

<script setup lang="ts">
import {onMounted, ref, useState} from "#imports"
import {SeoData} from "~/middleware/seo"
import {useNavigationStore} from "~/stores/navigation"

definePageMeta({
  layout: 'editor',
  middleware: 'seo'
})

const seoData = useState<SeoData>('seoData')
seoData.value = {
  pageTitle: 'DSM - My Project',
  displayTitle: 'My project'
}

const iframe = ref<HTMLIFrameElement>()
const postGroups = () => setTimeout(() => iframe.value
    ?.contentWindow
    ?.postMessage({
      type: 'loadGroups',
      groups: [
        {
          name: 'Background color',
          items: [
            {
              html: '<div class="bg-1"\n' +
                  '    style="width:50px; height:50px;border-radius:50%;">\n' +
                  '</div>',
              css: '.bg-1 {\n' +
                  '    background: #13293D;\n' +
                  '}',
              name: '#13293D',
              description: '',
            },
            {
              html: '<div class="bg-2"\n' +
                  '    style="width:50px; height:50px;border-radius:50%;">\n' +
                  '</div>',
              css: '.bg-2 {\n' +
                  '    background: #006494;\n' +
                  '}',
              name: '#006494',
              description: '',
            },
            {
              html: '<div class="bg-3"\n' +
                  '    style="width:50px; height:50px;border-radius:50%;">\n' +
                  '</div>',
              css: '.bg-3 {\n' +
                  '    background: #247BA0;\n' +
                  '}',
              name: '#247BA0',
              description: '',
            },
            {
              html: '<div class="bg-4"\n' +
                  '    style="width:50px; height:50px;border-radius:50%;">\n' +
                  '</div>',
              css: '.bg-4 {\n' +
                  '    background: #1B98E0;\n' +
                  '}',
              name: '#1B98E0',
              description: '',
            },
            {
              html: '<div class="bg-5"\n' +
                  '    style="width:50px; height:50px;border-radius:50%;">\n' +
                  '</div>',
              css: '.bg-5 {\n' +
                  '    background:#E8F1F2;\n' +
                  '}',
              name: '#E8F1F2',
              description: '',
            }
          ]
        },
        {
          name: 'Text color',
          items: [
            {
              html: '<h4 class="text-color-1">text<br/>#1B98E0</h4>',
              css: '.text-color-1 {\n    color:#1B98E0;\n  }',
              name: '#1B98E0',
              description: '',
            },
            {
              html: '<h4 class="text-color-2">text<br/>tomato</h4>',
              css: '.text-color-2 {\n    color:tomato;\n  }',
              name: 'tomato',
              description: '',
            },
            {
              html: '<h4 class="text-orange">text<br/>orange</h4>',
              css: '.text-orange {\n    color:orange;\n  }',
              name: 'orange',
              description: '',
            }
          ]
        },
        {
          name: 'Icon',
          items: [
            {
              html: '<span style="font-size:2rem;">\n' +
                  '    <i class="icon icon-arrow-left"></i>\n' +
                  '</span>\n',
              css: '.icon-arrow-left {\n  -webkit-mask-image: url(https://api.iconify.design/ic/baseline-arrow-back-ios-new.svg);\n  mask-image: url(https://api.iconify.design/ic/baseline-arrow-back-ios-new.svg);\n}',
              name: 'Arrow left',
              description: 'If wanna change icon image, get icon url from iconify'
            },
            {
              html: '<span style="font-size:2rem;">\n' +
                  '    <i class="icon icon-arrow-right"></i>\n' +
                  '</span>\n',
              css: '.icon-arrow-right {\n-webkit-mask-image: url(https://api.iconify.design/ic/baseline-arrow-forward-ios.svg);\n  mask-image: url(https://api.iconify.design/ic/baseline-arrow-forward-ios.svg);\n}',
              name: 'Arrow right',
              description: 'If wanna change icon image, get icon url from iconify'
            },
            {
              html: '<span style="font-size:2rem;">\n' +
                  '    <i class="icon icon-arrow-bottom"></i>\n' +
                  '</span>\n',
              css: '.icon-arrow-bottom {\n  -webkit-mask-image: url(https://api.iconify.design/ic/baseline-keyboard-arrow-down.svg);\n  mask-image: url(https://api.iconify.design/ic/baseline-keyboard-arrow-down.svg);\n}',
              name: 'Arrow bottom',
              description: 'If wanna change icon image, get icon url from iconify'
            },
            {
              html: '<span style="font-size:2rem;">\n' +
                  '    <i class="icon icon-arrow-top"></i>\n' +
                  '</span>\n',
              css: '.icon-arrow-top {\n  -webkit-mask-image: url(https://api.iconify.design/ic/baseline-keyboard-arrow-up.svg);\n  mask-image: url(https://api.iconify.design/ic/baseline-keyboard-arrow-up.svg);\n}',
              name: 'Arrow top',
              description: 'If wanna change icon image, get icon url from iconify'
            },
            {
              html: '<span style="font-size:2rem;">\n' +
                  '    <i class="icon icon-bullet"></i>\n' +
                  '</span>\n',
              css: '.icon-bullet {\n  -webkit-mask-image: url(https://api.iconify.design/zondicons/list-bullet.svg);\n  mask-image: url(https://api.iconify.design/zondicons/list-bullet.svg);\n}',
              name: 'Bullet',
              description: 'If wanna change icon image, get icon url from iconify'
            },
            {
              html: '<span style="font-size:2rem;">\n' +
                  '    <i class="icon icon-widgets"></i>\n' +
                  '</span>\n',
              css: '.icon-widgets {\n  -webkit-mask-image: url(https://api.iconify.design/material-symbols/widgets-outline.svg);\n  mask-image: url(https://api.iconify.design/material-symbols/widgets-outline.svg);\n}',
              name: 'Widgets',
              description: 'If wanna change icon image, get icon url from iconify'
            },
            {
              html: '<span style="font-size:2rem;">\n' +
                  '    <i class="icon icon-code"></i>\n' +
                  '</span>\n',
              css: '.icon-code {\n  -webkit-mask-image: url(https://api.iconify.design/material-symbols/code.svg);\n  mask-image: url(https://api.iconify.design/material-symbols/code.svg);\n}',
              name: 'Code',
              description: 'If wanna change icon image, get icon url from iconify'
            },
            {
              html: '<span style="font-size:2rem;">\n' +
                  '    <i class="icon icon-add"></i>\n' +
                  '</span>\n',
              css: '.icon-add {\n  -webkit-mask-image: url(https://api.iconify.design/material-symbols/add-circle-outline.svg);\n  mask-image: url(https://api.iconify.design/material-symbols/add-circle-outline.svg);\n}',
              name: 'Add',
              description: 'If wanna change icon image, get icon url from iconify'
            },
            {
              html: '<span style="font-size:2rem;">\n' +
                  '    <i class="icon icon-delete"></i>\n' +
                  '</span>\n',
              css: '.icon-delete {\n  -webkit-mask-image: url(https://api.iconify.design/material-symbols/delete-outline.svg);\n  mask-image: url(https://api.iconify.design/material-symbols/delete-outline.svg);\n}',
              name: 'Delete',
              description: 'If wanna change icon image, get icon url from iconify'
            },
            {
              html: '<span style="font-size:2rem;">\n' +
                  '    <i class="icon icon-heart-fill"></i>\n' +
                  '</span>\n',
              css: '.icon-heart-fill {\n  -webkit-mask-image: url(https://api.iconify.design/mdi/cards-heart.svg);\n  mask-image: url(https://api.iconify.design/mdi/cards-heart.svg);\n}',
              name: 'Heart Fill',
              description: 'If wanna change icon image, get icon url from iconify'
            },
            {
              html: '<span style="font-size:2rem;">\n' +
                  '    <i class="icon icon-heart"></i>\n' +
                  '</span>\n',
              css: '.icon-heart {\n  -webkit-mask-image: url(https://api.iconify.design/mdi/cards-heart-outline.svg);\n  mask-image: url(https://api.iconify.design/mdi/cards-heart-outline.svg);\n}',
              name: 'Heart',
              description: 'If wanna change icon image, get icon url from iconify'
            },
            {
              html: '<span style="font-size:2rem;">\n' +
                  '    <i class="icon icon-eye"></i>\n' +
                  '</span>\n',
              css: '.icon-eye {\n  -webkit-mask-image: url(https://api.iconify.design/mdi/eye-outline.svg);\n  mask-image: url(https://api.iconify.design/mdi/eye-outline.svg);\n}',
              name: 'Heart',
              description: 'If wanna change icon image, get icon url from iconify'
            },
            {
              html: '<span style="font-size:2rem;">\n' +
                  '    <i class="icon icon-eye-off"></i>\n' +
                  '</span>\n',
              css: '.icon-eye-off {\n  -webkit-mask-image: url(https://api.iconify.design/mdi/eye-off-outline.svg);\n  mask-image: url(https://api.iconify.design/mdi/eye-off-outline.svg);\n}',
              name: 'Heart',
              description: 'If wanna change icon image, get icon url from iconify'
            },
          ]
        },
        {
          name: 'Typograph',
          items: [
            {
              html: '<h1 class="h1">h1</h1>',
              css: '.h1 {font-size: 5rem;}',
              name: 'Heading1',
              description: 'Font size for Heading1',
            },
            {
              html: '<h2 class="h2">h2</h2>',
              css: '.h2 {font-size: 3rem;}',
              name: 'Heading2',
              description: 'Font size for Heading2',
            },
            {
              html: '<h3 class="h3">h3</h3>',
              css: '.h3 {font-size: 2.4rem;}',
              name: 'Heading3',
              description: 'Font size for Heading3',
            },
            {
              html: '<h4 class="h4">h4</h4>',
              css: '.h4 {font-size: 2rem;}',
              name: 'Heading4',
              description: 'Font size for Heading4',
            },
            {
              html: '<h5 class="h5">h5</h5>',
              css: '.h5 {font-size: 1.6rem;}',
              name: 'Heading5',
              description: 'Font size for Heading5',
            },
            {
              html: '<h6 class="h6">h6</h6>',
              css: '.h6 {font-size: 1rem;}',
              name: 'Heading6',
              description: 'Font size for Heading6',
            },
            {
              html: '<p class="p">p</p>',
              css: '.p {font-size: 1rem;}',
              name: 'Paragraph',
              description: 'Font size for Paragraph',
            },
          ]
        },
        {
          name: 'Button',
          items: [
            {
              html: '<button class="button">Button</button>',
              css: '.button {\n' +
                  '    padding:4px 12px;\n' +
                  '    border:1px solid #ccc;\n' +
                  '    transition:background 200ms ease;\n' +
                  '}\n' +
                  '\n' +
                  '.button:hover {\n' +
                  '    background:rgba(0,0,0,.1);\n' +
                  '}',
              name: 'Button',
              description: 'Button style for button component',
            },
            {
              html: '<button class="button" disabled>Button</button>',
              css: '.button[disabled] {\n  color:rgba(0,0,0,.3);\n}',
              name: 'Button disabled',
              description: 'Disabled button style for button component',
            }]
        },
        {
          name: 'Card',
          items: [
            {
              html: '<div class="card">\n' +
                  '    <figure>\n' +
                  '        <img src="https://dummyimage.com/500x500/eeeeee/000000.png"/>\n' +
                  '    </figure>\n' +
                  '    <div class="info">\n' +
                  '        <h4>title</h4>\n' +
                  '        <p>description</p>\n' +
                  '    </div>\n' +
                  '</div>',
              css: '.card {\n' +
                  '    box-shadow:0 2px 5px #ccc;\n' +
                  '    width:300px;\n' +
                  '}\n' +
                  '\n' +
                  '.card img {\n' +
                  '    width:100%;\n' +
                  '    aspect-ratio:1;\n' +
                  '    border-bottom:1px solid #ccc;\n' +
                  '}\n' +
                  '\n' +
                  '.card .info {\n' +
                  '    padding:12px;\n' +
                  '}',
              name: 'Card',
              description: 'Card style for card component',
            }
          ]
        }
      ]
    }, '*'))

const loadGroups = () => postGroups()
onMounted(() => postGroups())

const navigationStore = useNavigationStore()
navigationStore.showBackButton({href: '/'})
</script>

<style scoped>

</style>