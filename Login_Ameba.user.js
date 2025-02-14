// ==UserScript==
// @name        Login Ameba
// @namespace        http://tampermonkey.net/
// @version        1.0
// @description        ブログページで自動ログイン
// @author        Ameba Blog User
// @match        https://ameblo.jp/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameblo.jp
// @noframes
// @grant        none
// @updateURL        https://github.com/personwritep/Login_Ameba/raw/main/Login_Ameba.user.js
// @downloadURL        https://github.com/personwritep/Login_Ameba/raw/main/Login_Ameba.user.js
// ==/UserScript==



if(location.hash!='#cbox'){ // #cbox付きURLで開いた場合は機能しない

    let yy_pos=sessionStorage.getItem('LA_pos');
    if(yy_pos>0){
        window.scrollTo(0, yy_pos);
        sessionStorage.setItem('LA_pos', 0); }


    let delay=get_cookie('LA_delay');
    if(delay==0){
        delay=4; // 初期値
        document.cookie='LA_delay='+ delay +'; path=/; Max-Age=604800'; } // 7日


    let retry=0;
    let interval=setInterval(wait_target, 500);
    function wait_target(){
        retry++;
        if(retry>delay){ // リトライ制限 4回 2secまで（dalay 初期値）
            try_login();
            clearInterval(interval); }
        let login_user=document.querySelector('._3qMawLFY');
        if(login_user){
            set_delay();
            clearInterval(interval); }}



    function try_login(){
        let y_pos=document.documentElement.scrollTop
        sessionStorage.setItem('LA_pos', y_pos);

        let sw=document.querySelector('._Ja750p9p > a');
        if(sw){
            sw.click(); }}



    function set_delay(){
        let topics=document.querySelector('._TiKJItsG');
        if(topics){ //「🛡️」ボタンを表示
            let sw=
                '<div id="la"><div id="la_sw">🛡️</div>'+
                '<div id="la_disp">Check Delay: '+
                '<input id="la_set" type="number" min="0.5" max="10" step="0.5">'+
                '</div>'+
                '<style>'+
                '#la { position: relative; z-index: 1; user-select: none; display: flex; } '+
                '#la_sw { font-size: 26px; line-height: 40px; margin: 3px 10px 0 0; } '+
                '#la_disp { font: normal 16px Meiryo; text-align: left; padding: 4px 12px 0; '+
                'width: 180px; height: 35px; overflow: hidden; border: 1px solid #009688; '+
                'color: #000; background: #eff5ff; box-shadow: 2px 2px 6px #00000050; } '+
                '#la_set { font: normal 16px/23px Meiryo; margin-left: 6px; '+
                'width: 50px; padding: 4px 2px 0 12px; border: revert; }'+
                '</style></div>';

            if(!topics.querySelector('#la')){
                topics.insertAdjacentHTML('afterbegin', sw); }

            let la=document.querySelector('#la');
            let la_disp;
            if(la){
                la_disp=la.querySelector('#la_disp');
                if(la_disp){
                    la_disp.style.display='none'; }}

            let la_sw=la.querySelector('#la_sw');
            if(la_sw){
                la_sw.onclick=(event)=>{
                    event.preventDefault();
                    disp_panel(la);
                }}
        } // if(topics)

    } // set_delay()



    function disp_panel(la){
        let la_disp=la.querySelector('#la_disp');
        if(la_disp){
            if(la_disp.style.display=='none'){
                la_disp.style.display='block';
                la.style.marginRight='-206px'; }
            else{
                la_disp.style.display='none';
                la.style.marginRight='0'; }}


        let la_set=la.querySelector('#la_set');
        if(la_set){
            la_set.value=get_cookie('LA_delay')*(0.5);

            la_set.onchange=(event)=>{
                event.preventDefault();
                let set;
                if(la_set.value<0.5){
                    set=1; }
                else{
                    set=Math.round(la_set.value/0.5); }
                la_set.value=set*(0.5);
                delay=set;
                document.cookie='LA_delay='+ delay +'; path=/; Max-Age=604800'; }} // 7日

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

} // if(location.hash!='#cbox')
