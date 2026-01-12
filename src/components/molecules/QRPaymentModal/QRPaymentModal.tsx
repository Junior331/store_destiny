"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import QRCode from "qrcode";

interface QRPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  pixCode?: string;
}

export function QRPaymentModal({
  isOpen,
  onClose,
  amount,
  pixCode = "00020126580014br.gov.bcb.pix01360d82b44c-eb44-4639-9359-2926dd",
}: QRPaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    if (isOpen && pixCode) {
      QRCode.toDataURL(pixCode, {
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
  }, [isOpen, pixCode]);

  if (!isOpen) return null;

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(pixCode);
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
            Ou copie o código QR para pagar
          </h3>

          <p className="mb-4 text-sm text-zinc-400">
            Escolha pagar via PIX pelo seu Internet Banking ou App de Pagamentos. Depois cole o seguinte código:
          </p>

          <div className="flex gap-3">
            <input
              type="text"
              value={pixCode}
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
        </div>
      </div>
    </div>
  );
}
