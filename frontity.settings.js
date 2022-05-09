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
      "name": "custom-theme",
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "https://advice-ukraine.co.uk/",
          // "url": "https://ukraineprojectand.wordpress.com",
          // "url": "https://test.frontity.org",
          "postTypes": [
            {
              type: "destinations",
              endpoint: "destinations",
              archive: "/destinations"
            }
          ]
        },
        "wpSource": {
          "isWpCom": true // specifies the WP plan in use is Personal/Premium
        } 
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
