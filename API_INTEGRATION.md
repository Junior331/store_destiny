# 📚 Documentação de Integração com Banco de Dados

## 🎯 Visão Geral

Este documento descreve a estrutura de API necessária para integrar o front-end com o banco de dados. O sistema está preparado para substituir os dados mockados por chamadas reais à API.

---

## 📦 Endpoints Necessários

### 1️⃣ **Produtos**

#### `GET /api/products`
Retorna todos os produtos disponíveis.

```typescript
// Response
{
  "products": [
    {
      "id": "uuid",
      "serverId": "server-slug",
      "name": "10.000 CASH",
      "cashAmount": 10000,
      "originalPrice": 12.90,
      "discountedPrice": 10.97,
      "discount": 15,
      "imageUrl": "cash_10k",
      "rarity": "common" // common | rare | epic | lendary | super_lendary
    }
  ]
}
```

#### `GET /api/products?serverId={serverSlug}`
Retorna produtos filtrados por servidor.

```typescript
// Query params
serverId: string // slug do servidor (ex: "server1", "server2")

// Response
{
  "products": Product[] // mesma estrutura acima
}
```

---

### 2️⃣ **Servidores**

#### `GET /api/servers`
Retorna lista de servidores disponíveis.

```typescript
// Response
{
  "servers": [
    {
      "id": "uuid",
      "name": "Servidor 1",
      "slug": "server1",
      "active": true
    }
  ]
}
```

---

###️⃣ **Cupons**

#### `POST /api/coupons/validate`
Valida um cupom de desconto.

```typescript
// Request body
{
  "code": "CUPOM10",
  "serverId": "server1",
  "totalAmount": 100.00
}

// Response (válido)
{
  "valid": true,
  "coupon": {
    "code": "CUPOM10",
    "discountPercent": 10,
    "discountAmount": null, // ou valor fixo
    "active": true
  },
  "discount": 10.00
}

// Response (inválido)
{
  "valid": false,
  "error": "Cupom inválido ou expirado"
}
```

---

### 4️⃣ **Pagamentos**

#### `POST /api/payments/create`
Cria uma sessão de pagamento.

```typescript
// Request body
{
  "serverId": "server1",
  "gateway": "pix", // getnet | stripe | paypal | picpay | pix | mercadopago | coinbase
  "items": [
    {
      "productId": "uuid",
      "quantity": 2
    }
  ],
  "couponCode": "CUPOM10", // opcional
  "totalAmount": 100.00,
  "gatewayFee": 5.00,
  "discount": 10.00
}

// Response
{
  "success": true,
  "paymentId": "uuid",
  "redirectUrl": "https://gateway.com/checkout/abc123", // para gateways externos
  "pixPayload": "00020126...", // apenas para PIX
  "qrCode": "data:image/png;base64..." // apenas para PIX
}
```

---

## 🔧 Arquivos a Modificar

### 1. Substituir `mockProducts.ts`

**Arquivo**: `src/lib/data/mockProducts.ts`

```typescript
// ANTES (mock)
export function getProductsByServer(serverId: string): Product[] {
  return MOCK_PRODUCTS.filter(product => product.serverId === serverId);
}

// DEPOIS (API)
export async function getProductsByServer(serverId: string): Promise<Product[]> {
  const response = await fetch(`/api/products?serverId=${serverId}`);
  const data = await response.json();
  return data.products;
}
```

---

### 2. Criar serviço de API

**Criar arquivo**: `src/lib/services/api.ts`

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  // Produtos
  async getProducts(serverId?: string): Promise<Product[]> {
    const url = serverId
      ? `${API_BASE_URL}/api/products?serverId=${serverId}`
      : `${API_BASE_URL}/api/products`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro ao buscar produtos');

    const data = await response.json();
    return data.products;
  },

  // Servidores
  async getServers(): Promise<Server[]> {
    const response = await fetch(`${API_BASE_URL}/api/servers`);
    if (!response.ok) throw new Error('Erro ao buscar servidores');

    const data = await response.json();
    return data.servers;
  },

  // Cupons
  async validateCoupon(code: string, serverId: string, totalAmount: number) {
    const response = await fetch(`${API_BASE_URL}/api/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, serverId, totalAmount }),
    });

    if (!response.ok) throw new Error('Erro ao validar cupom');
    return response.json();
  },

  // Pagamentos
  async createPayment(paymentData: PaymentRequest) {
    const response = await fetch(`${API_BASE_URL}/api/payments/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) throw new Error('Erro ao criar pagamento');
    return response.json();
  },
};
```

---

### 3. Atualizar páginas para usar API

**Arquivo**: `src/app/[server]/view/page.tsx`

```typescript
// ANTES
const serverProducts = getProductsByServer(server.id);

// DEPOIS
const serverProducts = await api.getProducts(server.id);
```

---

## 🗄️ Estrutura do Banco de Dados Sugerida

### Tabela: `servers`
```sql
CREATE TABLE servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: `products`
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id UUID REFERENCES servers(id),
  name VARCHAR(255) NOT NULL,
  cash_amount INTEGER NOT NULL,
  original_price DECIMAL(10,2) NOT NULL,
  discounted_price DECIMAL(10,2),
  discount INTEGER,
  image_url VARCHAR(255),
  rarity VARCHAR(20) CHECK (rarity IN ('common', 'rare', 'epic', 'lendary', 'super_lendary')),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: `coupons`
```sql
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_percent INTEGER,
  discount_amount DECIMAL(10,2),
  server_id UUID REFERENCES servers(id), -- NULL = todos os servidores
  active BOOLEAN DEFAULT true,
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: `payments`
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id UUID REFERENCES servers(id),
  user_id UUID NOT NULL, -- ID do usuário autenticado
  gateway VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending | completed | failed | refunded
  total_amount DECIMAL(10,2) NOT NULL,
  gateway_fee DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  coupon_code VARCHAR(50),
  items JSONB NOT NULL, -- Array de {productId, quantity, price}
  gateway_transaction_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ✅ Checklist de Integração

- [ ] Configurar variável de ambiente `NEXT_PUBLIC_API_URL`
- [ ] Criar endpoints de API no backend
- [ ] Substituir funções mock por chamadas à API
- [ ] Implementar tratamento de erros e loading states
- [ ] Adicionar autenticação JWT nos headers das requisições
- [ ] Implementar callbacks de pagamento (webhooks)
- [ ] Testar integração completa end-to-end

---

## 🔐 Autenticação

Todas as requisições autenticadas devem incluir o token JWT:

```typescript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}
```

---

## 📝 Notas Importantes

1. **Taxas de Gateway**: As taxas estão configuradas em `src/lib/data/paymentGateways.ts` e devem ser sincronizadas com o banco de dados.

2. **Validação de Cupons**: O back-end deve validar:
   - Se o cupom está ativo
   - Se está dentro do período de validade
   - Se não excedeu o número máximo de usos
   - Se é aplicável ao servidor específico

3. **Callbacks de Pagamento**: Implementar webhooks para receber notificações dos gateways sobre status de pagamento.

4. **Logs**: Registrar todas as transações para auditoria e suporte.

---

**Status Atual**: ✅ Front-end 100% preparado para integração
**Próximo Passo**: Implementar os endpoints no backend conforme especificado
