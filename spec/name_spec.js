describe("A suite is name case.", function() {
    var name = gimei.name();
    var fullNameKanji = name.kanji();
    var fullNameHiragana = name.hiragana();
    var fullNameKatakana = name.katakana();
    var fullNameKatakanaHan = name.katakanaHan();
    var lastNameKanji = name.last().kanji();
    var lastNameHiragana = name.last().hiragana();
    var lastNameKatakana = name.last().katakana();
    var firstNameKanji = name.first().kanji();
    var firstNameHiragana = name.first().hiragana();
    var firstNameKatakana = name.first().katakana();
    var fullNameRomaji = name.romaji();
    var firstNameRomaji = name.first().romaji();
    var lastNameRomaji = name.last().romaji();

    var all = [
      fullNameKanji,
      fullNameHiragana,
      fullNameKatakana,
      fullNameKatakanaHan,
      lastNameKanji,
      lastNameHiragana,
      lastNameKatakana,
      firstNameKanji,
      firstNameHiragana,
      firstNameKatakana,
      fullNameRomaji,
      firstNameRomaji,
      lastNameRomaji,
    ];

    all.forEach(function(i) {
        it (i + " is defined.", function() {
            expect(i).toBeDefined();
            expect(i).not.toBeNull();
            expect(0 < i.length).toBeTruthy();
        });
    });

    it ("type of fullNameKanji.", function() {
        expect(fullNameKanji).toMatch(/^(?:[々〇〻\u3400-\u9FFF\uF900-\uFAFF ]|[\uD840-\uD87F][\uDC00-\uDFFF ])+$/);
    });

    it ("type of fullNameHiragana.", function() {
        expect(fullNameHiragana).toMatch(/^[ぁ-ん ]+$/);
    });

    it ("type of fullNameKatakana.", function() {
        expect(fullNameKatakana).toMatch(/^[ァ-ン ]+$/);
    });

    it ("type of fullNameKatakanaHan.", function() {
        expect(fullNameKatakanaHan).toMatch(/^[ｧ-ﾝﾞ ]+$/);
    });

    it ("type of lastNameKanji.", function() {
        expect(lastNameKanji).toMatch(/^(?:[々〇〻\u3400-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF])+$/);
    });

    it ("type of lastNameHiragana.", function() {
        expect(lastNameHiragana).toMatch(/^[ぁ-ん]+$/);
    });

    it ("type of lastNameKatakana.", function() {
        expect(lastNameKatakana).toMatch(/^[ァ-ン]+$/);
    });

    it ("type of firstNameKanji.", function() {
        expect(firstNameKanji).toMatch(/^(?:[々〇〻\u3400-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF])+$/);
    });

    it ("type of firstNameHiragana.", function() {
        expect(firstNameHiragana).toMatch(/^[ぁ-ん]+$/);
    });

    it ("type of firstNameKatakana.", function() {
        expect(firstNameKatakana).toMatch(/^[ァ-ン]+$/);
    });

    it ("fullNameKanji === lastNameKanji + ' ' + firstNameKanji.", function() {
        expect(fullNameKanji === lastNameKanji + " " + firstNameKanji).toBeTruthy();
    });

    it ("fullNameHiragana === lastNameHiragana + ' ' + firstNameHiragana.", function() {
        expect(fullNameHiragana === lastNameHiragana + " " + firstNameHiragana).toBeTruthy();
    });

    it ("fullNameKatakana === lastNameKatakana + ' ' + firstNameKatakana.", function() {
        expect(fullNameKatakana === lastNameKatakana + " " + firstNameKatakana).toBeTruthy();
    });

    it ("type of fullNameRomaji.", function() {
        expect(fullNameRomaji).toMatch(/^[a-zA-Z ]+$/);
    });

    it("type of firstNameRomaji.", function () {
      expect(firstNameRomaji).toMatch(/^[a-zA-Z]+$/);
    });

    it("type of lastNameRomaji.", function () {
      expect(lastNameRomaji).toMatch(/^[a-zA-Z]+$/);
    });

    it ("reset.", function() {
        var name = gimei.name();
        var fullNameKanjiBefore = name.kanji();
        gimei.reset();
        name = gimei.name();
        var fullNameKanjiAfter = name.kanji();
        expect(fullNameKanjiBefore === fullNameKanjiAfter).toBeFalse();
    });
});

