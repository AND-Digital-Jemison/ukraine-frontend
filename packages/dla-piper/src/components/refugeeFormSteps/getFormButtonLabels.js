const getFormButtonLabels = (state) => {
    const currentLanguage = state.theme.currentLanguage;
    const data = state.source.get(`/formbuttonlabels/${currentLanguage}/`);
    const formbuttonlabels = state.source[data.type][data.id];

    return formbuttonlabels.acf
}

export default getFormButtonLabels;
