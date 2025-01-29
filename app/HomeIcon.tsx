import * as React from "react";
import { motion } from "framer-motion";

const HomeIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={185}
    height={41}
    fill="none"
    initial={{ opacity: 0, x: "-100vw" }}
    animate={{ opacity: 1, x: ["-400%", "4%", "0%"], y: ["0%", "4%", "0%"] }}
    transition={{ duration: 3 }}
  >
    <g filter="url(#LogoText)">
      <path
        fill="#F0F600"
        d="M17.804 12.856h-2.71V8.623h-2.578v13.652h3.032V25H6.466v-2.725h3.017V8.623H6.876v4.233H4.181V5.884h13.623v6.972Zm16.758 5.333c0 1.064-.171 2.03-.513 2.9a6.355 6.355 0 0 1-1.45 2.256 6.627 6.627 0 0 1-2.256 1.465c-.88.351-1.86.527-2.945.527-1.064 0-2.036-.176-2.915-.527a6.788 6.788 0 0 1-2.27-1.465 6.636 6.636 0 0 1-1.45-2.256c-.332-.87-.498-1.836-.498-2.9 0-1.036.166-1.993.498-2.872a6.577 6.577 0 0 1 1.45-2.285 6.4 6.4 0 0 1 2.27-1.48c.88-.35 1.851-.527 2.915-.527 1.084 0 2.066.176 2.945.528.879.341 1.63.835 2.256 1.48a6.306 6.306 0 0 1 1.45 2.284c.342.88.513 1.836.513 2.872Zm-3.018 0c0-.616-.098-1.197-.293-1.744a3.857 3.857 0 0 0-.82-1.42c-.362-.391-.801-.699-1.319-.923-.507-.235-1.079-.352-1.714-.352-.644 0-1.22.117-1.728.352a3.749 3.749 0 0 0-1.29.922c-.35.391-.624.865-.82 1.421a5.39 5.39 0 0 0-.278 1.744c0 .644.093 1.23.279 1.757.195.528.468.991.82 1.392.351.4.781.713 1.289.937.508.215 1.084.323 1.728.323.635 0 1.207-.108 1.714-.323a3.775 3.775 0 0 0 1.319-.937c.361-.4.634-.864.82-1.392a5.03 5.03 0 0 0 .293-1.758Zm19.468-6.841L48.96 25h-3.75l-1.436-8.218L42.31 25h-3.75l-2.05-13.652h2.973l1.202 9.126 1.464-9.126h3.208l1.48 9.126 1.201-9.126h2.974Zm16.875-5.464L64.927 25h-3.12l-1.684-8.247L58.468 25h-3.12l-2.96-19.116h3.15l1.758 12.876 1.392-7.412h2.9l1.347 7.412 1.802-12.876h3.15ZM78.36 9.575H74.67V5.884h3.691v3.691ZM81.144 25h-9.17v-2.725h3.017v-8.188h-3.017v-2.74h6.05v10.928h3.12V25Zm18.208-4.087c0 .889-.2 1.611-.601 2.168a4.52 4.52 0 0 1-1.553 1.348 6.55 6.55 0 0 1-2.11.703 12.99 12.99 0 0 1-2.27.205c-1.24 0-2.475-.18-3.706-.542-1.23-.361-2.295-.835-3.193-1.421l1.26-2.49c1.074.625 2.055 1.07 2.944 1.333.898.254 1.797.38 2.695.38 1.221 0 2.11-.126 2.666-.38.557-.264.835-.625.835-1.084a.73.73 0 0 0-.234-.557c-.156-.146-.415-.278-.776-.395-.362-.127-.84-.25-1.436-.367a38.935 38.935 0 0 0-2.197-.395 22.596 22.596 0 0 1-2.007-.425 5.951 5.951 0 0 1-1.655-.732 3.729 3.729 0 0 1-1.158-1.187c-.283-.478-.424-1.079-.424-1.802 0-.732.185-1.367.556-1.904a4.57 4.57 0 0 1 1.48-1.348 6.943 6.943 0 0 1 2.065-.761 11.458 11.458 0 0 1 5.405.19c1.016.274 1.905.67 2.666 1.187l-1.2 2.343c-.762-.478-1.505-.8-2.227-.966a9.85 9.85 0 0 0-2.359-.264c-.361 0-.737.02-1.128.059-.39.039-.751.117-1.084.234-.332.107-.61.259-.834.454a.874.874 0 0 0-.323.688c0 .362.318.66.952.894.645.225 1.739.45 3.282.674.84.117 1.606.268 2.3.454.693.176 1.288.42 1.786.732.499.303.884.699 1.158 1.187.283.479.425 1.074.425 1.787Zm5.874-1.582c.146.938.59 1.719 1.333 2.344.752.615 1.757.923 3.017.923.986 0 1.841-.152 2.564-.454a6.197 6.197 0 0 0 1.889-1.23l1.553 2.138c-.879.879-1.811 1.48-2.798 1.802-.976.322-2.046.483-3.208.483a8.084 8.084 0 0 1-2.944-.527 7.196 7.196 0 0 1-2.359-1.465 6.936 6.936 0 0 1-1.567-2.256c-.371-.87-.557-1.836-.557-2.9 0-1.036.171-1.988.513-2.857a6.794 6.794 0 0 1 1.465-2.27 6.577 6.577 0 0 1 2.27-1.495c.879-.36 1.851-.542 2.915-.542 1.104 0 2.105.19 3.003.572a6.21 6.21 0 0 1 2.3 1.626c.645.712 1.148 1.587 1.509 2.622.361 1.025.542 2.187.542 3.486h-11.44Zm8.012-2.666c-.156-.879-.61-1.582-1.362-2.11-.752-.536-1.606-.805-2.564-.805-.957 0-1.816.269-2.578.806-.761.527-1.22 1.23-1.377 2.109h7.881Z"
      />
    </g>
    <g filter="url(#b)">
      <path fill="url(#Trailer)" d="M150.737 0H119v31.737h31.737V0Z" />
      <path fill="url(#Vehicle)" d="M180.49.793h-31.737V32.53h31.737V.793Z" />
    </g>
    <defs>
      <pattern
        id="Trailer"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#TrailerPng" transform="scale(.0125)" />
      </pattern>
      <pattern
        id="Vehicle"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#VehiclePng" transform="scale(.0125)" />
      </pattern>
      <filter
        id="LogoText"
        width={120.485}
        height={27.453}
        x={0.181}
        y={5.884}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_204_57" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_204_57"
          result="shape"
        />
      </filter>
      <filter
        id="b"
        width={69.49}
        height={40.53}
        x={115}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_204_57" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend
          in2="effect1_dropShadow_204_57"
          result="effect2_dropShadow_204_57"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend
          in2="effect2_dropShadow_204_57"
          result="effect3_dropShadow_204_57"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect3_dropShadow_204_57"
          result="shape"
        />
      </filter>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEmUlEQVR4nO2bTajcVBTH/w9RBL8WIghWkdaKuPBjI1o/6we6FgTduHEhuHHfVtCFVaELdyp+LBTB5/OtrAvBr1pEdCloFd2orfbpvNybMedkFPGWk7mpaZiPJJPMZDLnB4GZJPeek/+ck3vuffcBiqIoiqIoiqIoiqIoiqIoHhvjPst41RC+t4TIMtxSHIS+IfxkGZsB4ckowqVz/VHDAa62hCMLF4LrOQzhH0N4O2Bc0bh4AeMOywgSw4yTlrEviHD97w7nYUn40+GC/gDXBIxHLeM9EdBHJlnCE81GXioe4Z0th/PRAXqEywzhLUP4zwfGS85hrXZDadqKeI0YWDCW8VDmXf5iEwNGkrZdibxRmBh7DSH2Ij6MupDR1ne6Dx3HxHjMB0svDHFxPZ1KqcJwwV+4btT1HmGHZWxIiVCmnLCMzXCA3ZNsV+p7RtuG8KF/XT1di4Cp86PSVx7QMLYrlxGMbXmRjxNvlr6r2g4Zt6RR6BzOnV1Ab3DMtQ1v7P1xQowd/RiH/S+9Xmffddg2jK/9cz/SrIA+Oqs84Dbjct+3rbvvGmw/7tP9o6YjcOy1Rfc9i+0gwEVSXCf1YYxdjRnqqoCCIbzp0/wZzMLKChjjLn/Pr87hrEYMdVlA57BmCD8m90W4vxFDXRZQkMnDpNG6EKssYG+42PCvIfzd7+OS2g11XUAhrRllARZLJSAh9HXgDsy5DsxiCA/6e79Ztgjc9DORw3WK6KeIH3jbG9Pudw5nG8aWL6xvakRAQ/jCEo6m503B75P6lkVcmY9WnetOO5J5doyrCmlAOOTbvNyIgIkYhM8zBo8W+T4tgv1LfD1N51qOYV8bRcUT+gNcWzTlx4pU9loRmh4o6qSyryrgEBWwCwIaxleG8eXMTq2qgDZ3vwqoAk5HI7BNKUy5elDfgVoHTkXrwBalcB5N4QUKaGPc6zd5/pBsDCJEyWc5F+Oeqj51PgJtjF3ZlZwJiwZHbIydVX2rw1fIBsrsikuZ5agi5NtPWwYLGLfJisioTZ5ymAg3WMZ+fy1ZPQkZewo5U9LXYo0IP2cELL0cVXpmMmEZzG/yNEU2ecpO1GQZbNh/UGbpqqivtTSaVwo7h7WymzyTNox3/Y//SVUfy/raSgGN/yN32U2eSST65XjZ413VzzK+tlJAS3hj1CZP53COJbxgGL9ZxglDeE7O5Wwc8FH4WlU/y/jazggkfDdqk6clPJ8ffQ3h4BlthwOLnP+2qp9lfD2zEeGXqeXCHI+tXPpK1Ml5GWn7jFv9fSfyaTwX/zLVwv8ORnigTSJujRFQxMsIeHxBAp6uHlqHGZPC8s7LP4ghPNtECi81lvC6F2h/9rwMGF5EicTjIt6IQeSpOgaRpSZg3JlEEeOkpGTRdj2HCw3jjyR6GbdjlbGEz3wqrpcopJON6pbwMVadcIDd6f/ryQxjUiRK5GV2+W/PvM+5K4SMPafnw8MZxgET4UYZneWQz/LOS9NW7g0JNy/a71ZhY+xM03lKWfGpiXHlov1tLSbG3ZbxiiEcyyyoHkvOxdi7aP8URVEURVEURVEURVFQlFMEd5bQ8o349gAAAABJRU5ErkJggg=="
        id="TrailerPng"
        width={80}
        height={80}
      />
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFElEQVR4nO2bS4gcVRSG/7gQn8FsBF2I+MKF+NipiW8RFUFQdKNuTbbGuMlDN2riRnAT0CQKbsxj4UaEIJk4M4qoGxE1UVzoOGMSZ9Ln9EydUyMaS07NrbEf1T1d3dVV1e39oGCm59btv86953Fv3QE8Ho/H4/F4PB6Px+PxeDwej8fjKZx6gMdYcIwFASuiql6kOEuKL0mxjRkbUAVI8GrZhuH+rjkO8WD5M89GVrBsoxoEuAIVhhkb6gEeZcGk0x3WFPeUJ0gw4VxjW5b7SPA5C6bz0pG1vyjCeaR4y2n/o7SBZ8GiicgqgAXTLJjKUUfm/mIjCo66mXg0irAORZPEE4woS0u4nBSnnRFfKFzAqBvQqAd4hAT/xHE8wK0YBQNSyTGw7X7FXjcLv5+JcCGqbkCuQAxsxIxmxnNJZS+KYhxcOOHsEm6yssaepyZ4HEUwTgY0SLHVzcL5ecGVGDbjEgMTrJQptLQZlxjYiNW0Vly7mbgVw2TcXLjw0qYCGwLR0C9bbQkm41JHsKWm2ESEy7wBdWDj1kjwWbymFjxvhp2LcFFfM3CcYmArlo05xEOkeJEF75HiaxZImlFJ8DcJTrLiCCteIcGT9WXc0DEZjWsM7GUjgkNcR4InWLGLFYdJ8AMJ/ko1rOKUJaQ2Q/5fDdiJKML5lnRY8QwL9pDiI1bMNszQ95tu6BB0ZzjAw1nqNjYXbO9nepA6cNA+88TsYTHT6Xj6vz90zlwzWWIWpz/s1CAxcNA+86aueNa581ddXdi7ddOs+y1lENU18QbsRhzKOnjowC5MFV0L50lP3tlvEuERqgMLMWAZAsfKhUtVWuUk0sGIlTMgVTAGptFkr1qAW9IK1LUexo5TsGA/CX6Mz9IIgvhnxT4K8UAVY2Cs2fQ1az6ZVXOTAVnwa1qB2ulhOMS1qcWttiWhSQ5xDSpABs1TrZpbJ1L8u2tvky+T+9YVd7KCXSV+mhXbrZNTES62y60fdyQvua2t3YMSse2pzJoFt/e02hL80rMB68u4flWI4OCZCJd0ajsf4VISHHJ912zHo4wYaFtQrKA+NNNa3rNqt14N2HAS6mAvL2miCOtse8iN1MRa7fOOgfH3D1FzJgNSiHsTF+g2iqmjqjgTxwvF3SiQnDRv6sWAsVuy4kNSvGQ3RREuaGosOODabG/dN2PBG6T43Q46kmC3fdbyRTvdiO5HgbDg3YE1K95p/HxxGTfa+xQSfJDEy/glNAnONWYjEvxJii9Y8SYrniLBT/GILOHmFpF7WjMZCV5vbOOCdHxepcgYaDvLOWj+mQWbzWDO4I33nFs9T1lTXFVXPOcO53xj7wTS0nyrK7Adr1VElmkXFRtdu7lWl1izfBjiladmM2I8+wSbuyaZuIOVovNlUnyczNBOYhYVGxvEzI6CAXvR7F4umcG2mPuiX1jxXZo7kGB3iju81q8L50knF86imRXf5h2Qd7S9fJFYkI3qrAlJCci7SkoiBwbWrNiXe0lg07vX+xYirE/Op9QUd6FA7NR+ZTS7ovS4m+6HMhSlR9zsO4YSYMGnA2j+JFcxbimXvNI73G1UFyKsT4TYfxXZYh4lMIDmhaFodllrZW25Uq3vpAC3Waazy362+JG4gLVtXJiXgdsA6VmzDXhdccfQBFn9k7gGd98aOk4hrkYFyKB5ojDNFOJ+VrxNghMNm5Mn4s9C3IcKMoqaPR6Px+PxeDwej8fj8Xg8Hg8qw7+4cv3w4wsbFwAAAABJRU5ErkJggg=="
        id="VehiclePng"
        width={80}
        height={80}
      />
    </defs>
  </motion.svg>
);
export default HomeIcon;
