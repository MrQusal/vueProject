import Vue from 'vue';
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate);

// 表单的验证规则
VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
    is: (filed) => `${filed}必须与密码相同`
  },
  attributes: {
    // name 对应的 中文
    phone: '手机号',
    code: '验证码',
    password: '密码',
    passwordConfirm: '确认密码',
    agree: '协议'
  }
})

// 自定义校验规则
VeeValidate.Validator.extend("agree", {
  validate: (value) => {
    return value;
  },
  getMessage: (filed) => filed + '必须同意'
})