"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import QRCode from "qrcode";

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
  pixKey = "dda3059f-31a5-40d3-84e1-c945cd08db4a",
  merchantName = "Destiny Cash",
  merchantCity = "São Paulo",
}: QRPaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [pixPayload, setPixPayload] = useState("");

  useEffect(() => {
    if (isOpen && pixKey) {
      // Gera o payload PIX dinamicamente
      const payload = generatePixPayload({
        pixKey,
        amount,
        merchantName,
        merchantCity,
      });
      
      setPixPayload(payload);

      // Gera QR Code do payload
      QRCode.toDataURL(payload, {
        width: 200,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error(err));
    }
  }, [isOpen, pixKey, amount, merchantName, merchantCity]);

  if (!isOpen) return null;

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(pixPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl border border-zinc-800 bg-[#1a1a1a] p-8 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full bg-zinc-800 p-2 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Section */}
        <div className="mb-8 flex items-start justify-between gap-8">
          <div className="flex-1">
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white">
              Escaneie o Código QR para pagar{" "}
              <span className="text-blue-500">R$ {amount.toFixed(2)}</span>
            </h2>

            <ol className="mb-6 space-y-2 text-white">
              <li>1. Abra seu Internet Banking ou App de Pagamentos</li>
              <li>2. Escolha a opção de "pagar via Pix"</li>
              <li>3. Escaneie o código ao lado</li>
            </ol>

            <p className="text-white">
              Você tem <span className="text-blue-500">trinta minutos</span> para efetuar o pagamento.
            </p>

            <p className="mt-4 text-sm text-zinc-400">
              Após a confirmação do pagamento, o seu pedido será prontamente entregue no servidor que você escolheu.
            </p>
          </div>

          {/* QR Code */}
          <div className="flex-shrink-0">
            <div className="rounded-xl bg-white p-4">
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl}
                  alt="QR Code para pagamento"
                  className="h-48 w-48"
                />
              ) : (
                <div className="h-48 w-48 animate-pulse bg-gray-200" />
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-zinc-800" />

        {/* Copy Code Section */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-white">
            Ou copie o código PIX para pagar
          </h3>

          <p className="mb-4 text-sm text-zinc-400">
            Escolha pagar via PIX pelo seu Internet Banking ou App de Pagamentos. Depois cole o seguinte código:
          </p>

          <div className="flex gap-3">
            <input
              type="text"
              value={pixPayload}
              readOnly
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCopyCode}
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              {copied ? "Copiado!" : "Copiar Código"}
            </button>
          </div>

          {/* Informações úteis */}
          <div className="mt-4 text-sm text-zinc-500">
            <p>Chave PIX: <span className="text-zinc-300">{pixKey}</span></p>
            <p>Valor: <span className="text-zinc-300">R$ {amount.toFixed(2)}</span></p>
          </div>
        </div>
      </div>
    </div>
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