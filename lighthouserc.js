module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/"],
      startServerCommand: "yarn dev"
    },
    assert: {
      preset: "lighthouse:recommended"
    },
    upload: {
      target: "temporary-public-storage"
    }
  }
}
