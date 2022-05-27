const theme = {
    palette: {
      textColor: {
        main: "#444444",
      },
      buttonColor: {
        main: "#005BBB",
        contrastText: "#fff",
      },
      infoColors: {
        background: "#EBF9FC",
        border: "#98C6CD",
        contrastText: "#444444",
      },
      infoIconColor: {
        main: "#00A0AC",
        contrastText: "#FFFFFF"
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    typography: {
      button: {
        textTransform: "none",
      },
      fontFamily: ["'Plus Jakarta Sans', sans-serif"],
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1200,
      },
    },
  };

  export default theme;