describe("A suite is male case.", function() {
    var male = gimei.male();
    var fullNameKanji = male.kanji();
    var fullNameRomaji = male.romaji();
    var isMale = male.isMale();
    var isFemale = male.isFemale();

    var all = [fullNameKanji, fullNameRomaji, isMale, isFemale];

    all.forEach(function(i) {
        it (i + " is defined.", function() {
            expect(i).toBeDefined();
            expect(i).not.toBeNull();
        });
    });

    it ("type of fullNameKanji.", function() {
        expect(fullNameKanji).toMatch(/^(?:[々〇〻\u3400-\u9FFF\uF900-\uFAFF ]|[\uD840-\uD87F][\uDC00-\uDFFF ])+$/);
    });

    it("type of fullNameRomaji", function() {
        expect(fullNameRomaji).toMatch(/^[a-zA-Z ]+$/);
    });

    it ("is male.", function() {
        expect(isMale).toBeTruthy();
    });

    it ("is female.", function() {
        expect(isFemale).not.toBeTruthy();
    });

});

