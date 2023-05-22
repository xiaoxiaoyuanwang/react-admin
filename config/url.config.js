const env = process.env.ENV;
const Config = {
  dev: {
    admin_url:
      "https://mock.mengxuegu.com/mock/640c4eac4689d550adbe0b62/admin/",
  },
  prod: {
    admin_url:
      "https://mock.mengxuegu.com/mock/640c4eac4689d550adbe0b62/admin/",
  },
};
const envConfig = Config[env] || "dev";
module.exports = envConfig;
