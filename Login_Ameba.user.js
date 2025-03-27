// ==UserScript==
// @name        Login Ameba
// @namespace        http://tampermonkey.net/
// @version        1.2
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

    let panel=0; // パネルの開閉

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
        if(retry<=delay){ // リトライ 4回 2sec以内（dalay 初期値）
            fuse(); }
        if(retry>delay){ // リトライ 2sec より後（dalay 初期値）
            try_login();
            clearInterval(interval); }
        let login_user=document.querySelector('._3qMawLFY');
        if(login_user){
            set_delay();
            clearInterval(interval); }}



    function fuse(){
        let topics=document.querySelector('._TiKJItsG');
        if(topics){ //「🛡️」ボタンを表示
            let sw=
                '<div id="la"><div id="laf_sw">🛡️</div>'+
                '<style>'+
                '#la { position: relative; z-index: 1; user-select: none; } '+
                '#laf_sw { font-size: 26px; line-height: 40px; margin: 3px 10px 0 0; filter:grayscale(1); } '+
                '</style></div>';

            if(!topics.querySelector('#la')){
                topics.insertAdjacentHTML('afterbegin', sw); }}

        let laf=document.querySelector('#laf_sw');
        if(laf){
            laf.onclick=(event)=>{
                event.preventDefault();
                laf.style.filter='brightness(0)';
                clearInterval(interval); }}

    } // fuse()



    function try_login(){
        let y_pos=document.documentElement.scrollTop
        sessionStorage.setItem('LA_pos', y_pos);

        let sw=document.querySelector('._Ja750p9p > a');
        if(sw){
            sw.click(); }}



    function set_delay(){
        let help_url='https://ameblo.jp/personwritep/entry-12891168337.html';

        let SVG_la=
            '<svg id="svg_la" viewBox="0 0 150 150">'+
            '<path d="M66 13C56 15 47 18 39 24C-12 60 18 146 82 137C92 135 '+
            '102 131 110 126C162 90 128 4 66 13M68 25C131 17 145 117 81 125C16 '+
            '133 3 34 68 25M69 40C61 41 39 58 58 61C66 63 73 47 82 57C84 60 '+
            '83 62 81 65C77 70 52 90 76 89C82 89 82 84 86 81C92 76 98 74 100 66'+
            'C105 48 84 37 69 40M70 94C58 99 66 118 78 112C90 107 82 89 70 94z">'+
            '</path></svg>';

        let la=document.querySelector('#la');
        if(la){ //「🛡️」ボタンのパネルを生成
            let panel_la=
                '<div id="la_sw">🛡️</div>'+
                '<div id="la_disp">Check Delay: '+
                '<input id="la_set" type="number" min="0.5" max="10" step="0.5">'+
                '<span id="la_sec">sec</span>'+
                '<a href="'+ help_url +'" rel="noopener noreferrer" target="_blank">'+
                SVG_la +'</a>'+
                '</div>'+
                '<style>'+
                '#la { position: relative; z-index: 1; user-select: none; } '+
                '#la_sw { font-size: 26px; line-height: 40px; margin: 3px 10px 0 0; } '+
                '#la_disp { position: absolute; font: normal 16px Meiryo; text-align: left; '+
                'color: #000; padding: 4px 12px 0; width: 200px; height: 35px; '+
                'top: 0; left: 46px; border: 1px solid #009688; background: #eff5ff; '+
                'box-shadow: 2px 2px 6px #00000050; overflow: hidden; display: none; } '+
                '#la_set { position: relative; font: normal 16px/23px Meiryo; caret-color: #fff; '+
                'padding: 4px 7px 0 9px; width: 54px; border: revert; z-index: 1; } '+
                '#la_set:hover { z-index: 3; } '+
                '#la_sec { position: absolute; right: 38px; bottom: 6px; height: 24px; '+
                'font-size: 16px; background: #fff; z-index: 2; } '+
                '#svg_la { height: 16px; padding: 0 7px; fill: #028fff; vertical-align: -2px; } '+
                '</style>';

            if(!la.querySelector('#la_disp')){
                la.innerHTML=panel_la; }

            let la_sw=document.querySelector('#la_sw');
            if(la_sw){
                la_sw.onclick=(event)=>{
                    event.preventDefault();
                    disp_panel(); }}

        } // if(topics)

    } // set_delay()



    function disp_panel(){
        let la=document.querySelector('#la');
        let la_disp=document.querySelector('#la_disp');
        if(la && la_disp){
            if(panel==0){
                panel=1;
                set();
                la_disp.style.display='block'; }
            else{
                panel=0;
                la_disp.style.display='none'; }}

        function set(){
            let la_set=la.querySelector('#la_set');
            if(la_set){
                la_set.value=(get_cookie('LA_delay')*(0.5)).toFixed(1);

                la_set.oninput=(event)=>{
                    event.preventDefault();
                    let set;
                    if(la_set.value<0.5){
                        set=1; }
                    else{
                        set=Math.round(la_set.value/0.5); }
                    la_set.value=(set*(0.5)).toFixed(1);
                    delay=set;
                    document.cookie='LA_delay='+ delay +'; path=/; Max-Age=604800'; }} // 7日

        } // set()

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
