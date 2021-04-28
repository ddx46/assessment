'user strict'; //「厳格モード」宣言後の記述ミスを表示
//1.17jead パーツのidを ※オブジェクト定数 として取得
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
var g_count = 0;

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
      // 子どもの要素があるかぎり削除
      element.removeChild(element.firstChild);
    }
  }

userNameInput.onkeydown = event => {
    if(event.key == 'Enter' ){
        assessmentButton.onclick();
    }
}

/**  assessmentButton.onclick に関数を設定
 * ”無名関数” の記述法，それをassessmentButton オブジェクトの onclickプロパティに設定することで動作
 */
// assessmentButton.onclick = function() { //無名関数：名前を持たない関数 をonclickイベントに割り当て
 assessmentButton.onclick = () => { //ES6 記述：functionの代わりに "=>" この機能のことをアロー関数
 
    const name = userNameInput.value; //html素材から値を読み取る
    
    //ガード句と:入力がないときは終了 : 特定の処理の際に、処理を終了させるような処理を、ガード句と呼びます
    if (name.length == 0){
     return;
    }
    
    { //初期テストconsole
        console.log('%sが入力されたぜ:%d', name, g_count); //NG '%s が入力されたぜ:%d', name, g_count);
        g_count ++;
    }
    
    //@todo 診断表示エリアの作成
    //初めに，すでに子要素がある場合は削除する
    removeAllChildren(resultDivided);

    //h3見出しを設定
    const header = document.createElement('h3'); //「診断結果」h3 の見出しを作り div 要素に追加
    header.innerText = '診断結果'; //作成したh3タグ内の文字列に記入
    resultDivided.appendChild(header); //div 要素を親として、h3 の見出しを子要素として追加

    //pタグを設定
    const paragraph = document.createElement('p');
    //診断結果を取得
    const result = assessment(name);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //@todo tweetエリア:練習
    removeAllChildren(tweetDivided);
    const acr = document.createElement('a');
    const hrefVal = 
        'https://twitter.com/intent/tweet?button_hashtag=' + 
        encodeURIComponent('あなたのいいところ') + 
        '&ref_src=twsrc%5Etfw';
    acr.setAttribute('href', hrefVal);
    acr.className = 'twitter-hashtag-button';
    acr.setAttribute('data-text', result);
    acr.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(acr);

    // const str_tweet = document.createElement('h3');
    // str_tweet.innerText = 'ツイートエリアだぜ！！';
    // tweetDivided.appendChild(str_tweet);

    const scr = document.createElement('script');
    scr.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild( scr );
}

const answers = [
'{inputName}のいいところは声です。{inputName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{inputName}のいいところはまなざしです。{inputName}に見つめられた人は、気になって仕方がないでしょう。',
'{inputName}のいいところは情熱です。{inputName}の情熱に周りの人は感化されます。',
'{inputName}のいいところは厳しさです。{inputName}の厳しさがものごとをいつも成功に導きます。',
'{inputName}のいいところは知識です。博識な{inputName}を多くの人が頼りにしています。',
'{inputName}のいいところはユニークさです。{inputName}だけのその特徴が皆を楽しくさせます。',
'{inputName}のいいところは用心深さです。{inputName}の洞察に、多くの人が助けられます。',
'{inputName}のいいところは見た目です。内側から溢れ出る{inputName}の良さに皆が気を惹かれます。',
'{inputName}のいいところは決断力です。{inputName}がする決断にいつも助けられる人がいます。',
'{inputName}のいいところは思いやりです。{inputName}に気をかけてもらった多くの人が感謝しています。',
'{inputName}のいいところは感受性です。{inputName}が感じたことに皆が共感し、わかりあうことができます。',
'{inputName}のいいところは節度です。強引すぎない{inputName}の考えに皆が感謝しています。',
'{inputName}のいいところは好奇心です。新しいことに向かっていく{inputName}の心構えが多くの人に魅力的に映ります。',
'{inputName}のいいところは気配りです。{inputName}の配慮が多くの人を救っています。',
'{inputName}のいいところはその全てです。ありのままの{inputName}自身がいいところなのです。',
'{inputName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{inputName}が皆から評価されています。',
'{inputName} is very good person. You are a Perfect Creature!!', 
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} inputName 入力された名前
 * @return {string} 診断結果
 */
function assessment(inputName) {
    // TODO 診断処理を実装する
    let sumOfStr = 0; //var
    
    for(let i = 0; i < inputName.length; i++){
        sumOfStr = sumOfStr + inputName.charCodeAt(i);
    }

    const index = sumOfStr % answers.length;
    let result = answers[index]; //const result...
    // 正規表現による置き換え
    // result 内の {userName} という文字列のパターンを全て選択し、それら全て置き換え
    result = result.replace(/\{inputName\}/g, inputName);
    
    return result;
}

// 1.16 Buttomn ：console assert ：テストコード
// 第一引数：正しいときにtrueとなるテストしたい式：TRUEなら何も表示されない，第2引数：NG
// console.assert(
//     assessment('太郎') ===
//     '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
//     '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
//     );
    // //練習：入力が同じ名前なら同じ診断結果を出力する処理　が正しく動いているかテスト
    // console.assert(
        // assessment('太郎') === assessment('太郎'),
        // '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
        // );
        
        
        // console.log(assessment('次郎'));
        //  console.log(assessment('次郎'));
        //  console.log(assessment('太郎'));
        
        // console.assert( assessment('太郎') === assessment('次郎'),'失敗した場合の表示');
