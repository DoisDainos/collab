(this["webpackJsonpcollab-react-app"]=this["webpackJsonpcollab-react-app"]||[]).push([[0],{37:function(e,t,n){},64:function(e,t,n){},71:function(e,t,n){},72:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(9),c=n.n(o),l=(n(64),n(24)),i=n(26),s=n.n(i),u=n(34),m=n(16),d=n(38),p=n(12),y=n(7),f=n(103),v=n(102),g="SET_ROOM",E="SET_NAME",b="ADD_PLAYER",O="SET_PLAYER_COLOUR",S="SET_POSSIBLE_ROLES",h="SET_ROLE",N="ADD_LINES",j="SET_PLAYING",C="SET_TIME",w="SET_ACTIVE_PLAYER",k="SET_GAME_WORD",P="SET_GUESSING",L="SET_CORRECT_GUESS",R="END_GAME",G="SET_STATE",X={setRoom:function(e){return{type:g,payload:e}},setName:function(e){return{type:E,payload:e}},setPlayers:function(e){return{type:b,payload:e}},setPlayerColour:function(e,t){return{type:O,payload:{playerName:e,colour:t}}},setPossibleRoles:function(e){return{type:S,payload:e}},setRole:function(e){return{type:h,payload:e}},setPlaying:function(e){return{type:j,payload:e}},setTime:function(e){return{type:C,payload:e}},addLines:function(e){return{type:N,payload:e}},setActivePlayer:function(e){return{type:w,payload:e}},setGameWord:function(e){return{type:k,payload:e}},startGuess:function(e){return{type:P,payload:{playerName:e,guessing:!0}}},endGuess:function(){return{type:P,payload:{guessing:!1}}},submitGuess:function(e){return{type:L,payload:e}},endGame:function(e){return{type:R,payload:e}},setState:function(e){return{type:G,payload:e}}},Y=new WebSocket("wss://spydraw-server-5bao3jqrpa-ts.a.run.app:8081");function T(){return _.apply(this,arguments)}function _(){return(_=Object(u.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){Y.addEventListener("open",(function(){e(!0)}))})).catch((function(e){return console.error(e),!1})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function J(e,t,n,a,r){var o={code:e,player:t,lines:n,strokeStyle:a,lineWidth:r};Y.send(JSON.stringify({type:"Draw",content:JSON.stringify(o)}))}function x(e){Y.addEventListener("message",(function(t){t.data&&e(JSON.parse(t.data))}))}var M="container-roomConnect",W=function(){var e=Object(y.d)(),t=Object(a.useState)(""),n=Object(m.a)(t,2),o=n[0],c=n[1],l=Object(a.useState)(""),i=Object(m.a)(l,2),s=i[0],u=i[1],d=Object(p.f)();return r.a.createElement("div",{className:M},r.a.createElement("div",null,r.a.createElement(v.a,{value:s,color:"primary",placeholder:"Enter player name",onChange:function(e){return u(e.target.value)},fullWidth:!0,inputProps:{style:{fontSize:"calc(10px + 2vmin)"}}})),r.a.createElement("p",null,"Connect to existing room"),r.a.createElement("div",null,r.a.createElement(v.a,{value:o,color:"primary",placeholder:"Enter room code",onChange:function(e){return c(e.target.value)},fullWidth:!0,inputProps:{style:{fontSize:"calc(10px + 2vmin)"}}})),r.a.createElement("div",null,r.a.createElement(f.a,{variant:"contained",color:"primary",onClick:function(){e(X.setPlayers([s])),e(X.setName(s)),e(X.setRoom(o)),function(e,t){var n={code:e,player:t};Y.send(JSON.stringify({type:"ConnectRoom",content:JSON.stringify(n)}))}(o,s),d.push("/room")},fullWidth:!0,style:{fontSize:"calc(10px + 2vmin)"}},"Submit")),r.a.createElement("p",null,"Create new room"),r.a.createElement("div",null,r.a.createElement(f.a,{variant:"contained",color:"primary",onClick:function(){!function(e){var t={player:e};Y.send(JSON.stringify({type:"NewRoom",content:JSON.stringify(t)}))}(s),e(X.setName(s)),d.push("/room")},fullWidth:!0,style:{fontSize:"calc(10px + 2vmin)"}},"New Room")))},D=function(){return console.log("Connected"),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"Banner"},r.a.createElement("div",{className:"PageTitle"},"Spy Draw")),r.a.createElement(W,null))},A="item-playerList",F="row-playerList",I=Object(y.c)((function(e){return{players:e.players,playerColourMap:e.playerColourMap}}))((function(){return r.a.createElement(y.b.Consumer,null,(function(e){var t=e.store.getState();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:F},r.a.createElement("div",null,t.name),!!t.playerColourMap[t.name]&&r.a.createElement("div",{className:A,style:{background:t.playerColourMap[t.name]}})),r.a.createElement("div",null,t.players.map((function(e,n){if(t.name!==e)return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:F,key:n},r.a.createElement("p",null,e),!!t.playerColourMap[e]&&r.a.createElement("div",{className:A,style:{background:t.playerColourMap[e]}})))}))))}))})),z="container-colourPicker",B="item-colourPicker",U="palette-colourPicker",V=["green","blue","red","yellow","orange","black"],H=Object(y.c)((function(e){return{room:e.room,name:e.name,players:e.players,playerColourMap:e.playerColourMap}}))((function(){var e=function(e,t,n){!function(e,t,n){var a={code:e,name:t,colour:n};Y.send(JSON.stringify({type:"SetPlayerColour",content:JSON.stringify(a)}))}(e,t,n.id)};return r.a.createElement(y.b.Consumer,null,(function(t){var n=t.store.getState();return r.a.createElement("div",{className:z},r.a.createElement("div",null,"Choose Color"),r.a.createElement("div",{className:U},V.map((function(t,a){return function(e,t){for(var n in t)if(t[n]===e)return!1;return!0}(t,n.playerColourMap)&&r.a.createElement("div",{onClick:function(t){return e(n.room,n.name,t.target)},style:{background:t},id:t,key:a,className:B})}))))}))})),q="container-room";var $=Object(y.c)((function(e){return{room:e.room,playing:e.playing}}))((function(){var e=Object(p.f)(),t=Object(p.g)();return r.a.createElement(y.b.Consumer,null,(function(n){var a=n.store.getState();return"game"!==t.pathname&&a.playing&&e.push("/game"),r.a.createElement("div",{className:q},r.a.createElement("p",null,"Room: ",a.room),r.a.createElement(I,null),r.a.createElement(H,null),r.a.createElement(f.a,{variant:"contained",color:"primary",onClick:function(){!function(e){var t={code:e};Y.send(JSON.stringify({type:"StartGame",content:JSON.stringify(t)}))}(a.room)},fullWidth:!0,style:{fontSize:"calc(10px + 2vmin)"}},"Start game"))}))}));var K=function(e){var t=function(t){e.setStrokeStyle(t.id),"white"===t.id?e.setLineWidth(14):e.setLineWidth(2)};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{onClick:function(e){return t(e.target)}},"Choose Color"),r.a.createElement("div",{onClick:function(e){return t(e.target)},style:{width:"10px",height:"10px",background:"green"},id:"green"}),r.a.createElement("div",{onClick:function(e){return t(e.target)},style:{width:"10px",height:"10px",background:"blue"},id:"blue"}),r.a.createElement("div",{onClick:function(e){return t(e.target)},style:{width:"10px",height:"10px",background:"red"},id:"red"}),r.a.createElement("div",{onClick:function(e){return t(e.target)},style:{width:"10px",height:"10px",background:"yellow"},id:"yellow"}),r.a.createElement("div",{onClick:function(e){return t(e.target)},style:{width:"10px",height:"10px",background:"orange"},id:"orange"}),r.a.createElement("div",{onClick:function(e){return t(e.target)},style:{width:"10px",height:"10px",background:"black"},id:"black"}))};var Q=function(e){var t=Object(y.e)((function(e){return e.canvasLines})),n=Object(y.e)((function(e){return e.room})),o=Object(y.e)((function(e){return e.name})),c=Object(y.e)((function(e){return e.playerColourMap}));Object(y.e)((function(e){return e.role}));var i,s,u="black",m=2,d={startX:0,startY:0,endX:0,endY:0},p=[],f=!1,v=!1;Object(a.useEffect)((function(){return(i=document.getElementById("canvas"))&&e.canDraw&&(N(),i.addEventListener("mousemove",E),i.addEventListener("mousedown",g),i.addEventListener("mouseup",b),i.addEventListener("mouseout",O),i.addEventListener("touchmove",E),i.addEventListener("touchstart",g),i.addEventListener("touchend",b),i.addEventListener("touchcancel",O)),h(),function(){i.removeEventListener("mousemove",E),i.removeEventListener("mousedown",g),i.removeEventListener("mouseup",b),i.removeEventListener("mouseout",O),i.removeEventListener("touchmove",E),i.removeEventListener("touchstart",g),i.removeEventListener("touchend",b),i.removeEventListener("touchcancel",O)}}),[e.canDraw]);var g=function(e){v=!0,f=!1,setTimeout((function(){if(!f){var e=k(p);J(n,o,e,u,m),p=[]}}),1e3),d.startX=d.endX,d.startY=d.endY,e.clientX?(d.endX=e.clientX-i.offsetLeft,d.endY=e.clientY-i.offsetTop):e.touches&&(d.endX=e.touches[0].clientX-i.offsetLeft,d.endY=e.touches[0].clientY-i.offsetTop),!0&&(s.beginPath(),s.fillStyle=u,s.fillRect(d.endX,d.endY,2,2),s.closePath(),!1)},E=function(e){e.preventDefault(),v&&(d.startX=d.endX,d.startY=d.endY,e.clientX?(d.endX=e.clientX-i.offsetLeft,d.endY=e.clientY-i.offsetTop):e.touches&&(d.endX=e.touches[0].clientX-i.offsetLeft,d.endY=e.touches[0].clientY-i.offsetTop),p.push(Object.assign({},d)),S(d))},b=function(){if(v&&!f){var t=k(p);J(n,o,t,u,m),p=[],e.onEndStroke()}v=!1},O=function(){b()},S=function(e){N(),s.beginPath(),s.moveTo(e.startX,e.startY),s.lineTo(e.endX,e.endY),"playerName"in e?s.strokeStyle=c[e.playerName]:c[o]?s.strokeStyle=c[o]:s.strokeStyle="strokeStyle"in e?e.strokeStyle:u,s.lineWidth="lineWidth"in e?e.lineWidth:m,s.stroke(),s.closePath()},h=function(){var e,n=w(t),a=Object(l.a)(n);try{for(a.s();!(e=a.n()).done;){var r=e.value;S(r)}}catch(o){a.e(o)}finally{a.f()}},N=function(){s||(i||(i=document.getElementById("canvas")),s=i.getContext("2d"))},j=.8*window.innerWidth,C=j;C>window.innerHeight&&(j=.6*window.innerHeight,C=j);var w=function(e){var t,n=[],a=Object(l.a)(e);try{for(a.s();!(t=a.n()).done;){var r=t.value;n.push({startX:r.startX*j,endX:r.endX*j,startY:r.startY*C,endY:r.endY*C,playerName:r.playerName})}}catch(o){a.e(o)}finally{a.f()}return n},k=function(e){var t,n=[],a=Object(l.a)(e);try{for(a.s();!(t=a.n()).done;){var r=t.value;n.push({startX:r.startX/j,endX:r.endX/j,startY:r.startY/C,endY:r.endY/C})}}catch(o){a.e(o)}finally{a.f()}return n};return window.onresize=function(){},r.a.createElement(r.a.Fragment,null,r.a.createElement("canvas",{id:"canvas",width:j,height:C,style:{border:"2px solid"}}),e.showPalette&&r.a.createElement(K,{setStrokeStyle:function(e){return function(e){u=e}(e)},setLineWidth:function(e){return function(e){m=e}(e)}}),r.a.createElement("img",{id:"canvasimg",style:{position:"absolute",top:"10%",left:"52%"}}))},Z=(n(37),n(104)),ee="modal-body";var te=function(e){var t=function(t){!function(e,t){var n={code:e,guessedName:t};Y.send(JSON.stringify({type:"SubmitGuess",content:JSON.stringify(n)}))}(e.room,t),e.onClose()};return r.a.createElement(Z.a,{open:e.open,onClose:e.onClose,"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description"},r.a.createElement("div",{className:ee},e.guessingPlayer===e.name?e.playerNames.map((function(n,a){if(n!==e.name)return r.a.createElement(f.a,{variant:"contained",onClick:function(){return t(n)},key:a,style:{backgroundColor:e.playerColourMap?e.playerColourMap[n]:"black",color:"#fff"}},n)})):r.a.createElement("div",null,e.guessingPlayer," is guessing!")))};var ne=function(e){var t=function(){!function(e,t){var n={code:e,name:t};Y.send(JSON.stringify({type:"StartGuess",content:JSON.stringify(n)}))}(e.room,e.name)},n=function(){!function(e){var t={code:e};Y.send(JSON.stringify({type:"EndGuess",content:JSON.stringify(t)}))}(e.room)};return r.a.createElement("div",{className:"container-infoPanel"},r.a.createElement("div",null,"Room: ",e.room),r.a.createElement("div",null,"Role: ",e.role),!!e.word&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"Word: ",e.word),r.a.createElement(f.a,{variant:"contained",color:"primary",onClick:function(){return t()}},"Guess the spy")),r.a.createElement(te,{key:e.guessingPlayer,name:e.name,room:e.room,playerNames:e.playerNames,open:!!e.guessingPlayer,onClose:function(){return n()},guessingPlayer:e.guessingPlayer,playerColourMap:e.playerColourMap}))};var ae=function(e){var t=Object(a.useState)(e.startingSeconds),n=Object(m.a)(t,2),o=n[0],c=n[1];return Object(a.useEffect)((function(){o>0&&!e.gameEnded&&setTimeout((function(){c(o-1)}),1e3)})),r.a.createElement("div",{className:"container-infoPanel"},r.a.createElement("span",{id:"time"},function(e){var t=Math.floor(e/60),n=e-60*t,a=t<10?"0".concat(t):"".concat(t),r=n<10?"0".concat(n):"".concat(n);return"".concat(a,":").concat(r)}(o)))};var re=function(e){return r.a.createElement("div",{className:"container-gameEnd"},e.guessedSpy&&e.spy===e.playerName?r.a.createElement("div",null,"Guess the word!"):e.guessedSpy?r.a.createElement("div",null,e.spy,", guess the word!"):e.spy===e.playerName?r.a.createElement("div",null,e.spy," wins!"):r.a.createElement("div",null,"You win!"))};var oe=[{roleName:"Spy",roleCount:1}];var ce=function(){var e=Object(y.d)(),t=Object(y.e)((function(e){return{time:e.time,roomCode:e.room,word:e.gameWord,playerName:e.name,possibleRoles:e.possibleRoles,players:e.players,activePlayer:e.activePlayer,guessingPlayer:e.guessingPlayer,role:e.role,gameEnded:e.gameEnded,guessedSpy:e.guessedSpy,spy:e.spy,playing:e.playing}}));Object(a.useEffect)((function(){if(0===t.possibleRoles.length){t.playerName&&t.roomCode&&function(e){sessionStorage.setItem("spydraw_player",JSON.stringify(e))}({name:t.playerName,room:t.roomCode});var n,a=Object.keys(t.players).length,r=0,o=Object(l.a)(oe);try{for(o.s();!(n=o.n()).done;){r+=n.value.roleCount}}catch(u){o.e(u)}finally{o.f()}var c={roleName:"Friend",roleCount:a-r},i=oe.concat(c);if(e(X.setPossibleRoles(i)),t.playing)!function(e,t,n){var a={code:e,name:t,possibleRoles:n};Y.send(JSON.stringify({type:"GetRole",content:JSON.stringify(a)}))}(t.roomCode,t.playerName,i),function(e,t){var n={code:e,name:t};Y.send(JSON.stringify({type:"GetWord",content:JSON.stringify(n)}))}(t.roomCode,t.playerName),function(e){var t={code:e};Y.send(JSON.stringify({type:"GetFirstPlayer",content:JSON.stringify(t)}))}(t.roomCode);else{var s=JSON.parse(sessionStorage.getItem("spydraw_player"));!function(e,t){var n={code:e,name:t};Y.send(JSON.stringify({type:"GetState",content:JSON.stringify(n)}))}(s.room,s.name),e(X.setPlaying(!0))}}}));var n=function(){return t.playerName===t.activePlayer},o=function(){!function(e){var t={code:e};Y.send(JSON.stringify({type:"EndTurn",content:JSON.stringify(t)}))}(t.roomCode)};return r.a.createElement(r.a.Fragment,null,r.a.createElement(ae,{startingSeconds:t.time,gameEnded:t.gameEnded}),t.gameEnded?r.a.createElement(r.a.Fragment,null,r.a.createElement(re,{guessedSpy:t.guessedSpy,spy:t.spy,playerName:t.playerName})):r.a.createElement(r.a.Fragment,null,n()?r.a.createElement("p",null,"Your turn!"):r.a.createElement("p",null,t.activePlayer,"'s turn'!"),t.role?r.a.createElement(r.a.Fragment,null,r.a.createElement(ne,{room:t.roomCode,name:t.playerName,role:t.role,word:t.word,playerNames:t.players,guessingPlayer:t.guessingPlayer,playerColourMap:t.playerColourMap}),r.a.createElement(Q,{canDraw:n(),showPalette:!1,onEndStroke:function(){return o()}})):r.a.createElement("div",null,"Assigning roles...")))},le=(n(71),function(){var e=Object(y.d)(),t=Object(a.useState)(!1),n=Object(m.a)(t,2),o=n[0],c=n[1];Object(a.useEffect)((function(){(function(){var e=Object(u.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=!1,e.prev=1,e.next=4,T();case 4:t=e.sent,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),console.error(e.t0);case 10:t&&x(i),t!==o&&c(t);case 12:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(){return e.apply(this,arguments)}})()()}),[]);var i=function(t){switch(t.type){case"NewRoom":var n;n=t.content&&t.content.code?t.content.code:"ERROR",e(X.setRoom(n));break;case"ConnectRoom":e(X.setPlayers(t.content.players));break;case"SetPlayerColour":e(X.setPlayerColour(t.content.name,t.content.colour));break;case"StartGame":e(X.setTime(t.content.time)),e(X.setPlaying(!0));break;case"GetRole":e(X.setRole(t.content.role));break;case"GetWord":e(X.setGameWord(t.content.word));break;case"Draw":var a,r=[],o=Object(l.a)(t.content.lines);try{for(o.s();!(a=o.n()).done;){var c=a.value;r.push({startX:c.startX,startY:c.startY,endX:c.endX,endY:c.endY,playerName:t.content.name})}}catch(i){o.e(i)}finally{o.f()}e(X.addLines(r));break;case"EndTurn":case"GetFirstPlayer":e(X.setActivePlayer(t.content.activePlayer));break;case"StartGuess":e(X.startGuess(t.content.name));break;case"EndGuess":e(X.endGuess());break;case"SubmitGuess":e(X.submitGuess(t.content.correct));break;case"EndGame":e(X.endGame(t.content.spy));break;case"GetState":e(X.setState(t.content.state))}};return o?r.a.createElement("div",{className:"App"},r.a.createElement(d.a,null,r.a.createElement(p.c,null,r.a.createElement(p.a,{exact:!0,path:"/"},r.a.createElement(D,null)),r.a.createElement(p.a,{exact:!0,path:"/room"},r.a.createElement($,null)),r.a.createElement(p.a,{exact:!0,path:"/game"},r.a.createElement(ce,null))))):r.a.createElement("div",{className:"App"},r.a.createElement("p",null,"Failed to connect to server"))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ie=n(39),se=n(21),ue=n(20),me=n(6),de={room:"",name:"",players:[],playerColourMap:{},activePlayer:"",canvasLines:[],playing:!1,role:"",possibleRoles:[],gameWord:"",guessingPlayer:"",time:-1,guessedSpy:!1,gameEnded:!1,spy:""},pe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:de,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case g:var n=t.payload;return Object(me.a)(Object(me.a)({},e),{},{room:n});case E:var a=t.payload;return Object(me.a)(Object(me.a)({},e),{},{name:a});case b:var r=t.payload;return Object(me.a)(Object(me.a)({},e),{},{players:r});case O:var o=t.payload.playerName,c=t.payload.colour;return Object(me.a)(Object(me.a)({},e),{},{playerColourMap:Object(me.a)(Object(me.a)({},e.playerColourMap),{},Object(ue.a)({},o,c))});case S:var l=t.payload;return Object(me.a)(Object(me.a)({},e),{},{possibleRoles:l});case h:var i=t.payload;return Object(me.a)(Object(me.a)({},e),{},{role:i});case j:var s=t.payload;return Object(me.a)(Object(me.a)({},e),{},{playing:s});case C:var u=t.payload;return Object(me.a)(Object(me.a)({},e),{},{time:u});case N:var m=t.payload;return Object(me.a)(Object(me.a)({},e),{},{canvasLines:[].concat(Object(se.a)(e.canvasLines),Object(se.a)(m))});case w:var d=t.payload;return Object(me.a)(Object(me.a)({},e),{},{activePlayer:d});case k:var p=t.payload;return Object(me.a)(Object(me.a)({},e),{},{gameWord:p});case P:var y=t.payload.playerName,f=t.payload.guessing;return Object(me.a)(Object(me.a)({},e),{},{guessingPlayer:f?y:""});case L:var v=t.payload;return Object(me.a)(Object(me.a)({},e),{},{guessedSpy:v});case R:var X=t.payload;return Object(me.a)(Object(me.a)({},e),{},{gameEnded:!0,spy:X});case G:var Y=t.payload;return Object(me.a)(Object(me.a)({},e),Y);default:return e}},ye=Object(ie.b)(pe,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y.a,{store:ye},r.a.createElement(le,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[72,1,2]]]);
//# sourceMappingURL=main.714671c4.chunk.js.map