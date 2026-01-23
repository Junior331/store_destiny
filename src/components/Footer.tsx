"use client";
import Image from "next/image";
import { AuthLogo } from "./auth";
import { getIcons } from "@/assets/icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f0f0f] p-[68px_0px_65px]">
      <div className="p-[4.5px_15px_0.5px_15px] max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="space-y-4">
            <h2 className=" text-xl font-bold">
              Criado por Destiny Community
            </h2>
            <div className="flex gap-6">
              <a
                href="https://originals.rpdestiny.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7d7d7d] font-medium hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Destiny Originals


              </a>
              <a
                href="https://gtabattlegrounds.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7d7d7d] font-medium hover:text-white transition-colors duration-200 cursor-pointer"
              >
                GTA Battlegrounds
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7d7d7d] font-medium hover:text-white transition-colors duration-200 cursor-pointer"
              >
                OCTA Shield
              </a>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <a
                href="https://www.youtube.com/c/DestinyCommunity"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Image src={getIcons('youtube')} alt={"youtube icone"} className="hover:opacity-[0.8] cursor-pointer" />
              </a>
              <a
                href="https://www.instagram.com/destinycommunity.gg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Image src={getIcons('instagram')} alt={"instagram icone"} className="hover:opacity-[0.8] cursor-pointer" />

              </a>
              <a
                href="https://www.linkedin.com/company/destinycommunity/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Image src={getIcons('linkedin')} alt={"linkedin icone"} className="hover:opacity-[0.8] cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-8 border-t-2 border-[#333333] mt-10 pt-10">
          <div>
            <div className="mb-6">
              <p className="text-sm text-[#ffffff80] leading-relaxed max-w-4xl">
                © {currentYear},2026, Destiny Community Exploração de Jogos Eletrônicos Ltda inscrito sob o nº CNPJ 39.781.952/0001-25, com sede em Avenida Salgado Filho 2150, Sala 2112 C, Centro, Guarulhos - SP.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white hover:text-[#7d7d7d] transition-colors duration-200 cursor-pointer"
              >
                Termos de Serviços
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white hover:text-[#7d7d7d] transition-colors duration-200 cursor-pointer"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white hover:text-[#7d7d7d] transition-colors duration-200 cursor-pointer"
              >
                Segurança da Conta
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white hover:text-[#7d7d7d] transition-colors duration-200 cursor-pointer"
              >
                Suporte ao Jogador
              </a>
            </div>
          </div>

            <AuthLogo className="w-12 lg:-mt-5" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
