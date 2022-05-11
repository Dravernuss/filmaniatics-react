export const cloudinary_constant = (upload_preset) => {
  return {
    cloudName: "dravernuss",
    uploadPreset: upload_preset,
    sources: ["local", "camera"],
    showAdvancedOptions: false,
    defaultSource: "local",
    styles: {
      palette: {
        window: "#FFAA00",
        sourceBg: "#FFFFFF",
        windowBorder: "#FFAA00",
        tabIcon: "#FFFFFF",
        inactiveTabIcon: "#FFDB92",
        menuIcons: "#0094C7",
        link: "#FFAA00",
        action: "#FF2929",
        inProgress: "#000000",
        complete: "#FFAA00",
        error: "#c43737",
        textDark: "#000000",
        textLight: "#FFFFFF",
      },
      fonts: {
        default: null,
        "'Poppins', sans-serif": {
          url: "https://fonts.googleapis.com/css?family=Poppins",
          active: true,
        },
      },
    },
  };
};
