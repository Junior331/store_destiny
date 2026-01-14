"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import { gerarQRCodePix } from "@/lib/services/bradesco-pix";

interface QRPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  pixKey?: string; // Chave PIX (email, CPF, telefone, chave aleatória)
  merchantName?: string;
  merchantCity?: string;
}

export function QRPaymentModal({
  isOpen,
  onClose,
  amount,
  pixKey = "contato@destinycash.com.br",
  merchantName = "Destiny Cash Store",
  merchantCity = "Sao Paulo",
}: QRPaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [pixPayload, setPixPayload] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && pixKey) {
      setLoading(true);

      // Usa a API do Bradesco para gerar QR Code PIX
      gerarQRCodePix({
        valor: amount,
        chave: pixKey,
        descricao: "Compra de Cash - Destiny",
        nomeRecebedor: merchantName,
        cidadeRecebedor: merchantCity,
      })
        .then((response) => {
          setPixPayload(response.emv);

          // Gera QR Code visual do payload
          QRCode.toDataURL(response.emv, {
            width: 200,
            margin: 1,
            color: {
              dark: "#000000",
              light: "#FFFFFF",
            },
          })
            .then((url) => setQrCodeUrl(url))
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          console.error("Erro ao gerar QR Code PIX:", err);
          // Fallback para método local em caso de erro
          const fallbackPayload = generatePixPayload({
            pixKey,
            amount,
            merchantName,
            merchantCity,
          });
          setPixPayload(fallbackPayload);

          QRCode.toDataURL(fallbackPayload, {
            width: 200,
            margin: 1,
            color: {
              dark: "#000000",
              light: "#FFFFFF",
            },
          })
            .then((url) => setQrCodeUrl(url))
            .catch((err) => console.error(err));
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, pixKey, amount, merchantName, merchantCity]);

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(pixPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="pix-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            key="pix-modal-content"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.4,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-2xl border border-zinc-800 bg-[#1a1a1a] p-4 md:p-6 lg:p-8 shadow-2xl my-auto"
          >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 md:right-6 md:top-6 rounded-full bg-zinc-800 p-2 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <h2 className="mb-4 md:mb-6 text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-white text-center md:text-left">
            Escaneie o Código QR para pagar{" "}
            <span className="text-blue-500 block md:inline">R$ {amount.toFixed(2)}</span>
          </h2>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* Text Content */}
            <div className="flex-1">
              <ol className="space-y-2 text-white text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <span>Abra seu App de Pagamentos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <span>Escolha a opção de "pagar via Pix"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <span>Escaneie o código ao lado</span>
                </li>
              </ol>

              <div className="mb-4 py-4 bg-zinc-900/50 rounded-lg">
                <p className="text-white text-sm md:text-base">
                  Você tem <span className="text-blue-500 font-semibold">trinta minutos</span> para efetuar o pagamento.
                </p>
              </div>

              <p className="text-xs md:text-sm text-zinc-400">
                Após a confirmação do pagamento, o seu pedido será prontamente entregue no servidor que você escolheu.
              </p>
            </div>

            {/* QR Code */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="rounded-xl bg-white p-3 md:p-4">
                {loading ? (
                  <div className="h-40 w-40 md:h-48 md:w-48 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                ) : qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="QR Code para pagamento"
                    className="h-40 w-40 md:h-48 md:w-48"
                  />
                ) : (
                  <div className="h-40 w-40 md:h-48 md:w-48 animate-pulse bg-gray-200" />
                )}
              </div>
              <p className="mt-3 text-xs md:text-sm text-zinc-400 text-center">
                {loading ? "Gerando QR Code..." : "Use a câmera do seu celular para escanear"}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 md:my-8 h-px bg-zinc-800" />

        {/* Copy Code Section */}
        <div>
          <h3 className="mb-3 md:mb-4 text-lg md:text-xl font-semibold text-white">
            Ou copie o código PIX para pagar
          </h3>

          <p className="mb-3 md:mb-4 text-xs md:text-sm text-zinc-400">
            Escolha pagar via PIX pelo seu Internet Banking ou App de Pagamentos. Depois cole o seguinte código:
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={pixPayload}
                readOnly
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 truncate"
              />
            </div>
            <button
              onClick={handleCopyCode}
              className="rounded-lg bg-blue-600 px-4 md:px-6 py-2 md:py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 whitespace-nowrap flex-shrink-0"
            >
              {copied ? "✓ Copiado!" : "Copiar Código"}
            </button>
          </div>

          {/* Informações úteis */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
            <div className="p-3 rounded-lg bg-zinc-900/30">
              <p className="text-zinc-500">Chave PIX:</p>
              <p className="text-zinc-300 truncate font-mono">{pixKey}</p>
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/30">
              <p className="text-zinc-500">Valor:</p>
              <p className="text-zinc-300 font-semibold">R$ {amount.toFixed(2)}</p>
            </div>
          </div>

          {/* Aviso mobile */}
          <div className="mt-4 md:hidden p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg">
            <p className="text-xs text-blue-300 flex items-center gap-2">
              <span className="text-sm">📱</span>
              <span>No celular, toque no código acima para selecionar e copiar</span>
            </p>
          </div>
        </div>

        {/* Botão de ajuda */}
        <div className="mt-6 pt-4 border-t border-zinc-800">
          <p className="text-xs text-zinc-500 text-center">
            Precisa de ajuda?{" "}
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              Clique aqui para suporte
            </button>
          </p>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Função para gerar payload PIX (versão simplificada)
function generatePixPayload({
  pixKey,
  amount,
  merchantName,
  merchantCity,
}: {
  pixKey: string;
  amount: number;
  merchantName: string;
  merchantCity: string;
}): string {
  // Formata valores
  const formattedAmount = amount.toFixed(2);
  const formattedName = merchantName.substring(0, 25);
  const formattedCity = merchantCity.substring(0, 15);

  // Monta o payload PIX de forma simplificada
  // Nota: Em produção, use uma biblioteca como `pix-utils` ou gere via backend
  const payload = [
    "000201", // Payload Format Indicator
    "26580014BR.GOV.BCB.PIX", // Merchant Account Information
    `0136${pixKey}`, // Chave PIX
    `52040000530398654${formattedAmount.length.toString().padStart(2, "0")}${formattedAmount}`, // Transaction Amount
    `5802BR5925${formattedName}`, // Merchant Name
    `6009${formattedCity}`, // Merchant City
    "62070503***", // Additional Data Field Template
    "6304", // CRC16
  ].join("");

  // Adiciona CRC16 (simplificado - em produção use cálculo real)
  const crc = "E2CA"; // CRC16 placeholder
  return payload + crc;
}