import React from 'react';
import { ISVGProp } from 'types/appTypes';

export const LogoSVG = React.memo(() =>
    <svg viewBox="0 0 118 50" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M76.0192 50H59H41.9803H24.9612C21.5292 50 18.253 49.2971 15.2692 48.0273C12.2858 46.7575 9.59476 44.9218 7.33229 42.6564C5.07034 40.3904 3.23701 37.6952 1.96969 34.7067C0.701842 31.7183 0 28.4376 0 24.9997C0 21.5624 0.701842 18.2812 1.96969 15.2928C3.23701 12.3048 5.07034 9.60906 7.33229 7.34362C9.59476 5.07818 12.2858 3.24201 15.2692 1.97221C18.253 0.702926 21.5292 0 24.9612 0H41.9803H59H76.0192H93.0383C96.4703 0 99.747 0.702926 102.73 1.97221C105.714 3.24201 108.405 5.07818 110.668 7.34362C112.93 9.60906 114.763 12.3048 116.03 15.2928C117.298 18.2812 118 21.5624 118 24.9997C118 28.4376 117.298 31.7183 116.03 34.7067C114.763 37.6952 112.93 40.3904 110.668 42.6564C108.405 44.9218 105.714 46.7575 102.73 48.0273C99.747 49.2971 96.4703 50 93.0383 50H76.0192Z"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M91.1125 19.3186H80.7947C80.3574 19.3186 80.0033 19.6717 80.0033 20.1084C80.0033 20.5452 80.3574 20.8987 80.7947 20.8987H85.1619V29.873C85.1619 30.3092 85.5165 30.6628 85.9534 30.6628C86.3902 30.6628 86.7443 30.3092 86.7443 29.873V20.8987H91.1125C91.5493 20.8987 91.9039 20.5452 91.9039 20.1084C91.9039 19.6717 91.5493 19.3186 91.1125 19.3186ZM75.9788 30.6628C76.4151 30.6628 76.7697 30.3092 76.7697 29.873V20.1084C76.7697 19.6722 76.4151 19.3186 75.9788 19.3186C75.542 19.3186 75.1874 19.6722 75.1874 20.1084V29.873C75.1874 30.3092 75.542 30.6628 75.9788 30.6628ZM70.8469 24.2165H61.8648V20.8988H70.8521C71.2889 20.8988 71.6435 20.5452 71.6435 20.1084C71.6435 19.6722 71.2889 19.3181 70.8521 19.3181H61.0744C60.6376 19.3181 60.283 19.6722 60.283 20.1084V24.9555C60.2814 24.973 60.2778 24.9889 60.2778 25.0063C60.2778 25.0238 60.2814 25.0397 60.283 25.0572V29.8914C60.283 30.3276 60.6376 30.6818 61.0744 30.6818C61.5107 30.6818 61.8648 30.3276 61.8648 29.8914V25.7967H70.8469C71.2837 25.7967 71.6378 25.4431 71.6378 25.0063C71.6378 24.5696 71.2837 24.2165 70.8469 24.2165ZM36.6653 19.3345H26.8876C26.4503 19.3345 26.0962 19.6881 26.0962 20.1243C26.0962 20.5606 26.4503 20.9147 26.8876 20.9147H35.8738V24.2165H26.8876C26.4503 24.2165 26.0962 24.5696 26.0962 25.0063C26.0962 25.4431 26.4503 25.7967 26.8876 25.7967H35.8738V29.0985H26.8876C26.4503 29.0985 26.0962 29.4527 26.0962 29.8889C26.0962 30.3251 26.4503 30.6787 26.8876 30.6787H36.6653C37.1021 30.6787 37.4567 30.3251 37.4567 29.8889V20.1243C37.4567 19.6881 37.1021 19.3345 36.6653 19.3345ZM51.6411 30.6787H41.8635C41.4267 30.6787 41.0721 30.3251 41.0721 29.8889C41.0721 29.4527 41.4267 29.0985 41.8635 29.0985H50.8502V25.7967H41.8635C41.4267 25.7967 41.0721 25.4431 41.0721 25.0063V20.1243C41.0721 19.6881 41.4267 19.3345 41.8635 19.3345H51.6411C52.0785 19.3345 52.4326 19.6881 52.4326 20.1243C52.4326 20.5606 52.0785 20.9147 51.6411 20.9147H42.6544V24.2165H51.6411C52.0785 24.2165 52.4326 24.5701 52.4326 25.0063V29.8889C52.4326 30.3251 52.0785 30.6787 51.6411 30.6787Z"
            fill="white"
        />
    </svg>
)

export const LangArrowSVG = React.memo(() =>
    <svg viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 7.99991L0.292881 2.22679C-0.097627 1.83178 -0.097627 1.19126 0.292881 0.796256C0.683389 0.401248 1.3164 0.401248 1.70691 0.796256L6 5.13935L10.2931 0.796256C10.6836 0.401248 11.3166 0.401248 11.7071 0.796256C12.0976 1.19126 12.0976 1.83178 11.7071 2.22679L6 7.99991Z"
        />
    </svg>
)

export const CrossRedSVG = React.memo(({ className, onClick }: ISVGProp) =>
    <svg className={className} onClick={onClick} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M14.8348 11.9999L23.4154 3.41977C24.1989 2.63739 24.1989 1.36916 23.4154 0.586783C22.633 -0.195594 21.3657 -0.195594 20.5823 0.586783L12.0016 9.16689L3.41998 0.586783C2.63756 -0.195594 1.37025 -0.195594 0.58682 0.586783C-0.195607 1.36916 -0.195607 2.63739 0.58682 3.41977L9.16846 11.9999L0.58682 20.58C-0.195607 21.3624 -0.195607 22.6316 0.58682 23.414C0.978534 23.8047 1.49147 24 2.0034 24C2.51634 24 3.02927 23.8047 3.41998 23.414L12.0016 14.8329L20.5823 23.414C20.974 23.8047 21.4869 24 21.9989 24C22.5118 24 23.0247 23.8047 23.4154 23.414C24.1989 22.6316 24.1989 21.3624 23.4154 20.58L14.8348 11.9999Z" fill="#FF6376" />
    </svg>
)

export const TieFitSVG = React.memo(({ className }: ISVGProp) =>
    <svg className={className} width="213" height="118" viewBox="0 0 213 118" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M69 84.5255C69 83.7072 68.5015 82.9714 67.7415 82.668L2.74148 56.7209C1.42794 56.1966 0 57.1641 0 58.5784V89.3899C0 90.2082 0.49852 90.944 1.25852 91.2473L66.2585 117.194C67.5721 117.719 69 116.751 69 115.337V84.5255Z" fill="#DA4A5B" />
        <path d="M119 25.5773C119 24.6538 119.632 23.8503 120.53 23.6333L209.78 2.05647C211.44 1.65519 212.806 3.38446 212.033 4.90672L200 28.5785L212.609 49.7051C213.299 50.8623 212.671 52.3574 211.361 52.6741L121.47 74.4061C120.211 74.7103 119 73.7568 119 72.4621V25.5773Z" fill="#F25367" />
        <path d="M119 42.3038C119 41.6007 119.369 40.9491 119.973 40.5879L161.973 15.4392C163.306 14.641 165 15.6013 165 17.1551V50.0911C165 50.8239 164.599 51.4981 163.955 51.8482L121.955 74.682C120.623 75.4065 119 74.4418 119 72.9249V42.3038Z" fill="#D14556" />
        <path d="M0 41.0308C0 40.1077 0.63172 39.3045 1.5288 39.0871L162.529 0.0567621C163.788 -0.248399 165 0.70521 165 2.00046V48.8846C165 49.8077 164.368 50.6108 163.471 50.8283L2.4712 89.8586C1.21241 90.1638 0 89.2102 0 87.9149V41.0308Z" fill="#FF6376" />
        <path d="M65.3909 44.3144L62.769 47.8939C63.6913 47.9683 64.4621 48.2574 65.0813 48.761C65.7004 49.2646 66.1061 49.9325 66.2982 50.7646C66.5312 51.774 66.4217 52.762 65.9695 53.7285C65.5309 54.6918 64.8127 55.533 63.8149 56.2519C62.817 56.9707 61.636 57.4877 60.2719 57.8026C59.2215 58.0451 58.1906 58.1538 57.179 58.1287C56.1811 58.1005 55.2555 57.919 54.4024 57.5844L55.8171 53.7232C56.4415 53.9382 57.0947 54.0604 57.7768 54.0897C58.4588 54.119 59.1068 54.0628 59.7206 53.9211C60.3891 53.7668 60.877 53.5464 61.1844 53.2599C61.4887 52.9598 61.5952 52.6119 61.5039 52.2163C61.3716 51.6434 60.828 51.4671 59.8731 51.6876L57.8883 52.1458L57.7967 49.0418L59.7971 46.317L54.7225 47.4886L54.6183 43.6763L65.2993 41.2104L65.3909 44.3144ZM72.4593 43.3937L72.3965 44.8953L72.7648 44.8103C74.4836 44.4135 75.8787 44.4506 76.9501 44.9217C78.0352 45.3896 78.7305 46.2851 79.036 47.6083C79.2974 48.7405 79.2119 49.802 78.7797 50.7926C78.3475 51.7832 77.6308 52.6311 76.6298 53.3364C75.6393 54.0249 74.4484 54.5297 73.057 54.8509C72.0066 55.0934 70.9756 55.2021 69.964 55.177C68.9661 55.1488 68.0406 54.9674 67.1874 54.6327L68.6021 50.7715C69.2265 50.9866 69.8797 51.1087 70.5618 51.1381C71.2439 51.1674 71.8918 51.1112 72.5057 50.9695C73.1741 50.8151 73.662 50.5947 73.9695 50.3082C74.2737 50.0081 74.3818 49.667 74.2936 49.2851C74.2212 48.9713 74.0312 48.7709 73.7238 48.6839C73.4131 48.5832 72.9373 48.6068 72.2961 48.7548L67.9378 49.761L68.3855 40.4979L77.9002 38.3013L78.0045 42.1135L72.4593 43.3937ZM85.4827 40.387L85.5585 42.9558L91.5333 41.5764L91.6376 45.3887L85.6832 46.7634L85.8206 51.5594L80.9916 52.6742L80.5495 37.6896L92.1922 35.0017L92.2965 38.814L85.4827 40.387ZM93.8883 34.6101L98.7173 33.4953L99.1594 48.4799L94.3304 49.5947L93.8883 34.6101ZM104.43 36.1205L100.235 37.0889L100.128 33.1696L113.346 30.1179L113.454 34.0372L109.259 35.0056L109.594 46.0709L104.765 47.1858L104.43 36.1205Z" fill="white" />
    </svg>
)

export const TieWowSVG = React.memo(({ className }: ISVGProp) =>
    <svg className={className} width="213" height="118" viewBox="0 0 213 118" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M69 84.61C69 83.7916 68.5015 83.0559 67.7415 82.7525L2.74148 56.8054C1.42794 56.281 0 57.2485 0 58.6629V89.4743C0 90.2927 0.49852 91.0284 1.25852 91.3318L66.2585 117.279C67.5721 117.803 69 116.836 69 115.421V84.61Z" fill="#DA4A5B" />
        <path d="M119 24.5773C119 23.6538 119.632 22.8503 120.53 22.6333L209.78 1.05647C211.44 0.655192 212.806 2.38446 212.033 3.90672L200 27.5785L212.609 48.7051C213.299 49.8623 212.671 51.3574 211.361 51.6741L121.47 73.4061C120.211 73.7103 119 72.7568 119 71.4621V24.5773Z" fill="#F25367" />
        <path d="M119 41.149C119 40.4459 119.369 39.7944 119.973 39.4331L161.973 14.2844C163.306 13.4862 165 14.4465 165 16.0003V48.9363C165 49.6692 164.599 50.3433 163.955 50.6934L121.955 73.5272C120.623 74.2517 119 73.287 119 71.7701V41.149Z" fill="#D14556" />
        <path d="M0 41.1152C0 40.1922 0.63172 39.389 1.5288 39.1715L162.529 0.141235C163.788 -0.163927 165 0.789683 165 2.08493V48.9691C165 49.8921 164.368 50.6953 163.471 50.9128L2.4712 89.9431C1.21241 90.2482 0 89.2946 0 87.9994V41.1152Z" fill="#FF6376" />
        <path d="M68.8451 41.2816L65.2955 55.0325L60.8582 56.057L58.6625 49.7472L56.7892 56.9963L52.3519 58.0208L48.0443 46.0838L52.1308 45.1404L54.5356 51.9561L56.5681 44.116L60.374 43.2373L62.7154 50.1785L64.7762 42.221L68.8451 41.2816ZM77.076 52.6083C75.8249 52.8972 74.6732 52.9229 73.6208 52.6856C72.5775 52.4338 71.7027 51.9523 70.9966 51.2409C70.3022 50.5268 69.8308 49.6319 69.5824 48.5562C69.2531 47.1297 69.2876 45.7855 69.6859 44.5235C70.0933 43.2472 70.81 42.1642 71.8362 41.2746C72.874 40.3822 74.1354 39.7646 75.6204 39.4218C76.8715 39.133 78.0187 39.1144 79.0621 39.3662C80.1144 39.6035 80.9878 40.0793 81.6823 40.7933C82.3884 41.5047 82.8656 42.3983 83.114 43.474C83.4433 44.9005 83.4043 46.2519 82.997 47.5282C82.5987 48.7902 81.8806 49.8673 80.8427 50.7596C79.8165 51.6493 78.561 52.2655 77.076 52.6083ZM76.6534 49.1775C77.3082 49.0263 77.8361 48.7258 78.2372 48.2761C78.65 47.8236 78.9189 47.2812 79.0439 46.6489C79.1688 46.0166 79.153 45.3614 78.9965 44.6832C78.8291 43.9583 78.4792 43.4294 77.9467 43.0967C77.4259 42.7613 76.7913 42.6799 76.043 42.8527C75.3882 43.0039 74.8544 43.3057 74.4416 43.7581C74.0405 44.2079 73.7775 44.7489 73.6525 45.3812C73.5276 46.0135 73.5434 46.6688 73.6999 47.3469C73.8673 48.0719 74.2114 48.6021 74.7322 48.9375C75.2647 49.2702 75.9051 49.3502 76.6534 49.1775ZM104.266 33.104L100.716 46.8549L96.2792 47.8794L94.0835 41.5696L92.2102 48.8188L87.7729 49.8432L83.4653 37.9063L87.5518 36.9628L89.9567 43.7785L91.9891 35.9384L95.795 35.0597L98.1364 42.0009L100.197 34.0434L104.266 33.104ZM105.146 32.9009L109.881 31.8077L109.333 39.9148L106.176 40.6436L105.146 32.9009ZM108.196 45.3129C107.553 45.4613 106.984 45.3957 106.488 45.1161C105.992 44.8364 105.682 44.4276 105.558 43.8898C105.407 43.235 105.511 42.6445 105.87 42.1183C106.24 41.5894 106.776 41.244 107.478 41.082C108.121 40.9335 108.689 40.9933 109.182 41.2613C109.675 41.5293 109.983 41.9322 110.108 42.47C110.256 43.1131 110.148 43.7108 109.783 44.2631C109.415 44.8037 108.886 45.1536 108.196 45.3129Z" fill="white" />
    </svg>
)