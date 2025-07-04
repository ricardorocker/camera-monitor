﻿# Camera Monitor (Camerite UI Clone) – Angular 18 + Tailwind + Signals

Este é um projeto pessoal criado com base no sistema de monitoramento por câmeras da **Camerite**.

> A proposta é simular, com fidelidade visual, uma interface de monitoramento de câmeras em tempo real, utilizando práticas modernas do Angular 18 e uma estrutura leve, escalável e reativa.

---

##  Objetivos

- Reproduzir visualmente a interface real do sistema Camerite
- Utilizar as tecnologias modernas do Angular 18 (standalone components, signals)
- Simular chamadas assíncronas com API mock (`json-server`)
- Demonstrar boas práticas de arquitetura, componentização e responsividade
- Focar em uma entrega objetiva e funcional que possa evoluir em produção real

---

##  Tecnologias Utilizadas

- ✅ Angular 18 (standalone)
- ✅ TailwindCSS (com utilitários e `@apply`)
- ✅ Signals (`signal`, `computed`, `effect`)
- ✅ API simulada com `json-server`
- ✅ Typescript + RxJS (onde necessário)
- ✅ HTML5 `<video>` + `canvas` para captura de tela
- ❌ Sem dependências externas adicionais

---

##  Funcionalidades

- 🎥 **Player de vídeo** em tempo real com botão de tela cheia (usando `ElementRef`)
- ⏱️ **Timeline dinâmica** (frames de 5 em 5 minutos), gerada via `@for` com dados assíncronos
- 📷 **Captura de tela** do vídeo em PNG com download automático
- 🚨 **Botão de Alerta com modal reativo e contagem regressiva de 5 segundos**
- 📱 **Layout 100% responsivo e mobile-first**
- 🔄 **Serviço Angular assíncrono** usando `HttpClient` + `WritableSignal`
- ♿ Sem uso de `document` ou manipulação direta de DOM — tudo Angular-puro

---

##  Estrutura do Projeto

```bash
src/
├── app/
│   ├── camera-monitor/
│   │   ├── camera-monitor.component.ts
│   │   ├── camera-monitor.component.html
│   │   ├── camera-monitor.component.scss
│   │   └── camera-monitor.service.ts
├── assets/
│   ├── video.mp4
│   ├── frame1.png ... frame5.png
├── db.json         # json-server fake API
```

---

##  Screenshots
<p float="left">
  <img src="https://github.com/user-attachments/assets/b7aed5d0-9f62-404d-8e4e-9b0d1e58bf30" width="26%" />
  <img src="https://github.com/user-attachments/assets/e9c9deb4-16c4-42e7-b08c-1ae975f9d0c6" width="72%" />
</p>


---

##  Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/ricardorocker/camera-monitor.git
cd camera-monitor

# Instale as dependências
npm install

# Inicie o json-server na porta 3000
npx json-server --watch db.json --port 3000

# Em outro terminal, rode o Angular
npm start
```

---

##  Possibilidades de Evolução

- Integração com WebRTC ou socket para vídeo ao vivo real
- Análise de eventos na timeline com inteligência artificial
- Registro de alertas em backend real (Node ou Firebase)
- Criação de painel de múltiplas câmeras
- Testes unitários com `TestBed`, mocks de signal e simulação de API

---

##  Autor

Ricardo Rocker  
Frontend Sênior – Angular Specialist  
[GitHub](https://github.com/ricardorocker) · [LinkedIn](https://linkedin.com/in/ricardo-s-rocker)

---

##  Observações

Este projeto foi desenvolvido em tempo reduzido (menos de 8h), com o objetivo de demonstrar domínio prático e entrega de valor rápido em Angular moderno, inspirado diretamente no layout e produto real do **Camerite**.
