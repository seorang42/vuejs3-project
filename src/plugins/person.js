export default {
  install(app, options) {
    const person = {
      name: '홍길동',
      say() {
        alert(this.name);
      },
      ...options,
    };
    app.config.globalProperties.$person = person;
    app.provide('person', person);
  },
};
