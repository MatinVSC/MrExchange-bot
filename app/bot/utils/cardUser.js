/**
 * @param {Array<Object>} cardsArray
 * @returns {Array<string>}
 */

export const cardUser = (cardsArray) => {
    if (!Array.isArray(cardsArray)) {
        return [];
    };

    const pushCards = [];
    for (const item of cardsArray) {
        if (item && typeof item.number === 'string') {
            pushCards.push(item.number);
        };
    };
    return pushCards;
};