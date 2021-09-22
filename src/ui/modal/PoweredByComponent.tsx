import React from 'react'
import styled from 'styled-components'

const PoweredWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 0;
`

const Text = styled.span`
  color: #B0AEB1;
  font-size: 13px;
  font-weight: 300 !important;
  padding: 10px 10px 0 0;
`

const SVG = styled.svg`
  path.outline {
    fill: ${props => props.theme.rifLogoOutline};
  }
`

const PoweredByComponent: React.FC = () => {
  return (
    <PoweredWrapper>
      <Text>
      Powered By
      </Text>
      <SVG width="47" height="31" viewBox="0 0 47 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.9919 25.4594L23.9912 13.7825L26.3805 13.4875L26.7503 15.3173C27.5324 14.0605 28.6652 13.4329 30.1494 13.4329C30.4605 13.4329 30.7144 13.4478 30.9103 13.4768L30.8664 15.8627C30.5765 15.8187 30.276 15.7975 29.9649 15.7975C28.9148 15.7975 28.1313 16.0769 27.6137 16.6358C27.0961 17.1954 26.8373 17.972 26.8373 18.9678V25.4601L23.9919 25.4594Z" className="outline" />
        <path d="M7.7628 11.7705V0.656738C7.7628 0.656738 4.17773 2.44828 4.17773 6.2576C4.17773 10.0669 7.7628 11.7705 7.7628 11.7705Z" fill="#008CFF"/>
        <path d="M7.7627 0.656738C7.7627 0.656738 11.3478 2.44828 11.3478 6.25831C11.3478 10.0676 7.7627 11.7712 7.7627 11.7712V0.656738Z" fill="#0CBFE8"/>
        <path d="M16.1304 16.9992L21.0569 14.1892C21.0569 14.1892 19.3563 13.0437 17.6677 14.0069C15.9791 14.9708 16.1304 16.9992 16.1304 16.9992Z" fill="#008CFF"/>
        <path d="M21.0563 14.1892C21.0563 14.1892 21.1688 16.241 19.4802 17.2035C17.7916 18.1666 16.1299 16.9985 16.1299 16.9985L21.0563 14.1892Z" fill="#0CBFE8"/>
        <path d="M21.2925 13.7422C21.2055 13.6954 19.128 12.5961 17.3737 13.6131C15.9673 14.4281 15.6865 16.0636 15.6307 16.7437L14.9815 17.1189C14.6577 16.7998 14.2143 16.6019 13.7264 16.6019C13.2435 16.6019 12.8043 16.7941 12.4819 17.1083L9.50709 15.3855C9.54174 15.2458 9.55942 15.1011 9.55942 14.9522C9.55942 14.1302 9.00929 13.4358 8.25905 13.2202V12.1585C9.12667 11.5996 11.8794 9.57048 11.8794 6.33776C11.8794 2.59794 8.18126 0.259582 8.02428 0.163834L7.76195 0L7.50173 0.163125C7.34263 0.258872 3.64444 2.59723 3.64444 6.33705C3.64444 9.56977 6.39652 11.5989 7.26485 12.1578V13.2195C6.5139 13.4351 5.96447 14.1302 5.96447 14.9515C5.96447 15.1004 5.98286 15.2451 6.01751 15.3848L3.04199 17.1076C2.72025 16.7934 2.28114 16.6012 1.79818 16.6012C0.806813 16.6026 0 17.4118 0 18.4055C0 19.2254 0.549425 19.9197 1.29825 20.1374V23.7184C0.549425 23.9361 0 24.6312 0 25.4503C0 26.4447 0.806813 27.2532 1.79747 27.2532C2.32356 27.2532 2.79733 27.0263 3.12472 26.6617L6.0168 28.3341C5.98215 28.4724 5.96377 28.6171 5.96377 28.766C5.96377 29.7597 6.77058 30.5675 7.76124 30.5675C8.75261 30.5675 9.55871 29.7597 9.55871 28.766C9.55871 28.6171 9.54104 28.4724 9.50639 28.3341L12.3978 26.6617C12.7252 27.0263 13.1989 27.2532 13.725 27.2532C14.7157 27.2532 15.5225 26.4447 15.5225 25.4503C15.5225 24.6305 14.9731 23.9354 14.2242 23.7184V20.1374C14.9731 19.9197 15.5225 19.2254 15.5225 18.4055C15.5225 18.2601 15.5048 18.1189 15.4737 17.9849L16.1214 17.6111C16.5011 17.7906 17.2478 18.0849 18.0978 18.0849C18.6154 18.0849 19.1705 17.9764 19.7057 17.6657C21.4601 16.6501 21.5506 14.2954 21.5541 14.1976L21.5633 13.889L21.2925 13.7422ZM14.2256 19.0367C14.0878 19.1459 13.9145 19.2112 13.7264 19.2112C13.6267 19.2112 13.5327 19.1927 13.4443 19.1587C13.3665 19.131 13.2944 19.0892 13.2307 19.0388C13.073 18.9154 12.9613 18.7317 12.9316 18.5218C12.9267 18.4835 12.9231 18.4452 12.9231 18.4055C12.9231 18.3714 12.9246 18.3367 12.9302 18.3041C12.9663 18.0083 13.1636 17.7615 13.4316 17.6565C13.5235 17.6203 13.6232 17.6005 13.7264 17.6005C13.8367 17.6005 13.9435 17.6225 14.0397 17.6636C14.3268 17.7856 14.5297 18.0714 14.5297 18.4055C14.5297 18.4509 14.5262 18.4948 14.5184 18.5381C14.4837 18.7395 14.377 18.9154 14.2256 19.0367ZM14.529 25.4503C14.529 25.895 14.1691 26.256 13.7257 26.256C13.5723 26.256 13.4273 26.2128 13.3057 26.1362C13.0766 25.995 12.9224 25.7404 12.9224 25.4503C12.9224 25.4418 12.9224 25.4355 12.9239 25.4269V25.4255C12.926 25.3383 12.9422 25.2567 12.9705 25.1787C13.0214 25.0354 13.1119 24.9099 13.2293 24.8177C13.3304 24.7361 13.4535 24.6794 13.5871 24.6581C13.631 24.6489 13.6776 24.6454 13.725 24.6454C13.9131 24.6454 14.0863 24.7106 14.2242 24.8198C14.4095 24.9659 14.529 25.195 14.529 25.4503ZM13.2307 23.7184C12.9861 23.7893 12.764 23.9092 12.5738 24.0702L9.52477 22.3056V22.3035C9.54669 22.1893 9.55942 22.0694 9.55942 21.9481C9.55942 21.7737 9.53396 21.6049 9.48729 21.4453L12.4897 19.7098C12.6962 19.9076 12.9493 20.0559 13.2314 20.1374V23.7184H13.2307ZM7.76195 29.5696C7.36031 29.5696 7.02797 29.2739 6.96786 28.8873C6.9622 28.8476 6.95867 28.8079 6.95867 28.766C6.95867 28.4284 7.16656 28.1405 7.4593 28.0206C7.55335 27.9823 7.65517 27.9603 7.76124 27.9603C7.86801 27.9603 7.96913 27.9823 8.06318 28.0206C8.35592 28.1405 8.56381 28.4284 8.56381 28.766C8.56381 28.8079 8.56027 28.8476 8.55462 28.8873C8.49593 29.2746 8.16288 29.5696 7.76195 29.5696ZM6.00054 22.3113L2.95148 24.0716C2.76126 23.9106 2.53711 23.7886 2.29316 23.7184V20.1374C2.57883 20.0559 2.8341 19.9034 3.04199 19.702L6.03872 21.4382C5.98993 21.5992 5.96447 21.7701 5.96447 21.9481C5.96447 22.0715 5.9772 22.1928 6.00054 22.3084V22.3113ZM2.60075 25.4503C2.60075 25.7404 2.44731 25.995 2.21679 26.1362C2.09587 26.2128 1.95092 26.256 1.79747 26.256C1.35412 26.256 0.994197 25.8958 0.994197 25.4503C0.994197 25.195 1.1137 24.9659 1.29825 24.8191C1.43614 24.7106 1.60938 24.6447 1.79747 24.6447C1.84414 24.6447 1.89152 24.6482 1.93677 24.6574C2.07042 24.6808 2.19133 24.7369 2.29316 24.817C2.41054 24.9092 2.50105 25.0347 2.55196 25.178C2.58095 25.256 2.59722 25.339 2.59863 25.4262C2.60075 25.434 2.60075 25.4433 2.60075 25.4503ZM0.994904 18.4055C0.994904 17.9608 1.35482 17.6005 1.79818 17.6005C1.90142 17.6005 2.00041 17.6203 2.09305 17.6565C2.35538 17.7601 2.55055 17.9998 2.59227 18.2899C2.59792 18.3275 2.60146 18.3658 2.60146 18.4055C2.60146 18.4452 2.59792 18.4835 2.59227 18.5218C2.56327 18.7317 2.45155 18.9154 2.29386 19.0388C2.23376 19.0856 2.16729 19.1261 2.09446 19.153C2.00254 19.1906 1.90283 19.2112 1.79818 19.2112C1.61009 19.2112 1.43685 19.1459 1.29896 19.0367C1.1137 18.8899 0.994904 18.6608 0.994904 18.4055ZM7.26485 14.3188C7.40203 14.2125 7.57598 14.1465 7.76195 14.1465C7.94792 14.1465 8.12187 14.2117 8.25975 14.3188C8.41673 14.4444 8.52563 14.6259 8.55603 14.8345C8.56169 14.8728 8.56522 14.9125 8.56522 14.9522C8.56522 15.2075 8.44572 15.4366 8.25975 15.5834C8.19965 15.6302 8.13106 15.6706 8.05893 15.6976C7.96701 15.7352 7.8666 15.7558 7.76195 15.7558C7.65729 15.7558 7.55759 15.7359 7.46567 15.6976C7.39354 15.6706 7.32425 15.6302 7.26485 15.5834C7.07817 15.4366 6.95867 15.2075 6.95867 14.9522C6.95867 14.9125 6.9622 14.8728 6.96786 14.8345C6.99827 14.6252 7.10716 14.4444 7.26485 14.3188ZM8.5631 21.9808C8.55532 22.2254 8.43794 22.4396 8.25905 22.5808C8.22298 22.6077 8.18268 22.6354 8.14308 22.6574C8.02923 22.7191 7.89913 22.7531 7.76124 22.7531C7.6276 22.7531 7.4989 22.7191 7.38718 22.6588C7.34334 22.6368 7.30162 22.6098 7.26414 22.5808C7.08312 22.4375 6.96574 22.2183 6.96008 21.9715C6.95796 21.9644 6.95796 21.9552 6.95796 21.9481C6.95796 21.8751 6.96715 21.8063 6.98695 21.7396C7.03079 21.5694 7.12979 21.4226 7.26343 21.3155C7.35041 21.2481 7.45153 21.1978 7.56113 21.1687C7.62477 21.1524 7.69194 21.1431 7.76053 21.1431C7.83266 21.1431 7.90195 21.1524 7.96842 21.1722C8.0752 21.1999 8.17278 21.2502 8.25834 21.3155C8.38845 21.4212 8.48815 21.5637 8.5334 21.7304C8.5532 21.7999 8.56452 21.8722 8.56452 21.9481C8.56452 21.9588 8.56452 21.9701 8.5631 21.9786V21.9808ZM11.9806 17.97C11.9459 18.1097 11.9282 18.2544 11.9282 18.4055C11.9282 18.5594 11.948 18.7083 11.9841 18.8523L8.95484 20.6027C8.75756 20.4254 8.52068 20.2906 8.25834 20.2162V16.6827C8.54401 16.6012 8.79928 16.4508 9.00717 16.2494L11.9806 17.97ZM4.63864 6.33776C4.63864 3.68734 6.96786 1.76884 7.76195 1.19223C8.55815 1.76742 10.8853 3.67883 10.8853 6.33776C10.8853 8.55626 9.249 10.1634 8.25975 10.9322V6.74274C8.25975 6.46685 8.03772 6.24344 7.76195 6.24344C7.48688 6.24344 7.26485 6.46614 7.26485 6.74274V10.9343C6.27348 10.1669 4.63864 8.56336 4.63864 6.33776ZM6.51531 16.2487C6.7232 16.4501 6.97847 16.6005 7.26414 16.682V20.2155C7.00534 20.2899 6.77199 20.4204 6.57471 20.5963L3.54262 18.8409C3.57656 18.7005 3.59495 18.5565 3.59495 18.4055C3.59495 18.2551 3.57656 18.1097 3.54262 17.97L6.51531 16.2487ZM3.56596 25.766C3.58575 25.6645 3.59495 25.5574 3.59495 25.4503C3.59495 25.2581 3.56454 25.073 3.50797 24.9007L6.46299 23.1921C6.67795 23.4184 6.95513 23.5914 7.26414 23.6801V27.0341C6.97847 27.1178 6.72179 27.2695 6.51319 27.4731L3.56596 25.766ZM9.00929 27.4731C8.8014 27.2695 8.54472 27.1178 8.25905 27.0341V23.6801C8.57017 23.5914 8.84665 23.4184 9.06161 23.19L12.0152 24.8986C11.9594 25.073 11.9282 25.2581 11.9282 25.4503C11.9282 25.5574 11.9367 25.6645 11.9572 25.766L9.00929 27.4731ZM19.2094 16.8019C18.5496 17.1827 17.8043 17.1154 17.2415 16.9629L18.2364 16.3877C18.4732 16.2515 18.5567 15.9451 18.4195 15.7075C18.2816 15.4685 17.9783 15.3862 17.7393 15.5245L16.7507 16.0962C16.9006 15.5331 17.2153 14.8557 17.8715 14.4763C18.8211 13.9266 19.9907 14.2749 20.5281 14.4891C20.4461 15.0621 20.1661 16.2487 19.2094 16.8019Z" className="outline" />
        <path d="M32.9629 10.8024C32.9629 9.82795 33.5038 9.3407 34.5871 9.3407C35.6697 9.3407 36.2113 9.82795 36.2113 10.8024C36.2113 11.267 36.0763 11.6287 35.8054 11.8869C35.5346 12.145 35.1287 12.2741 34.5871 12.2741C33.5045 12.2748 32.9629 11.784 32.9629 10.8024ZM36.0741 25.4596H33.0902V13.6387H36.0741V25.4596Z" className="outline" />
        <path d="M45.2507 15.8857H42.6683V25.4597H39.6843V15.8857H38.041V14.4431L39.6843 13.6381V12.8338C39.6843 11.5842 39.9912 10.6721 40.6043 10.0962C41.2173 9.52098 42.1988 9.23303 43.5487 9.23303C44.5789 9.23303 45.4953 9.38694 46.2979 9.69404L45.5349 11.892C44.9346 11.7026 44.3802 11.6076 43.8718 11.6076C43.4475 11.6076 43.1414 11.7338 42.9526 11.9856C42.7631 12.2374 42.669 12.5594 42.669 12.9523V13.6388H45.2514V15.8857H45.2507Z" className="outline" />
      </SVG>
    </PoweredWrapper>
  )
}

export default PoweredByComponent
