// ==UserScript==
// @name        Login Ameba Count + AD Check
// @namespace        http://tampermonkey.net/
// @version        0.8
// @description        ブログページでログイン・アウト状況のカウンター＋ADダイアログ観測
// @author        Ameba Blog User
// @match        https://ameblo.jp/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameblo.jp
// @noframes
// @grant        none
// @updateURL        https://github.com/personwritep/Login_Ameba/raw/main/Login_Ameba_Count.user.js
// @downloadURL        https://github.com/personwritep/Login_Ameba/raw/main/Login_Ameba_Count.user.js
// ==/UserScript==



let target=document.querySelector('head > title');
let monitor=new MutationObserver(main);
monitor.observe(target, { childList: true });

main();

function main(){

    let yy_pos=sessionStorage.getItem('LA_pos');
    if(yy_pos>0){
        window.scrollTo(0, yy_pos); // このツールのリロード直前のスクロール位置を表示
        sessionStorage.setItem('LA_pos', 0); }


    let retry=0;
    let interval=setInterval(wait_target, 500);
    function wait_target(){
        retry++;

        if(retry<2 ){ // .5secで動作
            clear_disp(); }
        if(1<retry && retry<5 ){ // 1sec～2sec で動作
            ad_check(); }
        if(4<retry){ // 2.5sec でログアウトチェック
            check_login();
            clearInterval(interval); }}



    function clear_disp(){
        let topics=document.querySelector('._TiKJItsG');
        if(topics){
            topics.style.background="#fff";
            if(topics.querySelector('#lac')){
                topics.querySelector('#lac').remove(); }}}



    function ad_check(){
        let b_ad=document.querySelector('#rise-interstitial-area');
        let topics=document.querySelector('._TiKJItsG');
        if(topics){
            if(b_ad){
                let disp=0; // 実際にAD表示「1」
                topics.style.background="#eee";
                let style=window.getComputedStyle(b_ad);
                if(style){
                    let value=style.getPropertyValue('visibility');
                    if(value!="hidden"){
                        disp=1; }}
                else{
                    disp=1; }
                if(disp==1){
                    topics.style.background="#ffcc00"; }}
            else{
                topics.style.background="#fff"; }}

    } // ad_check()



    function check_login(){
        let LAC=get_cookie('LAC_count');
        if(LAC!=0){
            let LAC_data=LAC.split('　');

            let login_user=document.querySelector('._3qMawLFY');
            if(login_user){ // ログインを確認
                LAC_data[0]=LAC_data[0]/1+1;
                LAC=LAC_data[0]+'　'+LAC_data[1];
                document.cookie='LAC_count='+ LAC +'; path=/; Max-Age=604800'; } // 7日
            else{ // ログアウトを確認
                LAC_data[1]=LAC_data[1]/1+1;
                LAC=LAC_data[0]+'　'+LAC_data[1];
                document.cookie='LAC_count='+ LAC +'; path=/; Max-Age=604800'; // 7日
                if(location.hash!='#cbox'){ // #cbox付きURLで開いた場合は ログイン操作をしない
                    let y_pos=document.documentElement.scrollTop
                    sessionStorage.setItem('LA_pos', y_pos); // 現在のスクロール位置を記録

                    let sw=document.querySelector('._Ja750p9p > a');
                    if(sw){
                        sw.click(); } // ログインボタンを押す（結果はリロード）
                }}
        } // if(LAC!=0)


        let topics=document.querySelector('._TiKJItsG');
        if(topics){ //「*️⃣」ボタンを表示
            let sw=
                '<div id="lac"><div id="lac_sw">*️⃣</div>'+
                '<div id="lac_disp"><span>　</span><button id="lac_reset">Reset</button>'+
                '</div>'+
                '<style>'+
                '#lac { position: relative; z-index: 1; user-select: none; display: flex; } '+
                '#lac_sw { font-size: 27px; line-height: 32px; margin: 4px 10px 0 0; } '+
                '#lac_disp { font: normal 16px/35px Meiryo; text-align: left; padding: 2px 12px 0; '+
                'width: 240px; height: 33px; overflow: hidden; border: 1px solid #009688; '+
                'color: #000; background: #eff5ff; box-shadow: 2px 2px 6px #00000050; } '+
                '#lac_reset { position: absolute; right: 12px; font: normal 16px/21px Meiryo; '+
                '-webkit-appearance: button; padding: 2px 6px 0; border: revert; top: 5px; } '+
                '</style></div>';

            if(!topics.querySelector('#lac')){
                topics.insertAdjacentHTML('afterbegin', sw); }

            let lac=document.querySelector('#lac');
            let lac_disp;
            if(lac){
                lac_disp=lac.querySelector('#lac_disp');
                if(lac_disp){
                    lac_disp.style.display='none'; }}


            let lac_sw=topics.querySelector('#lac_sw');
            if(lac_sw){
                lac_sw.onclick=(event)=>{
                    event.preventDefault();
                    disp_panel(lac); }}
        } // if(topics)

    } // check_login()



    function disp_panel(lac){
        let lac_disp=lac.querySelector('#lac_disp');
        if(lac_disp){
            if(lac_disp.style.display=='none'){
                lac_disp.style.display='block';
                lac.style.marginRight='-266px'; }
            else{
                lac_disp.style.display='none';
                lac.style.marginRight='0'; }}


        let lac_span=lac.querySelector('span');
        let LAC_after=get_cookie('LAC_count');
        if(LAC_after && lac_span){
            let LAC_data=LAC_after.split('　');
            lac_span.textContent="in: "+ LAC_data[0] +"　out: "+ LAC_data[1]; }


        let lac_reset=lac.querySelector('#lac_reset');
        if(lac_reset){
            lac_reset.onclick=()=>{
                let LAC='0　0'; //「Login　Logout」
                document.cookie='LAC_count='+ LAC +'; path=/; Max-Age=604800'; }} // 7日

    } // disp_panel()



    function get_cookie(name){
        let cookie_req=document.cookie.split('; ').find(row=>row.startsWith(name));
        if(cookie_req){
            if(cookie_req.split('=')[1]==null){
                return 0; }
            else{
                return cookie_req.split('=')[1]; }}
        if(!cookie_req){
            return 0; }}

} // main()
