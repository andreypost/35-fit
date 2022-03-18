"use strict";(self.webpackChunk_35_fit=self.webpackChunk_35_fit||[]).push([[252],{252:(n,e,t)=>{t.r(e),t.d(e,{AppContext:()=>en,default:()=>tn});var i,r,o,a,s,l,c,u,d,p=t(8152),h=t(7294),x=t(5513),g=t(2487),f=t(9828),C=t(4478),m="/",v="/train",b="/pricing",j="/schedule",w="/team",L="/club",y="/faq",_="/reserve",Z=[{route:v,dictionary:"nav.Training"},{route:b,dictionary:"nav.Pricing"},{route:j,dictionary:"nav.Schedule"},{route:w,dictionary:"nav.Team"},{route:L,dictionary:"nav.Club"},{route:y,dictionary:"nav.Faq"}],k=[{route:m,dictionary:"nav.Dashboard"},{route:m,dictionary:"nav.Classes"},{route:m,dictionary:"nav.Progress"},{route:m,dictionary:"nav.Contract"},{route:m,dictionary:"nav.Profile"}],M=[{path:m,Component:(0,h.lazy)((function(){return t.e(717).then(t.bind(t,3717))}))},{path:v,Component:(0,h.lazy)((function(){return t.e(958).then(t.bind(t,4958))}))},{path:b,Component:(0,h.lazy)((function(){return t.e(214).then(t.bind(t,4214))}))},{path:j,Component:(0,h.lazy)((function(){return t.e(157).then(t.bind(t,7157))}))},{path:w,Component:(0,h.lazy)((function(){return t.e(659).then(t.bind(t,5659))}))},{path:L,Component:(0,h.lazy)((function(){return t.e(217).then(t.bind(t,3217))}))},{path:y,Component:(0,h.lazy)((function(){return t.e(148).then(t.bind(t,8148))}))},{path:_,Component:(0,h.lazy)((function(){return t.e(210).then(t.bind(t,7210))}))}],N=[{path:"/flower",Component:(0,h.lazy)((function(){return t.e(963).then(t.bind(t,963))}))},{path:"/chat",Component:(0,h.lazy)((function(){return t.e(187).then(t.bind(t,7187))}))}],H=t(168),V=t(9163),z=t(7170),T=t(1317),A=t(8604),B=t(5893),P=V.ZP.ul(i||(i=(0,H.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  margin-left: auto;\n  font-weight: 600;\n  color: #737373;\n\n  .lang_base {\n    width: 24px;\n  }\n\n  .lang_list {\n    visibility: hidden;\n    opacity: 0;\n    position: absolute;\n    top: 30px;\n    left: 0;\n    transition: visibility 0s, opacity 0.5s linear;\n\n    li:hover {\n      color: #ff6376;\n    }\n  }\n\n  .lang_arrow svg {\n    width: 16px;\n    height: 11px;\n    fill: #737373;\n    transition: transform 0.2s;\n    margin-left: 5px;\n  }\n\n  &:hover {\n    .lang_base {\n      color: #ff6376;\n    }\n\n    .lang_list {\n      visibility: visible;\n      opacity: 1;\n    }\n\n    .lang_arrow svg {\n      fill: #ff6376;\n      transform: rotate(180deg);\n    }\n  }\n\n  @media (hover: hover) {\n    &:hover {\n      cursor: pointer;\n    }\n  }\n"]))),F=function(){var n=(0,C.$)().i18n,e=(0,h.useContext)(en),t=e.language,i=e.setLanguage,r=["en","ee","de"];return(0,B.jsxs)(P,{children:[(0,B.jsx)("li",{className:"lang_base",children:t.toLocaleUpperCase()}),(0,B.jsx)("li",{className:"lang_list",children:(0,B.jsx)("ul",{children:r.splice(r.indexOf(t),1)&&r.map((function(e){return(0,B.jsx)("li",{onClick:function(){return n.changeLanguage(e),i(n.language)},children:e.toLocaleUpperCase()},e)}))})}),(0,B.jsx)("li",{className:"lang_arrow",children:(0,B.jsx)(A.Eg,{})})]})},R=t(9378),S=V.ZP.div(r||(r=(0,H.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  border-radius: 32px;\n  border: 2px solid #e8e8e8;\n  background-color: white;\n  transition: background-color 0.2s;\n\n  .user_face {\n    border-radius: 50%;\n    // border: 2px solid white;\n  }\n\n  @media (max-width: 992px) {\n    width: 38px;\n    height: 38px;\n    // justify-content: center;\n\n    .user_name {\n      display: none;\n    }\n\n    &.loggedOut {\n      // width: 38px;\n\n      .user_face {\n        width: 30px;\n        height: 30px;\n      }\n    }\n  }\n\n  @media (min-width: 993px) {\n    // monitor styles\n    width: 140px;\n    height: 42px;\n    padding-left: 4px;\n    padding-right: 2px;\n    \n    &.loggedOut {\n      justify-content: space-between;\n    }\n\n    .user_name {\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      overflow: hidden;\n      font-size: 14px;\n      color: #737373;\n      transition: color 0.2s;\n    }\n\n    .user_face {\n      width: 36px;\n      height: 36px;\n    }\n\n    &:hover {\n      background-color: #59b894;\n      p {\n        color: white;\n      }\n    }\n\n  }\n\n  @media (hover: hover) {\n    cursor: pointer;\n  }\n"]))),U=function(n){var e=n.user,t=(n.styles,(0,z.T)()),i=(0,C.$)().t;return(0,B.jsxs)(S,{className:"user "+(e?"loggedOut":"loggedIn"),onClick:function(){return t(e?(0,T.ST)():(0,T.Lq)())},children:[(0,B.jsx)("p",{className:"user_name",children:e&&e.displayName||i("nav.Login")}),(0,B.jsx)("img",{src:e&&e.photoURL||R,onError:function(n){return n.target.onerror=null,n.target.src=R},className:"user_face",style:{display:e?"block":"none"},alt:"user's face"})]})},O=function(n){var e=n.links,t=n.color,i=(0,C.$)().t;return(0,B.jsx)(B.Fragment,{children:e.map((function(n){var e=n.route,r=n.dictionary;return(0,B.jsx)("li",{children:(0,B.jsx)(x.rU,{to:e,style:{color:(0,g.TH)().pathname==e?"#000044":t},children:i(r)})},r)}))})},$=V.ZP.header(o||(o=(0,H.Z)(["\n  .navigate {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding-top: 20px;\n\n    a {\n      white-space: nowrap;\n    }\n\n    &_logo svg {\n      display: block;\n      fill: #000044;\n      margin-right: 10px;\n    }\n\n    &_menu {\n      display: grid;\n      grid-auto-flow: column;\n      gap: 10px;\n      margin-left: auto;\n    }\n\n    @media (max-width: 992px) {\n      // mobile styles\n\n      &_logo svg {\n        width: 100px;\n        height: 44px;\n      }\n\n      &_routes,\n      &_buy {\n        display: none;\n      }\n\n      &_burger {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        background-color: transparent;\n\n        span,\n        span::before,\n        span::after {\n          content: '';\n          width: 30px;\n          height: 3px;\n          position: absolute;\n          top: 0;\n          left: 0;\n          border-radius: 2px;\n          transform-origin: 50% 50%;\n          background: #59b894;\n          transition: all 0.45s cubic-bezier(0.45, 0.45, 0.37, 1.36);\n        }\n\n        span {\n          display: inline-block;\n          position: relative;\n\n          &::before {\n            transform: translateY(-0.55rem);\n          }\n\n          &::after {\n            transform: translateY(0.55rem);\n          }\n        }\n\n        &.active {\n          span {\n            transform: translate(1rem);\n            background-color: transparent;\n\n            &::before {\n              transform: translate(-1rem) rotate(135deg);\n              background-color: #ff6376;\n            }\n\n            &::after {\n              transform: translate(-1rem) rotate(-135deg);\n              background-color: #ff6376;\n            }\n          }\n        }\n      }\n    }\n\n    @media (min-width: 993px) {\n      // monitor styles\n\n      &_burger {\n        display: none;\n      }\n\n      &_logo svg {\n        width: 118px;\n        height: 50px;\n        transition: fill 0.2s;\n      }\n\n      &_routes {\n        display: grid;\n        grid-auto-flow: column;\n        gap: 10px;\n        align-items: center;\n\n        a {\n          font-size: 14px;\n          font-weight: 600;\n          transition: color 0.2s;\n\n          &:hover {\n            color: #ff6376 !important;\n          }\n        }\n      }\n\n      &_buy {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        // @include green_button;\n        box-sizing: border-box;\n        width: 188px;\n        padding: 0 12px;\n        border: none;\n        border-radius: 32px;\n        background-color: #59b894;\n        color: white;\n        transition: background-color 0.2s;\n\n        @media (max-width: 992px) {\n          height: 38px;\n        }\n\n        @media (min-width: 993px) {\n          height: 42px;\n        }\n\n        &:hover {\n          background-color: #000044;\n        }\n\n        &:active {\n          color: #ff6376;\n        }\n      }\n    }\n\n    @media (min-width: 1080px) and (max-width: 1279px) {\n      &_logo {\n        margin-right: 20px;\n      }\n\n      &_routes,\n      &_menu {\n        gap: 20px;\n      }\n    }\n\n    @media (min-width: 1280px) {\n      &_logo {\n        margin-right: 40px;\n      }\n\n      &_routes,\n      &_menu {\n        gap: 40px;\n      }\n    }\n\n    @media (hover: hover) {\n      &_logo svg:hover {\n        fill: #59b894;\n      }\n    }\n  }\n"]))),D=function(n){var e=n.user,t=(0,C.$)().t,i=(0,z.T)(),r=(0,z.C)(T.oq);return(0,B.jsx)($,{children:(0,B.jsxs)("nav",{className:"section navigate",children:[(0,B.jsx)(x.rU,{to:m,className:"navigate_logo",children:(0,B.jsx)(A.fP,{})}),(0,B.jsx)("ul",{className:"navigate_routes",children:(0,B.jsx)(O,{links:Z,color:"#737373"})}),(0,B.jsxs)("div",{className:"navigate_menu",children:[(0,h.useMemo)((function(){return(0,B.jsx)(F,{})}),[]),(0,h.useMemo)((function(){return(0,B.jsx)(U,{user:e,styles:"header_nav"})}),[e]),(0,B.jsx)(x.rU,{to:_,className:"navigate_buy",children:t("nav.Buy")}),(0,B.jsx)("div",{className:"navigate_burger "+r,onClick:function(){return i((0,T.R7)())},children:(0,B.jsx)("span",{})})]})]})})},I=function(){var n=(0,C.$)().t;return(0,B.jsx)("footer",{children:(0,B.jsx)("div",{className:"section",children:(0,B.jsxs)("ul",{children:[(0,B.jsx)("li",{children:(0,B.jsx)(x.rU,{to:"/Faq",children:n("footer.Careers")})}),(0,B.jsx)("li",{}),(0,B.jsx)("li",{}),(0,B.jsx)("li",{})]})})})},E=V.ZP.div(a||(a=(0,H.Z)(["\n  opacity: 0;\n  position: fixed;\n  z-index: -99;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 200%;\n  overflow: auto;\n  background-color: rgba(0, 0, 0, 0.2);\n  transition: opacity 0.4s, z-index 0.1s 0.4s;\n\n  @media (orientation: landscape) {\n    height: 100%;\n  }\n\n  @media (min-width: 993px) {\n    display: none;\n  }\n\n  nav {\n    transform: scale(0);\n    box-sizing: border-box;\n    width: 90%;\n    max-width: 480px;\n    margin: 10vh auto;\n    border-radius: 6px;\n    box-shadow: 0 8px 24px rgb(0 0 0 / 15%);\n    background: #fff;\n    transition: transform 0.6s;\n    position: relative;\n\n    .cross_icon {\n      position: absolute;\n      right: 15px;\n      top: 15px;\n      width: 24px;\n      height: 24px;\n      @media (hover: hover) {\n        &:hover {\n          cursor: pointer;\n        }\n      }\n    }\n  }\n\n  &.menuActive, &.dashboarActive, &.loginActive, &.messageActive {\n    z-index: 99;\n    opacity: 1;\n    transition: z-index 0.1s, opacity 0.4s 0.1s;\n\n    nav {\n      transform: scale(1);\n    }\n  }\n\n"]))),q=(0,V.ZP)(E)(s||(s=(0,H.Z)(["\n  nav ul {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      flex-flow: column;\n      padding: 40px;\n      text-align: center;\n  }\n"]))),G=(0,V.ZP)(q)(l||(l=(0,H.Z)(["\n      li {\n        width: 100%;\n        max-width: 280px;\n\n        a {\n          display: inline-block;\n          font-size: 20px;\n          // line-height: 48px;\n          font-weight: 900;\n          padding-top: 9.5px;\n          padding-bottom: 9.5px;\n        }\n      }\n\n      .login {\n        margin: 40px auto 20px;\n\n        .user {\n          width: 100%;\n          height: 42px;\n          padding: 0 20px;\n        }\n      }\n\n      .signIn {\n        p {\n          font-weight: 700;\n          color: #59b894;\n        }\n        &:hover p {\n          color: white;\n        }\n      }\n\n      .signOut .user {\n        justify-content: space-between;\n        .user_face {\n          width: 36px;\n          height: 36px;\n          margin-right: -20px;\n        }\n      }\n\n      .buyСlass a {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        // padding: 0 20px;\n        border-radius: 32px;\n        background-color: #59b894;\n        color: white;\n      }\n"]))),W=function(n){var e=n.user,t=(0,C.$)().t,i=(0,z.C)(T.rc),r=(0,z.T)();return(0,B.jsx)(G,{className:i,onClick:function(n){return n.target===n.currentTarget&&r((0,T.$E)())},children:(0,B.jsxs)("nav",{children:[(0,B.jsx)(A.r5,{className:"cross_icon",onClick:function(){return r((0,T.$E)())}}),(0,B.jsxs)("ul",{children:[(0,B.jsx)(O,{links:Z,color:"#737373"}),(0,B.jsx)("li",{className:"login "+(e?"signOut":"signIn"),children:(0,h.useMemo)((function(){return(0,B.jsx)(U,{user:e,styles:"menu_modal"})}),[e])}),(0,B.jsx)("li",{className:"buyСlass",children:(0,B.jsx)(x.rU,{to:_,children:t("nav.Buy")})})]})]})})},Y=(0,V.ZP)(E)(c||(c=(0,H.Z)(["\n  nav {\n    ul {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      flex-flow: column;\n      padding: 40px;\n      text-align: center;\n\n      li {\n        a {\n        }\n\n        font-size: 18px;\n        line-height: 21px;\n        margin-bottom: 10px;\n\n        .signout {\n        }\n        .login {\n        }\n      }\n    }\n  }\n"]))),Q=function(n){n.user;var e=n.login,t=(0,z.T)(),i=(0,z.C)(T.Nn);return(0,B.jsxs)(Y,{className:i,onClick:function(n){return n.target===n.currentTarget&&t((0,T.D2)())},children:[(0,B.jsx)("p",{onClick:function(){return t((0,T.sQ)())},children:"notificationSuccessModal"}),(0,B.jsx)("button",{onClick:function(){return e()},children:"notificationSuccessModal"})]})},J=(0,V.ZP)(E)(u||(u=(0,H.Z)(["\n  nav {\n    \n  }\n"]))),K=function(){var n=(0,z.T)(),e=(0,z.C)(T.eT),t=(0,z.C)(T.Bb);return(0,B.jsx)(J,{className:e,onClick:function(e){return e.target===e.currentTarget&&n((0,T.ys)())},children:(0,B.jsx)("p",{children:t})})},X=(0,V.ZP)(E)(d||(d=(0,H.Z)(["\n  display: block;\n   ul {\n      // display: flex;\n      // align-items: center;\n      // justify-content: space-between;\n      // flex-flow: column;\n      padding: 40px;\n      text-align: center;\n\n      li {\n        a {\n          font-size: 18px;\n          line-height: 48px;\n          font-weight: 900;\n        }\n\n        .signout {\n        }\n        .login {\n        }\n      }\n  }\n"]))),nn=function(n){var e=n.user,t=(n.login,n.firebaseAuth),i=(0,C.$)().t,r=(0,z.C)(T.Ar),o=(0,z.T)();return(0,B.jsx)(X,{className:r,onClick:function(n){return n.target===n.currentTarget&&o((0,T._D)())},children:(0,B.jsxs)("nav",{children:[(0,B.jsx)(A.r5,{className:"cross_icon",onClick:function(){return o((0,T._D)())}}),(0,B.jsxs)("ul",{children:[(0,h.useMemo)((function(){return(0,B.jsx)(U,{user:e,styles:"dashboard"})}),[e]),(0,B.jsx)(O,{links:k,color:"#59b894"}),(0,B.jsx)("li",{onClick:function(){return t.signOut(),o((0,T._D)())},children:i("nav.Sign out")})]})]})})},en=(0,h.createContext)({});const tn=function(){var n=(0,h.useContext)(f.y),e=n.user,t=n.login,i=n.firebaseAuth,r=(0,C.$)().i18n,o=(0,h.useState)(r.language),a=(0,p.Z)(o,2),s=a[0],l=a[1];return(0,h.useEffect)((function(){window.onstorage=function(n){"i18nextLng"===n.key&&n.newValue&&(l(n.newValue),r.changeLanguage(n.newValue))}}),[]),(0,B.jsx)(en.Provider,{value:{language:s,setLanguage:l},children:(0,B.jsxs)(x.UT,{basename:"/",children:[(0,h.useMemo)((function(){return(0,B.jsx)(D,{user:e})}),[e]),(0,B.jsxs)(g.rs,{children:[M.map((function(n){var e=n.path,t=n.Component;return(0,B.jsx)(g.AW,{path:e,component:t,exact:!0},e)})),e&&N.map((function(n){var e=n.path,t=n.Component;return(0,B.jsx)(g.AW,{path:e,component:t,exact:!0},e)})),(0,B.jsx)(g.l_,{to:m})]}),(0,h.useMemo)((function(){return(0,B.jsx)(I,{})}),[]),(0,h.useMemo)((function(){return(0,B.jsx)(W,{user:e})}),[e]),(0,h.useMemo)((function(){return(0,B.jsx)(Q,{user:e,login:t})}),[e]),(0,h.useMemo)((function(){return(0,B.jsx)(nn,{user:e,login:t,firebaseAuth:i})}),[e]),(0,h.useMemo)((function(){return(0,B.jsx)(K,{})}),[])]})})}},8604:(n,e,t)=>{t.d(e,{fP:()=>o,Eg:()=>a,r5:()=>s,cf:()=>l,uD:()=>c});var i=t(7294),r=t(5893),o=(0,i.memo)((function(){return(0,r.jsxs)("svg",{viewBox:"0 0 118 50",xmlns:"http://www.w3.org/2000/svg",children:[(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M76.0192 50H59H41.9803H24.9612C21.5292 50 18.253 49.2971 15.2692 48.0273C12.2858 46.7575 9.59476 44.9218 7.33229 42.6564C5.07034 40.3904 3.23701 37.6952 1.96969 34.7067C0.701842 31.7183 0 28.4376 0 24.9997C0 21.5624 0.701842 18.2812 1.96969 15.2928C3.23701 12.3048 5.07034 9.60906 7.33229 7.34362C9.59476 5.07818 12.2858 3.24201 15.2692 1.97221C18.253 0.702926 21.5292 0 24.9612 0H41.9803H59H76.0192H93.0383C96.4703 0 99.747 0.702926 102.73 1.97221C105.714 3.24201 108.405 5.07818 110.668 7.34362C112.93 9.60906 114.763 12.3048 116.03 15.2928C117.298 18.2812 118 21.5624 118 24.9997C118 28.4376 117.298 31.7183 116.03 34.7067C114.763 37.6952 112.93 40.3904 110.668 42.6564C108.405 44.9218 105.714 46.7575 102.73 48.0273C99.747 49.2971 96.4703 50 93.0383 50H76.0192Z"}),(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M91.1125 19.3186H80.7947C80.3574 19.3186 80.0033 19.6717 80.0033 20.1084C80.0033 20.5452 80.3574 20.8987 80.7947 20.8987H85.1619V29.873C85.1619 30.3092 85.5165 30.6628 85.9534 30.6628C86.3902 30.6628 86.7443 30.3092 86.7443 29.873V20.8987H91.1125C91.5493 20.8987 91.9039 20.5452 91.9039 20.1084C91.9039 19.6717 91.5493 19.3186 91.1125 19.3186ZM75.9788 30.6628C76.4151 30.6628 76.7697 30.3092 76.7697 29.873V20.1084C76.7697 19.6722 76.4151 19.3186 75.9788 19.3186C75.542 19.3186 75.1874 19.6722 75.1874 20.1084V29.873C75.1874 30.3092 75.542 30.6628 75.9788 30.6628ZM70.8469 24.2165H61.8648V20.8988H70.8521C71.2889 20.8988 71.6435 20.5452 71.6435 20.1084C71.6435 19.6722 71.2889 19.3181 70.8521 19.3181H61.0744C60.6376 19.3181 60.283 19.6722 60.283 20.1084V24.9555C60.2814 24.973 60.2778 24.9889 60.2778 25.0063C60.2778 25.0238 60.2814 25.0397 60.283 25.0572V29.8914C60.283 30.3276 60.6376 30.6818 61.0744 30.6818C61.5107 30.6818 61.8648 30.3276 61.8648 29.8914V25.7967H70.8469C71.2837 25.7967 71.6378 25.4431 71.6378 25.0063C71.6378 24.5696 71.2837 24.2165 70.8469 24.2165ZM36.6653 19.3345H26.8876C26.4503 19.3345 26.0962 19.6881 26.0962 20.1243C26.0962 20.5606 26.4503 20.9147 26.8876 20.9147H35.8738V24.2165H26.8876C26.4503 24.2165 26.0962 24.5696 26.0962 25.0063C26.0962 25.4431 26.4503 25.7967 26.8876 25.7967H35.8738V29.0985H26.8876C26.4503 29.0985 26.0962 29.4527 26.0962 29.8889C26.0962 30.3251 26.4503 30.6787 26.8876 30.6787H36.6653C37.1021 30.6787 37.4567 30.3251 37.4567 29.8889V20.1243C37.4567 19.6881 37.1021 19.3345 36.6653 19.3345ZM51.6411 30.6787H41.8635C41.4267 30.6787 41.0721 30.3251 41.0721 29.8889C41.0721 29.4527 41.4267 29.0985 41.8635 29.0985H50.8502V25.7967H41.8635C41.4267 25.7967 41.0721 25.4431 41.0721 25.0063V20.1243C41.0721 19.6881 41.4267 19.3345 41.8635 19.3345H51.6411C52.0785 19.3345 52.4326 19.6881 52.4326 20.1243C52.4326 20.5606 52.0785 20.9147 51.6411 20.9147H42.6544V24.2165H51.6411C52.0785 24.2165 52.4326 24.5701 52.4326 25.0063V29.8889C52.4326 30.3251 52.0785 30.6787 51.6411 30.6787Z",fill:"white"})]})})),a=(0,i.memo)((function(){return(0,r.jsx)("svg",{viewBox:"0 0 12 8",xmlns:"http://www.w3.org/2000/svg",children:(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6 7.99991L0.292881 2.22679C-0.097627 1.83178 -0.097627 1.19126 0.292881 0.796256C0.683389 0.401248 1.3164 0.401248 1.70691 0.796256L6 5.13935L10.2931 0.796256C10.6836 0.401248 11.3166 0.401248 11.7071 0.796256C12.0976 1.19126 12.0976 1.83178 11.7071 2.22679L6 7.99991Z"})})})),s=(0,i.memo)((function(n){var e=n.className,t=n.onClick;return(0,r.jsx)("svg",{className:e,onClick:t,width:"25",height:"24",viewBox:"0 0 25 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M14.8348 11.9999L23.4154 3.41977C24.1989 2.63739 24.1989 1.36916 23.4154 0.586783C22.633 -0.195594 21.3657 -0.195594 20.5823 0.586783L12.0016 9.16689L3.41998 0.586783C2.63756 -0.195594 1.37025 -0.195594 0.58682 0.586783C-0.195607 1.36916 -0.195607 2.63739 0.58682 3.41977L9.16846 11.9999L0.58682 20.58C-0.195607 21.3624 -0.195607 22.6316 0.58682 23.414C0.978534 23.8047 1.49147 24 2.0034 24C2.51634 24 3.02927 23.8047 3.41998 23.414L12.0016 14.8329L20.5823 23.414C20.974 23.8047 21.4869 24 21.9989 24C22.5118 24 23.0247 23.8047 23.4154 23.414C24.1989 22.6316 24.1989 21.3624 23.4154 20.58L14.8348 11.9999Z",fill:"#FF6376"})})})),l=(0,i.memo)((function(n){var e=n.className;return(0,r.jsxs)("svg",{className:e,width:"213",height:"118",viewBox:"0 0 213 118",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,r.jsx)("path",{d:"M69 84.5255C69 83.7072 68.5015 82.9714 67.7415 82.668L2.74148 56.7209C1.42794 56.1966 0 57.1641 0 58.5784V89.3899C0 90.2082 0.49852 90.944 1.25852 91.2473L66.2585 117.194C67.5721 117.719 69 116.751 69 115.337V84.5255Z",fill:"#DA4A5B"}),(0,r.jsx)("path",{d:"M119 25.5773C119 24.6538 119.632 23.8503 120.53 23.6333L209.78 2.05647C211.44 1.65519 212.806 3.38446 212.033 4.90672L200 28.5785L212.609 49.7051C213.299 50.8623 212.671 52.3574 211.361 52.6741L121.47 74.4061C120.211 74.7103 119 73.7568 119 72.4621V25.5773Z",fill:"#F25367"}),(0,r.jsx)("path",{d:"M119 42.3038C119 41.6007 119.369 40.9491 119.973 40.5879L161.973 15.4392C163.306 14.641 165 15.6013 165 17.1551V50.0911C165 50.8239 164.599 51.4981 163.955 51.8482L121.955 74.682C120.623 75.4065 119 74.4418 119 72.9249V42.3038Z",fill:"#D14556"}),(0,r.jsx)("path",{d:"M0 41.0308C0 40.1077 0.63172 39.3045 1.5288 39.0871L162.529 0.0567621C163.788 -0.248399 165 0.70521 165 2.00046V48.8846C165 49.8077 164.368 50.6108 163.471 50.8283L2.4712 89.8586C1.21241 90.1638 0 89.2102 0 87.9149V41.0308Z",fill:"#FF6376"}),(0,r.jsx)("path",{d:"M65.3909 44.3144L62.769 47.8939C63.6913 47.9683 64.4621 48.2574 65.0813 48.761C65.7004 49.2646 66.1061 49.9325 66.2982 50.7646C66.5312 51.774 66.4217 52.762 65.9695 53.7285C65.5309 54.6918 64.8127 55.533 63.8149 56.2519C62.817 56.9707 61.636 57.4877 60.2719 57.8026C59.2215 58.0451 58.1906 58.1538 57.179 58.1287C56.1811 58.1005 55.2555 57.919 54.4024 57.5844L55.8171 53.7232C56.4415 53.9382 57.0947 54.0604 57.7768 54.0897C58.4588 54.119 59.1068 54.0628 59.7206 53.9211C60.3891 53.7668 60.877 53.5464 61.1844 53.2599C61.4887 52.9598 61.5952 52.6119 61.5039 52.2163C61.3716 51.6434 60.828 51.4671 59.8731 51.6876L57.8883 52.1458L57.7967 49.0418L59.7971 46.317L54.7225 47.4886L54.6183 43.6763L65.2993 41.2104L65.3909 44.3144ZM72.4593 43.3937L72.3965 44.8953L72.7648 44.8103C74.4836 44.4135 75.8787 44.4506 76.9501 44.9217C78.0352 45.3896 78.7305 46.2851 79.036 47.6083C79.2974 48.7405 79.2119 49.802 78.7797 50.7926C78.3475 51.7832 77.6308 52.6311 76.6298 53.3364C75.6393 54.0249 74.4484 54.5297 73.057 54.8509C72.0066 55.0934 70.9756 55.2021 69.964 55.177C68.9661 55.1488 68.0406 54.9674 67.1874 54.6327L68.6021 50.7715C69.2265 50.9866 69.8797 51.1087 70.5618 51.1381C71.2439 51.1674 71.8918 51.1112 72.5057 50.9695C73.1741 50.8151 73.662 50.5947 73.9695 50.3082C74.2737 50.0081 74.3818 49.667 74.2936 49.2851C74.2212 48.9713 74.0312 48.7709 73.7238 48.6839C73.4131 48.5832 72.9373 48.6068 72.2961 48.7548L67.9378 49.761L68.3855 40.4979L77.9002 38.3013L78.0045 42.1135L72.4593 43.3937ZM85.4827 40.387L85.5585 42.9558L91.5333 41.5764L91.6376 45.3887L85.6832 46.7634L85.8206 51.5594L80.9916 52.6742L80.5495 37.6896L92.1922 35.0017L92.2965 38.814L85.4827 40.387ZM93.8883 34.6101L98.7173 33.4953L99.1594 48.4799L94.3304 49.5947L93.8883 34.6101ZM104.43 36.1205L100.235 37.0889L100.128 33.1696L113.346 30.1179L113.454 34.0372L109.259 35.0056L109.594 46.0709L104.765 47.1858L104.43 36.1205Z",fill:"white"})]})})),c=(0,i.memo)((function(n){var e=n.className;return(0,r.jsxs)("svg",{className:e,width:"168",height:"168",viewBox:"0 0 168 168",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,r.jsx)("g",{filter:"url(#filter0_d_1267_13189)",children:(0,r.jsx)("path",{d:"M84 136C117.137 136 144 109.137 144 76C144 42.8629 117.137 16 84 16C50.8629 16 24 42.8629 24 76C24 109.137 50.8629 136 84 136Z",fill:"#FF6376"})}),(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M86.8026 93.7686L86.0672 91.0243L76.2621 89.6836L76.5215 90.6484C76.9066 92.0859 78.5976 93.5741 80.073 93.7766L86.0719 94.5956C86.5561 94.6623 86.7716 94.555 86.8097 94.5123C86.8484 94.4687 86.929 94.2404 86.8026 93.7686ZM60.4346 88.9437C60.979 88.7987 61.4328 88.4491 61.7134 87.9631C61.9945 87.4761 62.0698 86.9093 61.9232 86.3653L59.6977 78.0563C59.5515 77.5139 59.203 77.0581 58.7181 76.7781C58.2301 76.4963 57.6611 76.4225 57.1182 76.5671C55.9979 76.8673 55.3294 78.0251 55.6284 79.1475L57.8561 87.455C58.1478 88.5435 59.3461 89.2354 60.4346 88.9437ZM65.7861 83.8185L94.0785 87.688L86.8831 60.8342L64.3164 78.3304L65.7861 83.8185ZM99.1733 89.7416C99.4657 90.8265 100.667 91.5201 101.753 91.2309C102.875 90.9303 103.543 89.7724 103.242 88.6514L94.3371 55.4181C94.1915 54.8746 93.8435 54.4204 93.3565 54.1393C92.8685 53.8575 92.3011 53.7832 91.7566 53.9282C91.2132 54.0739 90.76 54.4225 90.4788 54.9095C90.1977 55.3965 90.1224 55.9632 90.268 56.5067L99.1733 89.7416ZM95.5516 50.3373C97.054 51.2047 98.1277 52.6046 98.5769 54.2812L107.483 87.5151C107.931 89.1885 107.7 90.9381 106.831 92.4426C105.963 93.947 104.563 95.0223 102.889 95.4717C101.215 95.9221 99.4632 95.691 97.9598 94.823C96.9192 94.2222 96.0778 93.3579 95.5085 92.3139L90.784 91.6675L91.0424 92.6317C91.5295 94.4433 91.187 96.1868 90.1041 97.4139C89.0231 98.6422 87.337 99.199 85.4777 98.9474L79.4774 98.1262C78.5053 97.9947 77.4935 97.6355 76.5498 97.0906C74.4401 95.8726 72.8443 93.8884 72.2802 91.7831L71.5449 89.0388L66.2357 88.3108C66.0935 88.9562 65.852 89.5752 65.5154 90.1582C64.6474 91.6616 63.2463 92.7373 61.5709 93.1845C59.8953 93.6344 58.1451 93.4039 56.6427 92.5364C55.1382 91.6679 54.0635 90.2674 53.6153 88.5914L51.3882 80.2828C50.4615 76.8245 52.5218 73.2559 55.9813 72.3273C58.3091 71.7044 60.8558 72.4688 62.458 74.2156L85.8085 56.1131C85.7769 54.9241 86.076 53.7551 86.6774 52.7134C87.5437 51.213 88.9432 50.1377 90.6213 49.688C92.2979 49.2388 94.0481 49.4693 95.5516 50.3373ZM109.859 71.3299C109.296 71.4812 108.707 71.404 108.202 71.1128C107.698 70.8215 107.335 70.3492 107.185 69.7859C106.875 68.6218 107.568 67.4201 108.731 67.1077L118.713 64.4259C119.839 64.1217 121.084 64.839 121.386 65.9693C121.697 67.1334 121.003 68.3341 119.841 68.6465L109.859 71.3299ZM104.016 63.3072C104.533 63.6059 105.137 63.6842 105.715 63.5292L109.168 62.598C110.362 62.2773 111.074 61.0437 110.755 59.8497C110.447 58.6927 109.17 57.955 108.014 58.2672L104.561 59.1967C103.368 59.518 102.656 60.7517 102.974 61.9451C103.127 62.5241 103.498 63.008 104.016 63.3072ZM109.04 75.9409L112.49 75.0166C113.679 74.699 114.911 75.4062 115.231 76.599C115.549 77.7912 114.839 79.0212 113.648 79.3404L110.199 80.2652C109.619 80.4196 109.017 80.3397 108.501 80.0417C107.983 79.7425 107.611 79.2586 107.457 78.6823C107.302 78.1048 107.382 77.5015 107.681 76.9843C107.98 76.4661 108.462 76.0959 109.04 75.9409Z",fill:"white"}),(0,r.jsx)("defs",{children:(0,r.jsxs)("filter",{id:"filter0_d_1267_13189",x:"0",y:"0",width:"168",height:"168",filterUnits:"userSpaceOnUse",colorInterpolationFilters:"sRGB",children:[(0,r.jsx)("feFlood",{floodOpacity:"0",result:"BackgroundImageFix"}),(0,r.jsx)("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",result:"hardAlpha"}),(0,r.jsx)("feOffset",{dy:"8"}),(0,r.jsx)("feGaussianBlur",{stdDeviation:"12"}),(0,r.jsx)("feColorMatrix",{type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.148126 0"}),(0,r.jsx)("feBlend",{mode:"normal",in2:"BackgroundImageFix",result:"effect1_dropShadow_1267_13189"}),(0,r.jsx)("feBlend",{mode:"normal",in:"SourceGraphic",in2:"effect1_dropShadow_1267_13189",result:"shape"})]})})]})}))},7170:(n,e,t)=>{t.d(e,{T:()=>r,C:()=>o});var i=t(9704),r=function(){return(0,i.I0)()},o=i.v9},9378:(n,e,t)=>{n.exports=t.p+"528dec0bf56000a50ce9.png"}}]);
//# sourceMappingURL=252.bundle.js.map