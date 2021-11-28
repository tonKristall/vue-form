<template>
  <div class="avatar">
    <img class="avatar__image" v-if="image" v-bind:src="image" alt="avatar" />
    <label class="avatar__load" for="btnInput">
      Загрузить изображение
      <input
        class="avatar__btn"
        id="btnInput"
        name="upload"
        type="file"
        placeholder="Load picture"
        hidden
        @change="uploadImage"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    submitForm: Boolean,
  },
  data(): Record<string, unknown> {
    return {
      image: '',
    };
  },
  methods: {
    uploadImage(event: Event): void {
      const { files } = event.target as HTMLInputElement;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          this.image = reader.result;
        };
        (event.target as HTMLInputElement).type = ''; // eslint-disable-line no-param-reassign
        (event.target as HTMLInputElement).type = 'file'; // eslint-disable-line no-param-reassign
      }
    },
  },
  watch: {
    submitForm() {
      if (this.submitForm) {
        this.image = '';
      }
    },
  },
});
</script>
<style scoped>
.avatar {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 10px;
}
.avatar__load {
  position: relative;
  min-height: 45px;
  min-width: 130px;
  padding: 0 10px;
  box-sizing: border-box;
  border: 1px solid #dbe595;
  border-radius: 8px;
  background-color: #cbeeff !important;
  line-height: 45px;
  font-size: 20px;
  cursor: pointer;
}
.avatar__btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.avatar__load:hover {
  background-color: #43b1e9 !important;
}

.avatar__image {
  width: 130px;
  height: 130px;
  border-radius: 50%;
}
</style>
