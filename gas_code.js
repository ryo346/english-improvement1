// Google Apps Script — このファイルの中身を全コピーしてGASエディタに貼り付ける

const SHEET_ID = '1n4x6BAj_ZQ0EzVJwqMo3Mh9xSonHt1GyE4dlktVnzlI';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        '日時', '名前', '点数', '時間切れ',
        '語彙(1-5)', '構文(1-5)', '論理(1-5)', '速度(1-5)',
        'レベル', '最重要弱点',
        '語彙%', '構文%', '論理%', '速度%',
        'アドバイス',
      ]);
      sheet.getRange(1, 1, 1, 15).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.timestamp,
      data.name,
      data.score,
      data.timeout === 'yes' ? 'はい' : 'いいえ',
      data.ratings.vocab,
      data.ratings.structure,
      data.ratings.logic,
      data.ratings.speed,
      data.level,
      data.topWeakness,
      data.pct.vocab,
      data.pct.structure,
      data.pct.logic,
      data.pct.speed,
      data.advice,
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
