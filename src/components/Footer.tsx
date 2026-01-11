const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="space-y-4">
            <h2 className="text-footer-heading text-xl font-bold">
              Criado por Destiny Community
            </h2>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-footer-link hover:text-footer-link-hover transition-colors duration-200"
              >
                Destiny Roleplay
              </a>
              <a
                href="#"
                className="text-footer-link hover:text-footer-link-hover transition-colors duration-200"
              >
                Destiny Roleplay
              </a>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex gap-4">
              <a
                href="#"
                className="text-footer-link hover:text-footer-link-hover transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="33" viewBox="0 0 48 33" fill="none">
                  <path d="M47.6916 7.28644C47.6916 3.41936 44.5881 0.308507 40.7532 0.308507C35.5588 0.0859349 30.2613 0 24.8475 0H23.1597C17.7591 0 12.4521 0.085935 7.25774 0.309366C3.43225 0.309366 0.328737 3.43741 0.328737 7.30449C0.094332 10.3629 -0.00505554 13.4222 0.000570173 16.4815C-0.00880601 19.5408 0.0974574 22.603 0.31936 25.668C0.31936 29.5351 3.42288 32.6717 7.24836 32.6717C12.7053 32.9037 18.3029 33.0068 23.9942 32.9982C29.6949 33.0154 35.2769 32.9066 40.7401 32.6717C44.5749 32.6717 47.6785 29.5351 47.6785 25.668C47.9035 22.6001 48.0066 19.5408 47.9972 16.4729C48.0185 13.4136 47.9166 10.3515 47.6916 7.28644ZM19.4093 24.9117V8.02549L33.0047 16.4643L19.4093 24.9117Z" fill="#6D747B" />
                </svg>
              </a>
              <a
                href="#"
                className="text-footer-link hover:text-footer-link-hover transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="36" viewBox="0 0 38 36" fill="none">
                  <path d="M26.9164 2.99973C29.0142 3.00567 31.0244 3.79781 32.5078 5.20314C33.9912 6.60848 34.8274 8.51283 34.8336 10.5003V25.4997C34.8274 27.4872 33.9912 29.3915 32.5078 30.7969C31.0244 32.2022 29.0142 32.9943 26.9164 33.0003H11.0836C8.98576 32.9943 6.97562 32.2022 5.49221 30.7969C4.00879 29.3915 3.17265 27.4872 3.16638 25.4997V10.5003C3.17265 8.51283 4.00879 6.60848 5.49221 5.20314C6.97562 3.79781 8.98576 3.00567 11.0836 2.99973H26.9164ZM26.9164 0H11.0836C4.9875 0 0 4.725 0 10.5003V25.4997C0 31.275 4.9875 36 11.0836 36H26.9164C33.0125 36 38 31.275 38 25.4997V10.5003C38 4.725 33.0125 0 26.9164 0Z" fill="#6D747B" />
                  <path d="M29.2914 10.5003C28.8217 10.5003 28.3625 10.3683 27.9719 10.1211C27.5813 9.87384 27.2769 9.52244 27.0972 9.11131C26.9174 8.70017 26.8704 8.24777 26.962 7.81131C27.0537 7.37486 27.2799 6.97395 27.612 6.65928C27.9442 6.34461 28.3673 6.13032 28.828 6.0435C29.2887 5.95668 29.7663 6.00124 30.2003 6.17154C30.6342 6.34184 31.0052 6.63022 31.2661 7.00024C31.5271 7.37025 31.6664 7.80526 31.6664 8.25027C31.667 8.54592 31.6061 8.83879 31.487 9.11206C31.3678 9.38533 31.1929 9.63362 30.9723 9.84268C30.7516 10.0517 30.4895 10.2174 30.201 10.3303C29.9126 10.4431 29.6035 10.5009 29.2914 10.5003ZM19 11.9997C20.2527 11.9997 21.4772 12.3516 22.5188 13.011C23.5603 13.6703 24.3721 14.6074 24.8515 15.7038C25.3309 16.8002 25.4563 18.0067 25.2119 19.1706C24.9675 20.3345 24.3643 21.4037 23.4785 22.2428C22.5928 23.082 21.4642 23.6535 20.2356 23.885C19.007 24.1165 17.7335 23.9977 16.5762 23.5435C15.4189 23.0894 14.4297 22.3203 13.7338 21.3336C13.0378 20.3468 12.6664 19.1867 12.6664 18C12.6682 16.4092 13.336 14.8839 14.5234 13.759C15.7108 12.6341 17.3208 12.0014 19 11.9997ZM19 9C17.1211 9 15.2843 9.52784 13.7221 10.5168C12.1598 11.5057 10.9422 12.9113 10.2231 14.5558C9.50411 16.2004 9.31598 18.01 9.68254 19.7558C10.0491 21.5016 10.9539 23.1053 12.2825 24.364C13.6111 25.6226 15.3038 26.4798 17.1466 26.8271C18.9895 27.1743 20.8996 26.9961 22.6355 26.3149C24.3714 25.6337 25.8551 24.4802 26.899 23.0001C27.9428 21.5201 28.5 19.78 28.5 18C28.5 15.6131 27.4991 13.3239 25.7175 11.636C23.9359 9.94821 21.5196 9 19 9Z" fill="#6D747B" />
                </svg>
              </a>
              <a
                href="#"
                className="text-footer-link hover:text-footer-link-hover transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="36" viewBox="0 0 38 36" fill="none">
                  <path d="M34.9608 0H3.24696C1.51406 0 0 1.18125 0 2.80366V32.9151C0 34.5463 1.51406 36 3.24696 36H34.9515C36.6937 36 37.9999 34.5367 37.9999 32.9151V2.80366C38.0101 1.18125 36.6937 0 34.9608 0ZM11.7791 30.0078H6.3353V13.9725H11.7791V30.0078ZM9.24552 11.5345H9.2065C7.46427 11.5345 6.33615 10.3058 6.33615 8.76777C6.33615 7.20161 7.49396 6.00187 9.27521 6.00187C11.0565 6.00187 12.1464 7.19277 12.1854 8.76777C12.1846 10.3058 11.0565 11.5345 9.24552 11.5345ZM31.6748 30.0078H26.231V21.24C26.231 19.1395 25.4388 17.7043 23.4692 17.7043C21.9645 17.7043 21.0739 18.6686 20.6777 19.6079C20.5293 19.9454 20.4894 20.4051 20.4894 20.8744V30.0078H15.0456V13.9725H20.4894V16.204C21.2817 15.1353 22.5192 13.5972 25.3989 13.5972C28.9724 13.5972 31.6757 15.8288 31.6757 20.6397L31.6748 30.0078Z" fill="#6D747B" />
                </svg>
              </a>
            </div>

          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 border-t border-footer-border my-8 py-8">
          <div>
            <div className="mb-6">
              <p className="text-sm text-footer-foreground leading-relaxed max-w-4xl">
                © {currentYear}, Destiny Community. Todos os direitos reservados. Destiny, Logotipo de Destiny Community, San Battlegrounds, o logo tipo do San Battlegrounds são marcas comerciais ou registradas do Destiny Community no Brasil. Grand Theft Auto, Grand Theft Auto: V e Grand Theft Auto: San Andreas são marcas registradas da Take-Two Interactive Software. Todas as marcas comerciais usadas pertencem aos seus respectivos proprietários. Destiny Community são é afiliada ou endossado pela Take-Two Interactive Software.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <a
                href="#"
                className="text-footer-link hover:text-footer-link-hover transition-colors duration-200 font-medium"
              >
                Termos de Serviços
              </a>
              <a
                href="#"
                className="text-footer-link hover:text-footer-link-hover transition-colors duration-200 font-medium"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                className="text-footer-link hover:text-footer-link-hover transition-colors duration-200 font-medium"
              >
                Segurança da Conta
              </a>
              <a
                href="#"
                className="text-footer-link hover:text-footer-link-hover transition-colors duration-200 font-medium"
              >
                Suporte ao Jogador
              </a>
            </div>
          </div>
          
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="68" height="53" viewBox="0 0 68 53" fill="none">
              <path d="M41.7138 8.12154e-06L0.777511 8.12154e-06C0.617513 -0.000797333 0.46296 0.0583338 0.344032 0.165855C0.225105 0.273376 0.150343 0.421566 0.134344 0.581488C-1.09024 12.0728 6.23799 20.3945 14.7368 22.2009C14.9803 22.2489 15.2043 22.3679 15.3809 22.543C15.5575 22.7181 15.6789 22.9416 15.7298 23.1856C16.3385 25.9089 17.5417 28.4624 19.2526 30.6615C20.9636 32.8607 23.1394 34.6506 25.623 35.9019C25.7132 35.9483 25.7914 36.0151 25.8514 36.0972C25.9114 36.1792 25.9516 36.2741 25.9687 36.3745C25.9858 36.4748 25.9794 36.5777 25.95 36.6752C25.9205 36.7726 25.869 36.8617 25.7993 36.9356L9.95936 53L41.7138 53C56.2339 53 68 41.1804 68 26.5956V26.4057C68 11.8196 56.2339 8.12154e-06 41.7138 8.12154e-06ZM23.4607 22.7811L41.6507 22.7811C42.6377 22.7811 43.5843 23.175 44.2822 23.876C44.98 24.5771 45.3721 25.5279 45.3721 26.5194C45.3721 27.5108 44.98 28.4617 44.2822 29.1627C43.5843 29.8638 42.6377 30.2577 41.6507 30.2577H35.2191C31.8 30.2693 26.5826 29.7137 23.4646 22.7811M60.4634 26.5194V26.6576C60.4634 29.1325 59.978 31.583 59.035 33.8694C58.0921 36.1557 56.7099 38.2331 54.9676 39.9827C53.2252 41.7324 51.1568 43.1201 48.8805 44.0666C46.6042 45.013 44.1645 45.4998 41.7009 45.4989H27.9745L35.3284 38.2252C35.5687 37.9886 35.8924 37.8572 36.2289 37.8595L40.7426 37.8725H41.6353C44.6364 37.8708 47.5139 36.672 49.6354 34.5396C51.7569 32.4073 52.9486 29.516 52.9486 26.5013V26.438C52.9469 23.4244 51.7544 20.5347 49.6331 18.4038C47.5119 16.2729 44.6353 15.075 41.6353 15.0733L19.275 15.0733C15.9061 15.0733 10.488 13.4568 8.61385 7.66004L41.7009 7.66004C52.0598 7.69105 60.4634 16.1264 60.4634 26.5194Z" fill="#F3F3F3" />
            </svg>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
