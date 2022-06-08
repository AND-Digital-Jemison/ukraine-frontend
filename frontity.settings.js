const settings = {
  "name": "wordpress-react",
  "state": {
    "frontity": {
      "url": "https://test.frontity.org",
      "title": "Test Frontity Blog",
      "description": "WordPress installation for Frontity development"
    }
  },
  "packages": [
    {
      "name": "dla-piper",
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "https://advice-ukraine.co.uk/",
          "postTypes": [
            {
              type: "home",
              endpoint: "home",
              archive: "/home"
            },
            {
              type: "refugee-form",
              endpoint: "refugee-form",
              archive: "/refugee-form"
            }
          ]
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
