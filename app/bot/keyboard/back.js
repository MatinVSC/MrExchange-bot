import Start from "../command/start.js";

const Back = {
    BACK: async ({ ctx, i18n, menu }) => {
        return Start.START({ ctx, i18n, menu });
    },
};

export default Back; 