const SS_ID = '1dtZyUAobcWC6yYbdsR1_Oww29XCbEUMABVD20w4gIpI';
export const SUMMARIES_URL = `https://spreadsheets.google.com/feeds/list/${SS_ID}/2/public/full?alt=json`;
export const TERMS_URL = `https://spreadsheets.google.com/feeds/list/${SS_ID}/3/public/full?alt=json`;

export const SPECIAL_CASES = {
    sql: /sql/i,
    'c++': /c\+\+/i,
    'c': /(^|[^A-Za-z])c($|[^A-Za-z\+])/i
};
