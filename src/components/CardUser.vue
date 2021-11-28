<template>
  <div class="card-user">
    <div class="card-user__wrapper">
      <form id="user-form" class="card-user__form" novalidate="true" @submit="submitFormHandler">
        <Avatar v-bind:submitForm="submitForm" />
        <label
          class="text-field"
          v-for="userFieldItem in userFieldsItems"
          v-bind:key="userFieldItem.key"
          v-bind:htmlFor="userFieldItem.key"
        >
          <input
            class="input-text"
            v-bind:class="{ error: userFieldItem.inputError }"
            v-bind:type="userFieldItem.type"
            v-bind:name="userFieldItem.key"
            v-bind:placeholder="userFieldItem.nameItem"
            v-bind:maxlength="userFieldItem.maxLength"
            v-model="userFieldItem.value"
            v-on:input="
              userFieldItem.inputError = checkField(userFieldItem.value, userFieldItem);
              userFieldItem.value = validateSymbol(userFieldItem.value, userFieldItem);
            "
          />
          <p class="message-error" v-if="userFieldItem.inputError">
            <span>{{ userFieldItem.messageError }}</span>
          </p>
        </label>
        <input
          class="btn-submit"
          type="submit"
          value="Сохранить"
          v-bind:disabled="errorForm"
          v-bind:class="{ 'btn-submit__active': !errorForm }"
        />
      </form>
    </div>
    <SubmitModal v-if="submitForm" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import USER_FIELDS from '@/const';
import { IUserField } from '@/types';
import SubmitModal from '@/components/SubmitModal.vue';
import Avatar from '@/components/Avatar.vue';

export default Vue.extend({
  data(): Record<string, unknown> {
    return {
      userFieldsItems: USER_FIELDS,
      checkedForm: false,
      errorForm: true,
      sendForm: false,
      submitForm: false,
    };
  },
  components: {
    SubmitModal,
    Avatar,
  },
  methods: {
    checkField(value: string, userFieldItem: IUserField): boolean {
      const tempUserFieldItem = userFieldItem;
      this.checkedForm = !this.checkedForm;
      if (!value) {
        tempUserFieldItem.messageError = 'Поле не должно быть пустым';
        tempUserFieldItem.formError = true;
        return true;
      }
      const regex = userFieldItem.regexField;
      if (regex && !regex.test(value)) {
        tempUserFieldItem.messageError = 'Введите корректные данные';
        tempUserFieldItem.formError = true;
        return true;
      }
      tempUserFieldItem.messageError = '';
      tempUserFieldItem.formError = false;
      return false;
    },
    validateSymbol(value: string, userFieldItem: IUserField): string {
      let editValue: RegExpMatchArray | null;
      switch (userFieldItem.key) {
        case 'birthday':
          editValue = value.match(
            /(\d{2}\.\d{2}\.\d+)|(\d{2}\.\d{2}\.)|(\d{2}\.\d{2})|(\d{2}\.\d{1})|(\d{2}\.)|(\d{2})|(\d)/,
          );
          if (editValue) {
            if (editValue[0].length === 2 || editValue[0].length === 5) {
              return `${editValue[0]}.`;
            }
            return editValue[0];
          }
          return '';
        case 'phone':
          editValue = value.match(/[-().\d ]+/);
          if (editValue) {
            return editValue[0];
          }
          return '';
        default:
          return value;
      }
    },
    submitFormHandler(event: Event): void {
      event.preventDefault();
      (this.userFieldsItems as IUserField[]).forEach((item) => {
        const tempItem = item;
        tempItem.value = '';
        tempItem.inputError = false;
        tempItem.messageError = '';
        tempItem.formError = true;
      });
      this.errorForm = true;
      this.submitForm = true;
      setTimeout(() => {
        this.submitForm = false;
      }, 1500);
    },
  },
  watch: {
    checkedForm(): void {
      this.errorForm = !!(this.userFieldsItems as IUserField[]).find((item) => item.formError);
    },
  },
});
</script>

<style scoped>
.card-user__wrapper {
  margin: 0 auto;
  padding: 10px 30px;
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  background-color: #fff;
  border: 5px solid #c7cab2;
  border-radius: 20px;
}
.card-user__form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.text-field {
  margin-bottom: 10px;
  width: 100%;
}
.input-text {
  box-sizing: border-box;
  width: 100%;
  min-height: 45px;
  margin: 0;
  padding: 0;
  padding-left: 10px;
  font: inherit;
  background: transparent;
  align-items: center;
  border: 1px solid#c4c7cc;
  border-radius: 5px;
  line-height: 1.5;
}
.input-text:focus {
  outline: none;
  border-color: #93fa93;
}
.error,
.error:focus {
  border-color: #ff0000;
}
.message-error {
  margin: 0;
  color: #ff0000;
  font-size: 13px;
}
.btn-submit {
  margin: 0 auto;
  min-height: 45px;
  min-width: 130px;
  border: 1px solid #dbe595;
  border-radius: 8px;
  background-color: #cbeeff !important;
  font-size: 20px;
}
.btn-submit__active {
  cursor: pointer;
}
.btn-submit__active:hover {
  background-color: #43b1e9 !important;
}
</style>
