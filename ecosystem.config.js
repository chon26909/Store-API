module.exports = {
    apps: [{
      name: "dev",
      script: "./dist/index.js",
      env: {
        NODE_ENV: ""
      },
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }