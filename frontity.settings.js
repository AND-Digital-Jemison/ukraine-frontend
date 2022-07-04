const settings = {
  "name": "wordpress-react",
  "packages": [
    {
      "name": "dla-piper",
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": process.env.WORDPRESS_SOURCE_URL,
          "title": "Ukraine Advice Project UK",
          "description": "Free UK immigration and asylum advice for Ukrainians and their families from qualified lawyers",
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
            },
            {
              type: "confirmation",
              endpoint: "confirmation",
              archive: "/confirmation"
            },
            {
              type: "volunteer",
              endpoint: "volunteer",
              archive: "/volunteer"
            },
            {
              type: "formbuttonlabels",
              endpoint: "formbuttonlabels",
              archive: "/formbuttonlabels"
            }
          ],
          data: {
            '/': {
              isReady: true,
              isRedirection: true,
              is301: true,
              redirectionStatus: 301,
              isExternal: false,
              location: "/home/en",
            }
          }
        },
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
