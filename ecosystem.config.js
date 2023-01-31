module.exports = {
    apps: [{
      name: "dev",
      script: "./dist/index.js",
      env: {
        NODE_ENV: ""
      },
      env_dev: {
        NODE_ENV: "",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }