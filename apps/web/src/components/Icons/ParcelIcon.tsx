export default function ParcelIcon() {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: No need title
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none">
      <rect width="30" height="30" fill="url(#a)" rx="6" />
      <path
        fill="#fff"
        d="M13.795 5.775c-1.402.643-3.848 1.73-6.571 2.943-.92.409-1.709.774-1.738.803-.036.03 1.059.613 2.424 1.307l2.483 1.248.606-.284c.336-.154 1.212-.57 1.957-.92a548.7 548.7 0 0 0 1.964-.928c.343-.16 1.014-.481 1.496-.708.49-.233 1.161-.547 1.505-.708.335-.153.927-.43 1.3-.613l.686-.329-.833-.343c-1.511-.628-4.154-1.738-4.279-1.804-.087-.043-.38.059-1 .336ZM20.585 8.71a866.71 866.71 0 0 1-5.695 2.739c-2.41 1.146-2.884 1.387-2.833 1.438.037.03.643.343 1.366.708l1.3.657.854-.401c.467-.22.978-.46 1.139-.533.336-.146 2.424-1.125 4.782-2.242.716-.343 1.709-.803 2.578-1.212.27-.124.489-.248.489-.27 0-.051-2.658-1.183-2.957-1.263-.095-.022-.475.117-1.023.38ZM5.048 13.77c-.073 5.338-.066 6.747.044 6.827.044.044.876.446 1.84.898 1.956.92 5.25 2.476 6.556 3.096.468.226.87.409.891.409.015 0 .037-2.263.037-5.03v-5.031l-1.38-.701c-.767-.387-1.402-.701-1.431-.701-.022 0-.037.62-.037 1.38 0 .766-.03 1.402-.066 1.423-.036.022-.38-.124-.774-.328l-.708-.372.051-1.446.059-1.439-2.49-1.248a134.614 134.614 0 0 0-2.512-1.256c-.022 0-.058 1.585-.08 3.52ZM24.382 10.543c-1.563.738-6.097 2.862-8.046 3.775l-1.19.555v10.061l.167-.05c.146-.045.964-.402 2.008-.877.212-.095.395-.175.416-.175.015 0 .278-.117.577-.256.307-.138.57-.255.584-.255.022 0 .241-.095.497-.212.256-.117 1.577-.694 2.942-1.285 1.366-.599 2.52-1.11 2.556-1.14.058-.036.087-1.744.102-5.249.007-2.847.007-5.184-.007-5.177-.008 0-.285.132-.606.285Z"
      />
      <defs>
        <linearGradient id="a" x1="28.5" x2="3" y1="1.5" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6FF00" />
          <stop offset="1" stopColor="#949F35" />
        </linearGradient>
      </defs>
    </svg>
  )
}