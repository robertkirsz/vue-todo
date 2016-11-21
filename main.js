const shoppingList = [
  { text: 'Milk',   bought: false },
  { text: 'Bread',  bought: true },
  { text: 'Butter', bought: true },
  { text: 'Eggs',   bought: false },
  { text: 'Tea',    bought: false }
]

Vue.component('list-item', {
  props: {
    item: Object,
    index: Number
  },
  data: function () {
    return {
      editing: false,
      editedValue: ''
    }
  },
  methods: {
    editStart: function () {
      this.editedValue = this.item.text
      this.editing = !this.editing
      if (this.editing) {
        this.$nextTick(function () {
          this.$refs.input.focus()
        })
      }
    },
    editFinish: function () {
      this.$emit('edit', this.index, this.editedValue)
      this.cancelItemEditing()
    },
    cancelItemEditing: function () { this.editing = false },
    toggle: function () { this.$emit('toggle', this.index) },
    remove: function () { this.$emit('remove', this.index) }
  },
  template: '\
    <li>\
      <input\
        ref="input"\
        v-if="editing"\
        v-model="editedValue"\
        @keyup.enter="editFinish"\
        @keyup.esc="cancelItemEditing"\
      />\
      <span\
        v-else\
        @click="toggle"\
        :class="{bought: item.bought}"\
      >\
        {{ item.text }}\
      </span>\
      <button class="edit-button" @click="editStart">\
        {{ this.editing ? "Cancel" : "Edit" }}\
      </button>\
      <button class="remove-button" @click="remove">X</button>\
    </li>\
  '
})

Vue.component('add-item-button', {
  data: function () {
    return {
      value: ''
    }
  },
  methods: {
    add: function () {
      if (this.value) {
        this.$emit('add', this.value)
        this.value = ''
      }
    }
  },
  template: '\
    <input class="add-item-input"\
      v-model.trim="value"\
      @keyup.enter="add"\
      placeholder="New item"\
    />\
  '
})

var TodoApp = new Vue({
  el: '#app',
  data: {
    appTitle: 'Shopping List',
    items: shoppingList,
    newItem: ''
  },
  methods: {
    addItem: function (value) { this.items.push({ text: value, bought: false }) },
    editItem: function (index, value) { this.items[index].text = value },
    toggleItem: function (index) { this.items[index].bought = !this.items[index].bought },
    removeItem: function (index) { this.items.splice(index, 1) }
  }
})
