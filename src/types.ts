export interface IUserField {
  nameItem: string;
  value: string;
  key: string;
  type: string;
  maxLength: string;
  inputError: boolean;
  messageError: string,
  formError: boolean;
  regexField: RegExp;
}
