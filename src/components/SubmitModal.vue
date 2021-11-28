<template>
  <div class="modal">
    <div class="modal__wrapper">
      <p class="modal__message">Данные успешно сохранены</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
.modal {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.25);
}
.modal__wrapper {
  width: 500px;
  height: 100px;
  margin: 0 auto;
  margin-top: 75px;
  border: 1px solid #000000;
  border-radius: 10px;
  background-color: white;
  line-height: 100px;
}
.modal__message {
  margin: 0;
  font-size: 20px;
}
</style>
